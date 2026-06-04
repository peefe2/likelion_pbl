import SummaryCard from './SummaryCard';

function SummaryGrid({ lions }) {
  return (
    <section className="summary-section">
      <h2 className="section-title">아기 사자 요약</h2>
      {lions.length === 0 ? (
        <div className="empty-state">
          <p>조건에 맞는 아기 사자가 없습니다. 🦁</p>
        </div>
      ) : (
        <div className="summary-grid">
          {lions.map((lion) => (
            <SummaryCard key={lion.id} lion={lion} />
          ))}
        </div>
      )}
    </section>
  );
}

export default SummaryGrid;
