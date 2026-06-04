function ControlArea({ totalCount }) {
  return (
    <div className="control-area">
      <div className="info-box">
        <div>총 <strong>{totalCount}명</strong></div>
        <div id="status-message" className="status-ready">준비 완료</div>
      </div>

      <div className="button-group">
        <button className="btn-primary">아기 사자 추가</button>
        <button className="btn-secondary">마지막 삭제</button>
        <button className="btn-fetch">랜덤 1명 추가</button>
        <button className="btn-fetch">랜덤 5명 추가</button>
        <button className="btn-fetch">전체 새로고침</button>
        <button className="btn-secondary hidden">다시 시도</button>
      </div>
    </div>
  );
}

export default ControlArea;
