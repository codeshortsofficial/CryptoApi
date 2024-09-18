import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const CryptoList = ({ onSelectCrypto }) => {
  const [cryptoList, setCryptoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10); // Default limit
  const [error, setError] = useState(null);

  // Fetch the crypto list from the backend API
  const fetchCryptoList = async (limit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/crypto-list?limit=${limit}`);
      const data = Object.values(response.data.data); // Convert object to array
      setCryptoList(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching cryptocurrency list');
      setLoading(false);
    }
  };

  

  // Use debounce to limit the number of API calls
  const debouncedFetchCryptoList = useCallback(debounce(fetchCryptoList, 300), []);

  useEffect(() => {
    debouncedFetchCryptoList(limit);
  }, [limit, debouncedFetchCryptoList]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  if (loading) {
    return <div>Loading list...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }



  return (
    <div>
      <h2>Cryptocurrency List</h2>
      <div>
        <label htmlFor="limit">Number of cryptocurrencies:</label>
        <input
          id="limit"
          type="number"
          min="10" 
          value={limit}
          onChange={handleLimitChange}
        />
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Market Cap (USD)</th>
            <th>Percent Change (1h)</th>
            <th>Percent Change (24h)</th>
            <th>Percent Change (7d)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoList.map((crypto) => (
            <tr key={crypto.id} onClick={() => onSelectCrypto(crypto.id)}>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
              <td>{crypto.quotes.USD.price.toFixed(2)}</td>
              <td>{crypto.quotes.USD.market_cap.toLocaleString()}</td>
              <td>{parseInt(crypto.quotes.USD.percentage_change_1h).toFixed(2)}%</td>
              <td>{parseInt(crypto.quotes.USD.percent_change_24h).toFixed(2)}%</td>
              <td>{parseInt(crypto.quotes.USD.percentage_change_7d).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
