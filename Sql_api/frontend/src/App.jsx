import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import V1 from './v1.jsx';
import './App.css';
import Admin from './admin.jsx';
import EditRoutes from './RedigerRoutes.jsx';

function AdminPage() {
  return (
    <>
      <Admin />
      <EditRoutes />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<V1 />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
