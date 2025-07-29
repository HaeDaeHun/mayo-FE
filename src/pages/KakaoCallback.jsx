import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuspenseLoading from "../components/common/SuspenseLoading";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL에서 토큰 정보(백엔드가 붙여준 쿼리) 가져오기
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const expiresIn   = params.get("expiresIn");
    const isNewUser   = params.get("isNewUser") === "true";
    const userId      = params.get("userId");

    if (!accessToken || !expiresIn || !userId) {
      console.error("필수 정보 누락");
      navigate("/login", { replace: true });
      return;
    }

    // 로컬스토리지에 토큰 저장
    const token = {
      accessToken,
      expiresAt: Date.now() + parseInt(expiresIn, 10) * 1000,
      isNewUser,
      userId: Number(userId),
    };
    localStorage.setItem("token", JSON.stringify(token));
    console.log("저장된 토큰:", token);

    // 신규 사용자면 온보딩(/signin), 아니면 홈(/home)
    navigate(isNewUser ? "/signin" : "/home", { replace: true });
  }, [navigate]);

  // 로딩 스피너
  return <SuspenseLoading />;
}