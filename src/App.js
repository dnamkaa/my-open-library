// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EbookReader from './components/EbookReader';
import LocalEbookReader from './components/LocalEbookReader';
import UploadForm from './components/UploadForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/read/:id" element={<EbookReader />} />
        <Route path="/local-read/:filename" element={<LocalEbookReader />} />
        <Route path="/upload" element={<UploadForm />} />
      </Routes>
    </Router>
  );
};

export default App;
