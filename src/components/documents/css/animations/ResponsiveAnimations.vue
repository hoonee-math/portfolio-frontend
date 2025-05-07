<template>
    <div class="example-block">
        <h3>@media 쿼리와 애니메이션 조건부 적용</h3>
        <p>화면 크기나 기기 특성에 따라 애니메이션을 조건부로 적용할 수 있습니다.</p>
        <div class="demo-container">
            <div class="responsive-animation">
                <div class="box responsive-box">화면 크기에 따라 달라지는 애니메이션</div>
                <p class="resize-note">브라우저 창 크기를 조절해보세요!</p>
            </div>
        </div>
        <div class="code-block">
            <pre><code>/* 기본 애니메이션 (작은 화면) */
  .box {
    animation: simple-pulse 2s infinite;
  }
  
  @keyframes simple-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  /* 중간 크기 화면에서의 애니메이션 */
  @media (min-width: 768px) {
    .box {
      animation: medium-screen 3s ease-in-out infinite;
    }
  
    @keyframes medium-screen {
      0%, 100% { transform: translateX(0) scale(1); }
      50% { transform: translateX(50px) scale(1.1); }
    }
  }
  
  /* 큰 화면에서의 애니메이션 */
  @media (min-width: 1200px) {
    .box {
      animation: large-screen 4s cubic-bezier(.17,.67,.83,.67) infinite;
    }
  
    @keyframes large-screen {
      0%, 100% { transform: translateX(0) rotate(0) scale(1); }
      25% { transform: translateX(50px) rotate(90deg) scale(1.1); }
      50% { transform: translateX(0) rotate(180deg) scale(1); }
      75% { transform: translateX(-50px) rotate(270deg) scale(1.1); }
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

.responsive-animation {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
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
    margin: 0 auto;
}

.resize-note {
    font-size: 0.9rem;
    color: #555;
    font-style: italic;
}

/* 기본 애니메이션 (작은 화면) */
@keyframes simple-pulse {

    0%,
    100% {
        transform: scale(1);
        background-color: #3498db;
    }

    50% {
        transform: scale(1.1);
        background-color: #2980b9;
    }
}

.responsive-box {
    animation: simple-pulse 2s infinite;
}

/* 중간 크기 화면에서의 애니메이션 */
@media (min-width: 768px) {
    .responsive-box {
        animation: medium-screen 3s ease-in-out infinite;
    }

    @keyframes medium-screen {

        0%,
        100% {
            transform: translateX(0) scale(1);
            background-color: #e74c3c;
        }

        50% {
            transform: translateX(50px) scale(1.1);
            background-color: #c0392b;
        }
    }
}

/* 큰 화면에서의 애니메이션 */
@media (min-width: 992px) {
    .responsive-box {
        animation: large-screen 4s cubic-bezier(.17, .67, .83, .67) infinite;
    }

    @keyframes large-screen {

        0%,
        100% {
            transform: translateX(0) rotate(0) scale(1);
            background-color: #2ecc71;
        }

        25% {
            transform: translateX(50px) rotate(90deg) scale(1.1);
            background-color: #27ae60;
        }

        50% {
            transform: translateX(0) rotate(180deg) scale(1);
            background-color: #2ecc71;
        }

        75% {
            transform: translateX(-50px) rotate(270deg) scale(1.1);
            background-color: #27ae60;
        }
    }
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