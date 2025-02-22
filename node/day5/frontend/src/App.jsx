import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Todo from './components/todo/TodoList'
import { useState } from 'react'

function App() {
  const [showSignup, setShowSignup] = useState(true)
  const switchToLogin = () => setShowSignup(false)
  const switchToSignup = () => setShowSignup(true)

  return (
    <Router>
      <Routes>
        <Route path="/" element={showSignup ? < SignUp switchToLogin={switchToLogin}/> : <SignIn setShowSignup={switchToSignup}/>} />
        <Route path="/login" element={<SignIn/>} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  )
}

export default App
