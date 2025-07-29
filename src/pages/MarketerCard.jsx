import React from 'react';
import '../styles/MarketerCard.css';

function MarketerCard({ name, matchCount, region, tags }) {
  return (
    <div className="marketer-card">
      <div className="marketer-profile">
        <img src="/marketerIcon.png" alt="avatar" />
        <div className="marketer-info">
          <div className="name-and-status">
            <span className="name">{name}</span>
            <span className="status">매칭중</span>
          </div>
          <div className="meta">
            {matchCount}회 매칭 | {region}
          </div>
          <div className="tags">
            {tags.map((tag, i) => (
              <span className="tag" key={i}>#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketerCard;