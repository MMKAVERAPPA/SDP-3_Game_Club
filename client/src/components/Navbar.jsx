import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBalance } from "../context/BalanceContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { balance, setBalance } = useBalance();



    if (!user) return null;

    return (
        <div className="sticky top-0 z-50 flex justify-between items-center bg-gray-900 text-white p-4">
            {user.role === 'USER' && (
                <Link to='/user'>
                    <h1 className="font-bold text-lg">GameZone Club</h1>
                </Link>
            )}
            <div className="flex items-center gap-4">
                {user.role === "USER" && (
                    <>
                        <Link to="/games">Games</Link>
                        <Link to="/recharge-history">Recharge History</Link>
                        <Link to="/game-history">Game History</Link>
                        <span className={`font-semibold ${balance > 500 ? "text-green-500" : "text-red-500"}`}>Balance: ₹{balance}</span>
                    </>
                )}
                {user.role === "ADMIN" && (
                    <>
                        <Link to="/admin">Dashboard</Link>
                    </>
                )}
                <button
                    className="bg-red-500 px-3 py-1 rounded"
                    onClick={() => {
                        setBalance(0)
                        logout()
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
