import { cn } from "@/lib/utils";

const DonkeyIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-6 h-6", className)}
  >
    <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
    <path d="M12 14v2" />
    <path d="M12 10v-1" />
    <path d="M12 6.5v-0.5" />
    <path d="M12.5 3h-1" />
    <path d="M15 4l1 1" />
    <path d="M9 4l-1 1" />
    <path d="M6 8l-2 2" />
    <path d="M18 8l2 2" />
    <path d="M17 12h1" />
    <path d="M6 12h1" />
    <path d="M3.5 17.5l-1.5 1.5" />
    <path d="M20.5 17.5l1.5 1.5" />
    <path d="M15 19l1-1" />
    <path d="M9 19l-1-1" />
    <path d="M12 21.5v-0.5" />
    <path d="M11 3.5l-1-1.5" />
    <path d="M13 3.5l1-1.5" />
  </svg>
);

export default DonkeyIcon;
