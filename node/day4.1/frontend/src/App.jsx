import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login.Jsx'
import Userna from './components/Userna'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userna" element={<Userna />} />
      </Routes>
    </Router>
  )
}

export default App
