import { Link } from "react-router-dom";

// A reusable component for the main action cards
const ActionCard = ({ icon, title, description, linkTo, buttonText }) => (
    // ✨ Classes added here to center all content
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 hover:shadow-indigo-500/30 transition-all duration-300">
        <span className="text-5xl mb-4">{icon}</span>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 mt-2 mb-6 flex-grow">{description}</p>
        <Link
            to={linkTo}
            className="mt-auto bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
            {buttonText}
        </Link>
    </div>
);

export default function AdminDashboard() {
    return (
        <div className="p-6 md:p-8 bg-gray-900 min-h-screen text-white">
            <h2 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h2>

            {/* Main Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <ActionCard
                    icon="👤"
                    title="User Management"
                    description="Add, edit, update, or delete club members."
                    linkTo="/manage-users"
                    buttonText="Manage Users"
                />
                <ActionCard
                    icon="🎲"
                    title="Game Management"
                    description="Manage the list of available games and their prices."
                    linkTo="/manage-games"
                    buttonText="Manage Games"
                />
                <ActionCard
                    icon="📊"
                    title="Collections"
                    description="View daily and overall revenue from games and recharges."
                    linkTo="/collections"
                    buttonText="View Collections"
                />
                <ActionCard
                    icon="🔍"
                    title="Member Details"
                    description="Search for members and view their complete details."
                    linkTo="/process-transaction"
                    buttonText="View Details"
                />
            </div>
        </div>
    );
}