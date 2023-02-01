import { Route, Router, Routes } from "react-router-dom";
import { RequireAuth } from "../contexts/Auth/RequireAuth";
import Home from '../pages/Home/Home'
import Login from "../pages/Login/Login";
import Private from "../pages/Private/Private";

export default function RoutesApp() {
    return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/private" element={<RequireAuth><Private /></RequireAuth>} />
        </Routes>
    )
}