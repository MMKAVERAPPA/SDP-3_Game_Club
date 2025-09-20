import { useEffect, useState } from "react";
import API from "../api/api";

export default function ManageGames() {
    const [games, setGames] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("ACTIVE");
    const [duration, setDuration] = useState("");
    const [minPlayers, setMinPlayers] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");

    // ✨ State to track which game is being edited
    const [editingGameId, setEditingGameId] = useState(null);

    const fetchGames = async () => {
        try {
            const res = await API.get("/games/all");
            setGames(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // ✨ Helper function to clear the form and exit edit mode
    const clearForm = () => {
        setName(""); setPrice(""); setDesc(""); setStatus("ACTIVE");
        setDuration(""); setMinPlayers(""); setMaxPlayers("");
        setEditingGameId(null);
    };

    const addGame = async () => {
        try {
            await API.post("/games/save", { name, price, description: desc, status, duration, minPlayers, maxPlayers });
            clearForm();
            fetchGames();
        } catch (err) {
            console.error(err);
        }
    };

    // ✨ Function to handle the update API call
    const updateGame = async () => {
        if (!editingGameId) return;
        try {
            await API.put(`/games/update/${editingGameId}`, { name, price, description: desc, status, duration, minPlayers, maxPlayers });
            clearForm();
            fetchGames();
        } catch (err) {
            console.error("Error updating game:", err);
        }
    };

    // ✨ Function to populate the form for editing
    const handleEditClick = (game) => {
        setEditingGameId(game.id);
        setName(game.name);
        setPrice(game.price);
        setDesc(game.description);
        setStatus(game.status);
        setDuration(game.duration);
        setMinPlayers(game.minPlayers);
        setMaxPlayers(game.maxPlayers);
    };

    const deleteGame = async (id) => {
        if (window.confirm("Are you sure you want to delete this game?")) {
            try {
                await API.delete(`/games/delete/${id}`);
                fetchGames();
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div className="p-6">
            <h2 className="font-bold text-xl mb-4">{editingGameId ? `Editing Game: ${name}` : "Manage Games"}</h2>

            <div className="mb-4 flex flex-wrap gap-2">
                <input type="text" placeholder="Game Name" className="border p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder="Price" className="border p-2 rounded" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="text" placeholder="Description" className="border p-2 rounded" value={desc} onChange={(e) => setDesc(e.target.value)} />
                <select className="border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>
                <input type="text" placeholder="Duration (min)" className="border p-2 rounded" value={duration} onChange={(e) => setDuration(e.target.value)} />
                <input type="number" placeholder="Min Players" className="border p-2 rounded" value={minPlayers} onChange={(e) => setMinPlayers(e.target.value)} />
                <input type="number" placeholder="Max Players" className="border p-2 rounded" value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)} />

                {/* ✨ Buttons change based on whether you are adding or editing */}
                {editingGameId ? (
                    <>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={updateGame}>Update</button>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={clearForm}>Cancel</button>
                    </>
                ) : (
                    <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={addGame}>Add</button>
                )}
            </div>

            <table className="bg-gray-700 border-2 w-full">
                <thead>
                    <tr className="bg-blue-800 text-white">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Description</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Duration (Min)</th>
                        <th className="p-2 border">Min Players</th>
                        <th className="p-2 border">Max Players</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((g) => (
                        <tr key={g.id}>
                            <td className="border p-2">{g.name}</td>
                            <td className="border p-2 text-green-600 text-center">₹{g.price}</td>
                            <td className="border p-2">{g.description}</td>
                            <td className={`text-center font-semibold border p-2 ${g.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
                                {g.status}
                            </td>
                            <td className="text-center border p-2 text-orange-400">{g.duration}</td>
                            <td className="text-center border p-2">{g.minPlayers}</td>
                            <td className="text-center border p-2">{g.maxPlayers}</td>
                            <td className="border p-2 text-center">
                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteGame(g.id)}>Delete</button>
                                <button className="bg-blue-500 text-white px-2 py-1 rounded ml-2" onClick={() => handleEditClick(g)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}