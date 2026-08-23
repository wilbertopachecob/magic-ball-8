type IconProps = {
  className?: string;
  size?: number;
};

/** Circular arrow — asking the ball again. */
export function AskAgainIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 11a8 8 0 1 0-2.3 5.7" />
      <path d="M20 5v6h-6" />
    </svg>
  );
}

/** A phone with motion marks — the shake prompt. */
export function ShakeIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="7.5" y="2.5" width="9" height="19" rx="2.2" />
      <path d="M11 18.5h2" />
      <path d="M4 9l-1.5 3L4 15" />
      <path d="M20 9l1.5 3L20 15" />
    </svg>
  );
}
