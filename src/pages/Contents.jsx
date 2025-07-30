import React, { useState, useEffect } from 'react';
import '../styles/Contents.css';

const Contents = () => {
  const [references, setReferences] = useState([]);
  const [filteredChannel, setFilteredChannel] = useState('all');

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        channel: 'naver_blog',
        title: '대전카페 궁동 에이트',
        content_url: 'https://blog.naver.com/fkguswn0919/223949867605',
        thumbnail: 'https://blogthumb.pstatic.net/MjAyNTA3MjhfMjg2/MDAxNzUzNjgxMDQwOTQ3.zIuuSavKHFt0xKGBBRWuIYkP0Vb5WB4qP20Ax0m3zdMg.R21RhYNsDZNDjDDmwz_fvOJSxqD8KKt_KWE4oH2JfyIg.JPEG/IMG%A3%DF9189.JPG?type=s2',
        date: '2025-07-28'
      },
      {
        id: 2,
        channel: 'naver_blog',
        title: '제주도 카페 창업 및 폐업 현황',
        content_url: 'https://blog.naver.com/sooheenam/223951495559',
        thumbnail: 'https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=제주+카페',
        date: '2025-07-27'
      },
      {
        id: 3,
        channel: 'instagram',
        title: '서울 맛집 탐방',
        content_url: 'https://www.instagram.com/example',
        thumbnail: 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=맛집+리뷰',
        date: '2025-07-26'
      },
      {
        id: 4,
        channel: 'instagram',
        title: '패션 스타일링',
        content_url: 'https://www.instagram.com/example2',
        thumbnail: 'https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=패션+스타일',
        date: '2025-07-25'
      }
    ];

    setReferences(dummyData);
  }, []);

  const filteredReferences = filteredChannel === 'all'
    ? references
    : references.filter(ref => ref.channel === filteredChannel);

  return (
    <div className='contents-container'>
      <div className="contents-wrapper">
        <h1 className="contents-title">마케팅 콘텐츠 모음</h1>

        {/* 필터 버튼 */}
        <div className="filter-button-group">
          <button
            className={`filter-button ${filteredChannel === 'all' ? 'active-all' : ''}`}
            onClick={() => setFilteredChannel('all')}
          >
            전체 보기
          </button>
          <button
            className={`filter-button ${filteredChannel === 'youtube' ? 'active-youtube' : ''}`}
            onClick={() => setFilteredChannel('youtube')}
          >
            유튜브
          </button>
          <button
            className={`filter-button ${filteredChannel === 'naver_blog' ? 'active-naver' : ''}`}
            onClick={() => setFilteredChannel('naver_blog')}
          >
            네이버 블로그
          </button>
          <button
            className={`filter-button ${filteredChannel === 'instagram' ? 'active-instagram' : ''}`}
            onClick={() => setFilteredChannel('instagram')}
          >
            인스타그램
          </button>
        </div>

        {/* 콘텐츠 카드 */}
        <div className="card-grid">
          {filteredChannel === 'youtube' ? (
              // 유튜브 선택 시 이미지 하나만 표시
              <div className="youtube-content">
                <img src="/youtube.png" alt="youtube" className="youtube-image" />
              </div>
            ) : filteredReferences.length === 0 ? (
              <p className="no-content">콘텐츠가 없습니다.</p>
            ) : (
              // 나머지 채널 콘텐츠 카드
              filteredReferences.map(ref => (
                <div key={ref.id} className="content-card">
                  <img
                    src={ref.thumbnail}
                    alt={ref.title}
                    className="content-thumbnail"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200/CCCCCC/666666?text=이미지+없음';
                    }}
                  />
                  <h2 className="content-title">{ref.title}</h2>
                  <a
                    href={ref.content_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-link"
                  >
                    {ref.channel === 'naver_blog'
                      ? '네이버 블로그 보기 →'
                      : ref.channel === 'instagram'
                      ? '인스타그램 보기 →'
                      : '링크 보기 →'}
                  </a>
                  <p className="content-date">게시일: {ref.date}</p>
                </div>
              ))
            )}
        </div>
      </div>
    </div>
  );
};

export default Contents;
