// src/components/LandingPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../services/api';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [query, setQuery] = useState('');
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFeaturedBooks = async () => {
      const books = await fetchBooks('trending');
      setFeaturedBooks(books.slice(0, 6));
    };
    getFeaturedBooks();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <h1 className="title">Welcome to Open Library</h1>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search for books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary search-button">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </header>
      <main className="main-content">
        <div className="container">
          <h2>Trending Books</h2>
          <div className="book-list">
            {featuredBooks.map((book) => (
              <div className="book-item" key={book.key}>
                <img
                  src={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                      : 'https://via.placeholder.com/150'
                  }
                  alt={book.title}
                />
                {/* <p>{book.title}</p> */}
                {/* <p>{book.author_name && book.author_name.join(', ')}</p> */}
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/read/${book.key}`)}
                >
                  Preview Only
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
