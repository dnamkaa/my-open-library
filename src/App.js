// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BookDetails from './components/BookDetails';
import BookReader from './components/BookReader';
import UploadBook from './components/UploadBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/read/:id" element={<BookReader />} />
        <Route path="/upload" element={<UploadBook />} />
      </Routes>
    </Router>
  );
}

export default App;
