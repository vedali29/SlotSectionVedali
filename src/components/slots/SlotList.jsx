import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SlotList = ({ slots, updateSlot, deleteSlot, copyAvailability }) => {
  const groupSlotsByDate = () => {
    return slots.reduce((acc, slot) => {
      const date = slot.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(slot);
      return acc;
    }, {});
  };

  const groupedSlots = groupSlotsByDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8"
    >
      <h2 className="text-xl font-bold mb-4">Your Slots</h2>
      <div className="space-y-6">
        <AnimatePresence>
          {Object.entries(groupedSlots).map(([date, dateSlots]) => (
            <motion.div
              key={date}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{date}</h3>
                <button
                  onClick={() => copyAvailability(date)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Copy Day
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dateSlots.map((slot) => (
                  <motion.div
                    key={slot.id}
                    className="p-4 border rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p>Time: {slot.time}</p>
                    <p>Timezone: {slot.timezone}</p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => deleteSlot(slot.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SlotList;
