import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import MembershipCreation from './components/MembershipCreation';
import MemberSearch from './components/MemberSearch';
import MemberDetails from './components/MemberDetails';
import AddGame from './components/AddGame';
import Collections from './components/Collections';

// Import Pages
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/membership-creation" element={<MembershipCreation />} />
        <Route path="/member-search" element={<MemberSearch />} />
        <Route path="/member-details" element={<MemberDetails />} />
        <Route path="/add-game" element={<AddGame />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
