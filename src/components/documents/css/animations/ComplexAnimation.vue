<template>
    <div class="example-block">
        <h3>다중 키프레임 애니메이션</h3>
        <p>다양한 변화를 포함하는 복잡한 애니메이션을 만들 수 있습니다.</p>
        <div class="demo-container">
            <div class="box complex-animation">복잡한 애니메이션</div>
        </div>
        <div class="code-block">
            <pre><code>@keyframes complex {
    0% {
      transform: translateX(0) rotate(0);
      background-color: #3498db;
      border-radius: 0;
    }
    25% {
      transform: translateX(100px) rotate(90deg);
      background-color: #e74c3c;
      border-radius: 10px;
    }
    50% {
      transform: translateX(0) rotate(180deg);
      background-color: #2ecc71;
      border-radius: 20px;
    }
    75% {
      transform: translateX(-100px) rotate(270deg);
      background-color: #f39c12;
      border-radius: 10px;
    }
    100% {
      transform: translateX(0) rotate(360deg);
      background-color: #3498db;
      border-radius: 0;
    }
  }
  
  .box {
    animation: complex 4s ease-in-out infinite;
  }</code></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
// 별도의 스크립트 로직이 필요 없는 간단한 예시
</script>
<style lang="scss">
@use '@/assets/styles/documentation.scss';

@keyframes complex {
    0% {
        transform: translateX(0) rotate(0);
        background-color: #3498db;
        border-radius: 0;
    }

    25% {
        transform: translateX(100px) rotate(90deg);
        background-color: #e74c3c;
        border-radius: 10px;
    }

    50% {
        transform: translateX(0) rotate(180deg);
        background-color: #2ecc71;
        border-radius: 20px;
    }

    75% {
        transform: translateX(-100px) rotate(270deg);
        background-color: #f39c12;
        border-radius: 10px;
    }

    100% {
        transform: translateX(0) rotate(360deg);
        background-color: #3498db;
        border-radius: 0;
    }
}

.complex-animation {
    animation: complex 4s ease-in-out infinite;
}
</style>