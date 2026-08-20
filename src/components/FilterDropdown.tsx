import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
}

export default function FilterDropdown({
  label,
  options,
  value,
  onChange,
  loading,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(option: string) {
    onChange(option);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative min-w-50 max-w-full">
      <button
        type="button"
        disabled={loading}
        onClick={() => setOpen((o) => !o)}
        className="relative w-full rounded px-3 py-2 border border-neutral-600 text-white text-left disabled:opacity-50 disabled:cursor-not-allowed"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
      >
        <span className="block truncate pr-6">
          {loading ? "Loading..." : value || label}
        </span>
        <FontAwesomeIcon 
          icon={faChevronDown}
          className={`fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-neutral-600 bg-neutral-800 py-1 shadow-lg"
        >
          <li
            role="option"
            aria-selected={value === ""}
            onClick={() => handleSelect("")}
            className="relative cursor-pointer select-none py-2 pl-9 pr-3 text-text-light hover:bg-neutral-700 hover:text-text-white"
          >
            {label}
          </li>

          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={value === option}
              onClick={() => handleSelect(option)}
              className="relative cursor-pointer select-none py-2 pl-9 pr-3 text-text-light hover:bg-neutral-700 hover:text-text-white"
            >
              <span
                className={`block truncate ${
                  value === option ? "font-medium text-primary" : ""
                }`}
              >
                {option}
              </span>
              {value === option && (
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-primary">
                  <FontAwesomeIcon 
                    icon={faCheck}
                    className="text-xs"
                    aria-hidden="true"
                  />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
