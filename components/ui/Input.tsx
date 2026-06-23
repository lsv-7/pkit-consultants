import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`
            w-full
            ${icon ? "pl-10" : "px-4"}
            py-2.5
            text-sm
            rounded-lg
            bg-[#020612]/60
            border
            border-[#0E204A]
            text-slate-200
            placeholder:text-slate-500
            transition-all
            duration-200
            focus:outline-none
            focus:border-[#0066FF]
            focus:ring-2
            focus:ring-[#0066FF]/20
            disabled:opacity-50
            disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
