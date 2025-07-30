import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { submitOnboardingData } from '../api/onboardingAPI';
import axios from 'axios';
import Type from '../pages/onboarding/Type';
import SellerBusinessType from '../pages/onboarding/SellerBusinessType';
import SellerRegion from '../pages/onboarding/SellerRegion';
import SellerChannel from '../pages/onboarding/SellerChannel';
import StudentRegion from '../pages/onboarding/StudentRegion';

export default function OnboardingRoutes() {
  const navigate = useNavigate();

  const [onboardingData, setOnboardingData] = useState({});

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
