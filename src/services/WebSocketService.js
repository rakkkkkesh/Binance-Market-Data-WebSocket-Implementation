import useWebSocket from 'react-use-websocket';

const useCryptoWebSocket = (selectedSymbol, selectedInterval, setPriceData) => {
  return useWebSocket(
    `wss://stream.binance.com:9443/ws/${selectedSymbol}@kline_${selectedInterval}`,
    {
      onMessage: (message) => {
        const data = JSON.parse(message.data);
        const candlestick = data.k;
        setPriceData((prevData) => [
          ...prevData,
          {
            x: new Date(candlestick.t),
            o: parseFloat(candlestick.o),
            h: parseFloat(candlestick.h),
            l: parseFloat(candlestick.l),
            c: parseFloat(candlestick.c),
          },
        ]);
      },
      shouldReconnect: () => true,
    }
  );
};

export default useCryptoWebSocket;
