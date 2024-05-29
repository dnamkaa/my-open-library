// src/components/LandingPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEbooks, fetchOpenLibraryBooks } from '../services/api';
import '../styles/LandingPage.css';
import logo from '../library.png';

const LandingPage = () => {
  const [localBooks, setLocalBooks] = useState([]);
  const [openLibraryBooks, setOpenLibraryBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch local books
        const localBooksData = await fetchEbooks();
        setLocalBooks(localBooksData);

        // Fetch Open Library books
        const openLibraryBooksData = await fetchOpenLibraryBooks();
        setOpenLibraryBooks(openLibraryBooksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add search logic here if needed (e.g., filter books based on searchTerm)
  };

  const filteredLocalBooks = localBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOpenLibraryBooks = openLibraryBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReadClick = (bookId, filename, externalUrl) => {
    if (externalUrl) {
      window.open(externalUrl, '_blank');
    } else if (filename) {
      navigate(`/local-read/${filename}`);
    } else {
      navigate(`/read/${bookId}`);
    }
  };

  return (
    <div className="landing-page">
      <header className="header">
      <div className="logo-heading">
      <img src={logo} alt="Logo" className="logo" />
        <h1>Welcome to Open Library</h1>
      </div>
        <div className="header-buttons">
          <button>Read Free Library Books Online</button>
          <button>Set a Yearly Reading Goal</button>
          <button>Keep Track of Your Favorite Books</button>
        </div>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for a book..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </header>
      <section className="book-section">
        <h2>Local Books</h2>
        <div className="book-list">
          {filteredLocalBooks.map((book) => (
            <div key={book.id} className="book-item">
              <img src={book.cover_url} alt={book.title} />
              <p>{book.title}</p>
              <button onClick={() => handleReadClick(book.id, book.filename, null)}>Read</button>
            </div>
          ))}
        </div>
      </section>
      <section className="book-section">
        <h2>Open Library Books</h2>
        <div className="book-list">
          {filteredOpenLibraryBooks.map((book) => (
            <div key={book.key} className="book-item">
              <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt={book.title} />
              <p>{book.title}</p>
              <button onClick={() => handleReadClick(book.key, null, `https://openlibrary.org${book.key}`)}>Read</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
