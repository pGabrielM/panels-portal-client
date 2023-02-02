import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export default function Home() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await auth.logout();
    navigate('/login')
  }

  return (
    <div>
      <h1>Hello {auth.user?.name}</h1>
      <button onClick={handleLogout}><a>Sair</a></button>
    </div>
  )
}