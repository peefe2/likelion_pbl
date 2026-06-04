import { useState } from 'react';
import { transformUser } from '../utils/transform';

const EMPTY_FORM = {
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

export function useForm() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [fillLoading, setFillLoading] = useState(false);

  function toggle() {
    setShow((v) => !v);
    setForm(EMPTY_FORM);
  }

  function close() {
    setShow(false);
    setForm(EMPTY_FORM);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function isValid() {
    return Object.entries(form).every(([key, val]) => {
      if (key === 'website') return true;
      return val.trim() !== '';
    });
  }

  function buildLion() {
    return {
      id: Date.now(),
      name: form.name,
      part: form.part,
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

  async function randomFill() {
    setFillLoading(true);
    try {
      const res = await fetch(`${API_URL}?results=1&nat=us,gb,ca,au,nz`);
      const data = await res.json();
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
