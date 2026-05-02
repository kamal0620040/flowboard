import React from "react";
import { STYLES } from "../constants/styles";

interface ButtonProps {
  btnName?: string;
  classStyles?: string;
  handleClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  ariaLabel?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  style?: React.CSSProperties;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      btnName,
      classStyles = "",
      handleClick,
      buttonType = "button",
      children,
      ariaLabel,
      variant,
      style,
    },
    ref
  ) => {
    const variantStyles = variant ? STYLES.button[variant] : "";
    const baseStyles = STYLES.button.base;

    return (
      <button
        ref={ref}
        type={buttonType}
        onClick={handleClick}
        className={`${baseStyles} ${variantStyles} ${classStyles}`}
        aria-label={ariaLabel}
        style={style}
      >
        {children || btnName}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;