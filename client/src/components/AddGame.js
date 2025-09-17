import React, { useState } from 'react';

function AddGame() {
    const [gameName, setGameName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [minPlayers, setMinPlayers] = useState('');
    const [multipleAllowed, setMultipleAllowed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Game Added:', { gameName, price, description, minPlayers, multipleAllowed });

        // TODO: Replace with actual API call to add game
        alert('Game added (placeholder)');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Add Game</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Game Name:</label>
                <input
                    type="text"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    style={styles.input}
                    required
                />

                <label style={styles.label}>Price (₹):</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={styles.input}
                    required
                />

                <label style={styles.label}>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={styles.input}
                    required
                />

                <label style={styles.label}>Minimum Players:</label>
                <input
                    type="number"
                    value={minPlayers}
                    onChange={(e) => setMinPlayers(e.target.value)}
                    style={styles.input}
                    required
                />

                <label style={{ ...styles.label, display: 'flex', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        checked={multipleAllowed}
                        onChange={(e) => setMultipleAllowed(e.target.checked)}
                        style={{ marginRight: '10px' }}
                    />
                    Multiple Players Allowed
                </label>

                <button type="submit" style={styles.button}>Add Game</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fafafa',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        marginBottom: '15px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
    }
};

export default AddGame;
