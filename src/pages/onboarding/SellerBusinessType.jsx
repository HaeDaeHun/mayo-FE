import React from 'react';
import styles from './BusinessType.module.css';
import 업종리스트 from './industries';
import { useNavigate } from 'react-router-dom';

function SellerBusinessType({ onboardingData, updateOnboardingData }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = (item) => {
    updateOnboardingData('category', item.value); // 선택 저장
    navigate('/onboarding/seller/step3');             // 다음으로 이동
  };

  return (
    <div className={styles["onboarding-container"]}>
      <div className={styles["character-section"]}>
        <img src="/character.png" alt="캐릭터" className={styles["character-image"]} />
        <div className={styles["speech-bubble"]}>좋아요! 현재 하고 계신 업종을 알려주세요.</div>
      </div>

      <div className={styles["industries-wrapper"]}>
        <button type="button" className={styles["back-button"]} onClick={handleBack}>
          ← 이전으로
        </button>

        <div className={styles["industries-grid"]}>
          {업종리스트.map((item, index) => (
            <button key={index} className={styles["industry-button"]} onClick={() => handleNext(item)}>
              <span>{item.label}</span>
              <img src={item.icon} alt="" className={styles["industry-icon"]} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerBusinessType;
