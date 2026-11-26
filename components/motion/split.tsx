import React from "react";

/**
 * Splits text (including nested elements like <em>) into masked words that rise into place when
 * an ancestor with [data-reveal] gets .is-in (CSS in globals.css: .sw). Server-safe; screen
 * readers get the plain text via aria-label on the container that calls this.
 */
export function splitWords(node: React.ReactNode, counter = { i: 0 }): React.ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, k) => {
      if (!part) return null;
      if (/^\s+$/.test(part)) return part;
      const i = counter.i++;
      return (
        <span key={`${i}-${k}`} className="sw" aria-hidden="true">
          <span style={{ "--w": i } as React.CSSProperties}>{part}</span>
        </span>
      );
    });
  }
  if (Array.isArray(node)) return node.map((n, k) => <React.Fragment key={k}>{splitWords(n, counter)}</React.Fragment>);
  if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props.children !== undefined) {
    return React.cloneElement(node, undefined, splitWords(node.props.children, counter));
  }
  return node;
}

/** Plain text of a node, for aria-labels. */
export function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return textOf(node.props.children);
  return "";
}
