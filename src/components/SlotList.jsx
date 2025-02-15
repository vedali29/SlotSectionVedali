import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Edit, Trash2 } from "react-feather";

const SlotList = ({ slots, onDelete, onUpdate, onCopy, timezone }) => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [editingSlot, setEditingSlot] = useState(null);

  const filteredSlots = slots.filter((slot) => {
    const slotDate = new Date(slot.date);
    const today = new Date();

    switch (filter) {
      case "today":
        return slotDate.toDateString() === today.toDateString();
      case "upcoming":
        return slotDate > today;
      default:
        return true;
    }
  });

  const sortedSlots = [...filteredSlots].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date) - new Date(b.date);
    }
    return a.startTime.localeCompare(b.startTime);
  });

  const handleUpdate = (slotId, updatedSlot) => {
    onUpdate(slotId, updatedSlot);
    setEditingSlot(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Slots</option>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
          >
            <option value="date">Sort by Date</option>
            <option value="time">Sort by Time</option>
          </select>
        </div>
      </div>

      <motion.div layout className="space-y-4">
        <AnimatePresence>
          {sortedSlots.map((slot) => (
            <motion.div
              key={slot.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              {editingSlot?.id === slot.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={editingSlot.startTime}
                        onChange={(e) =>
                          setEditingSlot((prev) => ({
                            ...prev,
                            startTime: e.target.value
                          }))
                        }
                        className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={editingSlot.endTime}
                        onChange={(e) =>
                          setEditingSlot((prev) => ({
                            ...prev,
                            endTime: e.target.value
                          }))
                        }
                        className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Timezone
                    </label>
                    <select
                      value={editingSlot.timezone}
                      onChange={(e) =>
                        setEditingSlot((prev) => ({
                          ...prev,
                          timezone: e.target.value
                        }))
                      }
                      className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    >
                      {Intl.supportedValuesOf("timeZone").map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(slot.id, editingSlot)}
                      className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingSlot(null)}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(slot.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {slot.startTime} - {slot.endTime}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {slot.platform} • {slot.timezone}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => onCopy(new Date(slot.date))}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                      title="Copy slot"
                    >
                      <Copy className="w-4 h-4 text-indigo-500" />
                    </button>
                    <button
                      onClick={() => setEditingSlot(slot)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                      title="Edit slot"
                    >
                      <Edit className="w-4 h-4 text-indigo-500" />
                    </button>
                    <button
                      onClick={() => onDelete(slot.id)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                      title="Delete slot"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SlotList;