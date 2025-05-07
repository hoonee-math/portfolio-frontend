<template>
    <div class="example-block">
        <h3>애니메이션 속성</h3>
        <p>다양한 애니메이션 속성을 통해 움직임을 제어할 수 있습니다.</p>
        <div class="demo-container">
            <div class="control-panel">
                <div>
                    <label>animation-duration:</label>
                    <select v-model="animationDuration">
                        <option value="1s">1s</option>
                        <option value="2s">2s</option>
                        <option value="3s">3s</option>
                        <option value="4s">4s</option>
                    </select>
                </div>
                <div>
                    <label>animation-timing-function:</label>
                    <select v-model="animationTiming">
                        <option value="linear">linear</option>
                        <option value="ease">ease</option>
                        <option value="ease-in">ease-in</option>
                        <option value="ease-out">ease-out</option>
                        <option value="ease-in-out">ease-in-out</option>
                    </select>
                </div>
                <div>
                    <label>animation-iteration-count:</label>
                    <select v-model="animationIterationCount">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="infinite">infinite</option>
                    </select>
                </div>
                <div>
                    <label>animation-direction:</label>
                    <select v-model="animationDirection">
                        <option value="normal">normal</option>
                        <option value="reverse">reverse</option>
                        <option value="alternate">alternate</option>
                        <option value="alternate-reverse">alternate-reverse</option>
                    </select>
                </div>
                <div>
                    <label>animation-fill-mode:</label>
                    <select v-model="animationFillMode">
                        <option value="none">none</option>
                        <option value="forwards">forwards</option>
                        <option value="backwards">backwards</option>
                        <option value="both">both</option>
                    </select>
                </div>
                <div>
                    <button @click="resetAnimation" class="control-button">애니메이션 재시작</button>
                </div>
            </div>
            <div class="animation-box-container">
                <div class="box property-animation" :style="animationStyle" ref="animationBox">속성 제어</div>
            </div>
        </div>
        <div class="code-block">
            <pre><code>.box {
    animation-name: slide;
    animation-duration: {{ animationDuration }};
    animation-timing-function: {{ animationTiming }};
    animation-iteration-count: {{ animationIterationCount }};
    animation-direction: {{ animationDirection }};
    animation-fill-mode: {{ animationFillMode }};
  }
  
  /* 단축 속성 */
  .box {
    animation: slide {{ animationDuration }} {{ animationTiming }} {{ animationIterationCount }} {{ animationDirection }} {{ animationFillMode }};
  }</code></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 애니메이션 속성 제어
const animationDuration = ref('2s');
const animationTiming = ref('ease');
const animationIterationCount = ref('infinite');
const animationDirection = ref('normal');
const animationFillMode = ref('none');
const animationBox = ref<HTMLElement | null>(null);

// 애니메이션 스타일 계산
const animationStyle = computed(() => {
    return {
        animationDuration: animationDuration.value,
        animationTimingFunction: animationTiming.value,
        animationIterationCount: animationIterationCount.value,
        animationDirection: animationDirection.value,
        animationFillMode: animationFillMode.value
    };
});

// 애니메이션 재시작
function resetAnimation() {
    if (animationBox.value) {
        animationBox.value.style.animation = 'none';
        // 강제 리플로우
        void animationBox.value.offsetWidth;
        animationBox.value.style.animation = '';
    }
}
</script>

<style lang="scss">
@use '@/assets/styles/documentation.scss';
.control-panel {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

@keyframes slide {
    0% {
        transform: translateX(-100px);
    }

    100% {
        transform: translateX(100px);
    }
}

.property-animation {
    animation-name: slide;
    animation-duration: 2s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: none;
}

.animation-box-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
}
</style>