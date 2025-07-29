// src/api/onboardingAPI.js
import axios from 'axios';

export const submitOnboardingData = async (data) => {
  const response = await axios.post('/api/onboarding', data); // 실제 백엔드 URL로 변경
  return response.data;
};
