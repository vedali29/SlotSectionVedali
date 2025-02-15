import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Bell,
  Video,
  MessageCircle,
  X,
  PlusCircle,
  Slack,
  User,
  Calendar
} from "react-feather";
import Sidebar from "../components/common/Sidebar";
import AvailabilityCalendar from "../components/AvailableCalendar";
import UserProfile from "../components/UserProfile";
import SlotList from "../components/SlotList";

const Dashboard = ({ username, slots: initialSlots, addSlot }) => {
  const [isNewSlotModalOpen, setIsNewSlotModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("google-meet");
  const [meetingLink] = useState("");
  const [selectedView, setSelectedView] = useState("calendar");
  const [userTimezone, setUserTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [availableSlots, setAvailableSlots] = useState(initialSlots || []);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userProfile, setUserProfile] = useState({
    name: username,
    email: "user@example.com",
    timezone: userTimezone,
    preferredPlatform: "google-meet"
  });

  const [newSlot, setNewSlot] = useState({
    startTime: "",
    endTime: "",
    date: new Date().toISOString().split("T")[0],
    timezone: userTimezone,
    platform: "google-meet",
    link: ""
  });

  const handleCopyDaySlots = (date) => {
    const daySlots = availableSlots.filter(
      (slot) => new Date(slot.date).toDateString() === date.toDateString()
    );

    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const copiedSlots = daySlots.map((slot) => ({
      ...slot,
      id: Date.now() + Math.random(),
      date: nextDay
    }));

    setAvailableSlots((prev) => [...prev, ...copiedSlots]);
  };

  const handleUpdateSlot = (slotId, updatedData) => {
    setAvailableSlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId ? { ...slot, ...updatedData } : slot
      )
    );
  };

  const handleDeleteSlot = (slotId) => {
    setAvailableSlots((prev) => prev.filter((slot) => slot.id !== slotId));
  };

  const handleAddSlot = () => {
    if (newSlot.startTime && newSlot.endTime) {
      const slotToAdd = {
        ...newSlot,
        id: Date.now(),
        date: selectedDate
      };

      setAvailableSlots((prev) => [...prev, slotToAdd]);
      addSlot?.(slotToAdd);
      setIsNewSlotModalOpen(false);
      setNewSlot({
        startTime: "",
        endTime: "",
        timezone: userTimezone,
        platform: "google-meet",
        link: ""
      });
    }
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New booking request from John Doe",
      time: "2 mins ago",
      type: "booking"
    },
    {
      id: 2,
      text: "Your meeting with Sarah starts in 10 minutes",
      time: "8 mins ago",
      type: "reminder"
    },
    {
      id: 3,
      text: "Weekly team sync reminder",
      time: "1 hour ago",
      type: "reminder"
    }
  ]);

  const renderMainContent = () => {
    switch (selectedView) {
      case "calendar":
        return (
          <AvailabilityCalendar
            slots={availableSlots}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onCopyDay={handleCopyDaySlots}
            onCreateSlot={handleCreateSlot}
            onUpdateSlot={handleUpdateSlot}
            onDeleteSlot={handleDeleteSlot}
            userTimezone={userTimezone}
          />
        );
      case "list":
        return (
          <SlotList
            slots={availableSlots}
            onDelete={handleDeleteSlot}
            onUpdate={handleUpdateSlot}
            onCopy={handleCopyDaySlots}
            timezone={userTimezone}
          />
        );
      case "profile":
        return (
          <UserProfile
            profile={userProfile}
            onUpdate={setUserProfile}
            onTimezoneChange={handleTimezoneChange}
          />
        );
      default:
        return null;
    }
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "booking":
        return <Calendar className="w-4 h-4 text-indigo-500" />;
      case "reminder":
        return <Bell className="w-4 h-4 text-amber-500" />;
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleCreateSlot = (slotInfo) => {
    const newSlot = {
      id: Date.now(),
      date: new Date(slotInfo.start).toISOString().split("T")[0],
      startTime: new Date(slotInfo.start).toTimeString().slice(0, 5),
      endTime: new Date(slotInfo.end).toTimeString().slice(0, 5),
      platform: selectedPlatform,
      timezone: userTimezone,
      link: meetingLink
    };

    setAvailableSlots((prev) => [...prev, newSlot]);
    addSlot?.(newSlot);
  };

  const handleTimezoneChange = (newTimezone) => {
    setUserTimezone(newTimezone);
    setUserProfile((prev) => ({
      ...prev,
      timezone: newTimezone
    }));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar
        username={username}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-4">
              {[
                {
                  id: "calendar",
                  icon: <Calendar className="w-4 h-4" />,
                  label: "Calendar View"
                },
                {
                  id: "list",
                  icon: <Clock className="w-4 h-4 " />,
                  label: "List View"
                },
                {
                  id: "profile",
                  icon: <User className="w-4 h-4" />,
                  label: "Profile"
                }
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setSelectedView(view.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedView === view.id
                      ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {view.icon}
                  <span>{view.label}</span>
                </button>
              ))}
            </div>
            <div className="flex item-end space-x-4">
              {/* Notifications dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={() => setNotificationsOpen(true)}
                  onMouseLeave={() => setNotificationsOpen(false)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-50"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                          Notifications ({notifications.length})
                        </h3>
                        {notifications.length > 0 && (
                          <button
                            onClick={() => setNotifications([])}
                            className="text-xs text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
                          >
                            Clear all
                          </button>
                        )}
                      </div>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              layout
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() =>
                                handleNotificationClick(notification.id)
                              }
                              className="flex items-start space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                            >
                              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {notification.text}
                                </p>
                                <span className="text-xs text-gray-500">
                                  {notification.time}
                                </span>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                            No new notifications
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setIsNewSlotModalOpen(true)}
                className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Slot</span>
              </button>
            </div>
          </div>

          <div className="h-[80vh] overflow-hidden">{renderMainContent()}</div>

          {/* New Slot Modal */}
          <AnimatePresence>
            {isNewSlotModalOpen && (
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
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Add New Slot
                    </h2>
                    <button
                      onClick={() => setIsNewSlotModalOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Add Date and Timezone fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={newSlot.date}
                          onChange={(e) =>
                            setNewSlot((prev) => ({
                              ...prev,
                              date: e.target.value
                            }))
                          }
                          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Timezone
                        </label>
                        <select
                          value={newSlot.timezone}
                          onChange={(e) =>
                            setNewSlot((prev) => ({
                              ...prev,
                              timezone: e.target.value
                            }))
                          }
                          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          {Intl.supportedValuesOf("timeZone").map((tz) => (
                            <option key={tz} value={tz}>
                              {tz}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={newSlot.startTime}
                          onChange={(e) =>
                            setNewSlot((prev) => ({
                              ...prev,
                              startTime: e.target.value
                            }))
                          }
                          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={newSlot.endTime}
                          onChange={(e) =>
                            setNewSlot((prev) => ({
                              ...prev,
                              endTime: e.target.value
                            }))
                          }
                          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Meeting Platform
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["google-meet", "zoom", "slack"].map((platform) => (
                          <button
                            key={platform}
                            onClick={() => setSelectedPlatform(platform)}
                            className={`p-3 rounded-lg flex flex-col items-center ${
                              selectedPlatform === platform
                                ? "bg-indigo-100 dark:bg-indigo-900"
                                : "bg-gray-100 dark:bg-gray-700"
                            }`}
                          >
                            {platform === "google-meet" && (
                              <Video className="w-5 h-5 mb-1 text-indigo-500" />
                            )}
                            {platform === "zoom" && (
                              <Video className="w-5 h-5 mb-1 text-indigo-500" />
                            )}
                            {platform === "slack" && (
                              <Slack className="w-5 h-5 mb-1 text-indigo-500" />
                            )}
                            <span className="text-sm capitalize">
                              {platform}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Meeting Link
                      </label>
                      <input
                        type="text"
                        placeholder="Enter meeting URL"
                        value={newSlot.link}
                        onChange={(e) =>
                          setNewSlot((prev) => ({
                            ...prev,
                            link: e.target.value
                          }))
                        }
                        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <button
                      onClick={handleAddSlot}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Add Time Slot
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

export default Dashboard;
