// src/api/onboardingAPI.js
import axios from 'axios';

// 백엔드 API 서버 주소로 교체
const api = axios.create({
  baseURL: 'https://mayo-api.vercel.app', // ✅ 백엔드 배포 주소
});

export const submitOnboardingData = async (data) => {
  try {
    const response = await api.post('/onboarding/business', data); // ✅ API 엔드포인트
    return response.data;
  } catch (error) {
    console.error('온보딩 데이터 제출 중 오류 발생:', error);
    const errorMessage =
      error.response?.data?.message || '온보딩 제출에 실패했습니다. 다시 시도해주세요.';
    throw new Error(errorMessage);
  }
};
