function ControlArea({
  totalCount,
  status,
  errorMsg,
  onToggleForm,
  onDeleteLast,
  onFetchOne,
  onFetchFive,
  onRefresh,
  onRetry,
}) {
  const isLoading = status === 'loading';
  const isError = status === 'error';

  const statusText = isLoading ? '불러오는 중...' : isError ? `불러오기 실패: ${errorMsg}` : '준비 완료';
  const statusClass = isLoading ? 'status-loading' : isError ? 'status-error' : 'status-ready';

  return (
    <div className="control-area">
      <div className="info-box">
        <div>총 <strong>{totalCount}명</strong></div>
        <div className={statusClass}>{statusText}</div>
        {isError && (
          <button className="btn-retry" onClick={onRetry}>다시 시도</button>
        )}
      </div>
      <div className="button-group">
        <button className="btn-primary" onClick={onToggleForm}>아기 사자 추가</button>
        <button className="btn-secondary" onClick={onDeleteLast}>마지막 삭제</button>
        <button className="btn-fetch" onClick={onFetchOne} disabled={isLoading}>랜덤 1명 추가</button>
        <button className="btn-fetch" onClick={onFetchFive} disabled={isLoading}>랜덤 5명 추가</button>
        <button className="btn-fetch" onClick={onRefresh} disabled={isLoading}>전체 새로고침</button>
      </div>
    </div>
  );
}

export default ControlArea;
