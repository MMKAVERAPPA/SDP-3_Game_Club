import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import GamesPage from "./components/GamesPage";
import RechargePage from "./components/RechargePage";
import GameHistoryPage from "./components/GameHistoryPage";
import ManageUsers from "./components/ManageUsers";
import ManageGames from "./components/ManageGames";
import CollectionsPage from "./components/CollectionsPage";
import CompleteMemberDetails from "./components/CompleteMemberDetails";
import PaymentPage from "./components/PaymentPage";
import { AuthProvider } from "./context/AuthContext";
import { BalanceProvider } from "./context/BalanceContext";


export default function App() {
  return (
    <Router>
      <AuthProvider>
        <BalanceProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/recharge-history" element={<RechargePage />} />
            <Route path="/game-history" element={<GameHistoryPage />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/manage-games" element={<ManageGames />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/process-transaction" element={<CompleteMemberDetails />} />
            <Route path="/payment" element={<PaymentPage />} />

          </Routes>
        </BalanceProvider>
      </AuthProvider>
    </Router>
  );
}
