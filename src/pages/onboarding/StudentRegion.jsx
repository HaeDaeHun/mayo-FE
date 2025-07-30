import React, { useState } from 'react';
import styles from './Region.module.css';
import 지역 from './Regions';
import { useNavigate } from 'react-router-dom';
import { submitOnboardingData } from '../../api/onboardingAPI';

function StudentRegion({ onboardingData, updateOnboardingData }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelect = (item) => {
    setSelected(item);
  };

  {/*데이터 전송 있어야 작동*/}
  const handleSubmit = async () => {
    if (!selected) return;
    updateOnboardingData('storeRegion', selected.value);
    const finalData = { ...onboardingData, region: selected.value };

    try {
      await submitOnboardingData(finalData);
      localStorage.setItem('onboarding', JSON.stringify(finalData));
      navigate('/HomeLogin');
    } catch (error) {
      console.error('온보딩 데이터 전송 실패:', error);
    }
  };

  {/*데이터 전송 필요없이 일단 이동*/}
  /*
  const handleSubmit = () => {
    if (!selected) return;
  
    updateOnboardingData('channel', selected.value);
    const finalData = { ...onboardingData, channel: selected.value };
  
    // 데이터 전송 없이 바로 이동
    localStorage.setItem('onboarding', JSON.stringify(finalData));
    navigate('/HomeLogin');
  };*/

  return (
    <div className={styles["onboarding-container"]}>
      <div className={styles["character-section"]}>
        <img src="/character.png" alt="캐릭터" className={styles["character-image"]} />
        <div className={styles["speech-bubble"]}>
          그렇군요. 어느 지역이 편하세요?
        </div>
      </div>

      <div className={styles["industries-wrapper"]}>
        <button type="button" className={styles["back-button"]} onClick={handleBack}>
          ← 이전으로
        </button>

        <h2>서울시</h2>
        <div className={styles["industries-grid"]}>
          {지역.map((item, index) => (
            <button
              key={index}
              className={`${styles["industry-button"]} ${selected?.label === item.label ? styles["selected"] : ''}`}
              onClick={() => handleSelect(item)}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ✅ 오른쪽 하단에 붙는 제출 버튼 */}
      {selected && (
        <div className={styles["submit-wrapper"]}>
          <button className={styles["submit-button"]} onClick={handleSubmit}>
            완료하기
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentRegion;
