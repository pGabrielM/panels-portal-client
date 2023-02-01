import { Link } from "react-router-dom";

export default function Private() {
  return (
    <div>
      <h1>Hello from private</h1>
      <Link to={'/home'}>home</Link>
    </div>
  )
}