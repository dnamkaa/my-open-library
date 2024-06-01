// src/components/LandingPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEbooks, fetchOpenLibraryBooks } from '../services/api';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [localBooks, setLocalBooks] = useState([]);
  const [openLibraryBooks, setOpenLibraryBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const localBooksData = await fetchEbooks();
        setLocalBooks(localBooksData);

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
  };

  const filteredLocalBooks = localBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOpenLibraryBooks = openLibraryBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReadClick = (bookId, filename, externalUrl) => {
    if (externalUrl) {
      navigate('/external-read', { state: { iframeSrc: externalUrl } });
    } else if (filename) {
      navigate(`/local-read/${filename}`, { state: { iframeSrc: `/path/to/local/books/${filename}` } });
    } else {
      navigate(`/read/${bookId}`, { state: { iframeSrc: `/path/to/online/books/${bookId}` } });
    }
  };

  return (
    <div className="landing-page">
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
