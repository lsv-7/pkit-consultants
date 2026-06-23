import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "blue" | "green" | "yellow" | "red" | "purple" | "pink" | "cyan";
  statusType?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", statusType, children, ...props }, ref) => {
    
    // Auto-map status types to variants if provided
    let activeVariant = variant;
    if (statusType) {
      const upperStatus = statusType.toUpperCase();
      if (upperStatus === "NEW" || upperStatus === "NEW_LEAD") {
        activeVariant = "blue";
      } else if (upperStatus === "CONTACTED") {
        activeVariant = "yellow";
      } else if (upperStatus === "MEETING_SCHEDULED") {
        activeVariant = "cyan";
      } else if (upperStatus === "QUOTATION_SENT") {
        activeVariant = "purple";
      } else if (upperStatus === "NEGOTIATION") {
        activeVariant = "pink";
      } else if (upperStatus === "COMPLETED" || upperStatus === "WON") {
        activeVariant = "green";
      } else if (upperStatus === "LOST") {
        activeVariant = "red";
      }
    }

    const variants = {
      default: "bg-[#0C1A3D] text-slate-300 border border-[#142D66]",
      blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      yellow: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      red: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
      purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
      pink: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
      cyan: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    };

    return (
      <span
        ref={ref}
        className={`
          inline-flex
          items-center
          px-2.5
          py-0.5
          rounded-full
          text-xs
          font-medium
          border
          select-none
          ${variants[activeVariant]}
          ${className}
        `}
        {...props}
      >
        {children || (statusType ? statusType.replaceAll("_", " ") : "")}
      </span>
    );
  }
);

Badge.displayName = "Badge";
