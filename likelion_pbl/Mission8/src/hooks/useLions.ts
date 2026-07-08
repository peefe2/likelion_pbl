import { useState } from 'react';
import initialLions from '../data/lions';
import { transformUser } from '../utils/transform';
import type { Lion, Status } from '../types/lion';
import type { RandomUserApiResponse } from '../types/randomUser';
import type { UseLionsReturn } from '../types/hooks';

const API_URL = 'https://randomuser.me/api/';

interface LastRequest {
  count: number;
  isRefresh: boolean;
}

export function useLions(): UseLionsReturn {
  const [lions, setLions] = useState<Lion[]>(initialLions);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [lastRequest, setLastRequest] = useState<LastRequest | null>(null);

  async function fetchUsers(count: number, isRefresh = false): Promise<void> {
    setStatus('loading');
    setErrorMsg('');
    const req: LastRequest = { count, isRefresh };
    setLastRequest(req);

    try {
      const res = await fetch(`${API_URL}?results=${count}&nat=us,gb,ca,au,nz`);
      if (!res.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
      const data: RandomUserApiResponse = await res.json();
      const newLions = data.results.map(transformUser);

      if (isRefresh) {
        const myCard = lions.find((l) => l.isMe);
        const total = lions.length;
        const needed = total - (myCard ? 1 : 0);
        // 필요한 수만큼 반복해서 채우기
        const filled: Lion[] = [];
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
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  }

  function addLion(lion: Lion): void {
    setLions((prev) => [lion, ...prev]);
  }

  function deleteLast(): void {
    setLions((prev) => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
  }

  function retry(): void {
    if (lastRequest) fetchUsers(lastRequest.count, lastRequest.isRefresh);
  }

  return { lions, status, errorMsg, fetchUsers, addLion, deleteLast, retry };
}
