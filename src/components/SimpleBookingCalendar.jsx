import React from 'react';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';

const SimpleBookingCalendar = ({ selectedDate, onChange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="calendar-wrapper"
    >
      <Calendar
        onChange={onChange}
        value={selectedDate}
        className="custom-calendar"
        tileClassName={({ date }) => {
          return 'calendar-tile';
        }}
      />
    </motion.div>
  );
};

export default SimpleBookingCalendar;
