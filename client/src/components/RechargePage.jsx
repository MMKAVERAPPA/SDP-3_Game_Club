import { useBalance } from "../context/BalanceContext";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";

export default function RechargePage() {
    const { user } = useAuth();
    // ✨ The recharge function is now async
    const { balance, recharge } = useBalance();
    const [amount, setAmount] = useState("");
    const [recharges, setRecharges] = useState([]);

    const [loading, setLoading] = useState(true)
    // ✨ The handleRecharge function is now much simpler
    const handleRecharge = async (val) => {
        try {
            const rechargeAmt = parseInt(val);
            if (isNaN(rechargeAmt)) return alert("Please enter a valid amount.");

            if (balance + rechargeAmt > 10000) {
                return alert("This recharge would exceed the maximum balance of ₹10,000.");
            }
            if (rechargeAmt >= 100 && rechargeAmt <= 1000) {
                try{
                    const requirements = {
                        memberId: user.id,
                        amount: rechargeAmt
                    }
                    await API.post('recharges/save', requirements)
                    await recharge(rechargeAmt); // Call the context function
                    await fetchRecharges(); // Refresh the history list
                    alert("Recharge successful!");
                    setAmount("");
                }catch(err){
                    console.log(err.response.data.message)
                    alert("Maximum recharge limit (5) reached. Try again after 24 hours")
                }
            } else {
                alert("Recharge amount must be between ₹100 and ₹1,000.");
            }
        } catch (err) {
            // Error is already handled in the context, but this catch is here just in case.
            console.log("Recharge process failed", err);
        }
    };

    const fetchRecharges = async () => {
        try {
            const res = await API.get(`/recharges/member/${user.id}`);
            setRecharges(res.data || []);
            setLoading(false)
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
                {[100, 500, 1000].map((amt) => ( // Removed 2000 as it's outside the valid range
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

            <h3 className="font-bold text-lg mb-2">Recharge History</h3>
            <div className="bg-gray-700 border border-white rounded-lg overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="p-2 border border-white text-center">Recharge ID</th>
                            <th className="p-2 border border-white text-center">Date and Time</th>
                            <th className="p-2 border border-white text-center">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="text-center p-2 text-white">
                                    Fetching Recharges...
                                </td>
                            </tr>
                        ) : recharges.length > 0 ? (
                            recharges.map((rx) => (
                                <tr key={rx.rechargeId}>
                                    <td className="border border-white p-2 text-center">{rx.rechargeId}</td>
                                    <td className="border border-white p-2 text-center">
                                        {new Date(rx.dateTime).toLocaleString()}
                                    </td>
                                    <td className="border border-white p-2 text-center font-semibold text-green-600">
                                        +₹{rx.amount}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center p-2 text-white">
                                    No Recharges yet
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}