import { useEffect, useState } from "react";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function GameHistoryPage() {

    const { user } = useAuth()

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchGameHistory = async () => {
        try {
            // Check if user and user.id exist before making the API call
            if (user?.id) {
                const response = await API.get(`/transactions/member/${user.id}/games`)
                setHistory(response.data);
                setLoading(false)
            }
        } catch (error) {
            console.error("Error fetching Game History:", error);
        }
    };

    useEffect(() => {
        fetchGameHistory();
    }, [user]);

    return (
        <div className="p-6 ">
            <h2 className="text-3xl font-bold mb-6 text-center text-white-800">
                💳 Games History
            </h2>
            {/* ✨ The className here has been updated for a visible white outline */}
            {loading ? (
            <div className="text-center p-4 text-white bg-gray-800 rounded-lg">
                Fetching Game History....
            </div>
        ) : history.length > 0 ? (
            <table className="w-full border-collapse bg-gray-700 border border-white rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-indigo-700 text-white text-center">
                        <th className="p-3 border">Id</th>
                        <th className="p-3 border">Game Name</th>
                        <th className="p-3 border">Date & Time</th>
                        <th className="p-3 border">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry, idx) => (
                        <tr
                            key={entry.id || idx}
                            className="text-center text-white bg-gray-800"
                        >
                            <td className="p-3 border font-mono">
                                {entry.id || `TXN-${idx + 1}`}
                            </td>
                            <td className="p-3 border">{entry.name || "N/A"}</td>
                            <td className="p-3 border">
                                {new Date(entry.dateTime).toLocaleString()}
                            </td>
                            <td className="p-3 border text-red-600 font-semibold">
                                - ₹{entry.amount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <div className="text-center p-4 text-white bg-gray-800 rounded-lg">
                No Game History
            </div>
        )}
        </div>
    );
}