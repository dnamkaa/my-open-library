// src/components/UploadBook.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UploadBook.css';

const UploadBook = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Book Title" />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadBook;
