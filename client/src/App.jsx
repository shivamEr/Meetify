import { useState } from 'react'
import Footer from './components/Home/Footer'
import Navbar from './components/Home/Navbar'
import AuthModel from './components/Home/AuthModel'
import { Home } from './pages/Home'
import MeetingHub from './pages/MeetingHub'


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './components/NotFound'
import MeetingRoom from './pages/MeetingRoom'


function App() {
  const [authVisible, setAuthVisible] = useState(false)
  const onAuthToggle = () => {
    setAuthVisible(!authVisible);
  }

  return (
    <>
      <BrowserRouter>
        <Navbar onAuthToggle={onAuthToggle} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meeting" element={<MeetingHub />} />
          <Route path="/room" element={<MeetingRoom/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer />
        {authVisible && <AuthModel onAuthToggle={onAuthToggle} />}
      </BrowserRouter>
    </>
  )
}

export default App
