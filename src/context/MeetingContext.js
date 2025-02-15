import React, { createContext, useContext, useState } from 'react';
import { initialMeetings } from '../data/meetings';
import toast from 'react-hot-toast';

const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
  const [meetings, setMeetings] = useState(initialMeetings);

  const addMeeting = (newMeeting) => {
    // Add validation for overlapping meetings
    const isOverlapping = meetings.some(meeting => {
      return meeting.date === newMeeting.date &&
        meeting.user === newMeeting.user &&
        ((meeting.startTime <= newMeeting.startTime && newMeeting.startTime <= meeting.endTime) ||
        (meeting.startTime <= newMeeting.endTime && newMeeting.endTime <= meeting.endTime));
    });

    if (isOverlapping) {
      toast.error('This time slot is already booked');
      return false;
    }

    setMeetings(prev => [...prev, newMeeting]);
    return true;
  };

  const updateMeeting = (id, updatedData) => {
    setMeetings(prev => 
      prev.map(meeting => 
        meeting.id === id ? { ...meeting, ...updatedData } : meeting
      )
    );
  };

  const deleteMeeting = (id) => {
    setMeetings(prev => prev.filter(meeting => meeting.id !== id));
  };

  return (
    <MeetingContext.Provider value={{ 
      meetings, 
      addMeeting, 
      updateMeeting, 
      deleteMeeting 
    }}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetings = () => useContext(MeetingContext);
