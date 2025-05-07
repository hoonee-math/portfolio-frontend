<template>
    <div class="example-block">
        <h3>애니메이션 이벤트</h3>
        <p>애니메이션 시작, 반복, 종료 시점에 JavaScript 이벤트를 활용할 수 있습니다.</p>
        <div class="demo-container">
            <div class="animation-events-container">
                <div class="box event-animation" ref="eventBox">이벤트 애니메이션</div>
                <button @click="startEventAnimation" class="control-button">애니메이션 시작</button>
                <div class="event-log">
                    <h4>이벤트 로그:</h4>
                    <ul>
                        <li v-for="(event, index) in animationEvents" :key="index">{{ event }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="code-block">
            <pre><code>// CSS 부분
  .box {
    animation: bounce 2s ease 3;
    animation-play-state: paused; /* 초기 상태는 정지 */
  }
  
  // JavaScript 부분
  const box = document.querySelector('.box');
  
  box.addEventListener('animationstart', () => {
    console.log('애니메이션 시작');
  });
  
  box.addEventListener('animationiteration', () => {
    console.log('애니메이션 반복');
  });
  
  box.addEventListener('animationend', () => {
    console.log('애니메이션 종료');
  });
  
  // 애니메이션 시작 함수
  function startAnimation() {
    box.style.animationPlayState = 'running';
  }</code></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 애니메이션 이벤트
const eventBox = ref<HTMLElement | null>(null);
const animationEvents = ref<string[]>([]);

function startEventAnimation() {
    if (eventBox.value) {
        // 이벤트 로그 초기화
        animationEvents.value = [];

        // 애니메이션 재시작
        eventBox.value.style.animation = 'none';
        void eventBox.value.offsetWidth;
        eventBox.value.style.animation = 'bounce 2s ease 3';
    }
}

// 애니메이션 이벤트 리스너
function setupEventListeners() {
    if (eventBox.value) {
        eventBox.value.addEventListener('animationstart', handleAnimationStart);
        eventBox.value.addEventListener('animationiteration', handleAnimationIteration);
        eventBox.value.addEventListener('animationend', handleAnimationEnd);
    }
}

function cleanupEventListeners() {
    if (eventBox.value) {
        eventBox.value.removeEventListener('animationstart', handleAnimationStart);
        eventBox.value.removeEventListener('animationiteration', handleAnimationIteration);
        eventBox.value.removeEventListener('animationend', handleAnimationEnd);
    }
}

function handleAnimationStart() {
    animationEvents.value.push('애니메이션 시작됨');
}

function handleAnimationIteration() {
    animationEvents.value.push('애니메이션 반복됨');
}

function handleAnimationEnd() {
    animationEvents.value.push('애니메이션 종료됨');
}

// 컴포넌트 마운트/언마운트 시 이벤트 리스너 설정
onMounted(() => {
    setupEventListeners();
});

onBeforeUnmount(() => {
    cleanupEventListeners();
});
</script>

<style lang="scss">
@use '@/assets/styles/documentation.scss';

@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-30px);
    }
}

.animation-events-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.event-animation {
    animation: bounce 2s ease 3;
    animation-play-state: paused;
}

.control-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
}

.control-button:hover {
    background-color: #2980b9;
}

.event-log {
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    background-color: #fff;
    border-radius: 4px;
    padding: 10px;
    border: 1px solid #ddd;
}

.event-log h4 {
    margin-top: 0;
    margin-bottom: 10px;
}

.event-log ul {
    padding-left: 20px;
    margin: 0;
}
</style>