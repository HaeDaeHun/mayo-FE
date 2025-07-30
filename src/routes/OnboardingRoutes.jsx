import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { submitOnboardingData } from '../api/onboardingAPI';
import { debugTokens } from '../utils/auth';
import axios from 'axios';
import Type from '../pages/onboarding/Type';
import SellerBusinessType from '../pages/onboarding/SellerBusinessType';
import SellerRegion from '../pages/onboarding/SellerRegion';
import SellerChannel from '../pages/onboarding/SellerChannel';
import StudentRegion from '../pages/onboarding/StudentRegion';

export default function OnboardingRoutes() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [onboardingData, setOnboardingData] = useState({});

  // URL 파라미터에서 토큰 처리
  useEffect(() => {
    console.log('🔄 OnboardingRoutes - URL 파라미터 처리 시작');
    
    // URL 파라미터 파싱
    const accessToken = searchParams.get('accessToken');
    const expiresIn = searchParams.get('expiresIn');
    const isNewUser = searchParams.get('isNewUser') === 'true';
    const userId = searchParams.get('userId');

    console.log('📥 OnboardingRoutes 파라미터:', {
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
    } else {
      console.log('⚠️ 토큰이 없음 - 일반 온보딩 페이지');
    }
  }, [searchParams]);

  const updateOnboardingData = (key, value) => {
    setOnboardingData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = (item) => {
    updateOnboardingData('userType', item.value);

    if (item.label.includes('소상공인')) {
      navigate('/onboarding/seller/step2');
    } else if (item.label.includes('대학생')) {
      navigate('/onboarding/student/step2');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Routes>
      <Route
        path="step1"
        element={
          <Type
            onNext={handleNext}
            onBack={handleBack}
            onboardingData={onboardingData}
          />
        }
      />
      {/* 소상공인 */}
      <Route
        path="seller/step2"
        element={
          <SellerBusinessType
            onboardingData={onboardingData}
            updateOnboardingData={updateOnboardingData}
          />
        }
      />
      <Route
        path="seller/step3"
        element={
          <SellerRegion
            onboardingData={onboardingData}
            updateOnboardingData={updateOnboardingData}
          />
        }
      />
      <Route
        path="seller/step4"
        element={
          <SellerChannel
            onboardingData={onboardingData}
            updateOnboardingData={updateOnboardingData}
            onFinalSubmit={() => {
              console.log('최종 제출 데이터', onboardingData);
              submitOnboardingData(onboardingData)
                .then(response => {
                  console.log('저장 성공:', response);
                  alert('회원가입이 완료되었습니다!');
                  navigate('/');
                })
                .catch(error => {
                  console.error('저장 실패:', error);
                  alert('저장 중 오류가 발생했습니다. 다시 시도해주세요.');
                });
            }}
          />
        }
      />
      {/* 대학생 */}
      <Route
        path="student/step2"
        element={
          <StudentRegion
            onboardingData={onboardingData}
            updateOnboardingData={updateOnboardingData}
          />
        }
      />
    </Routes>
  );
}
