// Leftbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Leftbar.css';

function Leftbar() {
  return (
    <div className="leftbar">
      <div className="sidebar-button">
        <img src="/home.png" alt="Home Icon" />
        <span>홈</span>
      </div>
      <hr></hr>
      <Link to="/Apply" className="sidebar-button">
        <img src="/apply.png" alt="Apply Icon" />
        <span>신청하기</span>
      </Link>
      <div className="sidebar-button">
        <img src="/matching.png" alt="Match Icon" />
        <span>매칭 현황</span>
      </div>
      <div className="sidebar-button">
        <img src="/chat.png" alt="Chat Icon" />
        <span>채팅</span>
      </div>
      <hr></hr>
      <div className='sidebar-button'>
        <span>마이페이지 > </span>
      </div>
      <div className="sidebar-button">
        <img src="/myprofile.png" alt="Alarm Icon" />
        <span>내 정보</span>
      </div>
      <div className="sidebar-button">
        <img src="/payment.png" alt="Alarm Icon" />
        <span>결제 내역 확인</span>
      </div>
      <div className="sidebar-button">
        <img src="/review.png" alt="Alarm Icon" />
        <span>후기 관리</span>
      </div>
      {/* 필요 시 더 추가 */}
    </div>
  );
}

export default Leftbar;
