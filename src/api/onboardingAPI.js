// src/api/onboardingAPI.js
import axios from 'axios';

// 백엔드 API 서버 주소로 교체
const api = axios.create({
  baseURL: 'https://api.mayo.n-e.kr', // ✅ 백엔드 배포 주소
});

// 요청 인터셉터 추가 (디버깅용)
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      fullURL: config.baseURL + config.url,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가 (디버깅용)
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const submitOnboardingData = async (data) => {
  try {
    console.log('📤 Submitting onboarding data:', data);
    const response = await api.post('/onboarding/business', data); // ✅ API 엔드포인트
    console.log('📥 Onboarding response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 온보딩 데이터 제출 중 오류 발생:', error);
    const errorMessage =
      error.response?.data?.message || '온보딩 제출에 실패했습니다. 다시 시도해주세요.';
    throw new Error(errorMessage);
  }
};
