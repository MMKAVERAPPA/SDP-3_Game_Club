import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            login(email, password);
        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid credentials");
        }
    };

    return (
        // ✨ New background container
        <div className="relative flex items-center justify-center h-screen bg-gray-900 overflow-hidden">
            <div className="absolute inset-0">
                {/* Flowing aurora effect */}
                <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dfhp33ufc/image/upload/v1715825380/aurora_2_d2grbf.svg')] bg-cover opacity-30 animate-aurora"></div>
            </div>

            {/* Your existing login card - unchanged */}
            <div className="relative bg-black/25 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-2xl w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">
                    🎮 Gaming Club Login
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Enter email"
                        className="bg-transparent border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-300 transition-all duration-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="bg-transparent border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-300 transition-all duration-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg shadow-indigo-500/50"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}