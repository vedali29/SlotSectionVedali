import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Clock,
  User,
  Video,
  MessageCircle,
  PlusCircle,
  X,
  Users,
  Sidebar
} from "react-feather";

import TimezoneSelect from "react-timezone-select";
import { useMeetings } from "../context/MeetingContext";
import { toast } from "react-hot-toast";
import { availableUsers, initialMeetings } from "../data/meetings";
import SimpleBookingCalendar from "../components/SimpleBookingCalendar";

const OtherBookings = () => {
  const { meetings, addMeeting } = useMeetings();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    startTime: "",
    endTime: "",
    platform: "google-meet",
    link: ""
  });

  // Animation configurations
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.2 }
  };

  // Filtered data
  const filteredUsers = useMemo(() => {
    return availableUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredSlots = useMemo(() => {
    return [...meetings, ...initialMeetings].filter((slot) => {
      const matchesSearch = slot.user
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const slotDate = new Date(slot.date);
      const matchesDate =
        slotDate.toDateString() === selectedDate.toDateString();
      return matchesSearch && matchesDate;
    });
  }, [meetings, searchTerm, selectedDate]);

  // Validation and meeting handling
  // const validateMeetingTime = (startTime, endTime) => {
  //   const [startHours, startMinutes] = startTime.split(":").map(Number);
  //   const [endHours, endMinutes] = endTime.split(":").map(Number);
  //   return (
  //     endHours > startHours ||
  //     (endHours === startHours && endMinutes > startMinutes)
  //   );
  // };

  const handleAddMeeting = () => {
    if (!newMeeting.title) {
      toast.error("Please enter a meeting title");
      return;
    }

    const meetingData = {
      ...newMeeting,
      id: `meeting-${Date.now()}`,
      date: selectedDate.toISOString().split("T")[0],
      timezone: selectedTimezone,
      user: selectedSlot?.user || "Unknown User",
      attendees: [selectedSlot?.user],
      status: "scheduled"
    };

    const success = addMeeting(meetingData);

    if (success) {
      toast.success("Meeting scheduled successfully");
      setIsModalOpen(false);
      setNewMeeting({
        title: "",
        startTime: "",
        endTime: "",
        platform: "google-meet",
        link: ""
      });
    }
  };

  // const handleDateSelect = (date) => {
  //   setSelectedDate(date);
  // };

  // const handleSlotSelect = (slot) => {
  //   setSelectedSlot(slot);
  //   setIsModalOpen(true);
  // };

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
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Panel */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                {...fadeInUp}
              >
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Select Date</h3>
                  <SimpleBookingCalendar
                  className="w-full"
                    selectedDate={selectedDate}
                    onChange={setSelectedDate}
                  />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Timezone</h3>
                  <TimezoneSelect
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                    className="w-full rounded-lg dark:bg-gray-700"
                  />
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Available Slots Section */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                {...fadeInUp}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold dark:text-white">
                    Available Slots
                  </h2>
                  <span className="text-gray-500 dark:text-gray-400">
                    {filteredSlots.length} slots found
                  </span>
                </div>

                <AnimatePresence>
                  {filteredSlots.length === 0 ? (
                    <motion.div
                      {...fadeInUp}
                      className="flex flex-col items-center justify-center py-12"
                    >
                      <Users className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 text-lg">
                        No available slots for selected date
                      </p>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredSlots.map((slot) => (
                        <motion.div
                          key={slot.id}
                          {...fadeInUp}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                  <h3 className="font-semibold dark:text-white">
                                    {slot.user}
                                  </h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(slot.date).toLocaleDateString()} •{" "}
                                    {slot.timezone}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center text-gray-600 dark:text-gray-300">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {slot.startTime} - {slot.endTime}
                                </div>
                                <div className="flex items-center">
                                  {slot.platform === "google-meet" && (
                                    <Video className="w-4 h-4 text-red-500" />
                                  )}
                                  {slot.platform === "zoom" && (
                                    <Video className="w-4 h-4 text-blue-500" />
                                  )}
                                  {slot.platform === "slack" && (
                                    <MessageCircle className="w-4 h-4 text-purple-500" />
                                  )}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedSlot(slot);
                                setIsModalOpen(true);
                              }}
                              className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
                            >
                              <PlusCircle className="w-4 h-4" />
                              <span>Schedule</span>
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* User Availability Section */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                {...fadeInUp}
              >
                <h2 className="text-2xl font-bold dark:text-white mb-6">
                  Team Availability
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      {...fadeInUp}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg dark:text-white">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.role}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {user.availableSlots.map((slot) => {
                          const [startTime, endTime] = slot.time.split(" - ");
                          return (
                            <div
                              key={slot.id}
                              className="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded"
                            >
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">{slot.time}</span>
                                {slot.platform === "google-meet" && (
                                  <Video className="w-4 h-4 text-red-500" />
                                )}
                                {slot.platform === "zoom" && (
                                  <Video className="w-4 h-4 text-blue-500" />
                                )}
                                {slot.platform === "slack" && (
                                  <MessageCircle className="w-4 h-4 text-purple-500" />
                                )}
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedSlot({
                                    user: user.name,
                                    startTime,
                                    endTime,
                                    platform: slot.platform,
                                    date: selectedDate
                                      .toISOString()
                                      .split("T")[0]
                                  });
                                  setIsModalOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                              >
                                <PlusCircle className="w-5 h-5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Schedule Meeting Modal */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold dark:text-white">
                      Schedule with {selectedSlot?.user}
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={newMeeting.startTime}
                          onChange={(e) =>
                            setNewMeeting((prev) => ({
                              ...prev,
                              startTime: e.target.value
                            }))
                          }
                          className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={newMeeting.endTime}
                          onChange={(e) =>
                            setNewMeeting((prev) => ({
                              ...prev,
                              endTime: e.target.value
                            }))
                          }
                          className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Meeting Platform
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["google-meet", "zoom", "slack"].map((platform) => (
                          <button
                            key={platform}
                            onClick={() =>
                              setNewMeeting((prev) => ({
                                ...prev,
                                platform
                              }))
                            }
                            className={`p-3 rounded-lg flex flex-col items-center transition-colors ${
                              newMeeting.platform === platform
                                ? "bg-indigo-100 dark:bg-indigo-900"
                                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}
                          >
                            {platform === "google-meet" && (
                              <Video className="w-5 h-5 text-indigo-500" />
                            )}
                            {platform === "zoom" && (
                              <Video className="w-5 h-5 text-indigo-500" />
                            )}
                            {platform === "slack" && (
                              <MessageCircle className="w-5 h-5 text-indigo-500" />
                            )}
                            <span className="text-sm capitalize mt-1">
                              {platform}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                        Meeting Title
                      </label>
                      <input
                        type="text"
                        value={newMeeting.title}
                        onChange={(e) =>
                          setNewMeeting((prev) => ({
                            ...prev,
                            title: e.target.value
                          }))
                        }
                        className="w-full p-2 border rounded-lg dark:bg-gray-700"
                        placeholder="Enter meeting title"
                      />
                    </div>

                    <button
                      onClick={handleAddMeeting}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Confirm Meeting
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default OtherBookings;
