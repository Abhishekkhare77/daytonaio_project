"use client";
import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (query) => {
    setLoading(true);
    setError("");
    axios
      .get(`http://localhost:8000/search/?query=${encodeURIComponent(query)}`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching search results.");
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h1>Book Summary Search Engine</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <BookList books={books} />
      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        h1 {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;
