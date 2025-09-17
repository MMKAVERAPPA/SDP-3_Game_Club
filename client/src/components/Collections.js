import React, { useState } from 'react';

function Collections() {
    const [date, setDate] = useState('');
    const [collectionData, setCollectionData] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Fetching collection for date:', date);

        // TODO: Replace with real API call
        const dummyData = {
            date: date || '2025-09-07',
            records: [
                { member: 'Suman', amount: 50 },
                { member: 'Sujan', amount: 100 },
                { member: 'Rakshith', amount: 150 },
            ],
        };

        setCollectionData(dummyData);
    };

    const totalAmount = collectionData?.records.reduce((sum, r) => sum + r.amount, 0);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Daily Recharge Collections</h2>

            <form onSubmit={handleSearch} style={styles.form}>
                <label style={styles.label}>Date (Optional):</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Search</button>
            </form>

            {collectionData && (
                <div style={styles.result}>
                    <h3>Recharge Collection on {collectionData.date}</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Member</th>
                                <th>Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collectionData.records.map((record, idx) => (
                                <tr key={idx}>
                                    <td>{record.member}</td>
                                    <td>₹{record.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4>Total: ₹{totalAmount}</h4>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
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
        marginBottom: '20px',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '5px',
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
    },
    result: {
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '6px',
        border: '1px solid #ddd',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '10px',
    }
};

export default Collections;
