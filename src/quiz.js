// src/quiz.js
// SNS 사용심리 테스트 로직 및 UI 렌더링

// 질문 데이터 정의 (유형별 3개씩)
const questionsData = [
    // 불안형
    { type: '불안형', text: '하루 이상 SNS를 확인하지 않으면 불안한가요?' },
    { type: '불안형', text: 'SNS 알림이 울리면 바로 확인해야 하나요?' },
    { type: '불안형', text: '친구들의 근황이나 트렌드를 놓칠까 봐 초조한가요?' },
    // 인정욕구형
    { type: '인정욕구형', text: '자신의 게시물에 달린 댓글 수, 좋아요 수에 민감한가요?' },
    { type: '인정욕구형', text: '자신의 팔로워 수에 신경을 쓰는 편인가요?' },
    { type: '인정욕구형', text: '타인의 시선에 영향을 받는 편인가요?' },
    // 허세형
    { type: '허세형', text: '외모, 패션, 소비 등 과시용 게시물을 올리는 편인가요?' },
    { type: '허세형', text: '자신의 게시물과 타인의 게시물을 많이 비교하나요?' },
    { type: '허세형', text: '실제 자신과 SNS에 보여지는 자신 사이에 간극이 존재하나요?' },
    // 현실도피형
    { type: '현실도피형', text: '우울하거나 외로울 때 SNS로 해소하는 편인가요?' },
    { type: '현실도피형', text: '현실 세상보다 SNS 세상에 몰입을 하는 편인가요?' },
    { type: '현실도피형', text: 'SNS 친구들과의 교류가 오프라인 상에서의 친구들과의 교류보다 더 편한가요?' },
    // 정보탐색형
    { type: '정보탐색형', text: '트렌드, 뉴스, 공부 정보 등을 SNS로 자주 습득하는 편인가요?' },
    { type: '정보탐색형', text: '정보탐색을 목적으로 SNS를 사용하다가 무의식적 스크롤로 이어진 경험이 있나요?' },
    { type: '정보탐색형', text: 'NAVER, Google 등의 검색 사이트보다 SNS에서 정보를 더 자주 탐색하나요?' },
    // 습관형
    { type: '습관형', text: '지루하거나 심심할 때 무의식적으로 SNS에 접속하나요?' },
    { type: '습관형', text: '특별한 목적 없이 피드를 스크롤하거나 숏폼을 시청하나요?' },
    { type: '습관형', text: 'SNS를 때와 장소에 가리지 않고 습관적으로 확인하나요?' }
];

// 5지선다 옵션 (점수 역순)
const options = [
    { text: '매우 그렇다', score: 5 },
    { text: '그렇다', score: 4 },
    { text: '보통이다', score: 3 },
    { text: '아니다', score: 2 },
    { text: '매우 아니다', score: 1 },
];

// 유형별 설명 (결과 제시용)
const typeDescriptions = {
    '불안형': {
        title: '불안형: FOMO에 사로잡힌, 연결 강박!',
        description: "당신은 외부와의 연결이 끊어지는 것에 대한 불안감(FOMO)이 높습니다. SNS를 확인하지 않으면 중요한 정보를 놓치거나 소외될까 봐 초조해합니다. 알림에 즉각 반응하며, 늘 최신 트렌드를 따라가야 한다는 강박을 느낄 수 있습니다. 정기적으로 SNS 사용 시간을 정하고, 알림을 최소화하여 '현재'에 집중하는 연습이 필요합니다."
    },
    '인정욕구형': {
        title: '인정욕구형: 좋아요에 목마른, 자존감 의존!',
        description: "당신은 타인의 인정과 피드백에 크게 의존합니다. 게시물의 좋아요 수, 댓글, 팔로워 수가 자신의 가치를 결정한다고 무의식적으로 생각하며, 이 수치들에 따라 기분이 좌우됩니다. 타인의 시선에서 벗어나, 자기 내부에서 만족감을 찾는 훈련이 필요합니다. SNS는 기록의 수단일 뿐, 당신의 가치를 증명하는 도구가 아님을 기억하세요."
    },
    '허세형': {
        title: '허세형: 완벽한 이미지를 만드는, 과시 지향!',
        description: '당신은 SNS를 통해 이상화된 자신의 모습을 보여주려는 경향이 강합니다. 외모, 소비, 라이프스타일 등을 과장하거나 편집하여 게시하며, 타인의 게시물과 자신을 끊임없이 비교합니다. 실제 모습과 SNS 속 이미지 사이의 괴리로 인해 스트레스를 받을 수 있습니다. 진솔한 자신을 수용하고, 타인의 시선보다 자신의 만족을 우선시하는 것이 중요합니다.'
    },
    '현실도피형': {
        title: '현실도피형: 현실이 버거운, 가상 세계 몰입!',
        description: '당신은 현실의 어려움이나 외로움을 SNS를 통해 해소하려는 경향이 있습니다. 현실 세계보다 SNS 속 가상의 관계나 활동에 더 큰 편안함과 만족감을 느끼며 몰입합니다. SNS를 감정 해소의 통로로만 사용하기보다, 현실에서 즐거움을 찾을 수 있는 활동(취미, 운동 등)을 병행하는 것이 균형 잡힌 생활에 도움이 됩니다.'
    },
    '정보탐색형': {
        title: '정보탐색형: 효율을 추구하는, 늪에 빠진 탐색가!',
        description: '당신은 트렌드, 뉴스, 전문 정보 등을 습득하기 위해 SNS를 주로 활용합니다. 목적성 있게 시작했더라도, 연관 콘텐츠나 무의식적인 스크롤링으로 인해 시간을 낭비하는 경우가 많습니다. 정보 탐색의 효율성을 높이기 위해 명확한 목표 시간을 설정하고, 정보 습득 후에는 반드시 로그아웃하여 무의미한 사용을 차단하는 습관을 들이세요.'
    },
    '습관형': {
        title: '습관형: 무의식적 자동 반응, 중독의 덫!',
        description: '당신은 특별한 목적 없이도 지루하거나 심심할 때 무의식적으로 SNS에 접속하는 경향이 강합니다. 피드 스크롤이나 숏폼 시청이 습관화되어, 장소나 상황을 가리지 않고 확인합니다. 이는 가장 흔한 형태의 SNS 중독 초기 단계입니다. 불필요한 접속을 줄이기 위해 스마트폰 첫 화면에서 SNS 앱을 제거하거나, 물리적인 제약을 두는 것이 효과적이다.'
    }
};

let shuffledQuestions = [];
let userAnswers = {}; // { questionId: { score: number, type: string }, ... }
const totalQuestions = questionsData.length;

// DOM 요소 변수는 initApp에서 전역적으로 설정됩니다.
let appDiv;
let quizContainer;
let questionsList;
let resultContainer;
let submitButton;
let resultType;
let resultDescription;
let scoreBreakdown;

// Fisher-Yates 셔플 알고리즘
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 막대 그래프 색상 코드 헬퍼 함수
function getBarColorCode(type) {
    switch(type) {
        case '불안형': return '#EF4444'; // red-500
        case '인정욕구형': return '#F59E0B'; // yellow-500
        case '허세형': return '#10B981'; // green-500
        case '현실도피형': return '#6366F1'; // indigo-500
        case '정보탐색형': return '#A855F7'; // purple-500
        case '습관형': return '#EC4899'; // pink-500
        default: return '#9CA3AF'; // gray-400
    }
}

// 퀴즈 UI를 초기 HTML 구조에 삽입 (renderAppStructure 함수)
function renderAppStructure() {
    appDiv.innerHTML = `
        <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">
            📱 SNS 사용 심리 테스트
        </h1>
        <p class="text-center text-gray-500 mb-8">
            아래 18개 질문에 모두 답변하고, 나의 SNS 심리 유형을 확인해 보세요!
        </p>

        <!-- Quiz Container - All questions rendered here -->
        <div id="quiz-container">
            <!-- Questions will be dynamically generated here -->
            <div id="questions-list" class="space-y-8">
                <!-- Question cards will be injected here -->
            </div>

            <!-- Submission Button -->
            <div class="mt-10">
                <button id="submit-button" class="w-full py-3 btn btn-yellow" disabled>
                    결과 보기 (모든 질문에 답변해 주세요)
                </button>
            </div>
        </div>

        <!-- Result Container -->
        <div id="result-container" class="hidden text-center">
            <svg class="w-20 h-20 mx-auto mb-4 text-primary-blue animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h2 class="text-3xl font-bold text-gray-800 mb-4">당신의 SNS 심리 유형은?</h2>
            
            <div class="result-card mb-6">
                <p class="text-lg font-medium mb-2">당신의 주된 유형은</p>
                <p id="result-type" class="text-2xl font-extrabold"></p>
            </div>

            <!-- Score Breakdown Section -->
            <div id="score-breakdown" class="mt-8 mb-6 p-4 bg-white border border-gray-200 rounded-xl shadow-inner text-left">
                <h3 class="text-xl font-bold text-gray-800 mb-4 text-center border-b pb-2">유형별 점수 비율</h3>
                <!-- Breakdown will be inserted here dynamically -->
            </div>

            <div id="result-description" class="text-gray-700 bg-gray-100 p-4 rounded-lg text-left">
                <!-- Description will be inserted here -->
            </div>
            
            <button onclick="window.restartQuiz()" class="mt-8 py-3 px-6 btn btn-yellow">
                다시 테스트하기
            </button>
        </div>
    `;

    // DOM 요소 초기화
    quizContainer = document.getElementById('quiz-container');
    questionsList = document.getElementById('questions-list');
    resultContainer = document.getElementById('result-container');
    submitButton = document.getElementById('submit-button');
    resultType = document.getElementById('result-type');
    resultDescription = document.getElementById('result-description');
    scoreBreakdown = document.getElementById('score-breakdown');

    // 이벤트 리스너 연결
    submitButton.addEventListener('click', submitQuiz);
}


// 모든 질문 렌더링
function renderAllQuestions() {
    questionsList.innerHTML = '';
    submitButton.disabled = true;
    submitButton.textContent = `결과 보기 (모든 ${totalQuestions}개 질문에 답변해 주세요)`;
    submitButton.classList.remove('btn-primary');
    submitButton.classList.add('btn-disabled');


    shuffledQuestions.forEach((question, index) => {
        const questionHtml = `
            <div id="${question.id}" class="question-card">
                <p class="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                    <span style="color: var(--primary-blue); font-weight:700; margin-right:8px">${index + 1}.</span>
                    ${question.text}
                </p>
                <!-- Options: 가로 5분할 grid로 변경 -->
                <div class="grid grid-cols-5 gap-2 text-center">
                    ${options.map(option => `
                        <label class="flex flex-col items-center justify-center p-2 h-20 bg-white rounded-xl" for="${question.id}-${option.score}">
                            <input id="${question.id}-${option.score}" type="radio" name="${question.id}" value="${option.score}" data-type="${question.type}" 
                                    class="radio-button" onclick="window.updateAnswer('${question.id}', ${option.score}, '${question.type}')">
                            <span class="option-text">${option.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        questionsList.insertAdjacentHTML('beforeend', questionHtml);
    });
}

// 답변 업데이트 및 완료 여부 확인
function updateAnswer(questionId, score, type) {
    userAnswers[questionId] = { score, type };
    
    // 모든 질문에 답변했는지 확인
    if (Object.keys(userAnswers).length === totalQuestions) {
        submitButton.disabled = false;
        submitButton.textContent = '결과 보기';
        submitButton.classList.remove('btn-disabled');
        submitButton.classList.add('btn-primary');
    } else {
        submitButton.disabled = true;
        submitButton.textContent = `결과 보기 (${Object.keys(userAnswers).length}/${totalQuestions}개 답변 완료)`;
        submitButton.classList.remove('btn-primary');
        submitButton.classList.add('btn-disabled');
    }
}
window.updateAnswer = updateAnswer; // 전역에서 접근 가능하도록 설정

// 결과 계산 및 표시
function submitQuiz() {
    if (Object.keys(userAnswers).length !== totalQuestions) {
        console.error('모든 질문에 답변하지 않았습니다.');
        return;
    }

    // 점수 합산
    let scores = {};
    shuffledQuestions.forEach(q => scores[q.type] = 0); 

    for (const questionId in userAnswers) {
        const answer = userAnswers[questionId];
        scores[answer.type] += answer.score;
    }

    quizContainer.classList.add('hidden');

    // 최대 점수 및 비율 계산
    const maxScorePerType = 15; // 3문항 * 5점
    let scoreDetails = [];

    for (const type in scores) {
        const score = scores[type];
        const percentage = Math.round((score / maxScorePerType) * 100);
        scoreDetails.push({ type, score, percentage, colorCode: getBarColorCode(type) });
    }

    // 점수 내림차순으로 정렬
    scoreDetails.sort((a, b) => b.score - a.score); 

    const maxScore = scoreDetails[0].score;
    const topTypes = scoreDetails.filter(detail => detail.score === maxScore);
    const topTypeNames = topTypes.map(d => d.type);


    let finalResultTitle = '';
    let finalDescriptionHtml = '';

    if (topTypes.length === 1) {
        // 1. 단일 유형이 가장 높을 경우
        const resultTypeKey = topTypeNames[0];
        const resultInfo = typeDescriptions[resultTypeKey];
        
        finalResultTitle = resultInfo.title;
        finalDescriptionHtml = `<p class="font-bold text-gray-900 mb-2">요약</p><p>${resultInfo.description}</p>`;
        
    } else {
        // 2. 2개 이상의 유형이 동점일 경우 (복합 유형)
        const tiedTitles = topTypeNames.map(type => typeDescriptions[type].title.split(':')[0]);
        const tiedTitlesJoined = tiedTitles.join(' 및 ');

        finalResultTitle = `${tiedTitlesJoined}: 두드러지는 복합 심리 유형!`;
        
        // 복합 유형 설명 HTML 생성
        const detailedDescriptions = topTypeNames.map(type => {
            const info = typeDescriptions[type];
            const subTitle = info.title.split(': ')[1].trim();
            return `
                <div class="mb-6 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0">
                    <p class="text-xl font-extrabold" style="color:var(--primary-blue); margin-bottom:6px">${type}</p>
                    <p class="text-lg font-semibold text-gray-800 mb-2">${subTitle}</p>
                    <p class="text-base">${info.description}</p>
                </div>
            `;
        }).join('');

        finalDescriptionHtml = `
            <div class="mb-4">
                <p class="font-bold text-gray-900 mb-2">종합 분석</p>
                <p class="mb-4 text-base">당신은 **${topTypeNames.join(', ')}** 유형의 심리적 요인이 동시에 매우 강하게 나타나는 복합적인 사용자입니다. 이는 여러 요인으로 인해 SNS 중독 성향이 발현될 수 있음을 의미합니다. 아래에서 각 유형에 대한 상세 설명을 확인하고 균형을 찾으세요.</p>
            </div>
            ${detailedDescriptions}
        `;
    }

    // 최종 결과 DOM 업데이트
    resultType.textContent = finalResultTitle;
    resultDescription.innerHTML = finalDescriptionHtml;

    // 점수 비율 시각화
    scoreBreakdown.innerHTML = `<h3 class="text-xl font-bold text-gray-800 mb-4 text-center border-b pb-2">유형별 점수 비율</h3>`; // Reset header

    scoreDetails.forEach(detail => {
        const breakdownHtml = `
            <div class="mb-4">
                <div class="flex" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
                    <span class="font-medium" style="color:#374151">${detail.type} (${detail.score}/${maxScorePerType}점)</span>
                    <span class="font-bold" style="color: ${detail.colorCode};">${detail.percentage}%</span>
                </div>
                <div class="bar-bg">
                    <div class="bar-fill" style="width: ${detail.percentage}%; background-color: ${detail.colorCode};"></div>
                </div>
            </div>
        `;
        scoreBreakdown.insertAdjacentHTML('beforeend', breakdownHtml);
    });

    // 결과 화면 표시
    resultContainer.classList.remove('hidden');
}

// 퀴즈 초기화 및 시작
function initQuiz() {
    // 질문 무작위 셔플 및 ID 부여
    shuffledQuestions = questionsData.map((q, index) => ({
        ...q,
        id: `q${index}`
    }));
    shuffleArray(shuffledQuestions);
    
    userAnswers = {};

    // DOM 구조가 준비된 후에만 초기화 진행
    if (!appDiv) {
        appDiv = document.getElementById('app');
        renderAppStructure();
    }
    
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    
    renderAllQuestions();
}

// 퀴즈 재시작
function restartQuiz() {
    initQuiz();
}
window.restartQuiz = restartQuiz; // 전역에서 접근 가능하도록 설정

// 외부에서 호출할 초기화 함수를 export
export function initApp() {
    initQuiz();
}
