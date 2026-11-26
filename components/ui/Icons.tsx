import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function GithubIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function LeetCodeIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.247 2.198 5.864 2.198 8.111 0l3.67-3.593a1.417 1.417 0 0 0 .428-1.025 1.39 1.39 0 0 0-.428-1.025 1.408 1.408 0 0 0-1.017-.428 1.4 1.4 0 0 0-1.018.428l-3.666 3.594a3.003 3.003 0 0 1-4.225 0l-.039-.038-4.277-4.193a3.174 3.174 0 0 1-.68-1.008 3.048 3.048 0 0 1-.039-1.325 3.125 3.125 0 0 1 .68-1.008l3.854-4.126 5.406-5.788a1.41 1.41 0 0 0 .428-1.017 1.373 1.373 0 0 0-.428-1.017A1.403 1.403 0 0 0 13.483 0zm-2.88 7.218a1.41 1.41 0 0 0-1.017.428 1.39 1.39 0 0 0-.428 1.017c0 .383.153.75.428 1.017l4.08 4.004H4.518a1.41 1.41 0 0 0-1.018.428 1.39 1.39 0 0 0-.428 1.017c0 .383.153.75.428 1.017a1.41 1.41 0 0 0 1.018.428h9.148l-4.08 4.004a1.418 1.418 0 0 0-.428 1.017 1.39 1.39 0 0 0 .428 1.017 1.41 1.41 0 0 0 1.017.428 1.41 1.41 0 0 0 1.017-.428l6.516-6.395a1.41 1.41 0 0 0 .428-1.017 1.39 1.39 0 0 0-.428-1.017l-6.516-6.395a1.41 1.41 0 0 0-1.017-.428z" />
    </svg>
  );
}

export function KaggleIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M18.825 23.859c-.022.046-.054.085-.094.116s-.086.049-.136.052h-4.321c-.07 0-.138-.02-.196-.058s-.103-.092-.132-.158l-5.127-10.37-1.745 1.666v8.665c0 .066-.026.13-.073.177s-.111.073-.177.073H3.048c-.066 0-.13-.026-.177-.073s-.073-.111-.073-.177V.249c0-.066.026-.13.073-.177s.111-.073.177-.073h3.774c.066 0 .13.026.177.073s.073.111.073.177v14.156l6.638-7.054c.046-.046.099-.074.159-.084.059-.01.119-.002.174.025l4.382 2.339c.07.037.12.094.143.166.024.072.019.148-.014.218l-5.698 5.753 6.071 8.271c.036.05.05.111.042.172s-.037.116-.08.158z" />
    </svg>
  );
}
