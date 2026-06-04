import SummaryCard from "./SummaryCard";

function SummaryGrid({ lions }) {
  return (
    <section className="summary-section">
      <h2 className="section-title">아기 사자 요약</h2>
      <div className="summary-grid">
        {lions.map((lion) => (
          <SummaryCard key={lion.id} lion={lion} />
        ))}
      </div>
    </section>
  );
}

export default SummaryGrid;
