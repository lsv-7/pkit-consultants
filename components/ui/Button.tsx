import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "warning" | "indigo";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed gap-2 select-none";
    
    const variants = {
      primary: "bg-[#0066FF] hover:bg-[#297FFF] text-white shadow-lg shadow-blue-500/10",
      secondary: "bg-[#0C1A3D] hover:bg-[#142D66] text-slate-200 border border-[#142D66]",
      outline: "border border-[#142D66] hover:bg-[#0C1A3D] text-slate-300",
      ghost: "hover:bg-[#0C1A3D] text-slate-400 hover:text-slate-200",
      danger: "bg-red-600/90 hover:bg-red-500 text-white shadow-lg shadow-red-500/10",
      success: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/10",
      warning: "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-500/10",
      indigo: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/10",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4.5 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
