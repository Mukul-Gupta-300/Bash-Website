import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './page/homepage.jsx';
import ManageITPage from './page/Manage_IT.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/managed-it-services" element={<ManageITPage />} />
      </Routes>
    </Router>
  );
}

export default App;
