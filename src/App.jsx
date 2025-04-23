import HomePage from './pages/HomePage'
import ViewPage from './pages/ViewPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view/:postId" element={<ViewPage/>} />
      </Routes>
    </Router>
  )
}

export default App
