// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import MarketerCard from './MarketerCard';

// 예시 더미 데이터
const marketers = [
  {
    name: '고소한QLhUH',
    matchCount: 3,
    region: '서대문구',
    tags: ['릴스 전문', '일상'],
  },
  {
    name: '고소한QLhUH',
    matchCount: 3,
    region: '서대문구',
    tags: ['릴스 전문', '반려동물'],
  },
  {
    name: '고소한QLhUH',
    matchCount: 3,
    region: '서대문구',
    tags: ['블로그 전문', '반려동물'],
  },
  {
    name: '고소한QLhUH',
    matchCount: 3,
    region: '서대문구',
    tags: ['릴스 전문', '반려동물'],
  },
];

function Home() {
  return (
    <div className="home-container">
      <div className="top-container">
        <div className="top-left">
          <h1>내 주변 대학생 마케터</h1>
          <div className="grid-wrapper">
          <div className="grid-container">
            {marketers.map((m, idx) => (
              <div className="grid-item-wrapper" key={idx}>
                <MarketerCard {...m} />
              </div>
            ))}
          </div>  
          </div>
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

export default Home;
