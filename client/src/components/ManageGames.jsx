import { useEffect, useState } from "react";
import API from "../api/api";

export default function ManageGames() {
    const [games, setGames] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("active");
    const [duration, setDuration] = useState("");
    const [minPlayers, setMinPlayers] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");


    const fetchGames = async () => {
        try {
            const res = await API.get("/games/all");
            setGames(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchGames()
    }, [])

    const addGame = async () => {
        try {
            await API.post("/games/save", { name, price, description: desc, status, duration, minPlayers, maxPlayers});
            setName(""); setPrice(""); setDesc(""); setStatus("active"); setDuration(""); setMinPlayers(""); setMaxPlayers("");
            fetchGames();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteGame = async (id) => {
        try {
            await API.delete(`/games/delete/${id}`);
            fetchGames();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div className="p-6">
            <h2 className="font-bold text-xl mb-4">Manage Games</h2>

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
                <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={addGame}>Add</button>
            </div>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-800 text-white">
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
                            <td className="border p-2">₹{g.price}</td>
                            <td className="border p-2">{g.description}</td>
                            <td className="border p-2">{g.status}</td>
                            <td className="border p-2">{g.duration}</td>
                            <td className="border p-2">{g.minPlayers}</td>
                            <td className="border p-2">{g.maxPlayers}</td>
                            <td className="border p-2">
                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteGame(g.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
