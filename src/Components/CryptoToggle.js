import React from 'react';

const CryptoToggle = ({ selectedSymbol, onSymbolChange, symbols }) => {
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="symbol" className="text-lg">Select Coin:</label>
      <select
        id="symbol"
        value={selectedSymbol}
        onChange={(e) => onSymbolChange(e.target.value)}
        className="bg-gray-700 text-white p-2 rounded shadow-lg transition-all hover:scale-105"
      >
        {symbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CryptoToggle;
