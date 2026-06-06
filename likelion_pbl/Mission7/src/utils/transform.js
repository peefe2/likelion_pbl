const PARTS = ['Frontend', 'Backend', 'Design'];
const SKILLS_MAP = {
  Frontend: ['React', 'HTML', 'CSS', 'JavaScript', 'Vue', 'TypeScript'],
  Backend: ['Node.js', 'Python', 'Go', 'Java', 'Spring', 'Docker'],
  Design: ['Figma', 'Adobe XD', 'Photoshop', 'UI/UX', 'Illustrator'],
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function transformUser(user) {
  const part = pickRandom(PARTS);
  const allSkills = SKILLS_MAP[part];
  const skillCount = Math.floor(Math.random() * 3) + 1;
  const skills = [...new Set(Array.from({ length: skillCount }, () => pickRandom(allSkills)))];

  const location = `${user.location.country} ${user.location.city}`;

  return {
    id: Date.now() + Math.random(),
    name: `${user.name.first} ${user.name.last}`,
    part,
    org: '순천대학교',
    summary: `${part} · ${location}에서 합류했습니다`,
    bio: `안녕하세요! ${part}에 관심이 많은 ${user.name.first}입니다. ${location} 출신입니다.`,
    skills,
    contact: {
      email: user.email,
      phone: user.phone,
      website: '',
    },
    motto: '열심히 하겠습니다!',
    badge: skills[0],
    picture: user.picture.large,
    isMe: false,
  };
}

export function filterAndSort(lions, filter, sort, search) {
  let result = [...lions];

  if (filter !== 'all') {
    result = result.filter((l) => l.part === filter);
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter((l) => l.name.toLowerCase().includes(q));
  }

  if (sort === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    result.sort((a, b) => b.id - a.id);
  }

  return result;
}
