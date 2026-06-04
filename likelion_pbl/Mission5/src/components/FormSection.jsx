function FormSection() {
  return (
    <section className="form-section hidden">
      <div className="form-container">
        <h2 className="section-title">새 아기 사자 등록</h2>
        <form id="add-member-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="input-name">이름</label>
              <input type="text" id="input-name" placeholder="이름" />
            </div>
            <div className="form-group">
              <label htmlFor="select-part">활동 파트</label>
              <select id="select-part" defaultValue="">
                <option value="">파트를 선택하세요</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Design">Design</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label htmlFor="input-skills">관심 기술 (쉼표로 구분)</label>
              <input type="text" id="input-skills" placeholder="예: HTML, CSS, JS" />
            </div>
            <div className="form-group full-width">
              <label htmlFor="input-summary">한 줄 소개</label>
              <input type="text" id="input-summary" placeholder="한 줄로 나를 소개해주세요" />
            </div>
            <div className="form-group full-width">
              <label htmlFor="input-bio">자기소개</label>
              <textarea id="input-bio" rows="3" placeholder="자세한 자기소개를 적어주세요." />
            </div>
            <div className="form-group">
              <label htmlFor="input-email">Email</label>
              <input type="email" id="input-email" placeholder="lion@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="input-phone">Phone</label>
              <input type="tel" id="input-phone" placeholder="010-0000-0000" />
            </div>
            <div className="form-group">
              <label htmlFor="input-website">Website</label>
              <input type="url" id="input-website" placeholder="https://example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="input-motto">한 마디</label>
              <input type="text" id="input-motto" placeholder="나만의 좌우명" />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary">랜덤 값 채우기</button>
            <button type="submit" className="btn-submit">추가하기</button>
            <button type="button" className="btn-secondary">취소</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default FormSection;
