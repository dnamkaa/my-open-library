// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EbookReader from './components/EbookReader';
import LocalEbookReader from './components/LocalEbookReader';
import UploadForm from './components/UploadForm';

import IframeReader from './components/IframeReader';
import Header from './components/Header';


const App = () => {
  return (
    <Router>
      <div>
        <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/read/:id" element={<EbookReader />} />
        <Route path="/local-read/:filename" element={<LocalEbookReader />} />
        <Route path="/upload" element={<UploadForm />} />

        <Route path="/read/:bookId" element={<IframeReader />} />
        <Route path="/local-read/:filename" element={<IframeReader />} />
        <Route path="/external-read" element={<IframeReader />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
