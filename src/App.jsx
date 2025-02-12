import { useState } from 'react'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/Loginpage'
import QuizzPage from './pages/QuizzPage'
// import Leaderboarpage from './pages/LeaderboardPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>

      {/* <LoginPage/> */}
      {/* <QuizzPage/> */}
      {/* <Leaderboarpage/> */}
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />\
        <Route path="/quizz" element={<QuizzPage/>} />
            {/* <LoginPage/> */}
            {/* <QuizzPage/> */}
            {/* <Leaderboarpage/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
