//RechargePage.js
import { useBalance } from "../context/BalanceContext";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";

export default function RechargePage() {
    const { user } = useAuth();
    const { balance, recharge } = useBalance();
    const [amount, setAmount] = useState("");
    const [recharges, setRecharges] = useState([]);

    const handleRecharge = async (val) => {
        try {
            const rechargeAmt = parseInt(val);
            if (balance + rechargeAmt <= 10000) {
                if (rechargeAmt >= 100 && rechargeAmt <= 1000) {
                    const requirements = {
                        memberId: user.id, // ✅ backend needs this
                        amount: rechargeAmt,
                    };
                    const result = await API.post("/recharges/save", requirements); // 🔹 API: save recharge
                    recharge(result.data.amount);

                    // refresh transactions after recharge
                    fetchRecharges();
                } else {
                    alert("Recharge must be between 100 and 1000");
                }
            } else {
                alert("You have already reached the maximum possible balance of 10000");
            }
        } catch (err) {
            console.log("Error while recharging", err);
        }
    };

    const fetchRecharges = async () => {
        try {
            const res = await API.get(`/recharges/member/${user.id}`);
            setRecharges(res.data || []);
            console.log(res.data)
        } catch (err) {
            console.error("Error fetching recharges", err);
        }
    };

    useEffect(() => {
        if (user?.id) fetchRecharges();
    }, [user]);

    return (
        <div className="p-6">
            <h2 className="font-bold text-xl mb-2">Recharge Your Balance</h2>
            <p className="mb-4">Current Balance: ₹{balance}</p>
            <div className="flex gap-4 mb-4">
                {[100, 500, 1000, 2000].map((amt) => (
                    <button
                        key={amt}
                        className="bg-indigo-600 text-white px-4 py-2 rounded"
                        onClick={() => handleRecharge(amt)}
                    >
                        ₹{amt}
                    </button>
                ))}
            </div>
            <div className="flex gap-2 mb-6">
                <input
                    type="number"
                    className="border p-2 rounded w-40"
                    placeholder="Custom amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button
                    className="bg-black text-white px-4 py-2 rounded"
                    onClick={() => handleRecharge(amount)}
                >
                    Add Funds
                </button>
            </div>

            {/* ✅ Recharge History Table */}
            <h3 className="font-bold text-lg mb-2">Recharge History</h3>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2 border">Recharge ID</th>
                        <th className="p-2 border">Date and Time</th>
                        <th className="p-2 border">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {recharges.length > 0 ? (
                        recharges.map((rx) => (
                            <tr key={rx.rechargeId}>
                                <td className="border p-2">{rx.rechargeId}</td>
                                <td className="border p-2">
                                    {new Date(rx.dateTime).toLocaleString()}
                                </td>
                                <td
                                    className="border p-2 font-semibold text-green-600"
                                >
                                    {" + "}₹{rx.amount}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-2 text-gray-500">
                                No Recharges yet
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}