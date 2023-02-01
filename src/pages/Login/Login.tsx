import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      const isLogged = await auth.login(email, password);
      if (isLogged) {
        navigate('/home')
      } else {
        alert('Credenciais inválidas')
      }
    }
  }

  return (
    <div>
      <h1>Faça login</h1>
      <label>
        <p>Username</p>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder={'Digite seu e-mail'} />
      </label>
      <label>
        <p>Password</p>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={'Digite sua senha'} />
      </label>
      <div>
        <button onClick={handleLogin} type="submit">Submit</button>
      </div>
    </div>

  )
}
