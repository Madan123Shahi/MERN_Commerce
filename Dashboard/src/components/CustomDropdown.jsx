import { useEffect, useRef, useState } from "react";

export default function CustomDropdown({
  label = "Select",
  options = [],
  value,
  onChange,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      {/* Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={`input_base bg-white flex justify-between items-center
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span>
          {value ? options.find((o) => o.value === value)?.label : label}
        </span>
        <span className="text-gray-500">▼</span>
      </button>

      {/* Dropdown Panel */}
      {open && !disabled && (
        <ul className="absolute w-full bg-white border-2 border-green-300 rounded shadow mt-1 max-h-48 overflow-y-auto z-20 hover:ring hover:ring-green-300">
          {options.map((o) => (
            <li
              key={o.value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className="p-2 hover:bg-green-100 cursor-pointer"
            >
              {o.label}
            </li>
          ))}

          {options.length === 0 && (
            <li className="p-2 text-gray-400 text-sm">No options available</li>
          )}
        </ul>
      )}
    </div>
  );
}
