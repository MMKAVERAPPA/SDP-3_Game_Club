import { useState } from "react";
import API from "../api/api";

export default function ProcessTransaction() {
    const [memberId, setMemberId] = useState("");
    const [member, setMember] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [message, setMessage] = useState("");

    const processPlay = async () => {
        try {
            const res = await API.get(`/members/${memberId}`); // fetch member details
            setMember(res.data);

            const txRes = await API.get(`/transactions/${memberId}`); // fetch their transactions
            setTransactions(txRes.data);

            setMessage("Fetched member and transactions successfully");
        } catch (err) {
            console.error(err);
            setMessage("Error fetching member transactions");
        }
    };

    return (
        <div className="p-6">
            <h2 className="font-bold text-xl mb-4">Process Transaction</h2>
            <div className="flex flex-col gap-2 max-w-sm">
                <input
                    type="text"
                    placeholder="Member ID"
                    className="border p-2 rounded"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                />
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={processPlay}
                >
                    Fetch
                </button>
            </div>

            {message && <p className="mt-4 font-semibold">{message}</p>}

            {member && (
                <div className="mt-6">
                    <h3 className="font-bold text-lg">Member Details</h3>
                    <p>Name: {member.name}</p>
                    <p>Phone: {member.phone}</p>
                    <p>Balance: ₹{member.balance}</p>
                </div>
            )}

            {transactions.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-bold text-lg">Transactions</h3>
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-2 border">Date</th>
                                <th className="p-2 border">Game</th>
                                <th className="p-2 border">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t, idx) => (
                                <tr key={idx}>
                                    <td className="border p-2">{t.date}</td>
                                    <td className="border p-2">{t.game}</td>
                                    <td className="border p-2">₹{t.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
