import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ScanDetail from "../pages/ScanDetail";
import AppLayout from "../layouts/AppLayouts";
import { useAuth } from "../context/AuthContext";

function PrivateLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <AppLayout />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login without layout */}
        <Route path="/" element={<Login />} />

        {/* Layout routes */}
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scans/:id" element={<ScanDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}