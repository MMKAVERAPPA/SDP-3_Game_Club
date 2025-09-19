import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []); 

    const login = async (email, password) => {
        if(email && password){
            const credentials = {
                "email" : email,
                "password" : password
            }
            const result = await API.post('/members/auth', credentials)
            localStorage.setItem("user", JSON.stringify(result.data));
            setUser(result.data)
            if(result.data.role == 'ADMIN'){
                navigate('/admin')
            }else{
                navigate('/user')
            }
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user"); // only remove auth info
        navigate("/login", { replace: true }); // prevents going back with browser back button
    };


    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
