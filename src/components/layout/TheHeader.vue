<template>
    <header class="header">
        <div class="logo">{{ title }}</div>
        <div class="header-actions">
            <a href="https://blog.naver.com/hoonee-math" target="_blank"  class="social-link">
                <img src="/naver_blog.png" alt="naver_blog">
            </a>
            <a href="https://github.com/hoonee-math" target="_blank"  class="social-link">
                <img src="/github.png" alt="github">
            </a>
            <button @click="handleDownloadPdf" class="btn-primary pdf-btn">PDF 다운로드</button>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import PdfService from '@/services/pdf.service';

export default defineComponent({
    name: 'TheHeader',
    props: {
        title: {
            type: String,
            default: 'Portfolio'
        },
        contentId: {
            type: String,
            default: 'content-to-pdf'
        }
    },
    methods: {
        handleDownloadPdf(): void {
            const contentElement = document.getElementById(this.contentId);

            if (contentElement) {
                // PDF 다운로드 서비스 호출
                // PdfService.downloadPdf(contentElement, {
                //     filename: '포트폴리오.pdf'
                // });
            } else {
                console.error(`ID가 '${this.contentId}'인 요소를 찾을 수 없습니다.`);
            }
        }
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/utils' as utils;

.header {
    @include utils.position(fixed, 0, 0, null, 0);
    height: vars.$header-height;
    background-color: vars.$white;
    box-shadow: vars.$shadow-sm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 100;
}

.logo {
    font-size: 1.5rem;
    font-weight: vars.$font-weight-bold;
    @include utils.gradient-text(vars.$gradient-primary);
}

.header-actions {
    display: flex;
    align-items: center;
}
/* 첫 번째 요소와 두 번째 요소 사이의 간격 조절 */
.header-actions a:first-child {
    margin-right: 6px; /* 첫 번째 요소의 오른쪽 여백을 줄임 */
}

/* 또는 다음과 같이 특정 요소에만 마진 적용 */
.header-actions a:nth-child(2) {
    margin-right: 16px; /* 두 번째 요소의 오른쪽 여백 추가 */
    @media (max-width: 768px) {
        margin-right: 0px;
    }
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    transition: vars.$transition-base;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: vars.$shadow-sm;
    }

    img {
        width: 80%;
        height: 100%;
        object-fit: contain; // 이미지 비율 유지
    }
}

.btn-primary {
    background: vars.$gradient-primary;
    color: vars.$white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: vars.$transition-base;
    white-space: nowrap; // 줄바꿈 방지

    &:hover {
        transform: translateY(-2px);
        box-shadow: vars.$shadow-sm;
    }
}

.pdf-btn {
    @media (max-width: 768px) {
        display: none; /* 모바일 화면에서 PDF 버튼 숨김 */
    }
}
</style>