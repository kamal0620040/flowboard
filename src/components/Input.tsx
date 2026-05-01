import { STYLES } from "../constants/styles";

interface InputProps {
  inputType: "text" | "textarea";
  title?: string;
  placeholder: string;
  value?: string;
  className?: string;
  autoFocus?: boolean;
  handleClick: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Input = ({ inputType, title, placeholder, value, className = "", autoFocus, handleClick }: InputProps) => {
  const inputStyles = `${STYLES.input.base} ${className}`;

  return (
    <div className="w-full">
      {title ? (
        <p className="dark:text-white text-[#2D2E36] font-semibold text-xl">
          {title}
        </p>
      ) : null}

      {inputType === "textarea" ? (
        <textarea
          value={value}
          autoFocus={autoFocus}
          rows={10}
          className={inputStyles}
          placeholder={placeholder}
          onChange={handleClick}
        />
      ) : (
        <input
          value={value}
          autoFocus={autoFocus}
          className={inputStyles}
          placeholder={placeholder}
          onChange={handleClick}
        />
      )}
    </div>
  );
};

export default Input;