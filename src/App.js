import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import LayoutWithHeader from "./layouts/HeaderLayout";
import LayoutWithSidebar from "./layouts/SidebarLayout";
import OnboardingRoutes from "./routes/OnboardingRoutes";

import Home from "./pages/Home";
import HomeLogin from "./pages/HomeLogin";
import Login from "./pages/Login";
import KakaoCallback from "./pages/KakaoCallback";
import Alarm from "./pages/Alarm";
import Profile from "./pages/Profile";
import Contents from "./pages/Contents";
import Apply from "./pages/Apply";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/onboarding")) {
    return (
      <Routes>
        <Route path="/onboarding/*" element={<OnboardingRoutes />} />
      </Routes>
    );
  }

  if (pathname === "/login/oauth2/code/kakao") {
    return (
      <Routes>
        <Route
          path="/login/oauth2/code/kakao"
          element={<KakaoCallback />}
        />
      </Routes>
    );
  }

  if (pathname === "/login") {
    return (
      <Routes>
        <Route element={<LayoutWithHeader />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<LayoutWithSidebar />}>
        <Route path="/" element={<Home />} />
        <Route path="/alarm" element={<Alarm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contents" element={<Contents />} />
        <Route path="/HomeLogin" element={<HomeLogin />} />
        <Route path="/Apply" element={<Apply />} />
      </Route>
    </Routes>
  );
}

export default App;