import React, { useState } from 'react';

function MemberDetails() {
    const [activeTab, setActiveTab] = useState('games');

    // Dummy data for demonstration
    const member = {
        name: 'John Doe',
        phone: '9876543210',
        balance: 500,
    };

    const games = [
        { name: 'Chess', price: 50, description: '2 players needed' },
        { name: 'Carrom', price: 100, description: '2–4 players' },
        { name: 'Foosball', price: 150, description: 'Multiple allowed' },
    ];

    const recharges = [
        { dateTime: '2025-09-05 11:30', amount: 200 },
        { dateTime: '2025-09-02 15:10', amount: 300 },
    ];

    const playedGames = [
        { dateTime: '2025-09-06 19:45', game: 'Chess', amount: 50 },
        { dateTime: '2025-09-05 18:20', game: 'Carrom', amount: 100 },
        { dateTime: '2025-09-02 16:00', game: 'Foosball', amount: 150 },
    ];

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Member Details</h2>
            <div style={styles.memberInfo}>
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Phone:</strong> {member.phone}</p>
                <p><strong>Balance:</strong> ₹{member.balance}</p>
            </div>

            <div style={styles.tabs}>
                <button onClick={() => setActiveTab('games')} style={styles.tabButton}>Games</button>
                <button onClick={() => setActiveTab('recharges')} style={styles.tabButton}>Recharge History</button>
                <button onClick={() => setActiveTab('playedGames')} style={styles.tabButton}>Played Games History</button>
            </div>

            <div style={styles.tabContent}>
                {activeTab === 'games' && (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price (₹)</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((game, idx) => (
                                <tr key={idx}>
                                    <td>{game.name}</td>
                                    <td>{game.price}</td>
                                    <td>{game.description}</td>
                                    <td><button>Play Game</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {activeTab === 'recharges' && (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Date/Time</th>
                                <th>Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recharges.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.dateTime}</td>
                                    <td>{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {activeTab === 'playedGames' && (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Date/Time</th>
                                <th>Game</th>
                                <th>Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playedGames.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.dateTime}</td>
                                    <td>{item.game}</td>
                                    <td>{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#fafafa',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    memberInfo: {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        border: '1px solid #ddd',
    },
    tabs: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '20px',
    },
    tabButton: {
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
    },
    tabContent: {
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '6px',
        border: '1px solid #ddd',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        borderBottom: '1px solid #ddd',
        padding: '10px',
        textAlign: 'left',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    }
};

export default MemberDetails;
