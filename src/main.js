import './style.css'
import { initApp } from './quiz.js'

// Tailwind CSS CDN을 동적으로 로드하고, 로드 완료 후 앱 초기화
function loadTailwindAndInit() {
  // 이미 tailwind가 로드되어 있으면 바로 init
  if (window.tailwind) {
    initApp();
    return;
  }

  const tailwindScript = document.createElement('script');
  tailwindScript.src = 'https://cdn.tailwindcss.com';

  tailwindScript.onload = () => {
    // Tailwind config (옵션) — 기본 색상과 폰트 등을 확장
    window.tailwind = window.tailwind || {};
    window.tailwind.config = {
      theme: {
        extend: {
          colors: {
            'primary-blue': '#4F46E5',
            'secondary-yellow': '#FBBF24',
            'bg-gray': '#F9FAFB',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
        }
      }
    };

    // 커스텀 스타일 (스크롤바, 라디오 체크 스타일 등)
    const style = document.createElement('style');
    style.textContent = `
      /* Custom scrollbar for better visual */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-thumb { background-color: #A5B4FC; border-radius: 10px; }
      ::-webkit-scrollbar-track { background-color: #E0E7FF; }
      /* Radio visual tweaks when tailwind is loaded */
      .radio-button:checked { background-color: #4F46E5; border-color: #4F46E5; }
      .question-card { scroll-margin-top: 20px; }
    `;
    document.head.appendChild(style);

    initApp();
  };

  tailwindScript.onerror = () => {
    // 실패해도 앱은 동작하도록 init
    console.warn('Tailwind CDN 로드 실패 — 기본 스타일로 초기화합니다.');
    initApp();
  };

  document.head.appendChild(tailwindScript);
}

document.addEventListener('DOMContentLoaded', loadTailwindAndInit);
