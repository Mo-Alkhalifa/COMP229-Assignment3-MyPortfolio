
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../components/Home'
import About from '../components/About'
import Projects from '../components/Projects'
import Education from '../components/Education'
import Services from '../components/Services'
import Contact from '../components/Contact'
import Navbar from '../components/Navbar'
import Signin from '../components/Signin'
import Signup from '../components/Signup'
import Admin from '../components/Admin'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
