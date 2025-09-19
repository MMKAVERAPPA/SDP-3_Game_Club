import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import GamesPage from "./components/GamesPage";
import RechargePage from "./components/RechargePage";
import TransactionsPage from "./components/TransactionsPage";
import ManageUsers from "./components/ManageUsers";
import ManageGames from "./components/ManageGames";
import CollectionsPage from "./components/CollectionsPage";
import ProcessTransaction from "./components/ProcessTransaction";
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
            <Route path="/recharge" element={<RechargePage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/manage-games" element={<ManageGames />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/process-transaction" element={<ProcessTransaction />} />
            <Route path="/payment" element={<PaymentPage />} />

          </Routes>
        </BalanceProvider>
      </AuthProvider>
    </Router>
  );
}
