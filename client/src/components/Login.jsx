import { useState } from "react";
import { useAuth} from "../context/AuthContext";

export default function Login() {

    const {login} = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            login(email, password)
        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-700 to-purple-700">
            <div className="bg-white rounded-xl p-8 shadow-xl w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
                    🎮 Gaming Club Login
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter email"
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-xs text-gray-600 mt-6 text-center">
                    <strong>Demo Accounts:</strong> <br />
                    User → <span className="text-gray-800">user / user</span> <br />
                    Admin → <span className="text-gray-800">admin / admin</span>
                </p>
            </div>
        </div>
    );
}
