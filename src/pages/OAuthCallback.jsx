import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { debugTokens } from '../utils/auth';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log('🔄 OAuth 콜백 처리 시작');
    
    // URL 파라미터 파싱
    const accessToken = searchParams.get('accessToken');
    const expiresIn = searchParams.get('expiresIn');
    const isNewUser = searchParams.get('isNewUser') === 'true';
    const userId = searchParams.get('userId');

    console.log('📥 OAuth 콜백 파라미터:', {
      accessToken: accessToken ? '있음' : '없음',
      expiresIn,
      isNewUser,
      userId
    });

    if (!accessToken) {
      console.error('❌ Access token not found in URL parameters');
      console.log('현재 URL:', window.location.href);
      console.log('모든 URL 파라미터:', Object.fromEntries(searchParams.entries()));
      navigate('/login');
      return;
    }

    console.log('💾 토큰 저장 시작...');
    
    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expiresIn', expiresIn);
    localStorage.setItem('userId', userId);

    // 토큰 만료 시간 계산 및 저장
    if (expiresIn) {
      const expiresAt = Date.now() + (parseInt(expiresIn) * 1000);
      localStorage.setItem('expiresAt', expiresAt.toString());
      console.log('⏰ 토큰 만료 시간 설정:', new Date(expiresAt).toLocaleString());
    }

    console.log('✅ 토큰 저장 완료');
    debugTokens();

    // isNewUser에 따라 라우팅
    if (isNewUser) {
      console.log('🆕 신규 사용자 감지 - 온보딩으로 이동');
      navigate('/onboarding/step1');
    } else {
      console.log('👤 기존 사용자 감지 - 홈으로 이동');
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
      <div style={{ fontSize: '12px', color: '#999', marginTop: '20px' }}>
        현재 URL: {window.location.href}
      </div>
    </div>
  );
}
