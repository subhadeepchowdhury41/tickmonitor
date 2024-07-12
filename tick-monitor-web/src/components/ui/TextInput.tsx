import {
  CSSProperties,
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";

const TextInput = ({
  value,
  label,
  inputProps,
  hint,
  style,
  className,
  inputClassName,
  onChange,
}: {
  value?: string | number;
  label: string;
  hint: string;
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  style?: CSSProperties;
  className?: string;
  inputClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div
      className={`flex flex-col bg-white rounded-md w-full py-1 border border-slate-400 ${className}`}
    >
      <label className="text-xs px-2">{label}</label>
      <input
        className={`outline-none px-2 py-1 rounded-lg text-sm ${inputClassName}`}
        {...inputProps}
        style={{ fontSize: 13, ...style }}
        value={value}
        placeholder={hint}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
