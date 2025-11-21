import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Custom Hook: Use anywhere in frontend
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load logged-in user on refresh
  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.error("Auth load error:", err);
      setUser(null);
      localStorage.removeItem("token");
    }

    setLoading(false);
  };

  // Run on page refresh
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loadUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
