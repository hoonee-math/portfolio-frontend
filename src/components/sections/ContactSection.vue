<template>
    <section class="section" id="home">
        <div class="section-content">
            <h1 class="section-title">Contact Me</h1>
            <p class="section-description">This is the contact section where you can provide your contact information</p>
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