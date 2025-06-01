<template>
    <section class="section" id="home">
        <div class="section-header">
            <h2 class="section-title">Skills</h2>
            <p class="section-subtitle"></p>
        </div>
        <div class="section-content">
            <!-- <ul class="skills-list">
                <li class="skill-item">JavaScript</li>
                <li class="skill-item">TypeScript</li>
                <li class="skill-item">Vue.js</li>
            </ul> -->
            <img src="/image/portfolio/슬라이드15.PNG" alt="포트폴리오 이미지" class="slide-image">
        </div>
    </section>
</template>
<script lang="ts">
export default {

}
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
    margin-bottom: 2rem;
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
</style>