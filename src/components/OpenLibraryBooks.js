import React, { useEffect, useState } from 'react';
import { fetchOpenLibraryBooks } from '../services/api';
import { useNavigate } from 'react-router-dom';

const OpenLibraryBooks = () => {
  const [classicBooks, setClassicBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const classics = await fetchOpenLibraryBooks();
        setClassicBooks(classics);
      } catch (error) {
        console.error('Error fetching classic books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleReadClick = (bookKey) => {
    navigate(`/read/${bookKey}`);
  };

  return (
    <div className="open-library-books">
      <h2>Classic Books</h2>
      <div className="book-list">
        {classicBooks.map((book) => (
          <div key={book.key} className="book-item">
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
              alt={book.title}
            />
            <p>{book.title}</p>
            <button onClick={() => handleReadClick(book.key)}>Read</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenLibraryBooks;
