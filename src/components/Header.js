// Header.js
import '../styles/Header.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../library.png';
import image from '../image.png';

const Header = () => {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <button className="home-button" onClick={handleHomeButtonClick}>
        <img src={image} alt="Home" />
        <b>Home</b>
      </button>
      <div className="logo-heading">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Welcome to FPC Mwanga Digital Library</h1>
      </div>
      
    </header>
  );
};

export default Header;
