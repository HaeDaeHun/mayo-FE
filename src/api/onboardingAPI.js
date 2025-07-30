// src/api/onboardingAPI.js
import axios from 'axios';

/**
 * 온보딩 데이터를 서버로 전송
 * @param {Object} data - 최종 온보딩 데이터 (type, region, businessType, channel 등 포함)
 * @returns {Object} 서버 응답 데이터
 * @throws {Error} 요청 실패 시 에러를 throw
 */
export const submitOnboardingData = async (data) => {
  try {
    const response = await axios.post('/api/onboarding', data); // 실제 백엔드 URL 필요 시 교체
    return response.data;
  } catch (error) {
    // 콘솔에 전체 오류 출력 (개발자용)
    console.error('온보딩 데이터 제출 중 오류 발생:', error);

    // 사용자에게 보여줄 에러 메시지 설정
    const errorMessage =
      error.response?.data?.message || '온보딩 제출에 실패했습니다. 다시 시도해주세요.';

    // 에러 던지기 (컴포넌트에서 try-catch로 처리 가능)
    throw new Error(errorMessage);
  }
};
