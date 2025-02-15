import React, { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, User, Video, X, MessageCircle, Sidebar } from "react-feather";
import { DUMMY_MEETINGS } from "../data/meetings";
import toast from "react-hot-toast";

const MeetingCard = ({ meeting, onCancel }) => {
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "google-meet":
        return <Video className="w-4 h-4 text-red-500" />;
      case "zoom":
        return <Video className="w-4 h-4 text-blue-500" />;
      case "slack":
        return <MessageCircle className="w-4 h-4 text-purple-500" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={meeting.attendee.avatar}
            alt={meeting.attendee.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-lg dark:text-white">
              {meeting.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {meeting.attendee.role}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
            meeting.status
          )}`}
        >
          {meeting.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <Calendar className="w-4 h-4" />
          <span>{meeting.date}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4" />
          <span>
            {meeting.time} ({meeting.duration} min)
          </span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          {getPlatformIcon(meeting.platform)}
          <span className="capitalize">{meeting.platform}</span>
        </div>
      </div>

      {meeting.status === "upcoming" && (
        <div className="mt-6 flex space-x-3">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
            <Video className="w-4 h-4 mr-2" />
            Join Meeting
          </button>
          <button
            onClick={() => onCancel(meeting.id)}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
        </div>
      )}
    </motion.div>
  );
};

const Meetings = () => {
  const [meetings, setMeetings] = useState(DUMMY_MEETINGS);
  const [filter, setFilter] = useState("upcoming");
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleCancelMeeting = (meetingId) => {
    setMeetings((prevMeetings) =>
      prevMeetings.map((meeting) =>
        meeting.id === meetingId ? { ...meeting, status: "cancelled" } : meeting
      )
    );
    toast.success("Meeting cancelled successfully");
  };

  const filteredMeetings = useMemo(() => {
    return meetings.filter((meeting) => meeting.status === filter);
  }, [meetings, filter]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
    <Sidebar
      isOpen={isSidebarOpen}
      toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
    />

    <main
      className={`flex-1 overflow-y-auto transition-all duration-300 ${
        isSidebarOpen ? "ml-64" : "ml-20"
      }`}
    >
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl font-bold dark:text-white mb-4 sm:mb-0">
              My Meetings
            </h1>
            <div className="flex space-x-2">
              {["upcoming", "completed", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === status
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredMeetings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">
                  No {filter} meetings found
                </h3>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredMeetings.map((meeting) => (
                  <MeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    onCancel={handleCancelMeeting}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
    </main>
    </div>
  );
};

export default Meetings;
