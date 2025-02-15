import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TimezoneSelector from '../common/TimezoneSelector';

const SlotForm = ({ addSlot, timezone, setTimezone }) => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [repeatDays, setRepeatDays] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const slotData = {
      time,
      date,
      timezone,
      recurring,
      repeatDays: recurring ? repeatDays : []
    };
    addSlot(slotData);
    setTime('');
    setDate('');
    setRecurring(false);
    setRepeatDays([]);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>
        <TimezoneSelector timezone={timezone} setTimezone={setTimezone} />
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              className="form-checkbox"
            />
            <span>Make this slot recurring</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add Slot
      </button>
    </motion.form>
  );
};

export default SlotForm;
