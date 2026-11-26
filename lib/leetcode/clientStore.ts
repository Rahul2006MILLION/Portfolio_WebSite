"use client";

import { useSyncExternalStore } from "react";
import { SOLVED_TTL_MS, isValidSolvedStats, type SolvedStats } from "./types";

/**
 * One shared, client-side store for the live solved count (every place on the page reads the
 * same value from a single request).
 *  - last good response is kept in localStorage
 *  - on load: use the cached value immediately; refetch only if it is older than 6 h
 *  - while the page stays open: re-check every 6 h, and when the tab becomes visible again
 *  - on any failure: keep showing the last good value; with none, report "unavailable"
 */
export type SolvedState =
  | { status: "loading" }
  | { status: "unavailable" }
  | { status: "ready"; stats: SolvedStats };

const ENDPOINT = "/api/leetcode";
const STORAGE_KEY = "portfolio:leetcode-solved:v1";
const LOADING: SolvedState = { status: "loading" };

let state: SolvedState = LOADING;
let started = false;
let inFlight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function set(next: SolvedState) {
  state = next;
  listeners.forEach((l) => l());
}

function readCache(): SolvedStats | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return isValidSolvedStats(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeCache(stats: SolvedStats) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    /* private mode / storage full: the in-memory value still works */
  }
}

const isFresh = (s: SolvedStats) => !s.stale && Date.now() - Date.parse(s.fetchedAt) < SOLVED_TTL_MS;

function refresh(): Promise<void> {
  inFlight ??= (async () => {
    try {
      const res = await fetch(ENDPOINT, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const body: unknown = await res.json();
      if (!isValidSolvedStats(body)) throw new Error("Invalid response");
      const cached = readCache();
      // never replace a newer good value with an older stale one
      const keep = cached && Date.parse(cached.fetchedAt) > Date.parse(body.fetchedAt) ? cached : body;
      writeCache(keep);
      set({ status: "ready", stats: keep });
    } catch {
      const cached = readCache();
      if (cached) set({ status: "ready", stats: { ...cached, stale: true } });
      else if (state.status !== "ready") set({ status: "unavailable" });
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

function start() {
  if (started) return;
  started = true;
  const cached = readCache();
  if (cached) set({ status: "ready", stats: cached });
  if (!cached || !isFresh(cached)) void refresh();
  setInterval(() => void refresh(), SOLVED_TTL_MS);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;
    const c = state.status === "ready" ? state.stats : null;
    if (!c || !isFresh(c)) void refresh();
  });
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  start();
  return () => {
    listeners.delete(cb);
  };
}

export function useLeetCodeSolved(): SolvedState {
  return useSyncExternalStore(subscribe, () => state, () => LOADING);
}

