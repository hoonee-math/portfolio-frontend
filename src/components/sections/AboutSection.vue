<template>
    <section class="section" id="home">
        <div class="section-header">
            <h2 class="section-title">About Me</h2>
        </div>

        <!-- 이미지 슬라이더 -->
        <div class="image-slider" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
            <div class="slider-container">
                <div class="slider-wrapper" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                    <div v-for="(image, index) in aboutPage.images" :key="index" class="slide">
                        <img :src="image.src" :alt="image.alt" class="slide-image" @click="openImageInNewTab(image.src)">
                        <!-- <div class="slide-caption">{{ image.caption }}</div> -->
                    </div>
                </div>
                
                <!-- 슬라이더 컨트롤 (확장된 클릭 영역) -->
                <div v-if="aboutPage.images && aboutPage.images.length > 1" 
                    class="slider-btn-area prev" @click="prevSlide">
                    <button class="slider-btn">
                        &#10094;
                    </button>
                </div>
                <div v-if="aboutPage.images && aboutPage.images.length > 1" 
                    class="slider-btn-area next" @click="nextSlide">
                    <button class="slider-btn">
                        &#10095;
                    </button>
                </div>
            </div>
            
            
            <!-- 인디케이터 -->
            <div v-if="aboutPage.images && aboutPage.images.length > 1" class="slider-indicators">
                <button v-for="(image, index) in aboutPage.images" 
                        :key="index" 
                        class="indicator"
                        :class="{ active: index === currentSlide }"
                        @click="goToSlide(index)">
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
    name: 'AboutSection',
    setup() {
        // 현재 슬라이드 인덱스
        const currentSlide = ref(0);
        
        // 자동 슬라이드 관련 변수
        let autoSlideInterval: ReturnType<typeof setInterval> | null = null;
        const autoSlideDelay = 4000; // 4초마다 자동 전환
        const isHovered = ref(false);

        // About 페이지 데이터
        const aboutPage = ref({
            images: [
                { src: '/image/portfolio/슬라이드2.PNG', alt: '슬라이드 2', caption: '슬라이드 2 설명' },
                { src: '/image/portfolio/슬라이드3.PNG', alt: '슬라이드 3', caption: '슬라이드 3 설명' },
                { src: '/image/portfolio/슬라이드4.PNG', alt: '슬라이드 4', caption: '슬라이드 4 설명' },
                { src: '/image/portfolio/슬라이드5.PNG', alt: '슬라이드 5', caption: '슬라이드 5 설명' }
            ]
        });

        // 자동 슬라이드 시작
        const startAutoSlide = () => {
            if (autoSlideInterval) return;
            autoSlideInterval = setInterval(() => {
                if (!isHovered.value) {
                    nextSlide();
                }
            }, autoSlideDelay);
        };

        // 자동 슬라이드 정지
        const stopAutoSlide = () => {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        };

        // 이전 슬라이드로 이동
        const prevSlide = () => {
            currentSlide.value = (currentSlide.value - 1 + aboutPage.value.images.length) % aboutPage.value.images.length;
        };

        // 다음 슬라이드로 이동
        const nextSlide = () => {
            currentSlide.value = (currentSlide.value + 1) % aboutPage.value.images.length;
        };

        // 특정 슬라이드로 이동
        const goToSlide = (index: number) => {
            currentSlide.value = index;
        };

        // 이미지 새 탭에서 열기
        const openImageInNewTab = (src: string) => {
            window.open(src, '_blank');
        };

        // 마우스 호버 이벤트
        const onMouseEnter = () => {
            isHovered.value = true;
        };

        const onMouseLeave = () => {
            isHovered.value = false;
        };

        // 컴포넌트 마운트 시 자동 슬라이드 시작
        onMounted(() => {
            startAutoSlide();
        });

        // 컴포넌트 언마운트 시 자동 슬라이드 정리
        onUnmounted(() => {
            stopAutoSlide();
        });

        return {
            currentSlide,
            aboutPage,
            prevSlide,
            nextSlide,
            goToSlide,
            openImageInNewTab,
            onMouseEnter,
            onMouseLeave
        };
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/utils' as utils;

.section {
    @include utils.section-style;
    //min-height: 500px;
    position: relative;
    justify-content: center;

    @media (max-width: 768px) {
        padding: 20px 12px;
        /* 모바일에서 좌우 패딩 축소 */
    }
}

.slide-image {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: vars.$shadow;
    //margin-bottom: 2rem;
}

.section-header {
    margin-bottom: 1.5rem;

    .section-title {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        @include utils.gradient-text(vars.$gradient-primary);
    }

    .section-subtitle {
        color: vars.$gray-600;
        font-weight: vars.$font-weight-medium;
    }
}

.image-slider {
    position: relative;
    width: 100%;
    //max-width: 800px;
    margin: 0 auto;

    .slider-container {
        overflow: hidden;
        width: 100%;
        //height: 400px; /* 슬라이더 높이 */
        position: relative;
    }

    .slider-wrapper {
        display: flex;
        transition: transform 0.3s ease-in-out;
    }

    .slide {
        min-width: 100%;
        box-sizing: border-box;
        position: relative;

        .slide-image {
            width: 100%;
            height: auto;
            cursor: pointer;
        }

        // .slide-caption {
        //     position: absolute;
        //     bottom: 10px;
        //     left: 10px;
        //     color: white;
        //     background-color: rgba(0, 0, 0, 0.5);
        //     padding: 5px 10px;
        //     border-radius: 5px;
        // }
    }

    .slider-btn-area {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 60px; /* 클릭 가능한 영역을 넓게 */
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        
        /* 호버 시 배경 표시 */
        &:hover {
            //background-color: rgba(0, 0, 0, 0.1);
            
            .slider-btn {
                background-color: rgba(255, 255, 255, 0.95);
                transform: scale(1.1);
                
            }
        }

        &.prev {
            left: 0;
        }

        &.next {
            right: 0;
        }
    }

    .slider-btn {
        background-color: rgba(255, 255, 255, 0.8);
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        pointer-events: none; /* 버튼 자체는 클릭 이벤트 무시, 부모 영역에서 처리 */

        &:hover {
            background-color: rgba(255, 255, 255, 0.95);
            transform: scale(1.1);
        }
    }

    @media (max-width: 768px) {
        .slider-btn-area {
            width: 40px; /* 모바일에서 클릭 가능한 영역을 좁게 */
        }
        .slider-btn {
            width: 12px;
            height: 12px;
            font-size: 8px;
        }

    }

    .slider-indicators {
        display: flex;
        justify-content: center;
        margin-top: 10px;

        .indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: vars.$gray-400;
            margin-right: 5px;
            cursor: pointer;

            &.active {
                background-color: vars.$primary-color; /* 활성화된 인디케이터 색상 */
            }
        }
    }
}
</style>