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
import Footer from './components/Footer'
import path from 'path'
import RepoStats from './pages/RepoStats'

function App() {

  return (
    <>
      <div className=''>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<UserHome />} path='/user/:username' />
          <Route element={<RepoStats />} path="/user/:username/repo/:reponame" />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App;
