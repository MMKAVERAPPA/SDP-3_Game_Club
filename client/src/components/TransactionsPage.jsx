export default function TransactionsPage() {
    const transactions = [
        { date: "2023-06-15", game: "Chess", amount: 50 },
        { date: "2023-06-14", game: "Carrom", amount: 40 },
        { date: "2023-06-13", game: "Pool", amount: 70 },
    ];

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Your Transactions</h2>
            <table className="w-full border shadow-md bg-white">
                <thead>
                    <tr className="bg-red-700 text-white text-center">
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Game</th>
                        <th className="p-2 border">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx, idx) => (
                        <tr key={idx} className="text-center text-gray-900">
                            <td className="border p-2">{tx.date}</td>
                            <td className="border p-2">{tx.game}</td>
                            <td className="border p-2">₹{tx.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
