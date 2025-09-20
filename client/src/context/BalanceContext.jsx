import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";
import { useAuth } from "./AuthContext";

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {

    const { user } = useAuth()
    const [balance, setBalance] = useState(0)

    const recharge = (amount) => {
        setBalance(balance + amount);
    }

    useEffect(() => {
        const getBalance = async () => {
            if (!user) return;
            try {
                const result = await API.get(`/members/${user.id}/balance`)
                recharge(result.data)
            } catch (err) {
                console.log("Error while fetching the balance")
            }
        }
        getBalance()
    }, [user])

    const deduct = (amount) => {
        if (balance - amount >= 1) {
            setBalance((prev) => prev - amount);
            return true;
        }
        return false;
    };

    return (
        <BalanceContext.Provider value={{ balance, setBalance, recharge, deduct }}>
            {children}
        </BalanceContext.Provider>
    );
};

export const useBalance = () => useContext(BalanceContext);
