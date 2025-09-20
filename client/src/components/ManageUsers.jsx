import { useEffect, useState } from "react";
import API from "../api/api";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [editingUserId, setEditingUserId] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await API.get("/members/all");
            const userCollections = res.data.filter(user => user.role === 'USER');
            setUsers(userCollections);
        } catch (err) {
            console.error(err);
        }
    };

    const clearForm = () => {
        setName(""); setPhone(""); setEmail(""); setPassword("");
        setEditingUserId(null);
    };

    const addUser = async () => {
        try {
            await API.post("/members/save", { name, phone, email, password });
            clearForm();
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    const updateUser = async () => {
        if (!editingUserId) return;
        try {
            await API.put(`/members/update/${editingUserId}`, { name, phone, email, password });
            clearForm();
            fetchUsers();
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    const handleEditClick = (user) => {
        setEditingUserId(user.id);
        setName(user.name);
        setPhone(user.phone);
        setEmail(user.email);
        setPassword(user.password)
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await API.delete(`/members/delete/${id}`);
                fetchUsers();
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6">
            <h2 className="font-bold text-xl mb-4">{editingUserId ? "Edit User" : "Add a New User"}</h2>

            <div className="mb-4 flex flex-wrap gap-2 items-center p-4 rounded-lg">
                <input type="text" placeholder="Name" className="border p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Phone" className="border p-2 rounded" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="email" placeholder="Email" className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="border p-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />


                {editingUserId ? (
                    <>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={updateUser}>Update</button>
                        <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={clearForm}>Cancel</button>
                    </>
                ) : (
                    <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={addUser}>Add</button>
                )}
            </div>

            {/* ✨ Added a wrapper div for the table with the outer border */}
            <div className=" bg-gray-700 border-2 border-white rounded-lg overflow-hidden shadow-md">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-800 text-white text-center">
                            <th className="p-3  border-b border-r border-white">User ID</th>
                            <th className="p-3  border-b border-r border-white">Name</th>
                            <th className="p-3  border-b border-r border-white">Phone</th>
                            <th className="p-3  border-b border-r border-white">Email</th>
                            <th className="p-3  border-b border-r border-white">Password</th>
                            <th className="p-3  border-b border-r border-white">Balance</th>
                            <th className="p-3 text-center border-b border-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-b border-white text-center">
                                <td className="p-3 border-r border-white">{u.id}</td>
                                <td className="p-3 border-r border-white">{u.name}</td>
                                <td className="p-3 border-r border-white">{u.phone}</td>
                                <td className="p-3 border-r border-white">{u.email}</td>
                                <td className="p-3 border-r border-white">{u.password}</td>
                                <td className="p-3 border-r border-white">₹{u.balance}</td>
                                <td className="p-3 text-center">
                                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteUser(u.id)}>Delete</button>
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded ml-2" onClick={() => handleEditClick(u)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}