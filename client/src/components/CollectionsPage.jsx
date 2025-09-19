// CollectionsPage.jsx

import { useEffect, useState } from "react";
import API from "../api/api";

export default function CollectionsPage() {
    const [collections, setCollections] = useState([]);
    const [overallTotal, setOverallTotal] = useState(0);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                // ✅ API to fetch collections (all-time)
                const res = await API.get('/collections/all');
                setCollections(res.data);

                const overall = res.data.reduce((sum, c) => sum + c.amount, 0);
                setOverallTotal(overall);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCollections();
    }, []);

    return (
        <div className="p-6 text-center">
            <h2 className="font-bold text-2xl mb-2">Daily Collections</h2>
            <div className="font-bold text-green-600 text-lg mb-6">
                Overall Total: ₹{overallTotal}
            </div>

            <table className="w-full border mb-4 text-center">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2 border">Transaction ID</th>
                        <th className="p-2 border">Date & Time</th>
                        <th className="p-2 border">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {collections.map((c, idx) => (
                        <tr key={idx}>
                            <td className="border p-2">{c.id}</td>
                            <td className="border p-2">
                                {new Date(c.date).toLocaleString()}
                            </td>
                            <td className="border p-2 text-green-600 font-semibold">
                                ₹{c.amount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}