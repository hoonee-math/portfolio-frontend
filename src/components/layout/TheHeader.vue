<template>
    <header class="header">
        <div class="logo">{{ title }}</div>
        <div class="header-actions">
            <button @click="handleDownloadPdf" class="btn-primary">PDF 다운로드</button>
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
    button {
        background: vars.$gradient-primary;
        color: vars.$white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        transition: vars.$transition-base;

        &:hover {
            transform: translateY(-2px);
            box-shadow: vars.$shadow-sm;
        }
    }
}
</style>