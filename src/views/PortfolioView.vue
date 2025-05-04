<template>
    <div id="content-to-pdf">
        <the-header :title="title" content-id="content-to-pdf" />

        <div class="container">
            <the-sidebar :nav-items="navItems" :active-section="activeSection" :is-visible="sidebarVisible"
                @update:activeSection="updateActiveSection" @navigate="scrollToSection" />

            <!-- 모바일 메뉴 토글 버튼 -->
            <button class="sidebar-toggle" @click="toggleSidebar">
                <span class="toggle-icon"></span>
            </button>

            <main class="main-content" :class="{ 'full-width': !sidebarVisible }">
                <section-wrapper v-for="section in sections" :key="section.id" :section-id="section.id"
                    :active-section="activeSection">
                    <component :is="section.component" />
                </section-wrapper>
            </main>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import TheHeader from '@/components/layout/TheHeader.vue';
import TheSidebar from '@/components/layout/TheSidebar.vue';
import SectionWrapper from '@/components/ui/SectionWrapper.vue';
import HomeSection from '@/components/sections/HomeSection.vue';
import ProjectsSection from '@/components/sections/ProjectsSection.vue';

import AboutSection from '@/components/sections/AboutSection.vue';
import ResumeSection from '@/components/sections/ResumeSection.vue';
import SkillsSection from '@/components/sections/SkillsSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';

export default defineComponent({
    name: 'PortfolioView',
    components: {
        TheHeader,
        TheSidebar,
        SectionWrapper,
        HomeSection,
        ProjectsSection
        // 나머지 섹션 컴포넌트들을 여기에 추가하세요
    },
    setup() {
        const title = ref('Portfolio');
        const activeSection = ref('home');
        const sidebarVisible = ref(true); // 기본 상태는 보이게 설정

        // 네비게이션 아이템 정의
        const navItems = [
            { id: 'home', label: '홈' },
            { id: 'about', label: '소개' },
            { id: 'projects', label: '프로젝트' },
            // { id: 'resume', label: '이력서' },
            { id: 'skills', label: '기술 스택' },
            // { id: 'contact', label: '연락처' }
        ];

        // 실제 섹션 컴포넌트 매핑
        const sections = [
            { id: 'home', component: HomeSection },
            { id: 'about', component: AboutSection },
            { id: 'projects', component: ProjectsSection },
            // { id: 'resume', component: ResumeSection },
            { id: 'skills', component: SkillsSection },
            // { id: 'contact', component: ContactSection }
        ];

        // 스크롤 이벤트 핸들러
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // 각 섹션의 위치 확인
            const sectionWrappers = document.querySelectorAll('.section-wrapper');
            sectionWrappers.forEach((wrapper) => {
                const element = wrapper as HTMLElement;
                const sectionId = element.id.replace('-wrapper', '');
                const sectionTop = element.offsetTop - 100; // 오프셋 적용
                const sectionHeight = element.offsetHeight;

                // 현재 스크롤 위치가 섹션 내에 있는지 확인
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    if (activeSection.value !== sectionId) {
                        activeSection.value = sectionId;
                    }
                }
            });
        };

        // 활성 섹션 업데이트 메서드
        const updateActiveSection = (sectionId: string) => {
            activeSection.value = sectionId;
        };

        // 특정 섹션으로 스크롤 메서드
        const scrollToSection = (sectionId: string) => {
            const targetElement = document.getElementById(`${sectionId}-wrapper`);

            if (targetElement) {
                // 부드러운 스크롤로 이동
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // 모바일에서 메뉴 클릭 후 사이드바 닫기
                if (window.innerWidth <= 992) {
                    sidebarVisible.value = false;
                }
            }
        };

        // 사이드바 토글 메서드
        const toggleSidebar = () => {
            sidebarVisible.value = !sidebarVisible.value;
        };

        // 화면 크기 변경 감지
        const handleResize = () => {
            // 화면 크기에 따라 사이드바 상태 조정
            if (window.innerWidth <= 992) {
                // 모바일 화면에서는 기본적으로 사이드바 숨김
                sidebarVisible.value = false;
            } else {
                // 큰 화면에서는 항상 사이드바 표시
                sidebarVisible.value = true;
            }
        };

        // 컴포넌트 마운트 시 이벤트 리스너 등록
        onMounted(() => {
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleResize);

            // 초기 화면 크기에 따른 사이드바 상태 설정
            handleResize();

            // URL 해시가 있으면 해당 섹션으로 이동
            if (window.location.hash) {
                const sectionId = window.location.hash.substring(1);
                scrollToSection(sectionId);
                updateActiveSection(sectionId);
            }
        });

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        onBeforeUnmount(() => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        });

        return {
            title,
            activeSection,
            navItems,
            sections,
            sidebarVisible,
            updateActiveSection,
            scrollToSection,
            toggleSidebar
        };
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/utils' as utils;

.container {
    display: flex;
    margin-top: vars.$header-height;
    min-height: calc(100vh - vars.$header-height);
    position: relative;
    /* 컨테이너에 relative 위치 지정 */
}

.main-content {
    margin-left: vars.$sidebar-width;
    width: calc(100% - vars.$sidebar-width);
    padding: 20px;
    transition: margin-left 0.3s ease, width 0.3s ease;

    &.full-width {
        margin-left: 0;
        width: 100%;
    }
    @media (max-width: 992px) {
        padding: 10px 5px; /* 모바일에서 좌우 패딩 축소 */
    }
}

/* 사이드바 토글 버튼 스타일 */
.sidebar-toggle {
    display: none;
    position: fixed;
    left: 20px;
    bottom: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: vars.$gradient-primary;
    border: none;
    box-shadow: vars.$shadow;
    z-index: 95;
    cursor: pointer;

    .toggle-icon {
        position: relative;
        display: block;
        margin: 0 auto;
        width: 24px;
        height: 2px;
        background-color: vars.$white;

        &::before,
        &::after {
            content: '';
            position: absolute;
            width: 24px;
            height: 2px;
            background-color: vars.$white;
            left: 0;
            transition: transform 0.3s ease;
        }

        &::before {
            top: -8px;
        }

        &::after {
            bottom: -8px;
        }
    }
}

/* 미디어 쿼리를 통한 반응형 레이아웃 */
@media (max-width: 992px) {
    .sidebar-toggle {
        display: block;
        /* 모바일에서만 토글 버튼 표시 */
    }

    .main-content {
        margin-left: 0;
        width: 100%;
    }
}

@media print {
    .main-content {
        margin-left: 0;
        width: 100%;
        padding: 0;
    }
}
</style>