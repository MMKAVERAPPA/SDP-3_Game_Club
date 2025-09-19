import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";

export default function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth(); // ✅ logged-in member info
    const selectedItems = location.state?.items || []; // ✅ list of selected games/items
    const totalAmount = location.state?.amount || 0;

    // Generate a transactionId (frontend-side for now, backend should handle real one)
    const transactionId = "TXN-" + Math.floor(100000 + Math.random() * 900000);

    const handlePayment = async () => {
        try {
            // 🔗 API: Add your backend endpoint for saving payments
            await API.post("/payments", {
                memberId: user?._id, // from logged-in user
                amount: totalAmount,
                items: selectedItems.map((g) => ({
                    gameId: g.id,
                    name: g.name,
                    price: g.price,
                })),
                transactionId: transactionId,
                dateTime: new Date(),
            });

            alert("✅ Payment successful!");
            navigate("/transactions");
        } catch (err) {
            console.error(err);
            alert("❌ Payment failed");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white shadow rounded text-gray-900">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>

            {/* User Info */}
            <p className="mb-2">
                <span className="font-semibold">Name:</span> {user?.name || "Guest"}
            </p>
            <p className="mb-2">
                <span className="font-semibold">Member ID:</span>{" "}
                <span className="font-mono">{user?._id}</span>
            </p>

            {/* Transaction Info */}
            <p className="mb-2">
                <span className="font-semibold">Transaction ID:</span>{" "}
                <span className="font-mono">{transactionId}</span>
            </p>
            <p className="mb-2 font-semibold">Date: {new Date().toLocaleString()}</p>

            {/* Selected Items */}
            <h3 className="font-semibold mt-4 mb-2">Selected Games:</h3>
            <ul className="list-disc ml-6 text-sm">
                {selectedItems.length > 0 ? (
                    selectedItems.map((item) => (
                        <li key={item.id}>
                            {item.name} - ₹{item.price}
                        </li>
                    ))
                ) : (
                    <p>No games selected.</p>
                )}
            </ul>

            {/* Total */}
            <p className="mt-4 text-lg font-bold">Total: ₹{totalAmount}</p>

            {/* Payment Button */}
            <button
                className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4 hover:bg-green-700"
                onClick={handlePayment}
            >
                Confirm Payment
            </button>
        </div>
    );
}
