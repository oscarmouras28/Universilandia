import { useState } from "react";
import { loginUser } from "../services/authAPI";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (correo: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(correo, password);
      localStorage.setItem("token", data.token);
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return { login, logout, loading, error };
}
