import React from 'react';
import styles from './Region.module.css';
import 지역 from './Regions';
import { useNavigate } from 'react-router-dom';

function SellerRegion({ onboardingData, updateOnboardingData }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = (item) => {
    updateOnboardingData('region', item.value);  // ✅ 선택한 지역 저장
    navigate('/onboarding/seller/step4');        // ✅ 다음 단계 이동
  };

  return (
    <div className={styles["onboarding-container"]}>
      <div className={styles["character-section"]}>
        <img src="/character.png" alt="캐릭터" className={styles["character-image"]} />
        <div className={styles["speech-bubble"]}>
          그렇군요. 어느 지역에서 운영 중이신가요?
        </div>
      </div>

      <div className={styles["industries-wrapper"]}>
        <button type="button" className={styles["back-button"]} onClick={handleBack}>
          ← 이전으로
        </button>
        <h2>서울시</h2>
        <div className={styles["industries-grid"]}>
          {지역.map((item, index) => (
            <button key={index} className={styles["industry-button"]} onClick={() => handleNext(item)}>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerRegion;
