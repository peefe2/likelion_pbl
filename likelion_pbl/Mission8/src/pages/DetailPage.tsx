import { useParams, useNavigate } from 'react-router-dom';
import DetailCard from '../components/DetailCard';
import type { Lion } from '../types/lion';

interface DetailPageProps {
  lions: Lion[];
}

function DetailPage({ lions }: DetailPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  // id는 문자열이므로 느슨한 비교로 찾기
  const lion = lions.find((l) => String(l.id) === id);

  if (!lion) {
    return (
      <main>
        <div className="empty-state">
          <p>해당 아기 사자를 찾을 수 없습니다. 🦁</p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            목록으로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="detail-section">
        <div className="detail-nav">
          <button className="btn-secondary" onClick={() => navigate(-1)}>
            ← 목록으로 돌아가기
          </button>
        </div>
        <h2 className="section-title">상세 프로필</h2>
        <div className="detail-list">
          <DetailCard lion={lion} />
        </div>
      </section>
    </main>
  );
}

export default DetailPage;
