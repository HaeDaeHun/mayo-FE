import React from 'react';
import styles from './Type.module.css';
import 사용자유형 from './types'; // 업종 리스트 텍스트 + 아이콘 PNG 경로 포함한 파일

function Type({ onBack, onNext }) {
  return (
    <div className={styles["onboarding-container"]}>

      {/* 캐릭터 & 말풍선 */}
      <div className={styles["character-section"]}>
        <img src="/character.png" alt="캐릭터" className={styles["character-image"]} />
        <div className={styles["speech-bubble"]}>
          안녕하세요:) 
          마요와 어떻게 서비스를 이용하고 싶으세요?
        </div>
      </div>
      <div className={styles["industries-wrapper"]}>
        <button type="button" className={styles["back-button"]} onClick={() => {onBack();}}>
          ← 이전으로
        </button>

        {/* 업종 버튼들 */}
        <div className={styles["industries-grid"]}>
            {사용자유형.map((item, index) => (
              <button key={index} className={styles["industry-button"]} onClick={() => onNext(item)}>
                <span>{item.label}</span>
                <img src={item.icon} alt="" className={styles["industry-icon"]} />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Type;
