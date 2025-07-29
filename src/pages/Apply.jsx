// src/pages/Apply.jsx
import React, { useState } from 'react';
import styles from '../styles/Apply.module.css';


function ApplyForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone1: '',
    phone2: '',
    phone3: '',
    email: '',
    businessNumber1: '',
    businessNumber2: '',
    businessNumber3: '',
    storeAddress: '',
    platform: [],
    productIntro: '',
    hasSNS: '',
    helpNeeds: [],
    referenceLink: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'helpNeeds') {
      setFormData((prev) => ({
        ...prev,
        helpNeeds: checked
          ? [...prev.helpNeeds, value]
          : prev.helpNeeds.filter((v) => v !== value),
      }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='home-container'>
    <form onSubmit={handleSubmit} className="p-8 bg-white max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">매칭 신청하기</h1>

      {/* 연락 수단 */}
      <div className="space-y-4">
        <h3>연락 수단 *</h3>
        <div style={{marginBottom: '10px'}}>
            <label className="block font-semibold" style={{marginRight: '10px'}} >이름 *   </label>
            <input name="name" value={formData.name} onChange={handleChange} className="input" />
        </div>
        <div style={{marginBottom: '10px'}}>
        <label className="block font-semibold" style={{marginRight: '10px'}}>전화번호 * ( - 제외 )   </label>
        <input name="phone" maxLength="11" value={formData.phone1} onChange={handleChange} className="input w-20" />
        </div>
        <div style={{marginBottom: '10px'}}>
        <label className="block font-semibold" style={{marginRight: '10px'}} >이메일 *   </label>
        <input name="email" value={formData.email} onChange={handleChange} className="input" />
        </div>
      </div>

      {/* 사업자 정보 */}
      <div className="mt-8 space-y-4">
        <h3>사업자 정보 입력 *</h3>
        <label className="block font-semibold" style={{marginRight: '10px'}}>사업자등록번호 * ( - 제외 ) </label>
        <input name="businessNumber" maxLength="10" value={formData.businessNumber} onChange={handleChange} className="input w-20" style={{marginRight: '10px'}}/>
        <button type="button" className="px-4 py-2 bg-gray-200 rounded">이미지로 업로드</button>
      </div>

      {/* 판매 플랫폼 */}
      <div className="mt-8 space-y-4">
        <h3>판매 플랫폼 정보 *</h3>
        <div style={{marginBottom: '10px'}}>
        <label className="flex items-center" >
          <input type="checkbox" /> <span className="ml-2">오프라인 매장이 있어요.</span>
        </label>
        </div>
        <div style={{marginBottom: '10px'}}>
        <input name="storeAddress" placeholder="주소를 입력하세요" value={formData.storeAddress} onChange={handleChange} className="input" />
        </div>

        <div className="flex gap-2 mt-2" style={{marginBottom: '10px'}}>
          <span className="px-3 py-1 bg-gray-100 rounded-full">인스타그램 | 네이버 스마트스토어</span>
        </div>

        <textarea
          name="productIntro"
          placeholder="판매 제품 / 서비스 간단 소개"
          maxLength="50"
          value={formData.productIntro}
          onChange={handleChange}
          className="input h-24"
        />
      </div>

      {/* 이해도 */}
      <div className="mt-8 space-y-4">
        <h3>이해도 파악 *</h3>
        <div style={{marginBottom: '20px'}}>
        <label className="block font-semibold">SNS 계정이 있으신가요? * </label>
        <label><input type="radio" name="hasSNS" value="yes" onChange={handleChange} /> 예</label>
        <label><input type="radio" name="hasSNS" value="no" onChange={handleChange} /> 아니요</label>
        </div>
        <div style={{marginBottom: '10px'}}>
        <label className="block font-semibold mt-4" >어떤 도움이 필요하신가요? *</label>
        </div>
        <div>
            {[
            '무엇을 해야 할지 잘 모르겠어요.',
            '브랜딩하고 싶은데 혼자 하기 어려워요.',
            '홍보 콘텐츠를 만들어보고 싶어요.',
            '트렌드에 맞는 마케팅을 하고 싶어요.',
            ].map((text, idx) => (
            <label key={idx} className="block" >
                <div style={{marginBottom: '10px'}}>
                <input
                type="checkbox"
                name="helpNeeds"
                value={text}
                onChange={handleChange}
                checked={formData.helpNeeds.includes(text)}
                />
                <span className="ml-2">{text}</span>
                </div>
            </label>
            ))}
        </div>
        </div>

      {/* 참고자료 */}
      <div className="mt-8 space-y-4">
        <h3>참고자료 (선택)</h3>
        <input name="referenceLink" placeholder="링크를 붙여넣기" value={formData.referenceLink} onChange={handleChange} className="input" style={{marginRight: '10px'}}/>
        <button type="button" className="px-4 py-2 bg-gray-200 rounded">이미지로 업로드</button>
      </div>

      {/* 동의 */}
      <div className="mt-8" style={{marginBottom: '30px'}}>
        <h3>정보 제공 동의 *</h3>
        <label className="flex items-center">
          <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
          <span className="ml-2 text-sm">
            위 내용에 동의합니다. <a href="#" className="underline text-blue-600">(개인정보 처리방침 보기)</a>
          </span>
        </label>
      </div>

      {/* 제출 버튼 */}
        <button className={styles["submit-button"]}>
            신청하기
        </button>
        
    </form>
    </div>
  );
}

export default ApplyForm;