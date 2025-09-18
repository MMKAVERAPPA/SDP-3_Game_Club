import React, { useState } from 'react';

function MembershipCreation() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [fee, setFee] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Membership Created:', { name, phone, fee });
        alert('Membership Created (placeholder)');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Create Membership</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    required
                />

                <label style={styles.label}>Phone:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={styles.input}
                    required
                />

                <label style={styles.label}>Membership Fee (₹):</label>
                <input
                    type="number"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    style={styles.input}
                    required
                />

                <button type="submit" style={styles.button}>Create Membership</button>
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

export default MembershipCreation;
