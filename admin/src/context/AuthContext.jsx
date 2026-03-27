import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const adminInfo = localStorage.getItem("adminInfo");
        if (adminInfo) {
            setAdmin(JSON.parse(adminInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post("/admin/login", { email, password });
        localStorage.setItem("adminInfo", JSON.stringify(data));
        setAdmin(data);
    };

    const logout = () => {
        localStorage.removeItem("adminInfo");
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
