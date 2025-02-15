import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TimezoneSelector from './TimezoneSelector';

const AvailableSlots = ({ slots, userTimezone, onBookSlot }) => {
  const [selectedTimezone, setSelectedTimezone] = useState(userTimezone);
  const [selectedDate, setSelectedDate] = useState('');

  const filteredSlots = slots.filter(slot => 
    !selectedDate || slot.date === selectedDate
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TimezoneSelector 
            timezone={selectedTimezone} 
            setTimezone={setSelectedTimezone} 
          />
          <div>
            <label className="block text-sm font-medium mb-2">Filter by Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredSlots.map((slot) => (
            <motion.div
              key={slot.id}
              className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-semibold">Date: {slot.date}</p>
              <p>Time: {slot.time}</p>
              <p>Timezone: {selectedTimezone}</p>
              <button
                onClick={() => onBookSlot(slot.id)}
                className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Book Slot
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AvailableSlots;
