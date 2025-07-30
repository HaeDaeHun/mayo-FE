import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LayoutWithHeader from './layouts/HeaderLayout'; // 헤더
import LayoutWithSidebar from './layouts/SidebarLayout'; // 헤더 + 레프트바
import OnboardingRoutes from './routes/OnboardingRoutes';
import Home from './pages/Home';
import HomeLogin from './pages/HomeLogin';
import Login from './pages/Login';
import Alarm from './pages/alarm';
import Profile from './pages/profile';
import Contents from './pages/Contents';
import Apply from './pages/Apply';
import OAuthCallback from './pages/OAuthCallback'; // OAuth 콜백 처리 컴포넌트 추가

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();

  const path = location.pathname;

  if (path.startsWith('/onboarding')) {
    // 온보딩 경로는 아무 레이아웃도 없음
    return (
      <Routes>
        <Route path="/onboarding/*" element={<OnboardingRoutes />} />
      </Routes>
    );
  }

  if (path === '/login') {
    // 로그인 페이지는 헤더만
    return (
      <Routes>
        <Route element={<LayoutWithHeader />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    );
  }

  if (path === '/api/oauth') {
    // OAuth 콜백 처리 - 레이아웃 없음
    return (
      <Routes>
        <Route path="/api/oauth" element={<OAuthCallback />} />
      </Routes>
    );
  }

  // 기본: 헤더 + 레프트바 (SidebarLayout 사용)
  return (
    <Routes>
      <Route element={<LayoutWithSidebar />}>
        <Route path="/" element={<Home />} />
        <Route path="/alarm" element={<Alarm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contents" element={<Contents />} />
        <Route path='/HomeLogin' element={<HomeLogin />} />
        <Route path='/Apply' element={<Apply />} />
        {/* 필요한 페이지 추가 */}
      </Route>
    </Routes>
  );
}

export default App;