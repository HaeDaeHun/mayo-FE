// components/ReferenceList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth'; // JWT 토큰 헬퍼

const ReferenceList = () => {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const res = await axios.get('/api/references', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        const filtered = res.data.filter(ref =>
          ref.channel === 'naver_blog' || ref.channel === 'instagram'
        );

        setReferences(
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
        );
      } catch (error) {
        console.error('참고 콘텐츠 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferences();
  }, []);

  if (loading) return <div className="p-4">불러오는 중...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {references.map(ref => (
        <div
          key={ref.id}
          className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
        >
          <img
            src={ref.thumbnail}
            alt={ref.title}
            className="w-full h-48 object-cover rounded-xl"
          />
          <h2 className="text-lg font-bold mt-2">{ref.title}</h2>
          <a
            href={ref.content_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 mt-1 block"
          >
            {ref.channel === 'naver_blog'
              ? '네이버 블로그 보기 →'
              : '인스타그램 보기 →'}
          </a>
          <p className="text-sm text-gray-500 mt-1">게시일: {ref.date}</p>
        </div>
      ))}
    </div>
  );
};

export default ReferenceList;
