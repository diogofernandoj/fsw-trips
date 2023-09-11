import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "outlined" | "danger" | "loading";
}

function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primaryDark",
    outlined:
      "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white",
    danger:
      "text-red-500 border-red-500 border hover:bg-red-600 bg-transparent hover:text-white",
    loading: "bg-primaryDark cursor-not-allowed",
  };

  const _className = twMerge(
    variantClasses[variant],
    "rounded-lg p-2 text-sm font-medium transition-all flex justify-center items-center",
    className
  );

  return (
    <button className={_className} {...props}>
      {variant !== "loading" ? (
        props.children
      ) : (
        <div className="animate-spin h-5 w-5 border-[3px] border-primaryLight border-t-white rounded-full"></div>
      )}
    </button>
  );
}

export default Button;
