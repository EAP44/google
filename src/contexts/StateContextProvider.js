import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const StateContext = createContext();
const baseUrl = 'https://google-search74.p.rapidapi.com';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async () => {
    setLoading(true);

    const options = {
      method: 'GET',
      url: baseUrl,
      params: {
        query: searchTerm,
        limit: '10',
        related_keywords: 'true'
      },
      headers: {
        'X-RapidAPI-Key': 'f874d0a201mshfb0ce78a0ed7d66p145d33jsn6f5e4b21cd0b',
        'X-RapidAPI-Host': 'google-search74.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
