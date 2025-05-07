<template>
    <div class="example-block">
        <h3>애니메이션 성능 최적화</h3>
        <p>transform과 opacity 속성을 사용하여 성능이 좋은 애니메이션을 만들 수 있습니다.</p>
        <div class="demo-container">
            <div class="performance-comparison">
                <div class="comparison-card">
                    <h4>비최적화 애니메이션</h4>
                    <div class="box bad-performance">margin 변경</div>
                    <p class="performance-note">margin, width, height 등의 변경은 레이아웃을 다시 계산하여 성능 저하를 일으킬 수 있습니다.</p>
                </div>
                <div class="comparison-card">
                    <h4>최적화 애니메이션</h4>
                    <div class="box good-performance">transform 사용</div>
                    <p class="performance-note">transform과 opacity는 GPU 가속을 활용하여 더 부드러운 애니메이션을 제공합니다.</p>
                </div>
            </div>
        </div>
        <div class="code-block">
            <pre><code>/* 비최적화 예시 (레이아웃 변경) */
  @keyframes bad {
    0%, 100% { 
      left: 0; 
      top: 0;
      width: 100px;
    }
    50% { 
      left: 100px; 
      top: 20px;
      width: 150px;
    }
  }
  
  /* 최적화 예시 (GPU 가속) */
  @keyframes good {
    0%, 100% { 
      transform: translate(0, 0) scale(1);
      opacity: 1; 
    }
    50% { 
      transform: translate(100px, 20px) scale(1.5);
      opacity: 0.8; 
    }
  }</code></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
// 별도의 스크립트 로직이 필요 없음
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
    min-height: 200px;
}

.performance-comparison {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.comparison-card {
    flex: 1 1 45%;
    min-width: 200px;
    background-color: #fff;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.comparison-card h4 {
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
}

.performance-note {
    font-size: 0.85rem;
    color: #555;
    margin-top: 15px;
    margin-bottom: 0;
}

.box {
    width: 100px;
    height: 60px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 4px;
    margin: 0 auto;
}

/* 비최적화 애니메이션 */
@keyframes bad-animation {

    0%,
    100% {
        margin-left: 0;
        margin-top: 0;
        width: 100px;
    }

    50% {
        margin-left: 50px;
        margin-top: 20px;
        width: 120px;
    }
}

.bad-performance {
    position: relative;
    background-color: #e74c3c;
    animation: bad-animation 2s infinite;
}

/* 최적화된 애니메이션 */
@keyframes good-animation {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }

    50% {
        transform: translate(50px, 20px) scale(1.2);
        opacity: 0.8;
    }
}

.good-performance {
    background-color: #2ecc71;
    animation: good-animation 2s infinite;
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