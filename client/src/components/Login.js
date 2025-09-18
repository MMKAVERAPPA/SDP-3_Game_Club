import React, { useState } from 'react';
// We will use this hook later to redirect after login
// import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // For now, we'll simulate a successful login
        console.log('Logging in with:', { username, password });
        alert('Login successful! (placeholder)');
        // Later, we'll uncomment this to redirect to the dashboard
        // navigate('/member-search'); 
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h1 style={styles.title}>GAMING CLUB APP</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
            <footer style={styles.footer}>
                © 2025 Gaming Club. All rights reserved.
            </footer>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
    },
    loginBox: {
        padding: '40px',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '350px',
    },
    title: {
        marginBottom: '2rem',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    footer: {
        position: 'absolute',
        bottom: '0',
        width: '100%',
        textAlign: 'center',
        padding: '20px',
        color: '#888',
    }
};

export default Login;