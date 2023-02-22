import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { RequireAuth } from "../contexts/Auth/RequireAuth";
import DeletePanel from "../pages/Admin/AdminPages/Panel/Delete/DeletePanel";
import Home from "../pages/Admin/AdminPages/Home";
import ListPanel from "../pages/Admin/AdminPages/Panel/List/ListPanel";
import UpdatePanel from "../pages/Admin/AdminPages/Panel/Update/UpdatePanel";
import Sidebar from "../pages/Admin/Layout/Sidebar";
import Login from "../pages/Login/Login";
import Portal from "../pages/Portal/Portal";
import CreatePanel from "../pages/Admin/AdminPages/Panel/Create/CreatePanel";
import CreateCategory from "../pages/Admin/AdminPages/Ramification/Create/CreateRamification";

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
          <Route path={'/admin/panel/create'} element={<CreatePanel />} />
          <Route path={'/admin/panel/list'} element={<ListPanel />} />
          <Route path={'/admin/panel/delete'} element={<DeletePanel />} />
          <Route path={'/admin/panel/update'} element={<UpdatePanel />} />
          
          <Route path={'/admin/category/create'} element={<CreateCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}