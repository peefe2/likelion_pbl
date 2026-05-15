document.addEventListener('DOMContentLoaded', () => {
    // --- 상태 관리 ---
    let members = [];
    let lastRequest = null; // 실패 시 재시도를 위한 마지막 요청 정보

    // --- DOM 요소 ---
    const summaryGrid = document.getElementById('summary-grid');
    const detailList = document.getElementById('detail-list');
    const totalCountSpan = document.getElementById('total-count');
    const statusMessage = document.getElementById('status-message');
    const emptyState = document.getElementById('empty-state');
    const errorContainer = document.getElementById('error-container');
    const errorText = document.getElementById('error-text');

    const btnFetchOne = document.getElementById('btn-fetch-one');
    const btnFetchFive = document.getElementById('btn-fetch-five');
    const btnRefresh = document.getElementById('btn-refresh');
    const btnRetry = document.getElementById('btn-retry');
    const btnToggleForm = document.getElementById('btn-toggle-form');
    const btnDeleteLast = document.getElementById('btn-delete-last');
    const btnRandomFill = document.getElementById('btn-random-fill');

    const formSection = document.getElementById('form-section');
    const addMemberForm = document.getElementById('add-member-form');
    
    // 필터/정렬/검색 요소
    const filterPart = document.getElementById('filter-part');
    const sortOrder = document.getElementById('sort-order');
    const searchInput = document.getElementById('search-input');

    // 입력 필드들
    const inputs = {
        name: document.getElementById('input-name'),
        part: document.getElementById('select-part'),
        skills: document.getElementById('input-skills'),
        intro: document.getElementById('input-intro'),
        contact: document.getElementById('input-contact'),
        motto: document.getElementById('input-motto')
    };

    // --- 데이터 변환 유틸리티 ---
    const PARTS = ['Frontend', 'Backend', 'Design'];
    const SKILLS_MAP = {
        'Frontend': ['HTML', 'CSS', 'JS', 'React', 'Vue', 'TS'],
        'Backend': ['Node.js', 'Python', 'Go', 'Java', 'Spring', 'Docker'],
        'Design': ['Figma', 'Adobe XD', 'Photoshop', 'UI/UX']
    };

    function transformExternalData(userData) {
        const part = PARTS[Math.floor(Math.random() * PARTS.length)];
        const possibleSkills = SKILLS_MAP[part];
        const skills = [];
        const skillCount = Math.floor(Math.random() * 3) + 1;
        for(let i=0; i<skillCount; i++) {
            const s = possibleSkills[Math.floor(Math.random() * possibleSkills.length)];
            if(!skills.includes(s)) skills.push(s);
        }

        return {
            id: Date.now() + Math.random(),
            name: userData.name,
            part: part,
            skills: skills,
            intro: userData.company.bs,
            contact: userData.email,
            motto: userData.company.catchPhrase,
            initials: userData.name.substring(0, 2).toUpperCase(),
            createdAt: new Date()
        };
    }

    // --- 비동기 데이터 통신 ---
    async function fetchData(count = 1, isRefresh = false) {
        setLoading(true);
        lastRequest = { count, isRefresh };

        try {
            // 외부 API 호출 (JSONPlaceholder)
            // 실제로는 10명만 있으므로 적절히 슬라이싱하거나 가공
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            
            if (!response.ok) throw new Error('네트워크 응답이 올바르지 않습니다.');
            
            const data = await response.json();
            
            // 랜덤으로 섞어서 필요한 만큼 가져오기
            const shuffled = data.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, count);
            const newMembers = selected.map(transformExternalData);

            if (isRefresh) {
                members = newMembers;
            } else {
                members = [...members, ...newMembers];
            }

            render();
            setLoading(false);
            errorContainer.classList.add('hidden');
        } catch (error) {
            console.error('Fetch error:', error);
            setLoading(false, true);
            errorText.textContent = `데이터를 불러오지 못했습니다: ${error.message}`;
            errorContainer.classList.remove('hidden');
        }
    }

    function setLoading(isLoading, isError = false) {
        const buttons = [btnFetchOne, btnFetchFive, btnRefresh];
        buttons.forEach(btn => btn.disabled = isLoading);

        if (isLoading) {
            statusMessage.textContent = '불러오는 중...';
            statusMessage.className = 'status-loading';
        } else if (isError) {
            statusMessage.textContent = '불러오기 실패';
            statusMessage.className = 'status-error';
        } else {
            statusMessage.textContent = '준비 완료';
            statusMessage.className = 'status-ready';
        }
    }

    // --- 렌더링 시스템 (Data-Driven) ---
    function render() {
        const filtered = filterAndSort(members);
        
        // 1. 요약 그리드 갱신
        summaryGrid.innerHTML = '';
        filtered.forEach(m => summaryGrid.appendChild(createSummaryCard(m)));

        // 2. 상세 리스트 갱신
        detailList.innerHTML = '';
        filtered.forEach(m => detailList.appendChild(createDetailCard(m)));

        // 3. 인원 수 및 Empty State
        totalCountSpan.textContent = members.length;
        if (filtered.length === 0 && members.length > 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }

    function filterAndSort(data) {
        let result = [...data];

        // 필터
        const part = filterPart.value;
        if (part !== 'all') {
            result = result.filter(m => m.part === part);
        }

        // 검색
        const search = searchInput.value.trim().toLowerCase();
        if (search) {
            result = result.filter(m => m.name.toLowerCase().includes(search));
        }

        // 정렬
        const sort = sortOrder.value;
        if (sort === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            // 최신추가순 (기본)
            result.sort((a, b) => b.createdAt - a.createdAt);
        }

        return result;
    }

    function createSummaryCard(member) {
        const article = document.createElement('article');
        article.className = 'card';
        article.innerHTML = `
            <div class="profile-container">
                <div class="profile-img">${member.initials}</div>
                <span class="badge">${member.skills[0] || 'Lion'}</span>
            </div>
            <div class="card-info">
                <h3>${member.name}</h3>
                <p class="part">${member.part}</p>
                <p class="intro">${member.intro}</p>
            </div>
        `;
        return article;
    }

    function createDetailCard(member) {
        const article = document.createElement('article');
        article.className = 'detail-card';
        article.innerHTML = `
            <h3>${member.name}</h3>
            <ul class="detail-info">
                <li><strong>활동 파트:</strong> ${member.part}</li>
                <li><strong>보유 기술:</strong> ${member.skills.join(', ')}</li>
                <li><strong>자기소개:</strong> ${member.intro}</li>
                <li><strong>연락처:</strong> ${member.contact}</li>
                <li><strong>좌우명:</strong> "${member.motto}"</li>
            </ul>
        `;
        return article;
    }

    // --- 이벤트 리스너 ---

    // 비동기 버튼들
    btnFetchOne.addEventListener('click', () => fetchData(1));
    btnFetchFive.addEventListener('click', () => fetchData(5));
    btnRefresh.addEventListener('click', () => fetchData(5, true));
    btnRetry.addEventListener('click', () => {
        if (lastRequest) fetchData(lastRequest.count, lastRequest.isRefresh);
    });

    // 필터/정렬/검색 실시간 반영
    filterPart.addEventListener('change', render);
    sortOrder.addEventListener('change', render);
    searchInput.addEventListener('input', render);

    // 폼 제어
    btnToggleForm.addEventListener('click', () => {
        formSection.classList.toggle('hidden');
    });

    btnDeleteLast.addEventListener('click', () => {
        if (members.length === 0) return alert('삭제할 멤버가 없습니다.');
        members.pop();
        render();
    });

    // 랜덤 값 채우기
    btnRandomFill.addEventListener('click', async () => {
        btnRandomFill.disabled = true;
        btnRandomFill.textContent = '가져오는 중...';
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();
            const randomUser = data[Math.floor(Math.random() * data.length)];
            const transformed = transformExternalData(randomUser);

            inputs.name.value = transformed.name;
            inputs.part.value = transformed.part;
            inputs.skills.value = transformed.skills.join(', ');
            inputs.intro.value = transformed.intro;
            inputs.contact.value = transformed.contact;
            inputs.motto = transformed.motto; // Note: motto input doesn't have .motto property, it's inputs.motto.value
            document.getElementById('input-motto').value = transformed.motto;

            alert('랜덤 데이터가 채워졌습니다. 등록을 눌러 완성하세요!');
        } catch (e) {
            alert('데이터를 가져오지 못했습니다.');
        } finally {
            btnRandomFill.disabled = false;
            btnRandomFill.textContent = '랜덤 값 채우기';
        }
    });

    // 수동 등록
    addMemberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            const newMember = {
                id: Date.now(),
                name: inputs.name.value,
                part: inputs.part.value,
                skills: inputs.skills.value.split(',').map(s => s.trim()),
                intro: inputs.intro.value,
                contact: inputs.contact.value,
                motto: inputs.motto.value,
                initials: inputs.name.value.substring(0, 2).toUpperCase(),
                createdAt: new Date()
            };
            members.unshift(newMember); // 새로운 멤버는 맨 앞에 추가 (최신추가순)
            render();
            addMemberForm.reset();
            formSection.classList.add('hidden');
        }
    });

    function validateForm() {
        let isValid = true;
        Object.keys(inputs).forEach(key => {
            const input = inputs[key];
            const errorMsg = input.parentElement.querySelector('.error-msg');
            if (input.value.trim() === "") {
                errorMsg.classList.remove('hidden');
                isValid = false;
            } else {
                errorMsg.classList.add('hidden');
            }
        });
        return isValid;
    }

    // 초기 데이터 로드 (시작할 때 5명)
    fetchData(5, true);
});
