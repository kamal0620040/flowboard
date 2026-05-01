import React from "react";
import { STYLES } from "../constants/styles";

interface ButtonProps {
  btnName?: string;
  classStyles?: string;
  handleClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  ariaLabel?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ btnName, classStyles = "", handleClick, buttonType = "button", children, ariaLabel, variant }, ref) => {
    const handleClick_internal = (e: React.MouseEvent<HTMLButtonElement>) => {
      handleClick(e);
    };

    const variantStyles = variant ? STYLES.button[variant] : "";
    const baseStyles = STYLES.button.base;

    return (
      <button
        ref={ref}
        type={buttonType}
        onClick={handleClick_internal}
        className={`${baseStyles} ${variantStyles} ${classStyles}`}
        aria-label={ariaLabel}
      >
        {children || btnName}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;