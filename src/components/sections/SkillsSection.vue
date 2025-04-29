<template>
    <section class="section" id="home">
        <div class="section-content">
            <h1 class="section-title">Skills</h1>
            <p class="section-description">This is the skills section where you can provide your skills information</p>
            <ul class="skills-list">
                <li class="skill-item">JavaScript</li>
                <li class="skill-item">TypeScript</li>
                <li class="skill-item">Vue.js</li>
            </ul>
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
    min-height: 500px;
    position: relative;
    justify-content: center;
}
</style>