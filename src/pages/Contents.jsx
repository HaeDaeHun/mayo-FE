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
        title: '네이버 블로그 마케팅 성공 사례',
        content_url: 'https://blog.naver.com/example_blog_post',
        thumbnail: 'https://via.placeholder.com/300x180.png?text=Naver+Blog',
        date: '2025-07-28'
      },
      {
        id: 2,
        channel: 'instagram',
        title: '인스타그램 바이럴 마케팅',
        content_url: 'https://www.instagram.com/p/example_post/',
        thumbnail: 'https://via.placeholder.com/300x180.png?text=Instagram',
        date: '2025-07-27'
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
          {filteredReferences.length === 0 ? (
            <p className="no-content">콘텐츠가 없습니다.</p>
          ) : (
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
