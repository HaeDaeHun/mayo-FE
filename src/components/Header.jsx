// src/components/Header.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid, logout, getCurrentUser, debugTokens } from '../utils/auth';
import '../styles/Header.css';

const KAKAO_JS_KEY = 'aae7b4cbc99f86908b7674020f94836c';

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 로그인 상태 확인
  useEffect(() => {
    const checkAuthStatus = () => {
      console.log('🔐 Header - 로그인 상태 확인 중...');
      debugTokens();
      
      const valid = isTokenValid();
      setIsLoggedIn(valid);
      if (valid) {
        setUser(getCurrentUser());
        console.log('✅ 로그인됨:', getCurrentUser());
      } else {
        setUser(null);
        console.log('❌ 로그인되지 않음');
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

  // 로그인 함수 - 카카오 SDK 직접 사용
  const handleKakaoLogin = () => {
    // 백엔드 OAuth 플로우 강제 사용 (문제 해결을 위해)
    const forceBackendOAuth = true;
    
    if (forceBackendOAuth) {
      console.log('Using backend OAuth flow...');
      const oauthUrl = 'https://api.mayo.n-e.kr/oauth2/authorization/kakao';
      window.location.href = oauthUrl;
      return;
    }

    if (!window.Kakao) {
      console.error('Kakao SDK not loaded');
      return;
    }

    console.log('Starting Kakao login...');
    
    window.Kakao.Auth.login({
      scope: 'profile_nickname,account_email',
      success: function (authObj) {
        console.log('카카오 로그인 성공', authObj);

        // access_token → 백엔드 전달
        fetch('/oauth2/authorization/kakao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token: authObj.access_token }),
        })
          .then((res) => {
            console.log('Response status:', res.status);
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            console.log('서버에서 받은 응답:', data);
            
            if (data.accessToken) {
              localStorage.setItem('accessToken', data.accessToken);
              localStorage.setItem('expiresIn', data.expiresIn);
              localStorage.setItem('userId', data.userId);
              
              // 토큰 만료 시간 계산 및 저장
              if (data.expiresIn) {
                const expiresAt = Date.now() + (parseInt(data.expiresIn) * 1000);
                localStorage.setItem('expiresAt', expiresAt.toString());
              }
              
              // isNewUser에 따라 라우팅
              if (data.isNewUser) {
                console.log('New user detected, redirecting to onboarding');
                navigate('/onboarding/step1');
              } else {
                console.log('Existing user detected, redirecting to home');
                navigate('/');
              }
            } else {
              console.error('Invalid response from server');
            }
          })
          .catch((err) => {
            console.error('백엔드 통신 실패:', err);
            // 에러 발생 시 백엔드 OAuth 플로우로 폴백
            console.log('Falling back to backend OAuth flow...');
            const oauthUrl = 'https://api.mayo.n-e.kr/oauth2/authorization/kakao';
            window.location.href = oauthUrl;
          });
      },
      fail: function (err) {
        console.error('카카오 로그인 실패', err);
        // 실패 시 백엔드 OAuth 플로우로 폴백
        console.log('Falling back to backend OAuth flow...');
        const oauthUrl = 'https://api.mayo.n-e.kr/oauth2/authorization/kakao';
        window.location.href = oauthUrl;
      },
    });
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
        
        <div style={{marginTop: '7px', marginLeft: '10px'}}>
          <a href="/oauth-test" style={{ fontSize: '12px', color: '#666' }}>
            OAuth 테스트
          </a>
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
