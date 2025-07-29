// src/pages/Login.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KAKAO_JS_KEY = 'aae7b4cbc99f86908b7674020f94836c';

export default function Login() {
  const navigate = useNavigate();

  // SDK 초기화 (한 번만 실행)
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
      console.log('Kakao SDK Initialized');
    }
  }, []);

  const loginWithKakao = () => {
    window.Kakao.Auth.login({
      scope: 'profile_nickname',
      success: function (authObj) {
        console.log('카카오 로그인 성공', authObj);

        // access_token 백엔드에 전달
        fetch('https://api.mayo.n-e.kr/oauth2/authorization/kakao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: authObj.access_token,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('서버에서 받은 JWT:', data.token);
            localStorage.setItem('jwt', data.token);

            // 온보딩 페이지로 이동
            navigate('/onboarding');
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
    <div className="login-page" style={{ textAlign: 'center', marginTop: '200px' }}>
      <h1>로그인 | 회원가입</h1>

      {/* 이미지 버튼으로 구현 */}
      <img
        src="KakaoLogin.png"
        alt="카카오 로그인"
        onClick={loginWithKakao}
        style={{ cursor: 'pointer', width: '350px', marginTop: '30px'}}
      />
    </div>
  );
};
