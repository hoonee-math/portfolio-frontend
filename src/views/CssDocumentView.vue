<template>
    <div id="document-container">
        <the-header :title="title" content-id="document-container" />

        <div class="container">
            <the-sidebar :nav-items="navItems" :active-section="activeSection" :is-visible="sidebarVisible"
                @update:activeSection="updateActiveSection" @navigate="scrollToSection" />

            <!-- 모바일 메뉴 토글 버튼 -->
            <button class="sidebar-toggle" @click="toggleSidebar">
                <span class="toggle-icon"></span>
            </button>

            <main class="main-content" :class="{ 'full-width': !sidebarVisible }">
                <!-- 전체 섹션의 컨테이너 -->
                <div 
                    v-for="section in visibleSections" 
                    :key="section.id" 
                    :id="`${section.id}-wrapper`" 
                    class="section-wrapper"
                    ref="sectionRefs"
                >
                    <h2 class="section-title">{{ section.title }}</h2>
                    <component :is="section.component" />
                </div>

                <!-- 로딩 표시기 -->
                <div v-if="isLoading" class="loading-indicator">
                    <div class="spinner"></div>
                    <p>컴포넌트 로딩 중...</p>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue';
import TheHeader from '@/components/layout/TheHeader.vue';
import TheSidebar from '@/components/layout/TheSidebar.vue';

// CSS 문서화 컴포넌트들
import PositionSection from '@/components/documents/css/PositionSection.vue';
import FlexboxSection from '@/components/documents/css/FlexboxSection.vue';
import GridSection from '@/components/documents/css/GridSection.vue';
import TransformSection from '@/components/documents/css/TransformSection.vue';
import AnimationSection from '@/components/documents/css/AnimationSection.vue';
// import TransitionSection from '@/components/documents/css/TransitionSection.vue';
// import MediaQuerySection from '@/components/documents/css/MediaQuerySection.vue';
// import CssVariablesSection from '@/components/documents/css/CssVariablesSection.vue';

// 상태 관리
const title = ref('CSS 문서');
const activeSection = ref('position');
const sidebarVisible = ref(true);
const isLoading = ref(false);
const sectionRefs = ref<HTMLElement[]>([]);

// 전체 문서화할 섹션 정의
const allSections = [
    { id: 'position', title: 'CSS Position', component: PositionSection },
    { id: 'flexbox', title: 'Flexbox 레이아웃', component: FlexboxSection },
    { id: 'grid', title: 'CSS Grid', component: GridSection },
    { id: 'transform', title: 'CSS Transform', component: TransformSection },
    { id: 'animation', title: 'CSS Animation', component: AnimationSection },
    // { id: 'transition', title: 'CSS Transition', component: TransitionSection },
    // { id: 'media-query', title: '미디어 쿼리', component: MediaQuerySection },
    // { id: 'css-variables', title: 'CSS 변수', component: CssVariablesSection },
];

// 처음에 보여줄 섹션 수
const initialVisibleCount = 3;
// 현재 보여지는 섹션 수
const visibleCount = ref(initialVisibleCount);

// 네비게이션 아이템 (사이드바용)
const navItems = computed(() => {
    return allSections.map(section => ({
        id: section.id,
        label: section.title
    }));
});

// 현재 보이는 섹션들
const visibleSections = computed(() => {
    return allSections.slice(0, visibleCount.value);
});

// 더 많은 섹션 로드
const loadMoreSections = () => {
    if (visibleCount.value < allSections.length) {
        isLoading.value = true;
        
        // 약간의 지연 후 더 많은 섹션 로드 (무한 스크롤 효과)
        setTimeout(() => {
            visibleCount.value += 2; // 한 번에 2개 더 로드
            isLoading.value = false;
            
            // DOM이 업데이트된 후에 스크롤 이벤트 핸들러 다시 계산
            nextTick(() => {
                calculateActiveSection();
            });
        }, 500);
    }
};

// 스크롤 이벤트 핸들러
const handleScroll = () => {
    // 현재 스크롤 위치 확인
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // 페이지 끝에 도달했는지 확인 (하단에서 100px 위 지점)
    if (scrollPosition + windowHeight >= documentHeight - 100) {
        loadMoreSections();
    }
    
    // 현재 활성 섹션 계산
    calculateActiveSection();
};

// 현재 보이는 섹션 중 가장 상단에 있는 섹션을 활성화
const calculateActiveSection = () => {
    const viewportHeight = window.innerHeight;
    const sectionElements = document.querySelectorAll('.section-wrapper');
    
    sectionElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const sectionId = element.id.replace('-wrapper', '');
        
        // 섹션이 화면에 표시되는지 확인 (상단이 화면 중앙보다 위에 있고, 하단이 화면에 표시됨)
        const isVisible = (rect.top < viewportHeight / 2) && (rect.bottom > 0);
        
        if (isVisible && activeSection.value !== sectionId) {
            activeSection.value = sectionId;
        }
    });
};

// 활성 섹션 업데이트 메서드
const updateActiveSection = (sectionId: string) => {
    activeSection.value = sectionId;
};

// 특정 섹션으로 스크롤 메서드
const scrollToSection = (sectionId: string) => {
    // 선택한 섹션이 아직 로드되지 않았다면 먼저 로드
    const sectionIndex = allSections.findIndex(section => section.id === sectionId);
    
    if (sectionIndex >= 0 && sectionIndex >= visibleCount.value) {
        visibleCount.value = sectionIndex + 1;
    }
    
    nextTick(() => {
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
    });
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // 초기 화면 크기에 따른 사이드바 상태 설정
    handleResize();
    
    // URL 해시가 있으면 해당 섹션으로 이동
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        // 약간 지연 후 스크롤 처리
        setTimeout(() => {
            scrollToSection(sectionId);
            updateActiveSection(sectionId);
        }, 200);
    }
});

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
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


.section-wrapper {
    margin-bottom: 50px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
}

.section-title {
    margin-top: 0;
    margin-bottom: 20px;
    color: vars.$primary-color;
    font-size: 1.8rem;
    font-weight: 700;
    position: relative;
    
    &:after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 50px;
        height: 3px;
        background: vars.$gradient-primary;
        border-radius: 3px;
    }
}

.loading-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: vars.$primary-color;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    p {
        margin-top: 10px;
        color: vars.$text-color;
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
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
    }

    .main-content {
        margin-left: 0;
        width: 100%;
    }
}
</style>