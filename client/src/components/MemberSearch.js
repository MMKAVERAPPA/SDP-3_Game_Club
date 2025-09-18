import React, { useState } from 'react';

function MemberSearch() {
    const [phone, setPhone] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching Member by Phone:', phone);

        // TODO: Replace with real API call
        const dummyMember = {
            name: 'John Doe',
            phone: phone,
            balance: 500
        };

        setSearchResult(dummyMember);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Member Search</h2>
            <form onSubmit={handleSearch} style={styles.form}>
                <label style={styles.label}>Phone:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Search</button>
            </form>

            {searchResult && (
                <div style={styles.result}>
                    <h3>Search Result</h3>
                    <p><strong>Name:</strong> {searchResult.name}</p>
                    <p><strong>Phone:</strong> {searchResult.phone}</p>
                    <p><strong>Balance:</strong> ₹{searchResult.balance}</p>
                </div>
            )}
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
    },
    result: {
        marginTop: '20px',
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        backgroundColor: '#fff',
    }
};

export default MemberSearch;
