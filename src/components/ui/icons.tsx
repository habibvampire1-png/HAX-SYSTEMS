import type { ComponentType, ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;
export type IconComponent = ComponentType<IconProps>;

function createIcon(paths: ReactNode, displayName: string) {
  function Icon(props: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        focusable={false}
        {...props}
      >
        {paths}
      </svg>
    );
  }
  Icon.displayName = displayName;
  return Icon;
}

export const ChevronDownIcon = createIcon(<path d="m6 9 6 6 6-6" />, "ChevronDownIcon");

export const ArrowRightIcon = createIcon(
  <path d="M5 12h14M13 6l6 6-6 6" />,
  "ArrowRightIcon",
);

export const ArrowDownIcon = createIcon(
  <path d="M12 5v14M6 13l6 6 6-6" />,
  "ArrowDownIcon",
);

export const MenuIcon = createIcon(<path d="M4 7h16M4 12h16M4 17h16" />, "MenuIcon");

export const CloseIcon = createIcon(<path d="M6 6l12 12M18 6 6 18" />, "CloseIcon");

export const CheckIcon = createIcon(<path d="M20 6 9 17l-5-5" />, "CheckIcon");

export const MinusIcon = createIcon(<path d="M5 12h14" />, "MinusIcon");

export const MonitorIcon = createIcon(
  <>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </>,
  "MonitorIcon",
);

export const PhoneIcon = createIcon(
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
  "PhoneIcon",
);

export const ZapIcon = createIcon(
  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  "ZapIcon",
);

export const LayersIcon = createIcon(
  <>
    <path d="m12 2 10 5-10 5L2 7l10-5z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </>,
  "LayersIcon",
);

export const CalendarIcon = createIcon(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </>,
  "CalendarIcon",
);

export const MessageIcon = createIcon(
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  "MessageIcon",
);

export const ClockIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </>,
  "ClockIcon",
);

export const InboxIcon = createIcon(
  <>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </>,
  "InboxIcon",
);

export const ClipboardIcon = createIcon(
  <>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </>,
  "ClipboardIcon",
);

export const RepeatIcon = createIcon(
  <>
    <path d="m17 2 4 4-4 4" />
    <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
    <path d="m7 22-4-4 4-4" />
    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </>,
  "RepeatIcon",
);

export const BellIcon = createIcon(
  <>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </>,
  "BellIcon",
);

export const UnlinkIcon = createIcon(
  <>
    <path d="m18.84 12.25 1.72-1.71a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="m5.17 11.75-1.71 1.71a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    <path d="M8 2v3M2 8h3M16 22v-3M22 16h-3" />
  </>,
  "UnlinkIcon",
);

export const SearchIcon = createIcon(
  <>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </>,
  "SearchIcon",
);

export const TargetIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </>,
  "TargetIcon",
);

export const LayoutIcon = createIcon(
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </>,
  "LayoutIcon",
);

export const CodeIcon = createIcon(
  <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  "CodeIcon",
);

export const TrendingUpIcon = createIcon(
  <>
    <path d="M22 7 13.5 15.5 8.5 10.5 2 17" />
    <path d="M16 7h6v6" />
  </>,
  "TrendingUpIcon",
);

export const ShareIcon = createIcon(
  <>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
  </>,
  "ShareIcon",
);

export const SendIcon = createIcon(
  <>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </>,
  "SendIcon",
);

export const StarIcon = createIcon(
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  "StarIcon",
);

export const DatabaseIcon = createIcon(
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </>,
  "DatabaseIcon",
);

export const UsersIcon = createIcon(
  <>
    <circle cx="9" cy="7" r="4" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85" />
  </>,
  "UsersIcon",
);

export const HeadsetIcon = createIcon(
  <>
    <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
    <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
  </>,
  "HeadsetIcon",
);

export const ImageIcon = createIcon(
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21" />
  </>,
  "ImageIcon",
);

export const GridIcon = createIcon(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </>,
  "GridIcon",
);
