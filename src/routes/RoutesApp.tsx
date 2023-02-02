import { Route, Router, Routes } from "react-router-dom";
import { RequireAuth } from "../contexts/Auth/RequireAuth";
import Sidebar from "../pages/Admin/Sidebar";
import Login from "../pages/Login/Login";
import Portal from "../pages/Portal/Portal";

export default function RoutesApp() {
    return (
        <Routes>
          <Route path="/portal" element={<Portal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<RequireAuth><Sidebar/></RequireAuth>} />
        </Routes>
    )
}