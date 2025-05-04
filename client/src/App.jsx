import Footer from './components/Home/Footer';
import Navbar from './components/Home/Navbar';
import { Home } from './pages/Home';
import MeetingHub from './pages/MeetingHub';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import MeetingRoom from './pages/MeetingRoom';
import Login from './components/Home/Login';
import Signup from './components/Home/Signup';
import ProtectRoute from './context/Authenticate/ProtectRoute';
import { SocketProvider } from './context/SocketProvider';

function App() {
  return (
    <>
      <SocketProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/meeting"
              element={
                <ProtectRoute>
                  <MeetingHub />
                </ProtectRoute>
              }
            />

            <Route
              path="/room/:roomId"
              element={
                <ProtectRoute>
                  <MeetingRoom />
                </ProtectRoute>
              }
            />

            {/* <Route path='/demo/:roomId' element={<Test />} /> */}

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </SocketProvider>
    </>
  );
}

export default App;
