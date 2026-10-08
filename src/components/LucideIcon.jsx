import React from "react";
import { icons } from "lucide";

export default function LucideIcon({ name, ...props }) {
  const iconName = String(name || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  const iconNode = icons[iconName];
  if (!iconNode) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {iconNode.map(([tag, attributes], index) => React.createElement(tag, {
        ...attributes,
        key: `${tag}-${index}`,
      }))}
    </svg>
  );
}
