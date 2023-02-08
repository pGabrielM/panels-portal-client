import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Outlet, Route, Router, Routes } from "react-router-dom";
import { RequireAuth } from "../contexts/Auth/RequireAuth";
import CreatePanel from "../pages/Admin/AdminPages/Create/CreatePanel";
import Home from "../pages/Admin/AdminPages/Home";
import Sidebar from "../pages/Admin/Sidebar";
import Login from "../pages/Login/Login";
import Portal from "../pages/Portal/Portal";

const AppLayout = () => {
  return (
    <RequireAuth>
      <Sidebar OutletElement={<Outlet />} />
    </RequireAuth>
  )
}

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Portal />}/>        
        <Route path="/portal" element={<Portal />} />
        <Route path="/login" element={<Login />} />

        <Route element={<AppLayout />}>
          <Route path={'/admin'} element={<Home />} />
          <Route path={'/admin/create'} element={<CreatePanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}