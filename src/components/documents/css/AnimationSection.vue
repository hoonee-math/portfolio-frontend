<template>
    <div class="animation-section">
        <p class="section-description">
            CSS 애니메이션을 사용하면 JavaScript 없이도 요소에 움직임을 부여할 수 있습니다.
            키프레임을 정의하고 애니메이션 속성을 설정하여 다양한 효과를 만들 수 있습니다.
        </p>

        <div class="examples-container">
            <!-- 기본 애니메이션 컴포넌트 -->
            <BasicAnimation />

            <!-- 애니메이션 속성 컴포넌트 -->
            <AnimationProperties />

            <!-- 다중 키프레임 애니메이션 컴포넌트 -->
            <ComplexAnimation />

            <!-- 애니메이션 이벤트 컴포넌트 -->
            <AnimationEvents />

            <!-- CSS 변수와 애니메이션 컴포넌트 -->
            <CssVarsAnimation />

            <!-- 성능 최적화 컴포넌트 -->
            <PerformanceOptimization />

            <!-- 실용적인 애니메이션 컴포넌트 -->
            <PracticalAnimations />

            <!-- 반응형 애니메이션 컴포넌트 -->
            <ResponsiveAnimations />
        </div>
    </div>
</template>

<script setup lang="ts">
// 각 애니메이션 컴포넌트 임포트
import BasicAnimation from './animations/BasicAnimation.vue';
import AnimationProperties from './animations/AnimationProperties.vue';
import ComplexAnimation from './animations/ComplexAnimation.vue';
import AnimationEvents from './animations/AnimationEvents.vue';
import CssVarsAnimation from './animations/CssVarsAnimation.vue';
import PerformanceOptimization from './animations/PerformanceOptimization.vue';
import PracticalAnimations from './animations/PracticalAnimations.vue';
import ResponsiveAnimations from './animations/ResponsiveAnimations.vue';
</script>

<style lang="scss">
@use '@/assets/styles/documentation.scss';

.animation-section {
    width: 100%;
    max-width: 100%;
    padding: 0 15px;

    @media (min-width: 768px) {
        padding: 0;
    }
}

</style>