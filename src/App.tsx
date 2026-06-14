import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddHeritage from "./pages/AddHeritage";
import HeritageRecords from "./pages/HeritageRecords";
import EditHeritage from "./pages/EditHeritage";
import Custodians from "./pages/Custodians";
import Festivals from "./pages/Festivals";
import PublicListings from "./pages/PublicListings";
import Reports from "./pages/Reports";
import Developers from "./pages/Developers";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import { HERITAGE_EDITOR_ROLES, ORGANIZATION_MANAGER_ROLES } from "./types/UserRole";

function App() {
  return (
    <BrowserRouter>
    <div className="app-background">
        <Routes>
          {/* PUBLIC PAGES */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/public-listings" element={<PublicListings />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/developers" element={<Developers />} />

          {/* PROTECTED ADMIN PAGES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/heritage-records"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <HeritageRecords />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-heritage"
            element={
              <ProtectedRoute allowedRoles={HERITAGE_EDITOR_ROLES}>
                <MainLayout>
                  <AddHeritage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-heritage/:id"
            element={
              <ProtectedRoute allowedRoles={HERITAGE_EDITOR_ROLES}>
                <MainLayout>
                  <EditHeritage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/custodians"
            element={
              <ProtectedRoute allowedRoles={ORGANIZATION_MANAGER_ROLES}>
                <MainLayout>
                  <Custodians />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/festivals"
            element={
              <ProtectedRoute allowedRoles={ORGANIZATION_MANAGER_ROLES}>
                <MainLayout>
                  <Festivals />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Reports />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;