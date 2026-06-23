import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", hoverEffect = true, glass = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-xl
          border
          border-[#0E204A]
          p-6
          transition-all
          duration-300
          ${glass ? "bg-[#060F24]/65 backdrop-blur-sm" : "bg-[#060F24]"}
          ${hoverEffect ? "hover:border-[#142D66] hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-blue-500/5" : ""}
          shadow-lg
          shadow-black/20
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
