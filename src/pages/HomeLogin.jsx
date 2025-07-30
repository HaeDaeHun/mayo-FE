// src/pages/HomeLogin.jsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import MarketerCard from './MarketerCard';
import { debugTokens } from '../utils/auth';

// 예시 더미 데이터
const marketers = [
  {
    name: '고소한QLhUH',
    matchCount: 3,
    region: '서대문구',
    tags: ['릴스 전문', '일상'],
  },
  {
    name: '고소한QLhUH',
    matchCount: 3,
    region: '서대문구',
    tags: ['릴스 전문', '반려동물'],
  },
  {
    name: '고소한QLhUH',
    matchCount: 3,
    region: '서대문구',
    tags: ['블로그 전문', '반려동물'],
  },
  {
    name: '고소한QLhUH',
    matchCount: 3,
    region: '서대문구',
    tags: ['릴스 전문', '반려동물'],
  },
];

function HomeLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log('🔄 HomeLogin - URL 파라미터 처리 시작');
    
    // URL 파라미터 파싱
    const accessToken = searchParams.get('accessToken');
    const expiresIn = searchParams.get('expiresIn');
    const isNewUser = searchParams.get('isNewUser') === 'true';
    const userId = searchParams.get('userId');

    console.log('📥 HomeLogin 파라미터:', {
      accessToken: accessToken ? '있음' : '없음',
      expiresIn,
      isNewUser,
      userId
    });

    if (accessToken) {
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
        return;
      } else {
        console.log('👤 기존 사용자 - HomeLogin 페이지 유지');
      }
    } else {
      console.log('⚠️ 토큰이 없음 - 일반 HomeLogin 페이지');
    }
  }, [searchParams, navigate]);

  return (
    <div className="home-container">
      <div className="top-container">
        <div className="top-left">
          <h1>내 주변 대학생 마케터</h1>
          <div className="grid-wrapper">
          <div className="grid-container">
            {marketers.map((m, idx) => (
              <div className="grid-item-wrapper" key={idx}>
                <MarketerCard {...m} />
              </div>
            ))}
          </div>  
          </div>
        </div>
        <div className="top-right">
          <h1>매칭 후기</h1>
          <img src="/reviewPart.png" alt="reviewExample" />
        </div>
      </div>

      <div className="bottom-container">
        <h1>홍보 콘텐츠</h1>
        <Link to="/Contents">상세보기 →</Link>
        <div className="video-grid">
          <div className="video-card">영상1</div>
          <div className="video-card">영상2</div>
          <div className="video-card">영상3</div>
          <div className="video-card">영상4</div>
          <div className="video-card">영상5</div>
        </div>
      </div>
    </div>
  );
}

export default HomeLogin;
