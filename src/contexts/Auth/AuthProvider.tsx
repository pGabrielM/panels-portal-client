import { useEffect, useState } from "react";
import { User } from "../../@types/User";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();
  

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem('authToken');
      if(storageData) {
        const data = await api.validateToken(storageData)
        if(data) {
          setUser(data)
        }
      }
    }
    validateToken();
  }, [])

  async function login(email: string, password: string) {
    const data = await api.login(email, password);

    if (data.user && data.token) {
      setUser(data.user);
      setToken(data.token)
      return true;
    }
    return false;
  }

  async function logout() {
    setUser(null);
    setToken('')
  }

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}