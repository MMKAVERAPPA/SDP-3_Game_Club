import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBalance } from "../context/BalanceContext";

export default function UserDashboard() {
    const { user } = useAuth();
    const { balance } = useBalance();

    return (
        <div className="p-8  overflow-hidden">
            {/* Personalized Welcome Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-indigo-600 text-center ">
                    Welcome back! <span className="text-blue-100">{user?.name}</span>
                </h2>              
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Balance Card */}
                <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg text-center flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">💰 Your Balance</h3>
                    <p className="text-5xl font-bold text-green-600">₹ {balance}</p>
                </div>

                {/* Action Cards */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Play Games Card */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                        <span className="text-5xl mb-3">🎮</span>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Play a Game</h3>
                        <p className="text-gray-600 mb-4 flex-grow">Browse our collection of exciting games and jump into the action.</p>
                        <Link to="/games" className="w-full mt-auto bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                            Browse Games
                        </Link>
                    </div>

                    {/* Recharge Card */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
                        <span className="text-5xl mb-3">💳</span>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Add Funds</h3>
                        <p className="text-gray-600 mb-4 flex-grow">Need more tokens? Recharge your balance quickly and securely.</p>
                        <Link to="/recharge-history" className="w-full mt-auto bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                            Recharge Now
                        </Link>
                    </div>
                </div>

                {/* How it Works Card */}
                <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">How It Works</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-gray-200 rounded-md">
                            {/* ✨ Icon for Recharge */}
                            <p className="text-4xl text-indigo-600 mb-1">💸</p>
                            <p className="font-semibold text-blue-600">Recharge</p>
                            <p className="text-sm text-gray-900">Add funds to your balance.</p>
                        </div>
                        <div className="p-4 bg-gray-200 rounded-md">
                            {/* ✨ Icon for Choose a Game */}
                            <p className="text-4xl text-indigo-600 mb-1">🕹️</p>
                            <p className="font-semibold text-red-600">Choose a Game</p>
                            <p className="text-sm text-gray-900">Pick from our list of games.</p>
                        </div>
                        <div className="p-4 bg-gray-200 rounded-md">
                            {/* ✨ Icon for Play & Enjoy */}
                            <p className="text-4xl text-indigo-600 mb-1">🎉</p>
                            <p className="font-semibold text-yellow-500">Play & Enjoy</p>
                            <p className="text-sm text-gray-900">Your balance is deducted as you play.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}