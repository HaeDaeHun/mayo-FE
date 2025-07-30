// src/utils/auth.js

// accessToken 가져오기
export function getToken() {
  return localStorage.getItem('accessToken');
}

// 인증 관련 유틸리티 함수들

// 토큰이 유효한지 확인
export const isTokenValid = () => {
  const accessToken = localStorage.getItem('accessToken');
  const jwtToken = localStorage.getItem('jwt');
  const expiresAt = localStorage.getItem('expiresAt');
  
  console.log('🔐 토큰 상태 확인:', {
    accessToken: accessToken ? '있음' : '없음',
    jwtToken: jwtToken ? '있음' : '없음',
    expiresAt: expiresAt ? new Date(parseInt(expiresAt)).toLocaleString() : '없음'
  });
  
  // accessToken이 우선순위
  if (accessToken) {
    // 토큰 만료 시간 확인
    if (expiresAt) {
      const now = Date.now();
      const expirationTime = parseInt(expiresAt);
      
      if (now >= expirationTime) {
        console.log('🔐 AccessToken 만료됨');
        clearAuthData();
        return false;
      }
    }
    return true;
  }
  
  // jwtToken이 있으면 사용
  if (jwtToken) {
    return true;
  }
  
  return false;
};

// 인증 데이터 제거
export const clearAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('expiresAt');
  localStorage.removeItem('userId');
  localStorage.removeItem('jwt');
  console.log('🔐 인증 데이터 제거됨');
};

// 현재 사용자 정보 가져오기
export const getCurrentUser = () => {
  if (!isTokenValid()) {
    return null;
  }
  
  return {
    userId: localStorage.getItem('userId'),
    accessToken: localStorage.getItem('accessToken'),
    jwtToken: localStorage.getItem('jwt'),
    expiresIn: localStorage.getItem('expiresIn')
  };
};

// 로그아웃
export const logout = () => {
  clearAuthData();
  window.location.href = '/';
};

// 인증이 필요한 페이지에서 사용할 훅
export const requireAuth = (navigate) => {
  if (!isTokenValid()) {
    console.log('🔐 인증 필요 - 로그인 페이지로 이동');
    navigate('/login');
    return false;
  }
  return true;
};

// 토큰 디버깅 정보 출력
export const debugTokens = () => {
  console.log('🔐 토큰 디버깅 정보:', {
    accessToken: localStorage.getItem('accessToken') ? '있음' : '없음',
    jwtToken: localStorage.getItem('jwt') ? '있음' : '없음',
    userId: localStorage.getItem('userId'),
    expiresIn: localStorage.getItem('expiresIn'),
    expiresAt: localStorage.getItem('expiresAt') ? new Date(parseInt(localStorage.getItem('expiresAt'))).toLocaleString() : '없음',
    isTokenValid: isTokenValid()
  });
};
