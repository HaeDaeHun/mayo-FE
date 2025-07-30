import React, { useState } from 'react';
import styles from './Channel.module.css';
import 채널 from './Channels';
import { useNavigate } from 'react-router-dom';
import { submitOnboardingData } from '../../api/onboardingAPI';

function SellerChannel({ onboardingData, updateOnboardingData }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null); // ✅ 선택된 채널 저장

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelect = (item) => {
    setSelected(item); // ✅ 버튼 클릭하면 선택만 저장
  };

  {/*데이터 전송 필요한 코드*/}
  const handleSubmit = async () => {
    if (!selected) return;
  
    // 온보딩 데이터 + channel 추가
    const finalData = {
      ...onboardingData,
      prefferredChannel: selected.value // ✅ 백엔드 enum 값으로 넣기
    };
  
    try {
      await submitOnboardingData(finalData); // ✅ API 요청
      localStorage.setItem('onboarding', JSON.stringify(finalData));
      navigate('/HomeLogin'); // ✅ 홈 또는 완료 페이지로 이동
    } catch (error) {
      console.error('온보딩 데이터 전송 실패:', error);
      alert('제출 중 오류가 발생했어요. 다시 시도해주세요.');
    }
  };
  

  {/*데이터 전송 필요없이 일단 이동*/}
  /*const handleSubmit = () => {
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
          거의 다 왔어요! <br />
          관심있는 콘텐츠를 선택해주세요.
        </div>
      </div>

      <div className={styles["industries-wrapper"]}>
        <button type="button" className={styles["back-button"]} onClick={handleBack}>
          ← 이전으로
        </button>

        <div className={styles["industries-grid"]}>
          {채널.map((item, index) => (
            <button
              key={index}
              className={`${styles["industry-button"]} ${selected?.label === item.label ? styles["selected"] : ''}`}
              onClick={() => handleSelect(item)}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* ✅ 제출하기 버튼은 선택되었을 때만 표시 */}
        {selected && (
          <div className={styles["submit-wrapper"]}>
            <button className={styles["submit-button"]} onClick={handleSubmit}>
              완료하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerChannel;
