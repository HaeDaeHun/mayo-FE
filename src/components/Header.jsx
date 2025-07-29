// src/components/Header.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const KAKAO_JS_KEY = 'aae7b4cbc99f86908b7674020f94836c';

export default function Header() {
  const navigate = useNavigate();

  // SDK 초기화 (최초 한 번만)
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
      console.log('Kakao SDK Initialized from Header');
    }
  }, []);

  // 로그인 함수
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      console.error('Kakao SDK not loaded');
      return;
    }

    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email',
      success: function (authObj) {
        console.log('카카오 로그인 성공', authObj);

        // access_token → 백엔드 전달
        fetch('https://your-backend.com/auth/kakao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token: authObj.access_token }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('서버에서 받은 JWT:', data.token);
            localStorage.setItem('jwt', data.token);
            navigate('/onboarding'); // 온보딩 페이지로 이동
          })
          .catch((err) => {
            console.error('백엔드 통신 실패:', err);
          });
      },
      fail: function (err) {
        console.error('카카오 로그인 실패', err);
      },
    });
  };

  return (
    <header className="header">
      <h1 className="logo">
        <a href="/">
          <img src="/yellowMayoFont.png" alt="yellowlogo" />
        </a>
      </h1>
      <nav className="nav">
        <a href="/onboarding/step1">온보딩 테스트</a>

        {/* 로그인은 버튼으로 처리 */}
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
      </nav>
    </header>
  );
}
