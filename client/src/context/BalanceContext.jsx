import { createContext, useContext, useState } from "react";

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
    const [balance, setBalance] = useState(500); // default ₹500

    const recharge = (amount) => {
        setBalance((prev) => Math.min(20000, prev + amount));
    };

    const deduct = (amount) => {
        if (balance - amount >= 1) {
            setBalance((prev) => prev - amount);
            return true;
        }
        return false;
    };

    return (
        <BalanceContext.Provider value={{ balance, recharge, deduct }}>
            {children}
        </BalanceContext.Provider>
    );
};

export const useBalance = () => useContext(BalanceContext);
