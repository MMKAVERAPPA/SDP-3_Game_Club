import { useState } from "react";
import API from "../api/api";

export default function CompleteMemberDetails() {
    const [memberId, setMemberId] = useState("");
    const [details, setDetails] = useState(null);
    const [message, setMessage] = useState("");

    const fetchMember = async () => {
        try {
            const res = await API.get(`/members/search/${memberId}`); // ✅ API call
            setDetails(res.data);
            setMessage(""); // clear error if success
        } catch (err) {
            console.error(err);
            setMessage("❌ Error fetching member details");
            setDetails(null);
        }
    };

    return (
        <div className="p-6">
            <h2 className="font-bold text-xl mb-4">Enter Member ID</h2>
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
                    onClick={fetchMember}
                >
                    Fetch
                </button>
            </div>

            {message && <p className="mt-4 font-semibold text-red-600">{message}</p>}

            {details && (
                <div className="mt-6 space-y-6">
                    {/* ✅ Member Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-2">Member Details</h3>
                        <table className="w-full border rounded shadow-md overflow-hidden">
                            <thead>
                                <tr className="bg-indigo-700 text-white text-center">
                                    <th className="p-2 border">ID</th>
                                    <th className="p-2 border">Name</th>
                                    <th className="p-2 border">Email</th>
                                    <th className="p-2 border">Phone</th>
                                    <th className="p-2 border">Balance</th>
                                    <th className="p-2 border">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-700 border-2 text-white-900 text-center">
                                    <td className="p-2 border">{details.member.id}</td>
                                    <td className="p-2 border">{details.member.name}</td>
                                    <td className="p-2 border">{details.member.email}</td>
                                    <td className="p-2 border">{details.member.phone}</td>
                                    <td className="p-2 border">₹{details.member.balance}</td>
                                    <td className="p-2 border">{details.member.role}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* ✅ Played History */}
                    <div>
                        <h3 className="font-bold text-lg mb-2">Played History</h3>
                        <table className="w-full border rounded shadow-md overflow-hidden">
                            <thead>
                                <tr className="bg-indigo-700 text-white text-center">
                                    <th className="p-2 border">Game</th>
                                    <th className="p-2 border">Amount</th>
                                    <th className="p-2 border">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.playedHistory.length > 0 ? (
                                    details.playedHistory.map((p) => (
                                        <tr key={p.id} className=" bg-gray-700 border-2 text-white-900 text-center">
                                            <td className="p-2 border">{p.gameName}</td>
                                            <td className="p-2 border">₹{p.amount}</td>
                                            <td className="p-2 border">
                                                {new Date(p.dateTime).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="p-2 border text-center">
                                            No games played yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ✅ Recharge History */}
                    <div>
                        <h3 className="font-bold text-lg mb-2">Recharge History</h3>
                        <table className="w-full border rounded shadow-md overflow-hidden">
                            <thead>
                                <tr className="bg-indigo-700 text-white text-center">
                                    <th className="p-2 border">Amount</th>
                                    <th className="p-2 border">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.rechargeHistory.length > 0 ? (
                                    details.rechargeHistory.map((r) => (
                                        <tr key={r.id} className="bg-gray-700 border-2 text-white-900 text-center">
                                            <td className="p-2 border">₹{r.amount}</td>
                                            <td className="p-2 border">
                                                {new Date(r.dateTime).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="p-2 border text-center">
                                            No recharges yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
