import { use, useEffect, useState } from "react";
import API from "../api/api"; 
import { useAuth } from "../context/AuthContext";

export default function GameHistoryPage() {

    const {user} = useAuth()

    const [history, setHistory] = useState([]);

    const fetchGameHistory= async () => {
        try {
            const response = await API.get(`/transactions/member/${user.id}/games`)
            setHistory(response.data);
        } catch (error) {
            console.error("Error fetching Game History:", error);
        }
    };

    useEffect(() => {
        fetchGameHistory();
    }, [user]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-white-900">
                💳 Games History
            </h2>
            <table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <thead>
                    <tr className="bg-indigo-700 text-white text-center">
                        <th className="p-3 border">Id</th>
                        <th className="p-3 border">Game Name</th>
                        <th className="p-3 border">Date & Time</th>
                        <th className="p-3 border">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {history.length > 0 ? (
                        history.map((entry, idx) => (
                            <tr
                                key={idx}
                                className="text-center text-gray-900 bg-gray-100 even:bg-gray-200"
                            >
                                <td className="p-3 border font-mono">
                                    {entry.id || `TXN-${idx + 1}`}
                                </td>
                                <td className="p-3 border">{entry.gameName || "N/A"}</td>
                                <td className="p-3 border">{new Date(entry.dateTime).toLocaleString()}</td>
                                <td className="p-3 border text-red-600 font-semibold">
                                    - ₹{entry.amount}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="4"
                                className="text-center p-4 text-gray-500"
                            >
                                No History Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}