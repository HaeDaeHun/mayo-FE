// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function HomeLogin() {
  return (
    <div className="home-container">
      <div className="top-container">
        <div className="top-left">
          <h1>내 주변 대학생 마케터</h1>
          {/* 필요한 콘텐츠 추가 */}
        </div>
        <div className="top-right">
          <h1>매칭 후기</h1>
          <img src="/reviewPart.png" alt="reviewExample" />
        </div>
      </div>

      <div className="bottom-container">
        <h1>홍보 콘텐츠</h1>
        <Link to="/Contents">상세보기 →</Link>
        <div className="video-grid">
          <div className="video-card">영상1</div>
          <div className="video-card">영상2</div>
          <div className="video-card">영상3</div>
          <div className="video-card">영상4</div>
          <div className="video-card">영상5</div>
        </div>
      </div>
    </div>
  );
}

export default HomeLogin;
