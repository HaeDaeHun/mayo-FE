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

// 레퍼런스 미리보기
const contents = [
  {
    title: "인스타 릴스 광고 사례",
    thumbnail: "/content1.jpg", // public 폴더에 넣어둘 것
    link: "https://www.instagram.com/p/EXAMPLE1"
  },
  {
    title: "블로그 체험단 리뷰",
    thumbnail: "/content2.jpg",
    link: "https://blog.naver.com/example"
  },
  {
    title: "유튜브 숏츠 캠페인",
    thumbnail: "/content3.jpg",
    link: "https://www.youtube.com/watch?v=EXAMPLE3"
  },
  {
    title: "SNS 바이럴 영상",
    thumbnail: "/content4.jpg",
    link: "https://www.instagram.com/p/EXAMPLE4"
  },
  {
    title: "제품 소개 UGC",
    thumbnail: "/content5.jpg",
    link: "https://www.youtube.com/watch?v=EXAMPLE5"
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
          <img src="/preview.png" alt="preview" className="preview-image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
