/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ChangeEventHandler,
  Component,
  CSSProperties,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState,
  useEffect,
  useRef,
} from "react";

const AutofillInput = <T,>({
  value,
  label,
  hint,
  inputProps,
  style,
  className,
  inputClassName,
  onChange,
  icon,
  renderSelected,
  renderAutofillItem,
  options,
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
  onChange?: (current: T, full: T[]) => void;
  icon?: React.ReactNode;
  renderAutofillItem: (
    item: T,
    highlighted: boolean,
    selectItem: (index: number) => void,
    idx: number
  ) => React.ReactNode;
  renderSelected: (
    sel: T,
    removeItem: (val: string) => void,
    idx: number
  ) => React.ReactNode;
  options: T[];
  searchMapper: (val: T) => string;
}) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selected, setSelected] = useState<any[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setFilteredOptions(
      options.filter((option: any) =>
        option.name
          .toString()
          .toLowerCase()
          .includes(inputValue.toString().toLowerCase())
      )
    );
    setHighlightedIndex(-1);
  }, [inputValue, options]);

  const handleChange = (val: string) => {
    setInputValue(val);
  };

  const handleSelect = (option: T) => {
    if (!selected.includes(option)) {
      const newSelected = [...selected, option];
      setSelected(newSelected);
      setInputValue("");
      setFilteredOptions(options);
      if (onChange) {
        onChange(option, newSelected);
      }
    }
  };

  const handleBlur = () => {
    setTimeout(() => setFilteredOptions([]), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case "ArrowUp":
        setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;
      case "Enter":
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setFilteredOptions([]);
        break;
      default:
        break;
    }
  };

  const removeItem = (id: string) => {
    setSelected((prev) => prev.filter((item) => item.id !== id));
  };

  const selectItem = (idx: number) => {
    handleSelect(filteredOptions[idx]);
    setFilteredOptions([]);
  };
  const containerDimensions = containerRef.current?.getBoundingClientRect();
  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-white rounded-md w-full py-1 border border-slate-400 ${className}`}
    >
      <label className="text-xs px-2">{label}</label>
      <div className="flex flex-wrap gap-1">
        {selected.map((sel, idx) => renderSelected(sel, removeItem, idx))}
        <input
          ref={inputRef}
          className={`outline-none px-2 py-1 rounded-lg text-sm flex-grow ${inputClassName}`}
          {...inputProps}
          style={{ fontSize: 13, ...style }}
          value={inputValue}
          placeholder={hint}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        {icon}
      </div>
      {inputValue && filteredOptions.length > 0 && (
        <div
          className={`absolute top-[${
            containerDimensions?.top ?? 0 + 40
          }px] left-[${containerDimensions?.left}px] right-[${
            containerDimensions?.right
          }px] shadow-xl border border-slate-400 rounded-md z-10`}
        >
          {filteredOptions.map((option, idx) =>
            renderAutofillItem(
              option,
              highlightedIndex === idx,
              selectItem,
              idx
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AutofillInput;
