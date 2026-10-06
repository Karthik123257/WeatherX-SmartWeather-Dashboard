import { useState } from "react";

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = query.trim();

    if (!value || loading) return;

    onSearch(value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search any city..."
        aria-label="Search for a city"
        autoComplete="off"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading" : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
