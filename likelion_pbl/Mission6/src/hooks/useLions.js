import { useState } from 'react';
import initialLions from '../data/lions';
import { transformUser } from '../utils/transform';

const API_URL = 'https://randomuser.me/api/';

export function useLions() {
  const [lions, setLions] = useState(initialLions);
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState('');
  const [lastRequest, setLastRequest] = useState(null);

  async function fetchUsers(count, isRefresh = false) {
    setStatus('loading');
    setErrorMsg('');
    const req = { count, isRefresh };
    setLastRequest(req);

    try {
      const res = await fetch(`${API_URL}?results=${count}&nat=us,gb,ca,au,nz`);
      if (!res.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
      const data = await res.json();
      const newLions = data.results.map(transformUser);

      if (isRefresh) {
        const myCard = lions.find((l) => l.isMe);
        const total = lions.length;
        const needed = total - (myCard ? 1 : 0);
        // 필요한 수만큼 반복해서 채우기
        const filled = [];
        for (let i = 0; filled.length < needed; i++) {
          filled.push({ ...newLions[i % newLions.length], id: Date.now() + Math.random() });
        }
        setLions(myCard ? [myCard, ...filled] : filled);
      } else {
        setLions((prev) => [...prev, ...newLions]);
      }

      setStatus('idle');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  }

  function addLion(lion) {
    setLions((prev) => [lion, ...prev]);
  }

  function deleteLast() {
    setLions((prev) => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
  }

  function retry() {
    if (lastRequest) fetchUsers(lastRequest.count, lastRequest.isRefresh);
  }

  return { lions, status, errorMsg, fetchUsers, addLion, deleteLast, retry };
}
