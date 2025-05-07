<template>
    <div class="example-block">
        <h3>CSS 변수와 애니메이션</h3>
        <p>CSS 변수를 사용하여 동적으로 애니메이션 속성을 변경할 수 있습니다.</p>
        <div class="demo-container">
            <div class="control-panel">
                <div>
                    <label>애니메이션 속도:</label>
                    <input type="range" v-model="cssVarSpeed" min="1" max="10" step="1">
                    <span>{{ cssVarSpeed }}s</span>
                </div>
                <div>
                    <label>애니메이션 크기:</label>
                    <input type="range" v-model="cssVarSize" min="10" max="150" step="10">
                    <span>{{ cssVarSize }}px</span>
                </div>
            </div>
            <div class="css-var-animation-container">
                <div class="box css-var-animation" :style="cssVarStyle">CSS 변수</div>
            </div>
        </div>
        <div class="code-block">
            <pre><code>/* CSS */
  :root {
    --animation-speed: 5s;
    --animation-size: 30px;
  }
  
  @keyframes move {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(var(--animation-size));
    }
  }
  
  .box {
    animation: move var(--animation-speed) ease-in-out infinite;
  }
  
  /* JavaScript로 변수 업데이트 */
  document.documentElement.style.setProperty('--animation-speed', '3s');
  document.documentElement.style.setProperty('--animation-size', '50px');</code></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// CSS 변수를 통한 애니메이션 제어
const cssVarSpeed = ref(5);
const cssVarSize = ref(30);

const cssVarStyle = computed(() => {
    return {
        '--animation-speed': `${cssVarSpeed.value}s`,
        '--animation-size': `${cssVarSize.value}px`
    };
});
</script>

<style lang="scss">
@use '@/assets/styles/documentation.scss';

@keyframes move {

    0%,
    100% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(var(--animation-size, 30px));
    }
}

.css-var-animation-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    position: relative;
}

.css-var-animation {
    animation: move var(--animation-speed, 5s) ease-in-out infinite;
}
</style>