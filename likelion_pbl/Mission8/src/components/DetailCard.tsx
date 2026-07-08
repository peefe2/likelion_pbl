import type { Lion } from '../types/lion';

interface DetailCardProps {
  lion: Lion;
}

function DetailCard({ lion }: DetailCardProps) {
  const contactEntries = [
    { label: 'Email', value: lion.contact.email },
    { label: 'Phone', value: lion.contact.phone },
    { label: 'Website', value: lion.contact.website },
  ].filter((e) => e.value);

  return (
    <article className="detail-card">
      <h3>{lion.name}</h3>
      <ul className="detail-info">
        <li><strong>활동 파트</strong> {lion.part}</li>
        <li><strong>조직명</strong> {lion.org}</li>
        <li><strong>자기소개</strong> {lion.bio}</li>
        <li>
          <strong>연락처</strong>
          <ul>
            {contactEntries.map((e) => (
              <li key={e.label}>{e.label}: {e.value}</li>
            ))}
          </ul>
        </li>
        <li>
          <strong>관심 기술</strong>
          <ul>
            {lion.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </li>
        <li><strong>한 마디</strong> &ldquo;{lion.motto}&rdquo;</li>
      </ul>
    </article>
  );
}

export default DetailCard;
