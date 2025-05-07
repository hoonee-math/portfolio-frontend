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

<style scoped>
.example-block {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.example-block h3 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 1.4rem;
}

.demo-container {
    margin: 20px 0;
    background-color: #edf2f7;
    padding: 20px;
    border-radius: 6px;
    min-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    width: 100px;
    height: 60px;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 4px;
}

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

.code-block {
    background-color: #2c3e50;
    border-radius: 6px;
    padding: 15px;
    overflow-x: auto;
}

.code-block code {
    color: #f8f9fa;
    font-family: monospace;
    white-space: pre;
}
</style>