<template>
    <section class="section" id="home">
        <div class="section-content">
            <div class="text-center">
                <ZoomImage src="/image/portfolio/슬라이드1.PNG" alt="포트폴리오 이미지" additional-class="slide-image"/>
                <h2 class="title">안녕하십니까!</h2>
                <p class="subtitle">
                    프론트·백엔드·인프라 활용능력을 갖춘 개발자<br>
                    리더십과 의사소통 능력을 겸비한 개발자<br>
                    코딩을 좋아하는 풀스택 개발자 <strong>최광훈</strong> 입니다.<br>
                    <br><br>
                    스크롤을 내리거나 메뉴를 통해 제 포트폴리오를 확인해보세요.
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

strong {
  color: black;
}

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
  margin: 2rem 0 1rem 0;
  color: vars.$text-color;
  
  @media (max-width: 768px) {
        font-size: 1.5rem;
    }
}

.subtitle {
  max-width: 600px;
  margin: 0 auto;
  color: vars.$gray-600;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
        font-size: 0.9rem;
    }

  @media (min-width: 992px) {
        font-size: 1.2rem;
    }
}
</style>