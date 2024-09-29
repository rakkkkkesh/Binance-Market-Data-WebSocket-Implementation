import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import ChartComponent from './Components/ChartComponent';
import SymbolToggle from './Components/CryptoToggle';
import IntervalToggle from './Components/IntervalToggle';

const symbols = ['ethusdt', 'bnbusdt', 'dotusdt'];
const intervals = ['1m', '3m', '5m'];

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('ethusdt');
  const [selectedInterval, setSelectedInterval] = useState('1m');
  const [priceData, setPriceData] = useState({}); // Store price data for each symbol

  // Setup WebSocket connection
  const { lastJsonMessage } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${selectedSymbol}@kline_${selectedInterval}`,
    {
      shouldReconnect: () => true,
    }
  );

  // Use effect to process the last received JSON message
  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.k) {
      const candlestick = lastJsonMessage.k;

      // Update the state with the new candlestick data
      setPriceData((prevData) => ({
        ...prevData,
        [selectedSymbol]: [
          ...(prevData[selectedSymbol] || []),
          {
            x: new Date(candlestick.t),
            o: parseFloat(candlestick.o),
            h: parseFloat(candlestick.h),
            l: parseFloat(candlestick.l),
            c: parseFloat(candlestick.c),
          },
        ],
      }));
    }
  }, [lastJsonMessage, selectedSymbol]);

  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol);
  };

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };

  return (
    <div className="h-screen w-screen bg-gray-900 text-white p-6">
      <div className="h-full max-w-8xl mx-auto shadow-lg rounded-lg p-6 bg-gray-800">
      <div className="flex items-center justify-center mb-6">
          <img 
            src="/Images/Logo.jpg" 
            alt="Logo" 
            className="w-10 h-10 mr-4"
          />
          <h1 className="text-3xl font-bold">Binance Market Data WebSocket</h1>
        </div>
        <div className="flex justify-center items-center mb-4 space-x-6">
          <SymbolToggle
            selectedSymbol={selectedSymbol}
            onSymbolChange={handleSymbolChange}
            symbols={symbols}
          />
          <IntervalToggle
            selectedInterval={selectedInterval}
            onIntervalChange={handleIntervalChange}
            intervals={intervals}
          />
        </div>

        <ChartComponent priceData={priceData[selectedSymbol] || []} selectedSymbol={selectedSymbol} />
      </div>
    </div>
  );
};

export default App;
