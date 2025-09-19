import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { role: "admin" | "user", username: "" }
    const navigate = useNavigate();

    const login = (username, password) => {
        // Dummy login: you can connect backend later
        if (username === "admin" && password === "admin") {
            setUser({ role: "admin", username: "admin" });
            navigate("/admin");
        } else if (username === "user" && password === "user") {
            setUser({ role: "user", username: "user" });
            navigate("/user");
        } else {
            alert("Invalid credentials");
        }
    };

    const logout = () => {
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
