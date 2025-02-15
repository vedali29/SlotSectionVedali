import React from 'react';

const TimezoneSelector = ({ timezone, setTimezone }) => {
  return (
    <div className="mb-6 animate-fade-in">
      <label className="block text-sm font-medium mb-2">Timezone</label>
      <select
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
      >
        <option value="UTC">UTC</option>
        <option value="PST">PST</option>
        <option value="EST">EST</option>
      </select>
    </div>
  );
};

export default TimezoneSelector;