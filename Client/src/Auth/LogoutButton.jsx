import { useState } from "react";
import axios from "axios";

export const LogoutButton = ({ onLogout }) => {
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3000/auth/logout', {}, {
                withCredentials: true,
            });

            if (response.status === 200) {
                onLogout();
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={logout} disabled={loading}>
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    );
};
