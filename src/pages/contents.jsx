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
        thumbnail: '/thumb1.jpg',
        date: '2025-07-28'
      },
      {
        id: 2,
        channel: 'naver_blog',
        title: '제주도 카페 창업 및 폐업 현황',
        content_url: 'https://blog.naver.com/sooheenam/223951495559',
        thumbnail: '/thumb2.jpg',
        date: '2025-07-27'
      },
      {
        id: 3,
        channel: 'instagram',
        title: '컵빙수 하나에 3900원?!',
        content_url: 'https://www.instagram.com/reel/DMt1iUiycj_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        thumbnail: '/thumb5.jpg',
        date: '2025-07-27'
      },
      {
        id: 4,
        channel: 'naver_blog',
        title: '[군산] 한옥 리모델링 카페, 둔율담',
        content_url: 'https://blog.naver.com/blackimp122/223950166086',
        thumbnail: '/thumb3.jpg',
        date: '2025-07-28'
      },
      {
        id: 5,
        channel: 'instagram',
        title: '성북천 냉국수 맛집',
        content_url: 'https://www.instagram.com/p/DL9wnUYS60-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        thumbnail: '/thumb6.jpg',
        date: '2025-07-27'
      },
      {
        id: 6,
        channel: 'naver_blog',
        title: '고성 신상 카페 쿄와 Kyowa 봉포해변 앞',
        content_url: 'https://blog.naver.com/soje1234/223950766582',
        thumbnail: '/thumb4.jpg',
        date: '2025-07-27'
      },
      {
        id: 7,
        channel: 'instagram',
        title: '청주 대청호뷰 대형카페',
        content_url: 'https://www.instagram.com/reel/DMrXN5xPjmt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
        thumbnail: '/thumb7.jpg',
        date: '2025-07-27'
      },
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
                      : '인스타그램 보기 →'}
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
