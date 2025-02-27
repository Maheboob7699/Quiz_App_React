
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/Loginpage'
import QuizzPage from './pages/QuizzPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/quizz/*" element={<QuizzPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
