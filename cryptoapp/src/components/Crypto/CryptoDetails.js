// CryptoDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoDetails = ({ selectedCryptoId }) => {
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch crypto details from your Express server
  const fetchCryptoDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/crypto-details/${id}`);
      setCryptoDetails(response.data.data[id]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cryptocurrency details', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCryptoId) {
      fetchCryptoDetails(selectedCryptoId);
    }
  }, [selectedCryptoId]);

  if (loading) {
    return <div>Loading details...</div>;
  }

  if (!cryptoDetails) {
    return <div>No details to display.</div>;
  }

  return (
    <div>
      <h2>{cryptoDetails.name} ({cryptoDetails.symbol})</h2>
      <p>Price (USD): {cryptoDetails.quotes.USD.price}</p>
      <p>Market Cap (USD): {cryptoDetails.quotes.USD.market_cap}</p>
      <p>24h Volume (USD): {cryptoDetails.quotes.USD.volume_24h}</p>
      <p>Percent Change (24h): {cryptoDetails.quotes.USD.percent_change_24h}%</p>
    </div>
  );
};

export default CryptoDetails;
