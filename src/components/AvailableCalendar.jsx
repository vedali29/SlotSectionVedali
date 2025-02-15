import React from 'react';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Edit, Trash2, Video, MessageCircle, Phone } from 'react-feather';

const AvailabilityCalendar = ({
  slots,
  selectedDate,
  onDateChange,
  onCopyDay,
  onCreateSlot,
  onUpdateSlot,
  onDeleteSlot,
  userTimezone,
}) => {
  const events = slots.map(slot => ({
    id: slot.id,
    title: slot.platform,
    start: `${slot.date}T${slot.startTime}`,
    end: `${slot.date}T${slot.endTime}`,
    backgroundColor: getEventColor(slot.platform),
    borderColor: getEventColor(slot.platform),
    extendedProps: { ...slot }
  }));

  function getEventColor(platform) {
    const colors = {
      'google-meet': '#4285F4',
      'zoom': '#2D8CFF',
      'slack': '#4A154B',
      'default': '#6366F1'
    };
    return colors[platform] || colors.default;
  }

  function getPlatformIcon(platform) {
    const icons = {
      'google-meet': <Video className="w-4 h-4 mr-2" />,
      'zoom': <Video className="w-4 h-4 mr-2" />,
      'slack': <MessageCircle className="w-4 h-4 mr-2" />,
      'default': <Phone className="w-4 h-4 mr-2" />
    };
    return icons[platform] || icons.default;
  }

  

  const handleEventDelete = (event) => {
    if (window.confirm('Delete this availability slot?')) {
      onDeleteSlot(event.id);
    }
  };

  const handleSelect = (selectInfo) => {
    const title = prompt('Enter meeting platform (google-meet, zoom, slack):');
  if (title) {
    const newSlot = {
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    };
    onCreateSlot(newSlot);
    selectInfo.view.calendar.unselect();
  }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
      >
        <Calendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'timeGridWeek,timeGridDay copyDay'
          }}
          customButtons={{
            copyDay: {
              text: 'Copy Day',
              click: () => onCopyDay(selectedDate)
            }
          }}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          height="600px"
          eventMinHeight={20} 
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          nowIndicator={true}
          datesSet={({ start }) => onDateChange(start)}
          eventClick={(info) => onUpdateSlot(info.event.id)}
          select={handleSelect}
          eventDrop={(info) => onUpdateSlot(info.event.id, info.event.start, info.event.end)}
          eventResize={(info) => onUpdateSlot(info.event.id, info.event.start, info.event.end)}
          eventContent={(eventInfo) => (
            <div className="p-2 flex items-center justify-between">
              <div className="flex items-center">
                {getPlatformIcon(eventInfo.event.title)}
                <div>
                  <div className="font-semibold text-white text-sm">
                    {eventInfo.timeText}
                  </div>
                  <div className="text-xs text-white opacity-75">
                    {eventInfo.event.extendedProps.timezone}
                  </div>
                </div>
              </div>
              {selectedDate.toDateString() === new Date(eventInfo.event.start).toDateString() && (
                <div className="flex space-x-1">
                  <button onClick={(e) => {
                    e.stopPropagation();
                    onUpdateSlot(eventInfo.event.id);
                  }} className="p-1 bg-white/20 rounded">
                    <Edit className="w-3 h-3 text-white" />
                  </button>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSlot(eventInfo.event.id);
                  }} className="p-1 bg-white/20 rounded">
                    <Trash2 className="w-3 h-3 text-white" />
                  </button>
                </div>
              )}
            </div>
          )}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
          }}
          eventClassNames="cursor-pointer hover:opacity-90 transition-opacity"
          className="fc-theme-standard dark:fc-theme-dark"
        />
        
        {/* Timezone Indicator */}
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Timezone: {userTimezone}
        </div>
      </motion.div>

      {/* Sidebar with Slots */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {selectedDate.toLocaleDateString()}
          </h2>
          <button
            onClick={() => onCopyDay(selectedDate)}
            className="flex items-center space-x-2 text-indigo-500 hover:text-indigo-600"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence>
          {slots.filter(slot => 
            new Date(slot.date).toDateString() === selectedDate.toDateString()
          ).map(slot => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 mb-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {getPlatformIcon(slot.platform)}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {slot.startTime} - {slot.endTime}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {slot.platform}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onUpdateSlot(slot.id)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                  >
                    <Edit className="w-4 h-4 text-indigo-500" />
                  </button>
                  <button
                    onClick={() => handleEventDelete(slot.id)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AvailabilityCalendar;