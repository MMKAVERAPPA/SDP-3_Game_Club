import { useState, useEffect } from "react";
import { useBalance } from "../context/BalanceContext";
import API from "../api/api"; // ✅ Import API

export default function GamesPage() {
    const { balance, deduct } = useBalance();
    const [games, setGames] = useState([]); // ✅ will come from API
    const [selectedCounts, setSelectedCounts] = useState({}); // track selections per game

    // ✅ Fetch games from backend
    useEffect(() => {
        const fetchGames = async () => {
            try {
                // ✅ Replace with your backend API
                // Example: const res = await API.get("/games");
                // setGames(res.data);
            } catch (err) {
                console.error("Error fetching games:", err);
            }
        };
        fetchGames();
    }, []);

    const selectGame = async (game) => {
        const currentCount = selectedCounts[game.id] || 0;

        if (currentCount >= game.max_player_count) {
            alert(`You can only select this game up to ${game.max_player_count} times.`);
            return;
        }

        if (deduct(game.price)) {
            setSelectedCounts({
                ...selectedCounts,
                [game.id]: currentCount + 1,
            });
            alert(`${game.name} selected successfully!`);

            try {
                // ✅ Call backend API to record the game selection/transaction
                // Example:
                // await API.post("/transactions", {
                //   gameId: game.id,
                //   userId: "currentUserId", // replace with logged-in user from context
                //   amount: game.price,
                //   dateTime: new Date(),
                // });
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
                const selectedCount = selectedCounts[game.id] || 0;

                return (
                    <div
                        key={game.id}
                        className="border rounded p-4 shadow bg-white text-black"
                    >
                        <h3 className="font-bold text-lg">{game.name}</h3>
                        <p className="text-sm text-gray-700">{game.description}</p>
                        <p className="font-semibold mt-2">₹{game.price}</p>

                        <div className="mt-2 text-sm">
                            <p>⏳ Duration: {game.duration}</p>
                            <p>👥 Players: {game.min_player_count} - {game.max_player_count}</p>
                            <p>
                                {game.multiple_player_count
                                    ? "✅ Multiple players supported"
                                    : "❌ Single match only"}
                            </p>
                        </div>

                        <span
                            className={`inline-block mt-2 text-xs px-2 py-1 rounded font-semibold ${game.status === "Active"
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                                }`}
                        >
                            {game.status}
                        </span>

                        <button
                            className="block w-full mt-3 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
                            onClick={() => selectGame(game)}
                            disabled={game.status !== "Active"}
                        >
                            Select ({selectedCount}/{game.max_player_count})
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
