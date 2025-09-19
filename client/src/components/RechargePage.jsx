// 📂 src/pages/RechargePage.js
import { useBalance } from "../context/BalanceContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RechargePage() {
    const { balance } = useBalance();
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    const handleRecharge = (val) => {
        const rechargeAmt = parseInt(val);
        if (rechargeAmt >= 1 && rechargeAmt <= 20000) {
            // ✅ redirect to PaymentPage with amount as state
            navigate("/payment", { state: { amount: rechargeAmt } });
        } else {
            alert("Recharge must be between 1 and 20000");
        }
    };

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
            <div className="flex gap-2">
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
        </div>
    );
}
