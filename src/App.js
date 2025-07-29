// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LayoutWithHeader from './layouts/HeaderLayout';      // 헤더만
import LayoutWithSidebar from './layouts/SidebarLayout';    // 헤더 + 사이드바
import OnboardingRoutes from './routes/OnboardingRoutes';
import Home from './pages/Home';
import HomeLogin from './pages/HomeLogin';
import Login from './pages/Login';
import KakaoCallback from './pages/KakaoCallback';         // 콜백 컴포넌트
import Alarm from './pages/alarm';
import Profile from './pages/profile';
import Contents from './pages/Contents';
import Apply from './pages/Apply';

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

  // 1) 온보딩: 레이아웃 없음
  if (path.startsWith('/onboarding')) {
    return (
      <Routes>
        <Route path="/onboarding/*" element={<OnboardingRoutes />} />
      </Routes>
    );
  }

  // 2) 카카오 콜백: 레이아웃 없이 처리
  if (path === '/login/oauth2/code/kakao') {
    return (
      <Routes>
        <Route path="/login/oauth2/code/kakao" element={<KakaoCallback />} />
      </Routes>
    );
  }

  // 3) 로그인 페이지: 헤더만
  if (path === '/login') {
    return (
      <Routes>
        <Route element={<LayoutWithHeader />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    );
  }

  // 4) 그 외: 헤더 + 사이드바
  return (
    <Routes>
      <Route element={<LayoutWithSidebar />}>
        <Route path="/" element={<Home />} />
        <Route path="/alarm" element={<Alarm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contents" element={<Contents />} />
        <Route path="/HomeLogin" element={<HomeLogin />} />
        <Route path="/Apply" element={<Apply />} />
        {/* 필요한 페이지 추가 */}
      </Route>
    </Routes>
  );
}

export default App;
