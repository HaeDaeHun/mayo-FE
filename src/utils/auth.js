// src/utils/auth.js

// accessToken 가져오기
export function getToken() {
  return localStorage.getItem('accessToken');
}

// 토큰이 유효한지 확인
export const isTokenValid = () => {
  const accessToken = localStorage.getItem('accessToken');
  const expiresAt = localStorage.getItem('expiresAt');

  if (!accessToken) {
    return false;
  }

  if (expiresAt) {
    const now = Date.now();
    const expirationTime = parseInt(expiresAt, 10);

    if (now >= expirationTime) {
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
    expiresIn: localStorage.getItem('expiresIn'),
  };
};

// 로그아웃
export const logout = () => {
  clearAuthData();
  window.location.href = '/';
};

// 인증이 필요한 페이지에서 사용할 훅 (함수)
export const requireAuth = (navigate) => {
  if (!isTokenValid()) {
    navigate('/login');
    return false;
  }
  return true;
};
