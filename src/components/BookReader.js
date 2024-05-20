// src/components/BookReader.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookContent } from '../services/api';
import '../styles/BookReader.css';

const BookReader = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    const getBookContent = async () => {
      const content = await fetchBookContent(id);
      setContent(content);
    };
    getBookContent();
  }, [id]);

  return (
    <div className="book-reader">
      <h1>Book Reader</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};

export default BookReader;
