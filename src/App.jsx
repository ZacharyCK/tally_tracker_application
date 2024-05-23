import { useState } from 'react'
import Navbar from './components/Navbar'
import CountersContainer from './components/CountersContainer'
import './App.css'

function App() {

  return (
    <div className='h-screen max-h-screen overflow-auto'>
      <Navbar />
      <CountersContainer />
    </div>
  )
}

export default App
