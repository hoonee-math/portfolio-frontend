<template>
    <div class="example-block">
        <h3>기본 애니메이션</h3>
        <p>가장 기본적인 애니메이션 예시입니다.</p>
        <div class="demo-container">
            <div class="box basic-animation">기본 애니메이션</div>
        </div>
        <div class="code-block">
            <pre><code>@keyframes pulse {
    0% {
      transform: scale(1);
      background-color: #3498db;
    }
    50% {
      transform: scale(1.1);
      background-color: #2980b9;
    }
    100% {
      transform: scale(1);
      background-color: #3498db;
    }
  }
  
  .box {
    animation-name: pulse;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }</code></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
// 별도의 스크립트 로직이 필요 없는 간단한 예시
</script>

<style lang="scss">
@use '@/assets/styles/documentation.scss';

@keyframes pulse {
    0% {
        transform: scale(1);
        background-color: #3498db;
    }

    50% {
        transform: scale(1.1);
        background-color: #2980b9;
    }

    100% {
        transform: scale(1);
        background-color: #3498db;
    }
}

.basic-animation {
    animation: pulse 2s infinite;
}
</style>