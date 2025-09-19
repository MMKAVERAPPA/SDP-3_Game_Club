import { useState, useEffect } from "react";
import { useBalance } from "../context/BalanceContext";
import API from "../api/api"; // ✅ Import API
import { useAuth } from "../context/AuthContext";

export default function GamesPage() {
    const {user} = useAuth()
    const { deduct } = useBalance();
    const [games, setGames] = useState([]); 
    const [selectedCounts, setSelectedCounts] = useState({}); 

    // ✅ Fetch games from backend
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const result = await API.get("/games/all");
                setGames(result.data);

                // ✅ Initialize counts with minPlayers
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

    const selectGame = async (game) => {
        const currentCount = selectedCounts[game.id] || game.minPlayers;

        if (currentCount > game.maxPlayers) {
            alert(`You can only select this game up to ${game.maxPlayers} times.`);
            return;
        }

        if (deduct(game.price * currentCount)) {
            alert(`${game.name} selected successfully with ${currentCount} players!`);

            try {
                await API.post("/transactions/play", {
                  gameId: game.id,
                  memberId: user.id,
                  amount: game.price * currentCount,
                });
            } catch (err) {
                console.error("Error saving transaction:", err);
            }
        } else {
            alert("Insufficient balance!");
        }
    };

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-900">
            {games.map((game) => {
                const selectedCount = selectedCounts[game.id] ?? game.minPlayers;

                return (
                    <div
                        key={game.id}
                        className="border rounded p-4 shadow bg-white text-black"
                    >
                        <h3 className="font-bold text-lg">{game.name}</h3>
                        <p className="text-sm text-gray-700">{game.description}</p>
                        <p className="font-semibold mt-2">Entry Fee: ₹{game.price}</p>

                        <div className="mt-2 text-sm">
                            <p>⏳ Duration: {game.duration}</p>
                            <p>👥 Min Players: {game.minPlayers}</p>
                            <p>👥 Max Players: {game.maxPlayers}</p>
                        </div>

                        <span
                            className={`inline-block mt-2 text-xs px-2 py-1 rounded font-semibold ${
                                game.status === "ACTIVE"
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                            }`}
                        >
                            {game.status}
                        </span>

                        <div className="flex items-center justify-center space-x-3 mt-2">
                            {/* Decrease button */}
                            <button
                                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                                onClick={() => {
                                    if (selectedCount > game.minPlayers) {
                                        setSelectedCounts({
                                            ...selectedCounts,
                                            [game.id]: selectedCount - 1,
                                        });
                                    }
                                }}
                                disabled={selectedCount <= game.minPlayers}
                            >
                                ➖
                            </button>

                            {/* Count display */}
                            <p className="text-center font-medium">
                                ({selectedCount}/{game.maxPlayers})
                            </p>

                            {/* Increase button */}
                            <button
                                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                                onClick={() => {
                                    if (selectedCount < game.maxPlayers) {
                                        setSelectedCounts({
                                            ...selectedCounts,
                                            [game.id]: selectedCount + 1,
                                        });
                                    }
                                }}
                                disabled={selectedCount >= game.maxPlayers}
                            >
                                ➕
                            </button>
                        </div>

                        <button
                            className="block w-full mt-3 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
                            onClick={() => selectGame(game)}
                            disabled={game.status !== "ACTIVE"}
                        >
                            Select ₹{selectedCount * game.price}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
