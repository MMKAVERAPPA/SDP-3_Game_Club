import { Link } from "react-router-dom";

export default function AdminDashboard() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
                Admin Dashboard
            </h2>
            <div className="grid grid-cols-2 gap-6">
                {/* User Management */}
                <div className="border rounded p-4 shadow bg-white dark:bg-gray-800">
                    <h3 className="font-semibold text-black dark:text-white">User Management</h3>
                    <p className="text-gray-700 dark:text-gray-300">Create, edit, or delete members</p>
                    <Link to="/manage-users">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white mt-2 px-4 py-2 rounded">
                            Manage Users
                        </button>
                    </Link>
                    {/* 🔗 API: GET /members (list), POST /members (create), PUT /members/:id (update), DELETE /members/:id (delete) */}
                </div>

                {/* Game Management */}
                <div className="border rounded p-4 shadow bg-white dark:bg-gray-800">
                    <h3 className="font-semibold text-black dark:text-white">Game Management</h3>
                    <p className="text-gray-700 dark:text-gray-300">Add, edit, or remove games</p>
                    <Link to="/manage-games">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white mt-2 px-4 py-2 rounded">
                            Manage Games
                        </button>
                    </Link>
                    {/* 🔗 API: GET /games (list), POST /games (create), PUT /games/:id (update), DELETE /games/:id (delete) */}
                </div>

                {/* Daily Collections */}
                <div className="border rounded p-4 shadow bg-white dark:bg-gray-800">
                    <h3 className="font-semibold text-black dark:text-white">Daily Collections</h3>
                    <p className="text-gray-700 dark:text-gray-300">View transactions and revenue</p>
                    <Link to="/collections">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white mt-2 px-4 py-2 rounded">
                            View Collections
                        </button>
                    </Link>
                    {/* 🔗 API: GET /collections/daily, GET /collections/overall */}
                </div>

                {/* Transaction Processing */}
                <div className="border rounded p-4 shadow bg-white dark:bg-gray-800">
                    <h3 className="font-semibold text-black dark:text-white">Transaction Processing</h3>
                    <p className="text-gray-700 dark:text-gray-300">Process user transactions</p>
                    <Link to="/process-transaction">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white mt-2 px-4 py-2 rounded">
                            Process Transactions
                        </button>
                    </Link>
                    {/* 🔗 API: POST /transactions/process */}
                </div>
            </div>
        </div>
    );
}
