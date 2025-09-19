import { useState, useEffect } from "react";
import { useBalance } from "../context/BalanceContext";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function GamesPage() {
    const { user } = useAuth();
    // ✨ Get the new fetchBalance function from the context
    const { deduct, fetchBalance } = useBalance();
    const [games, setGames] = useState([]);
    const [selectedCounts, setSelectedCounts] = useState({});

    const [modalGame, setModalGame] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const result = await API.get("/games/all");
                setGames(result.data);

                const initialCounts = {};
                result.data.forEach((game) => {
                    initialCounts[game.id] = game.minPlayers;
                });
                setSelectedCounts(initialCounts);
            } catch (err) {
                console.error("Error fetching games:", err);
            }
        };
        fetchGames();
    }, []);

    const handleSelectClick = (game) => {
        setModalGame(game);
    };

    const handleConfirmPayment = async () => {
        if (!modalGame) return;

        setIsProcessing(true);
        const currentCount = selectedCounts[modalGame.id] || modalGame.minPlayers;
        const totalAmount = modalGame.price * currentCount;

        // The deduct function updates the balance on screen temporarily
        if (deduct(totalAmount)) {
            alert(`${modalGame.name} selected successfully with ${currentCount} players!`);
            try {
                // This API call saves the transaction permanently on the server
                await API.post("/transactions/play", {
                    gameId: modalGame.id,
                    memberId: user.id,
                    amount: totalAmount,
                });

                // ✨ After saving, immediately re-fetch the official balance from the server
                await fetchBalance();

            } catch (err) {
                console.error("Error saving transaction:", err);
                // Note: You might want to add back the balance if this API call fails
            }
        }

        setIsProcessing(false);
        setModalGame(null);
    };

    return (
        <>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-900">
                {games.map((game) => {
                    const selectedCount = selectedCounts[game.id] ?? game.minPlayers;
                    return (
                        <div key={game.id} className="border rounded p-4 shadow bg-white text-black">
                            <h3 className="font-bold text-lg">{game.name}</h3>
                            <p className="text-sm text-gray-700">{game.description}</p>
                            <p className="font-semibold mt-2">Entry Fee: ₹{game.price}</p>
                            <div className="mt-2 text-sm">
                                <p>⏳ Duration: {game.duration}</p>
                                <p>👥 Min Players: {game.minPlayers}</p>
                                <p>👥 Max Players: {game.maxPlayers}</p>
                            </div>
                            <span className={`inline-block mt-2 text-xs px-2 py-1 rounded font-semibold ${game.status === "ACTIVE" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                                {game.status}
                            </span>
                            <div className="flex items-center justify-center space-x-3 mt-2">
                                <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50" onClick={() => { if (selectedCount > game.minPlayers) { setSelectedCounts({ ...selectedCounts, [game.id]: selectedCount - 1, }); } }} disabled={selectedCount <= game.minPlayers}>
                                    ➖
                                </button>
                                <p className="text-center font-medium">
                                    ({selectedCount}/{game.maxPlayers})
                                </p>
                                <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50" onClick={() => { if (selectedCount < game.maxPlayers) { setSelectedCounts({ ...selectedCounts, [game.id]: selectedCount + 1, }); } }} disabled={selectedCount >= game.maxPlayers}>
                                    ➕
                                </button>
                            </div>
                            <button className="block w-full mt-3 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400" onClick={() => handleSelectClick(game)} disabled={game.status !== "ACTIVE"}>
                                Select ₹{selectedCount * game.price}
                            </button>
                        </div>
                    );
                })}
            </div>

            {modalGame && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-black">
                        <h2 className="text-xl font-bold mb-4">Confirm Your Game</h2>
                        <div className="space-y-2">
                            <p><span className="font-semibold">Game:</span> {modalGame.name}</p>
                            <p><span className="font-semibold">Players:</span> {selectedCounts[modalGame.id]}</p>
                            <p className="text-lg font-bold mt-2">
                                <span className="font-semibold">Total Cost:</span> ₹{selectedCounts[modalGame.id] * modalGame.price}
                            </p>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setModalGame(null)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                                disabled={isProcessing}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPayment}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : "Confirm & Play"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}