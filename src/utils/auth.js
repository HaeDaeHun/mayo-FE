// utils/auth.js
export function getToken() {
    return localStorage.getItem('token');
  }
  
// 인증 관련 유틸리티 함수들

// 토큰이 유효한지 확인
export const isTokenValid = () => {
  const accessToken = localStorage.getItem('accessToken');
  const expiresAt = localStorage.getItem('expiresAt');
  
  if (!accessToken) {
    return false;
  }
  
  // 토큰 만료 시간 확인
  if (expiresAt) {
    const now = Date.now();
    const expirationTime = parseInt(expiresAt);
    
    if (now >= expirationTime) {
      // 토큰이 만료되었으므로 로컬 스토리지에서 제거
      clearAuthData();
      return false;
    }
  }
  
  return true;
};

// 인증 데이터 제거
export const clearAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('expiresAt');
  localStorage.removeItem('userId');
  localStorage.removeItem('jwt');
};

// 현재 사용자 정보 가져오기
export const getCurrentUser = () => {
  if (!isTokenValid()) {
    return null;
  }
  
  return {
    userId: localStorage.getItem('userId'),
    accessToken: localStorage.getItem('accessToken'),
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
    navigate('/login');
    return false;
  }
  return true;
};
  