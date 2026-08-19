import { useState } from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export default function SearchInput({
  onSearch,
  initialValue = "",
  placeholder = "Search for meals...",
}: SearchInputProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-l min-w-75 px-3 py-2 border border-r-0"
        aria-label="Search meals"
      />
      <button type="submit" className="bg-primary text-text-white px-4 rounded-r">
        Search
      </button>
    </form>
  );
}
