/**
 * script.js - Mission 03 부원 관리 대시보드 로직
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM 요소 선택 ---
    const summaryGrid = document.getElementById('summary-grid');
    const detailList = document.getElementById('detail-list');
    const totalCountSpan = document.getElementById('total-count');
    
    const btnToggleForm = document.getElementById('btn-toggle-form');
    const btnDeleteLast = document.getElementById('btn-delete-last');
    const formSection = document.getElementById('form-section');
    const addMemberForm = document.getElementById('add-member-form');
    
    // 입력 필드들
    const inputs = {
        name: document.getElementById('input-name'),
        part: document.getElementById('select-part'),
        skills: document.getElementById('input-skills'),
        intro: document.getElementById('input-intro'),
        contact: document.getElementById('input-contact'),
        motto: document.getElementById('input-motto')
    };

    // --- 데이터 상태 ---
    let members = [];

    // --- 초기화: 기존 HTML로부터 데이터 읽기 ---
    function init() {
        const summaryCards = summaryGrid.querySelectorAll('.card');
        const detailCards = detailList.querySelectorAll('.detail-card');

        summaryCards.forEach((card, index) => {
            const detailCard = detailCards[index];
            if (!detailCard) return;

            const name = card.querySelector('h3').textContent.replace(' (Me)', '');
            const part = card.querySelector('.part').textContent;
            const badge = card.querySelector('.badge').textContent;
            
            // 상세 정보 추출
            const detailItems = detailCard.querySelectorAll('.detail-info li');
            let intro = "";
            let skillsStr = "";
            let contact = "";
            let motto = "";

            detailItems.forEach(li => {
                const text = li.textContent;
                if (text.includes('자기소개:')) intro = text.split('자기소개:')[1].trim();
                if (text.includes('관심 기술:')) skillsStr = text.split('관심 기술:')[1].trim();
                if (text.includes('연락처:')) contact = text.split('연락처:')[1].trim();
                if (text.includes('한 마디:')) motto = text.split('한 마디:')[1].trim();
            });

            // 데이터 객체 생성
            const member = {
                name,
                part,
                skills: skillsStr.split(',').map(s => s.trim()),
                intro,
                contact,
                motto,
                isMe: card.classList.contains('my-card'),
                initials: card.querySelector('.profile-img').textContent.trim()
            };

            members.push(member);
        });

        updateTotalCount();
    }

    // 총 인원 갱신
    function updateTotalCount() {
        totalCountSpan.textContent = members.length;
    }

    // --- 이벤트 핸들러 ---

    // 폼 토글
    btnToggleForm.addEventListener('click', () => {
        formSection.classList.toggle('hidden');
    });

    // 마지막 항목 삭제
    btnDeleteLast.addEventListener('click', () => {
        if (members.length === 0) {
            alert('삭제할 명단이 없습니다.');
            return;
        }

        members.pop(); // 데이터 삭제
        summaryGrid.lastElementChild.remove(); // 요약 카드 DOM 삭제
        detailList.lastElementChild.remove(); // 상세 카드 DOM 삭제
        updateTotalCount();
    });

    // 폼 제출 (명단 추가)
    addMemberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const newMember = {
                name: inputs.name.value,
                part: inputs.part.value,
                skills: inputs.skills.value.split(',').map(s => s.trim()),
                intro: inputs.intro.value,
                contact: inputs.contact.value,
                motto: inputs.motto.value,
                isMe: false,
                initials: inputs.name.value.substring(0, 2).toUpperCase()
            };

            // 데이터 추가
            members.push(newMember);

            // DOM 추가
            addSummaryCard(newMember);
            addDetailCard(newMember);

            // UI 갱신 및 초기화
            updateTotalCount();
            resetForm();
            formSection.classList.add('hidden');
        }
    });

    // --- 기능 함수 ---

    // 유효성 검사
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

    // 폼 초기화
    function resetForm() {
        addMemberForm.reset();
        Object.values(inputs).forEach(input => {
            input.parentElement.querySelector('.error-msg').classList.add('hidden');
        });
    }

    // 요약 카드 DOM 생성 및 추가
    function addSummaryCard(member) {
        const article = document.createElement('article');
        article.className = 'card';
        
        // 기술 중 첫 번째를 배지로 사용
        const firstSkill = member.skills[0] || 'Lion';

        article.innerHTML = `
            <div class="profile-container">
                <div class="profile-img">${member.initials}</div>
                <span class="badge">${firstSkill}</span>
            </div>
            <div class="card-info">
                <h3>${member.name}</h3>
                <p class="part">${member.part}</p>
                <p class="intro">${member.intro}</p>
            </div>
        `;
        summaryGrid.appendChild(article);
    }

    // 상세 카드 DOM 생성 및 추가
    function addDetailCard(member) {
        const article = document.createElement('article');
        article.className = 'detail-card';

        // 관심 기술 리스트 생성
        const skillsHTML = member.skills.map(skill => `<li>${skill}</li>`).join('');

        article.innerHTML = `
            <h3>${member.name}</h3>
            <ul class="detail-info">
                <li><strong>소속 파트:</strong> ${member.part}</li>
                <li><strong>자기소개:</strong> ${member.intro}</li>
                <li><strong>관심 기술:</strong> ${member.skills.join(', ')}</li>
                <li><strong>연락처:</strong> ${member.contact}</li>
                <li><strong>한 마디:</strong> "${member.motto}"</li>
            </ul>
        `;
        detailList.appendChild(article);
    }

    // 실행 시작
    init();
});
