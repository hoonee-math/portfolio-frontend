<template>
    <section class="section" id="home">
        <div class="section-content">
            <div class="text-center">
                <ZoomImage src="/슬라이드1.PNG" alt="포트폴리오 이미지" additional-class="slide-image"/>
                <h2 class="title">안녕하십니까!</h2>
                <p class="subtitle">
                    창의적이고 혁신적인 웹 개발자 최광훈입니다. 다양한 기술 스택을 활용하여 사용자 경험을 극대화하는 웹 애플리케이션을 개발합니다.
                    <br>
                    스크롤을 내리거나 왼쪽 메뉴를 통해 제 포트폴리오를 확인해보세요.
                    <br>
                    <br>
                    현재 페이지는 계속 업데이트가 진행되고 있습니다.
                    <br> 모바일 환경에서는 이미지가 작을 수 있습니다.
                </p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageNumber from '@/components/ui/PageNumber.vue';
import ZoomImage from '@/components/ui/ZoomImage.vue';

export default defineComponent({
  name: 'HomeSection',
  components: {
    PageNumber,
    ZoomImage
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/utils' as utils;

.section {
  @include utils.section-style;
  position: relative;
  justify-content: center;
  
  @media (max-width: 768px) {
        padding: 20px 12px;
        /* 모바일에서 좌우 패딩 축소 */
    }
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
  
  @media (max-width: 768px) {
        font-size: 1.5rem;
    }
}

.subtitle {
  max-width: 600px;
  margin: 0 auto;
  color: vars.$gray-600;
  
  @media (max-width: 768px) {
        font-size: 0.9rem;
    }
}
</style>