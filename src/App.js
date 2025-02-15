import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ThemeProvider} from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import OtherBookings from './pages/OtherBookings';
import {useState} from 'react';
import Sidebar from './components/common/Sidebar';
import {MeetingProvider} from './context/MeetingContext';
import Meetings from './pages/Meeting';


function App () {
  const [slots, setSlots] = useState ([]);
  
  const [setIsLoggedIn] = useState (false);
  // Added sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState (true);

  const addSlot = newSlot => {
    setSlots ([...slots, {...newSlot, id: Date.now ()}]);
  };

  return (
    <ThemeProvider>
      <MeetingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/register"
              element={<Register setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/dashboard"
              element={
                <div className="flex">
                  {/* <Sidebar
                    username="User123"
                    isOpen={isSidebarOpen}
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                  /> */}
                  <Dashboard
                    username="Vedali"
                    slots={slots}
                    addSlot={addSlot}
                    timezone="UTC"
                    setTimezone={() => {}}
                  />
                </div>
              }
            />

            <Route
              path="/other-bookings"
              element={
                <div className="flex">
                  <Sidebar
                    username="Vedali"
                    isOpen={isSidebarOpen}
                    toggleSidebar={() => setIsSidebarOpen (!isSidebarOpen)}
                  />
                  <OtherBookings />
                </div>
              }
            />

            <Route path='/meetings' element={
              <div className="flex">
              <Sidebar
                username="Vedali"
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen (!isSidebarOpen)}
              />

              <Meetings/>
              </div>
            }/>
          </Routes>
        </BrowserRouter>
      </MeetingProvider>
    </ThemeProvider>
  );
}

export default App;
