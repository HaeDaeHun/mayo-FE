import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const accessToken = params.get('accessToken');
    const isNewUser = params.get('isNewUser') === 'true';

    if (accessToken) {
      // JWT를 로컬 스토리지에 저장
      localStorage.setItem('jwt', accessToken);
    }

    // 신규 사용자면 온보딩, 아니면 홈으로 이동
    if (isNewUser) {
      navigate('/onboarding');
    } else {
      navigate('/home');
    }
  }, [search, navigate]);

  return <div>로그인 처리 중입니다...</div>;
}
