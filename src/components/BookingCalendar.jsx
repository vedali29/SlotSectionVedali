import React, { useMemo } from 'react';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion } from 'framer-motion';
import { Clock, Video, MessageCircle, ZoomIn } from 'react-feather';

const BookingCalendar = ({
  availableSlots,
  onDateSelect,
  onSlotSelect,
  selectedTimezone
}) => {
  const calendarEvents = useMemo(() => {
    return availableSlots.map(slot => ({
      id: slot.id,
      title: `${slot.user} - ${slot.platform}`,
      start: `${slot.date}T${slot.startTime}`,
      end: `${slot.date}T${slot.endTime}`,
      backgroundColor: getPlatformColor(slot.platform),
      extendedProps: { ...slot }
    }));
  }, [availableSlots]);

  function getPlatformColor(platform) {
    return {
      'google-meet': '#EA4335',
      'zoom': '#2D8CFF',
      'slack': '#4A154B'
    }[platform] || '#6366F1';
  }

  function getPlatformIcon(platform) {
    return {
      'google-meet': <Video className="w-4 h-4" />,
      'zoom': <ZoomIn className="w-4 h-4" />,
      'slack': <MessageCircle className="w-4 h-4" />
    }[platform] || <Clock className="w-4 h-4" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
    >
      <Calendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        }}
        events={calendarEvents}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        height="700px"
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        allDaySlot={false}
        nowIndicator={true}
        datesSet={({ start }) => onDateSelect(start)}
        eventClick={({ event }) => onSlotSelect(event.extendedProps)}
        eventContent={(eventInfo) => (
          <div className="p-2 flex items-center space-x-2">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                {getPlatformIcon(eventInfo.event.extendedProps.platform)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white truncate">
                {eventInfo.event.extendedProps.user}
              </div>
              <div className="text-xs text-white/80">
                {eventInfo.timeText}
              </div>
            </div>
          </div>
        )}
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        }}
        eventClassNames="cursor-pointer hover:opacity-90 transition-opacity rounded-lg"
        className="booking-calendar"
      />

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>Timezone: {selectedTimezone}</span>
        </div>
        <div className="flex items-center space-x-4">
          {['google-meet', 'zoom', 'slack'].map(platform => (
            <div key={platform} className="flex items-center space-x-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getPlatformColor(platform) }}
              />
              <span className="capitalize">{platform}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCalendar;
