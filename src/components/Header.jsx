// src/components/Header.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid, logout, getCurrentUser } from '../utils/auth';
import '../styles/Header.css';

const KAKAO_JS_KEY = 'aae7b4cbc99f86908b7674020f94836c';

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 로그인 상태 확인
  useEffect(() => {
    const checkAuthStatus = () => {
      const valid = isTokenValid();
      setIsLoggedIn(valid);
      if (valid) {
        setUser(getCurrentUser());
      } else {
        setUser(null);
      }
    };

    checkAuthStatus();
    
    // 주기적으로 인증 상태 확인 (토큰 만료 감지)
    const interval = setInterval(checkAuthStatus, 60000); // 1분마다 확인
    
    return () => clearInterval(interval);
  }, []);

  // SDK 초기화 (최초 한 번만)
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
      console.log('Kakao SDK Initialized from Header');
    }
  }, []);

  // 로그인 함수 - 백엔드 OAuth 플로우 사용
  const handleKakaoLogin = () => {
    // 백엔드 OAuth 엔드포인트로 리다이렉트
    const oauthUrl = 'https://api.mayo.n-e.kr/oauth2/authorization/kakao';
    console.log('Redirecting to OAuth endpoint:', oauthUrl);
    window.location.href = 'https://api.mayo.n-e.kr/oauth2/authorization/kakao';
  };

  // 로그아웃 함수
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <h1 className="logo">
        <a href="/">
          <img src="/yellowMayoFont.png" alt="yellowlogo" />
        </a>
      </h1>
      <nav className="nav">
        <div className="icon" style={{marginTop: '5px'}}>
          <a href="/alarm">
            <img src="/alarm.png" alt="alarm" />
          </a>
        </div>
        
        <div style={{marginTop: '7px'}}>
          <a href="/onboarding/step1">온보딩 테스트</a>
        </div>
        
        {/* 로그인 상태에 따라 다른 버튼 표시 */}
        {isLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              {user?.userId ? `사용자 ${user.userId}` : '로그인됨'}
            </span>
            <button
              onClick={handleLogout}
              style={{
                all: 'unset',
                cursor: 'pointer',
                color: 'inherit',
                font: 'inherit',
                fontSize: '14px',
                color: '#ff6b6b'
              }}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            onClick={handleKakaoLogin}
            style={{
              all: 'unset',
              cursor: 'pointer',
              color: 'inherit',
              font: 'inherit',
            }}
          >
            로그인 | 회원가입
          </button>
        )}
      </nav>
    </header>
  );
}
