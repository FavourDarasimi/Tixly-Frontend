"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size: keyof typeof sizeClasses;
  type: "primary" | "secondary" | "white";
  disabled?: boolean;
};

const sizeClasses = {
  small: "py-1 px-3 text-sm",
  medium: "py-2 px-5 text-md",
  large: "py-4 px-7 text-lg",
};

const Button = ({
  children,
  onClick,
  className,
  size,
  type,
  disabled,
}: ButtonProps) => {
  if (type === "primary") {
    return (
      <button
        disabled={disabled}
        className={`bg-[#FF5722] disabled:bg-[#FF5722]/50  text-white  ${sizeClasses[size]}  hover:bg-[#E64A19] hover:scale-105 transition duration-300 cursor-pointer ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else if (type === "secondary") {
    // return
    <button
      disabled
      className={`border-gray-400 border  ${sizeClasses[size]}    hover:scale-105 transition duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>;
  } else if (type === "white") {
    return (
      <button
        className={`bg-white  ${sizeClasses[size]}    hover:scale-105 transition duration-300 cursor-pointer ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};

export default Button;
