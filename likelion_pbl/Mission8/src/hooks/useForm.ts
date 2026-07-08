import { useState, type ChangeEvent } from 'react';
import { transformUser } from '../utils/transform';
import type { Lion, LionFormData, Part } from '../types/lion';
import type { RandomUserApiResponse } from '../types/randomUser';
import type { UseFormReturn } from '../types/hooks';

const EMPTY_FORM: LionFormData = {
  name: '',
  part: '',
  skills: '',
  summary: '',
  bio: '',
  email: '',
  phone: '',
  website: '',
  motto: '',
};

const API_URL = 'https://randomuser.me/api/';

function isPart(value: string): value is Part {
  return value === 'Frontend' || value === 'Backend' || value === 'Design';
}

export function useForm(): UseFormReturn {
  const [show, setShow] = useState<boolean>(false);
  const [form, setForm] = useState<LionFormData>(EMPTY_FORM);
  const [fillLoading, setFillLoading] = useState<boolean>(false);

  function toggle(): void {
    setShow((v) => !v);
    setForm(EMPTY_FORM);
  }

  function close(): void {
    setShow(false);
    setForm(EMPTY_FORM);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function isValid(): boolean {
    return Object.entries(form).every(([key, val]) => {
      if (key === 'website') return true;
      return val.trim() !== '';
    });
  }

  function buildLion(): Lion {
    return {
      id: Date.now(),
      name: form.name,
      part: isPart(form.part) ? form.part : 'Frontend',
      org: '순천대학교',
      summary: form.summary,
      bio: form.bio,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      contact: { email: form.email, phone: form.phone, website: form.website },
      motto: form.motto,
      badge: form.skills.split(',')[0]?.trim() || form.part,
      isMe: false,
    };
  }

  async function randomFill(): Promise<void> {
    setFillLoading(true);
    try {
      const res = await fetch(`${API_URL}?results=1&nat=us,gb,ca,au,nz`);
      const data: RandomUserApiResponse = await res.json();
      const lion = transformUser(data.results[0]);
      setForm({
        name: lion.name,
        part: lion.part,
        skills: lion.skills.join(', '),
        summary: lion.summary,
        bio: lion.bio,
        email: lion.contact.email,
        phone: lion.contact.phone,
        website: '',
        motto: lion.motto,
      });
    } catch {
      alert('데이터를 가져오지 못했습니다.');
    } finally {
      setFillLoading(false);
    }
  }

  return { show, form, fillLoading, toggle, close, handleChange, isValid, buildLion, randomFill };
}
