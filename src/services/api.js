// src/services/api.js
import axios from 'axios';

const API_URL = 'https://openlibrary.org';

export const fetchBooks = async (category) => {
  try {
    const response = await fetch(`${API_URL}/subjects/${category}.json?limit=10`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.works || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};


export const fetchBookDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/works/${id}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
  }
};

export const fetchBookContent = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/works/${id}.json`);
    return response.data.content; // Adjust based on actual API response structure
  } catch (error) {
    console.error('Error fetching book content:', error);
  }
};
