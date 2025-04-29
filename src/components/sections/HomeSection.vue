<template>
    <section class="section" id="home">
        <div class="section-content">
            <div class="text-center">
                <img src="/hoonee-math-favicon.png" alt="포트폴리오 이미지" class="portfolio-image">
                <h2 class="title">안녕하세요, 최광훈입니다!</h2>
                <p class="subtitle">
                    창의적이고 혁신적인 웹 개발자입니다. 다양한 기술 스택을 활용하여 사용자 경험을 극대화하는 웹 애플리케이션을 개발합니다.
                    <br>
                    스크롤을 내리거나 왼쪽 메뉴를 통해 제 포트폴리오를 확인해보세요.
                </p>
            </div>
        </div>
        <page-number :current-page="1" :total-pages="6" />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageNumber from '@/components/ui/PageNumber.vue';

export default defineComponent({
  name: 'HomeSection',
  components: {
    PageNumber
  }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/utils' as utils;

.section {
  @include utils.section-style;
//   height: 400px;
  position: relative;
  justify-content: center;
}

.section-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.portfolio-image {
  max-width: 100%;
  width: 400px;
  height: auto;
  border-radius: 10px;
  box-shadow: vars.$shadow;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: vars.$text-color;
}

.subtitle {
  max-width: 600px;
  margin: 0 auto;
  color: vars.$gray-600;
}
</style>