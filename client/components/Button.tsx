"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-[#FF5722] text-white text-18 py-2 px-7 rounded-lg hover:bg-[#E64A19] hover:scale-105 transition duration-300 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
