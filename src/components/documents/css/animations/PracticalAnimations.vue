<template>
    <div class="example-block">
        <h3>실용적인 애니메이션 예시</h3>
        <p>웹사이트에서 자주 사용되는 실용적인 애니메이션 예시입니다.</p>
        <div class="demo-container">
            <div class="practical-examples">
                <div class="practical-card">
                    <h4>로딩 스피너</h4>
                    <div class="spinner"></div>
                </div>
                <div class="practical-card">
                    <h4>스크롤 유도 애니메이션</h4>
                    <div class="scroll-indicator"></div>
                </div>
                <div class="practical-card">
                    <h4>알림 애니메이션</h4>
                    <div class="notification" @click="toggleNotification" :class="{ 'active': notificationActive }">
                        <span class="notification-badge"></span>
                        <i class="notification-icon">🔔</i>
                    </div>
                </div>
                <div class="practical-card">
                    <h4>버튼 호버 효과</h4>
                    <button class="animated-button">버튼</button>
                </div>
            </div>
        </div>
        <div class="code-block">
            <pre><code>/* 로딩 스피너 */
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* 스크롤 유도 애니메이션 */
  .scroll-indicator {
    width: 30px;
    height: 50px;
    border: 2px solid #333;
    border-radius: 15px;
    position: relative;
  }
  
  .scroll-indicator::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #333;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    animation: scroll 1.5s infinite;
  }
  
  @keyframes scroll {
    0% { 
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    100% { 
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
  }</code></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 알림 애니메이션 토글
const notificationActive = ref(false);

function toggleNotification() {
    notificationActive.value = !notificationActive.value;
}
</script>

<style lang="scss">
@use '@/assets/styles/documentation.scss';

.practical-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
}

.practical-card {
    background-color: #fff;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.practical-card h4 {
    margin-top: 0;
    margin-bottom: 15px;
    text-align: center;
}

/* 로딩 스피너 */
.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* 스크롤 유도 애니메이션 */
.scroll-indicator {
    width: 30px;
    height: 50px;
    border: 2px solid #333;
    border-radius: 15px;
    position: relative;
}

.scroll-indicator::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #333;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    animation: scroll 1.5s infinite;
}

@keyframes scroll {
    0% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
    }
}

/* 알림 애니메이션 */
.notification {
    position: relative;
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.notification-badge {
    position: absolute;
    top: 0;
    right: 0;
    width: 12px;
    height: 12px;
    background-color: #e74c3c;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.3s ease;
}

.notification.active .notification-badge {
    transform: scale(1);
    animation: pulse-badge 1.5s infinite;
}

@keyframes pulse-badge {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7);
    }

    70% {
        transform: scale(1.1);
        box-shadow: 0 0 0 10px rgba(231, 76, 60, 0);
    }

    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(231, 76, 60, 0);
    }
}

.notification-icon {
    font-size: 20px;
}

/* 버튼 호버 효과 */
.animated-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.animated-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%);
    transition: all 0.6s;
}

.animated-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.animated-button:hover::before {
    left: 100%;
}

</style>