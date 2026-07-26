import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPortfolio from "./pages/MainPortfolio";
import GlobalCertifications from "./pages/GlobalCertifications";
import PortfolioNavbar from "./components/PortfolioNavbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* PROTECTED CONTINUOUS PORTFOLIO ROUTES */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPortfolio initialSection="home" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <MainPortfolio initialSection="about" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/skills"
        element={
          <ProtectedRoute>
            <MainPortfolio initialSection="skills" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <MainPortfolio initialSection="projects" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/experience"
        element={
          <ProtectedRoute>
            <MainPortfolio initialSection="experience" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/certifications"
        element={
          <ProtectedRoute>
            <MainPortfolio initialSection="certifications" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-tools"
        element={
          <ProtectedRoute>
            <MainPortfolio initialSection="ai-tools" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <MainPortfolio initialSection="contact" />
          </ProtectedRoute>
        }
      />

      {/* SUB-CERTIFICATION ROUTES */}
      <Route
        path="/certifications/global"
        element={
          <ProtectedRoute>
            <PortfolioNavbar />
            <GlobalCertifications />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
