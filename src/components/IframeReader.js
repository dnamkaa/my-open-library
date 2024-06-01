// src/components/IframeReader.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/IframeReader.css';

const IframeReader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const iframeSrc = location.state?.iframeSrc || '';

  return (
    <div className="iframe-reader">
      <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
      <iframe src={iframeSrc} title="Book Reader" width="100%" height="100%" frameBorder="0"></iframe>
    </div>
  );
};

export default IframeReader;
