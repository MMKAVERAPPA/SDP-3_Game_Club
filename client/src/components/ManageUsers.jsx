import { useEffect, useState } from "react";
import API from "../api/api";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await API.get("/members/all");
            let userCollections = []
            for(const user of res.data){
                if (user.role === 'USER'){
                    userCollections.push(user)
                }
            }
            setUsers(userCollections)
            console.log(userCollections)
        } catch (err) {
            console.error(err);
        }
    };

    const addUser = async () => {
        try {
            await API.post("/members/save", { name, phone, email, password, fee: 500 });
            setName(""); setPhone(""); setEmail(""); setPassword("");
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteUser = async (id) => {
        try {
            await API.delete(`/members/delete/${id}`);
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6">
            <h2 className="font-bold text-xl mb-4">Manage Users</h2>

            <div className="mb-4 flex flex-wrap gap-2">
                <input type="text" placeholder="Name" className="border p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Phone" className="border p-2 rounded" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="email" placeholder="Email" className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="border p-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={addUser}>Add</button>
            </div>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Balance</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="center">
                            <td className="border p-2">{u.name}</td>
                            <td className="border p-2">{u.phone}</td>
                            <td className="border p-2">{u.email}</td>
                            <td className="border p-2">₹{u.balance}</td>
                            <td className="border p-2">
                                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteUser(u.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
