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
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
      className="min-w-50 max-w-full rounded px-3 py-2 border"
      aria-label={label}
    >
      <option value="">{loading ? "Loading..." : label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
