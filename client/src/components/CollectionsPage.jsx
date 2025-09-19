import { useEffect, useState } from "react";
import API from "../api/api";

export default function CollectionsPage() {
    const [date, setDate] = useState("");
    const [collections, setCollections] = useState([]);
    const [dailyTotal, setDailyTotal] = useState(0);
    const [overallTotal, setOverallTotal] = useState(0);

    const fetchCollections = async () => {
        try {
            // ✅ API to fetch collections for a given date
            const res = await API.get(`/collection/${date}`);
            setCollections(res.data);

            // Daily total calculation
            const total = res.data.reduce((sum, c) => sum + c.recharge_amount, 0);
            setDailyTotal(total);

            // ✅ API to fetch overall collections (all-time)
            const overallRes = await API.get("/collection");
            const overall = overallRes.data.reduce((sum, c) => sum + c.recharge_amount, 0);
            setOverallTotal(overall);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="font-bold text-xl mb-4">Daily Collections</h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                    onClick={fetchCollections}
                >
                    Fetch
                </button>
            </div>

            <table className="w-full border mb-4">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2 border">Transaction ID</th>
                        <th className="p-2 border">Member</th>
                        <th className="p-2 border">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {collections.map((c, idx) => (
                        <tr key={idx}>
                            <td className="border p-2">{c.transaction_id}</td>
                            <td className="border p-2">{c.member}</td>
                            <td className="border p-2">₹{c.recharge_amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="font-bold">
                <p>Daily Total: ₹{dailyTotal}</p>
                <p>Overall Total: ₹{overallTotal}</p>
            </div>
        </div>
    );
}
