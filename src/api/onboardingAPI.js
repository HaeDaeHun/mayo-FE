// src/api/onboardingAPI.js
import axios from 'axios';

// 백엔드 API 서버 주소로 교체
const api = axios.create({
  baseURL: 'https://api.mayo.n-e.kr', // ✅ 백엔드 배포 주소
});

// 요청 인터셉터 추가 (디버깅용 + 인증 토큰 자동 추가)
api.interceptors.request.use(
  (config) => {
    // 인증 토큰 가져오기
    const accessToken = localStorage.getItem('accessToken');
    const jwtToken = localStorage.getItem('jwt');
    
    // 토큰이 있으면 헤더에 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    
    console.log('🚀 API Request:', {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      fullURL: config.baseURL + config.url,
      data: config.data,
      headers: config.headers
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
    
    // 401 오류 시 토큰 관련 처리
    if (error.response?.status === 401) {
      console.log('🔐 401 Unauthorized - 토큰 문제');
      console.log('현재 저장된 토큰들:', {
        accessToken: localStorage.getItem('accessToken'),
        jwt: localStorage.getItem('jwt'),
        expiresAt: localStorage.getItem('expiresAt')
      });
      
      // 토큰이 만료되었거나 없으면 로그인 페이지로 리다이렉트
      if (!localStorage.getItem('accessToken') && !localStorage.getItem('jwt')) {
        console.log('🔐 토큰이 없음 - 로그인 페이지로 리다이렉트');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export const submitOnboardingData = async (data) => {
  try {
    console.log('📤 Submitting onboarding data:', data);
    
    // 토큰 확인
    const accessToken = localStorage.getItem('accessToken');
    const jwtToken = localStorage.getItem('jwt');
    
    if (!accessToken && !jwtToken) {
      throw new Error('인증 토큰이 없습니다. 다시 로그인해주세요.');
    }
    
    const response = await api.post('/onboarding/business', data); // ✅ API 엔드포인트
    console.log('📥 Onboarding response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 온보딩 데이터 제출 중 오류 발생:', error);
    const errorMessage =
      error.response?.data?.message || error.message || '온보딩 제출에 실패했습니다. 다시 시도해주세요.';
    throw new Error(errorMessage);
  }
};
