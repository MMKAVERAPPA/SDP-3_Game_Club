import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
    return (
        <div style={styles.app}>
            <Navbar />
            <main style={styles.main}>
                <Outlet />
            </main>
            <footer style={styles.footer}>
                © 2025 Gaming Club. All rights reserved.
            </footer>
        </div>
    );
}

const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        flex: '1',
        padding: '20px',
        backgroundColor: '#f4f6f8',
    },
    footer: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#2c3e50',
        color: 'white',
    }
};

export default Layout;