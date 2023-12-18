// src/components/CryptoPriceDisplay.js
import React, { useState, useEffect } from 'react';
import { getCryptoPrices } from '../utils/cryptoUtils';

const CryptoPriceDisplay = () => {
  const [cryptoPrices, setCryptoPrices] = useState({});

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      const prices = await getCryptoPrices(['ethereum', 'bitcoin', 'litecoin']);
      setCryptoPrices(prices);
    };

    fetchCryptoPrices();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Cryptocurrency</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(cryptoPrices).map(([key, value]) => (
            <tr key={key}>
              <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
              <td>${value.usd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoPriceDisplay;
