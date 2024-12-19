"use client";
import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";

const Home = () => {
  const [books, setBooks] = useState([]);

  const handleSearch = (query) => {
    axios
      .get(`http://localhost:8000/search/?query=${encodeURIComponent(query)}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Book Summary Search Engine</h1>
      <SearchBar onSearch={handleSearch} />
      <BookList books={books} />
    </div>
  );
};

export default Home;
