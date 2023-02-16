import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { RequireAuth } from "../contexts/Auth/RequireAuth";
import CreatePanel from "../pages/Admin/AdminPages/Create/CreatePanel";
import DeletePanel from "../pages/Admin/AdminPages/Delete/DeletePanel";
import Home from "../pages/Admin/AdminPages/Home";
import ListPanel from "../pages/Admin/AdminPages/List/ListPanel";
import UpdatePanel from "../pages/Admin/AdminPages/Update/UpdatePanel";
import Sidebar from "../pages/Admin/Layout/Sidebar";
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
        <Route path="*" element={<Portal />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/login" element={<Login />} />

        <Route element={<AppLayout />}>
          <Route path={'/admin'} element={<Home />} />
          <Route path={'/admin/create'} element={<CreatePanel />} />
          <Route path={'/admin/list'} element={<ListPanel />} />
          <Route path={'/admin/delete'} element={<DeletePanel />} />
          <Route path={'/admin/update'} element={<UpdatePanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}