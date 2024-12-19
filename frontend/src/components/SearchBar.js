"use client";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title, author, or keywords..."
        required
      />
      <button type="submit">Search</button>
      <style jsx>{`
        .search-bar {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        input {
          width: 60%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px 0 0 4px;
          outline: none;
        }
        button {
          padding: 10px 20px;
          border: none;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
          border-radius: 0 4px 4px 0;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </form>
  );
};

export default SearchBar;
