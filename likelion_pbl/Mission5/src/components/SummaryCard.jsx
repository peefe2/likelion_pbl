function SummaryCard({ lion }) {
  const initials = lion.name.substring(0, 2).toUpperCase();
  const cardClass = lion.isMe ? "card card-mine" : "card";

  return (
    <article className={cardClass}>
      <div className="profile-container">
        <div className="profile-img">{initials}</div>
        <span className="badge">{lion.badge}</span>
      </div>
      <div className="card-info">
        <h3>{lion.name}</h3>
        <p className="part">{lion.part}</p>
        <p className="intro">{lion.summary}</p>
      </div>
    </article>
  );
}

export default SummaryCard;
