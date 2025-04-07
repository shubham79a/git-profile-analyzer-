import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { ThemeProvider } from './components/theme-provider'
import UserHome from './pages/UserHome'
import RepoCommitsChart from './pages/RepoCommitsChart'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=''>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<UserHome />} path='/user/:username' />
          <Route element={<RepoCommitsChart />} path='/user/:username/:repo' />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
