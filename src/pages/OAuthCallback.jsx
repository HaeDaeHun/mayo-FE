import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // URL 파라미터 파싱
    const accessToken = searchParams.get('accessToken');
    const expiresIn = searchParams.get('expiresIn');
    const isNewUser = searchParams.get('isNewUser') === 'true';
    const userId = searchParams.get('userId');

    console.log('OAuth Callback Parameters:', {
      accessToken,
      expiresIn,
      isNewUser,
      userId
    });

    if (!accessToken) {
      console.error('Access token not found in URL parameters');
      navigate('/login');
      return;
    }

    // 토큰 저장
    localStorage.setItem('accessToken', accessToken);
    if (expiresIn) {
      const expiresAt = Date.now() + parseInt(expiresIn, 10) * 1000;
      localStorage.setItem('expiresAt', expiresAt.toString());
    }
    if (userId) {
      localStorage.setItem('userId', userId);
    }

    // isNewUser 여부에 따라 이동
    if (isNewUser) {
      console.log('New user detected, redirecting to onboarding');
      navigate('/onboarding/step1');
    } else {
      console.log('Existing user detected, redirecting to home');
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '18px',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <div>로그인 처리 중...</div>
      <div style={{ fontSize: '14px', color: '#666' }}>
        잠시만 기다려주세요
      </div>
    </div>
  );
}
