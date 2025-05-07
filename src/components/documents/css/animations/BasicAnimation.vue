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