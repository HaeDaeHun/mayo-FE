import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Type from '../pages/onboarding/Type';
import SellerBusinessType from '../pages/onboarding/SellerBusinessType';
import SellerRegion from '../pages/onboarding/SellerRegion';
import SellerChannel from '../pages/onboarding/SellerChannel';
import StudentRegion from '../pages/onboarding/StudentRegion';

export default function OnboardingRoutes() {
  const navigate = useNavigate();

  // 모든 사용자 선택 저장 (전역 상태)
  const [onboardingData, setOnboardingData] = useState({});

  const updateOnboardingData = (key, value) => {
    setOnboardingData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = (item) => {
    updateOnboardingData('userType', item.label);

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
              // 마지막 단계에서 저장
              localStorage.setItem('onboarding', JSON.stringify(onboardingData));
              // 또는 axios.post(...)
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
