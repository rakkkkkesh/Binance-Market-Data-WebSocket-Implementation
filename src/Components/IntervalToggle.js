import React from 'react';

const IntervalToggle = ({ selectedInterval, onIntervalChange, intervals }) => {
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="interval" className="text-lg">Select Interval:</label>
      <select
        id="interval"
        value={selectedInterval}
        onChange={(e) => onIntervalChange(e.target.value)}
        className="bg-gray-700 text-white p-2 rounded shadow-lg transition-all hover:scale-105"
      >
        {intervals.map((interval) => (
          <option key={interval} value={interval}>
            {interval}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IntervalToggle;
