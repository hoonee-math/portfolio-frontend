<template>
    <div class="transform-section">
        <p class="section-description">
            CSS Transform 속성을 사용하면 요소를 2D 또는 3D 공간에서 이동, 회전, 크기 조절, 기울이기 등의 변형을 적용할 수 있습니다.
            이 속성은 애니메이션과 함께 사용될 때 더욱 강력한 효과를 발휘합니다.
        </p>

        <div class="examples-container">
            <!-- translate() -->
            <div class="example-block">
                <h3>translate()</h3>
                <p>요소를 X축과 Y축으로 이동시킵니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <div>
                            <label>translateX:</label>
                            <input type="range" v-model="translateX" min="-100" max="100">
                            <span>{{ translateX }}px</span>
                        </div>
                        <div>
                            <label>translateY:</label>
                            <input type="range" v-model="translateY" min="-100" max="100">
                            <span>{{ translateY }}px</span>
                        </div>
                    </div>
                    <div class="transform-box-container">
                        <div class="original-outline"></div>
                        <div class="transform-box"
                            :style="{ transform: `translate(${translateX}px, ${translateY}px)` }">translate</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.element {
    transform: translate({{ translateX }}px, {{ translateY }}px);
    /* 개별 적용도 가능: */
    /* transform: translateX({{ translateX }}px) translateY({{ translateY }}px); */
  }</code></pre>
                </div>
            </div>

            <!-- rotate() -->
            <div class="example-block">
                <h3>rotate()</h3>
                <p>요소를 지정된 각도만큼 회전시킵니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <div>
                            <label>회전 각도:</label>
                            <input type="range" v-model="rotateAngle" min="0" max="360">
                            <span>{{ rotateAngle }}deg</span>
                        </div>
                    </div>
                    <div class="transform-box-container">
                        <div class="original-outline"></div>
                        <div class="transform-box" :style="{ transform: `rotate(${rotateAngle}deg)` }">rotate</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.element {
    transform: rotate({{ rotateAngle }}deg);
  }</code></pre>
                </div>
            </div>

            <!-- scale() -->
            <div class="example-block">
                <h3>scale()</h3>
                <p>요소의 크기를 조절합니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <div>
                            <label>scaleX:</label>
                            <input type="range" v-model="scaleX" min="0.5" max="2" step="0.1">
                            <span>{{ scaleX }}</span>
                        </div>
                        <div>
                            <label>scaleY:</label>
                            <input type="range" v-model="scaleY" min="0.5" max="2" step="0.1">
                            <span>{{ scaleY }}</span>
                        </div>
                    </div>
                    <div class="transform-box-container">
                        <div class="original-outline"></div>
                        <div class="transform-box" :style="{ transform: `scale(${scaleX}, ${scaleY})` }">scale</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.element {
    transform: scale({{ scaleX }}, {{ scaleY }});
    /* 균등 비율: transform: scale({{ scaleX }}); */
    /* 개별 적용: transform: scaleX({{ scaleX }}) scaleY({{ scaleY }}); */
  }</code></pre>
                </div>
            </div>

            <!-- skew() -->
            <div class="example-block">
                <h3>skew()</h3>
                <p>요소를 X축과 Y축으로 기울입니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <div>
                            <label>skewX:</label>
                            <input type="range" v-model="skewX" min="-45" max="45">
                            <span>{{ skewX }}deg</span>
                        </div>
                        <div>
                            <label>skewY:</label>
                            <input type="range" v-model="skewY" min="-45" max="45">
                            <span>{{ skewY }}deg</span>
                        </div>
                    </div>
                    <div class="transform-box-container">
                        <div class="original-outline"></div>
                        <div class="transform-box" :style="{ transform: `skew(${skewX}deg, ${skewY}deg)` }">skew</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.element {
    transform: skew({{ skewX }}deg, {{ skewY }}deg);
    /* 개별 적용: transform: skewX({{ skewX }}deg) skewY({{ skewY }}deg); */
  }</code></pre>
                </div>
            </div>

            <!-- transform-origin -->
            <div class="example-block">
                <h3>transform-origin</h3>
                <p>변형의 기준점을 설정합니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <div>
                            <label>transform-origin:</label>
                            <select v-model="transformOrigin">
                                <option value="center">center (기본값)</option>
                                <option value="top left">top left</option>
                                <option value="top right">top right</option>
                                <option value="bottom left">bottom left</option>
                                <option value="bottom right">bottom right</option>
                            </select>
                        </div>
                        <div>
                            <label>회전 각도:</label>
                            <input type="range" v-model="originRotateAngle" min="0" max="360">
                            <span>{{ originRotateAngle }}deg</span>
                        </div>
                    </div>
                    <div class="transform-box-container">
                        <div class="transform-origin-box"
                            :style="{ transformOrigin: transformOrigin, transform: `rotate(${originRotateAngle}deg)` }">
                            <div class="origin-marker"></div>
                            <span>{{ transformOrigin }}</span>
                        </div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.element {
    transform-origin: {{ transformOrigin }};
    transform: rotate({{ originRotateAngle }}deg);
  }</code></pre>
                </div>
            </div>

            <!-- Multiple Transforms -->
            <div class="example-block">
                <h3>다중 변형</h3>
                <p>여러 변형을 함께 적용할 수 있습니다. 적용 순서가 결과에 영향을 줍니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <div>
                            <button @click="applyMultipleTransforms" class="control-button">변형 적용</button>
                            <button @click="resetMultipleTransforms" class="control-button">초기화</button>
                        </div>
                    </div>
                    <div class="transform-box-container">
                        <div class="original-outline"></div>
                        <div class="transform-box" :style="{ transform: multipleTransform }">다중 변형</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.element {
    transform: {{ multipleTransform || 'none' }};
  }</code></pre>
                </div>
            </div>

            <!-- 3D Transforms -->
            <div class="example-block">
                <h3>3D 변형</h3>
                <p>요소를 3D 공간에서 변형할 수 있습니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <div>
                            <label>rotateX:</label>
                            <input type="range" v-model="rotateX" min="0" max="360">
                            <span>{{ rotateX }}deg</span>
                        </div>
                        <div>
                            <label>rotateY:</label>
                            <input type="range" v-model="rotateY" min="0" max="360">
                            <span>{{ rotateY }}deg</span>
                        </div>
                        <div>
                            <label>rotateZ:</label>
                            <input type="range" v-model="rotateZ" min="0" max="360">
                            <span>{{ rotateZ }}deg</span>
                        </div>
                        <div>
                            <label>perspective:</label>
                            <input type="range" v-model="perspective" min="100" max="1000" step="50">
                            <span>{{ perspective }}px</span>
                        </div>
                    </div>
                    <div class="transform-3d-container" :style="{ perspective: `${perspective}px` }">
                        <div class="transform-3d-box"
                            :style="{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)` }">
                            <div class="face front">앞면</div>
                            <div class="face back">뒷면</div>
                            <div class="face right">오른쪽</div>
                            <div class="face left">왼쪽</div>
                            <div class="face top">위</div>
                            <div class="face bottom">아래</div>
                        </div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.container {
    perspective: {{ perspective }}px;
  }
  
  .box {
    transform-style: preserve-3d;
    transform: rotateX({{ rotateX }}deg) rotateY({{ rotateY }}deg) rotateZ({{ rotateZ }}deg);
  }</code></pre>
                </div>
            </div>

            <!-- Transform vs Position -->
            <div class="example-block">
                <h3>Transform vs Position</h3>
                <p>transform을 사용한 이동은 성능상 이점이 있고 더 부드러운 애니메이션을 제공합니다.</p>
                <div class="demo-container comparison-demo">
                    <div class="comparison-wrapper">
                        <h4>Position: absolute</h4>
                        <div class="position-container">
                            <div class="position-box" :style="{ left: `${positionLeft}px`, top: `${positionTop}px` }">
                                Position</div>
                        </div>
                    </div>
                    <div class="comparison-wrapper">
                        <h4>Transform: translate</h4>
                        <div class="transform-container">
                            <div class="transform-comparison-box"
                                :style="{ transform: `translate(${positionLeft}px, ${positionTop}px)` }">Transform</div>
                        </div>
                    </div>
                    <div class="comparison-controls">
                        <button @click="animateComparison" class="control-button">애니메이션 시작</button>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>/* Position을 사용한 이동 */
  .position-box {
    position: absolute;
    left: {{ positionLeft }}px;
    top: {{ positionTop }}px;
  }
  
  /* Transform을 사용한 이동 */
  .transform-box {
    transform: translate({{ positionLeft }}px, {{ positionTop }}px);
  }</code></pre>
                </div>
                <p class="note">
                    <strong>Transform의 장점:</strong>
                    <br>• GPU 가속을 활용해 더 부드러운 애니메이션 제공
                    <br>• 요소의 레이아웃에 영향을 주지 않음 (리플로우 방지)
                    <br>• 3D 변형과 같은 고급 효과 제공
                </p>
            </div>

            <!-- 실용적인 예시 -->
            <div class="example-block">
                <h3>실용적인 예시: 호버 효과</h3>
                <p>transform을 사용하여 다양한 호버 효과를 만들 수 있습니다.</p>
                <div class="demo-container">
                    <div class="hover-effects">
                        <div class="hover-card scale-effect">
                            <h4>확대 효과</h4>
                            <p>hover 시 요소가 확대됩니다.</p>
                        </div>
                        <div class="hover-card rotate-effect">
                            <h4>회전 효과</h4>
                            <p>hover 시 요소가 회전합니다.</p>
                        </div>
                        <div class="hover-card skew-effect">
                            <h4>기울기 효과</h4>
                            <p>hover 시 요소가 기울어집니다.</p>
                        </div>
                        <div class="hover-card translate-effect">
                            <h4>이동 효과</h4>
                            <p>hover 시 요소가 위로 이동합니다.</p>
                        </div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>/* 확대 효과 */
  .scale-effect:hover {
    transform: scale(1.1);
  }
  
  /* 회전 효과 */
  .rotate-effect:hover {
    transform: rotate(5deg);
  }
  
  /* 기울기 효과 */
  .skew-effect:hover {
    transform: skew(-5deg, 0);
  }
  
  /* 이동 효과 */
  .translate-effect:hover {
    transform: translateY(-10px);
  }</code></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// translate 예제
const translateX = ref(0);
const translateY = ref(0);

// rotate 예제
const rotateAngle = ref(0);

// scale 예제
const scaleX = ref(1);
const scaleY = ref(1);

// skew 예제
const skewX = ref(0);
const skewY = ref(0);

// transform-origin 예제
const transformOrigin = ref('center');
const originRotateAngle = ref(0);

// 다중 변형 예제
const multipleTransform = ref('');

function applyMultipleTransforms() {
    multipleTransform.value = 'translate(20px, 20px) rotate(45deg) scale(1.2)';
}

function resetMultipleTransforms() {
    multipleTransform.value = '';
}

// 3D 변형 예제
const rotateX = ref(0);
const rotateY = ref(0);
const rotateZ = ref(0);
const perspective = ref(500);

// Transform vs Position 예제
const positionLeft = ref(0);
const positionTop = ref(0);

function animateComparison() {
    let direction = 1;
    let maxPos = 100;
    let frames = 0;
    const totalFrames = 120;
    const animateStep = 2;

    const interval = setInterval(() => {
        frames++;

        if (positionLeft.value >= maxPos || positionLeft.value <= 0) {
            direction *= -1;
        }

        positionLeft.value += animateStep * direction;
        positionTop.value = Math.sin(frames / 20) * 30;

        if (frames >= totalFrames) {
            clearInterval(interval);
            positionLeft.value = 0;
            positionTop.value = 0;
        }
    }, 16);
}
</script>

<style scoped>
.transform-section {
    width: 100%;
}

.section-description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 30px;
    color: #333;
}

.examples-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
}

@media (min-width: 768px) {
    .examples-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

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
}

.control-panel {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.control-panel label {
    margin-right: 10px;
}

.control-button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

.control-button:hover {
    background-color: #2980b9;
}

.transform-box-container {
    position: relative;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.original-outline {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px dashed #ccc;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.transform-box {
    width: 100px;
    height: 100px;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.transform-origin-box {
    width: 150px;
    height: 100px;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    position: relative;
}

.origin-marker {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    z-index: 2;
}

.transform-3d-container {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.transform-3d-box {
    width: 100px;
    height: 100px;
    position: relative;
    transform-style: preserve-3d;
}

.face {
    position: absolute;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.front {
    background-color: rgba(52, 152, 219, 0.7);
    transform: translateZ(50px);
}

.back {
    background-color: rgba(231, 76, 60, 0.7);
    transform: translateZ(-50px) rotateY(180deg);
}

.right {
    background-color: rgba(46, 204, 113, 0.7);
    transform: rotateY(90deg) translateZ(50px);
}

.left {
    background-color: rgba(241, 196, 15, 0.7);
    transform: rotateY(-90deg) translateZ(50px);
}

.top {
    background-color: rgba(155, 89, 182, 0.7);
    transform: rotateX(90deg) translateZ(50px);
}

.bottom {
    background-color: rgba(26, 188, 156, 0.7);
    transform: rotateX(-90deg) translateZ(50px);
}

.comparison-demo {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.comparison-wrapper {
    flex: 1 1 45%;
    min-width: 200px;
}

.comparison-wrapper h4 {
    margin-top: 0;
    margin-bottom: 10px;
}

.position-container,
.transform-container {
    position: relative;
    height: 150px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
}

.position-box,
.transform-comparison-box {
    width: 80px;
    height: 40px;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.position-box {
    position: absolute;
    left: 0;
    top: 0;
}

.transform-comparison-box {
    position: relative;
}

.comparison-controls {
    flex-basis: 100%;
    text-align: center;
    margin-top: 10px;
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

.note {
    font-size: 0.9rem;
    color: #555;
    margin-top: 10px;
    padding: 10px;
    background-color: #f8f9fa;
    border-left: 3px solid #3498db;
    border-radius: 0 4px 4px 0;
}

.hover-effects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.hover-card {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.hover-card h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
}

.hover-card p {
    margin: 0;
    color: #555;
    font-size: 0.9rem;
}

.scale-effect:hover {
    transform: scale(1.1);
}

.rotate-effect:hover {
    transform: rotate(5deg);
}

.skew-effect:hover {
    transform: skew(-5deg, 0);
}

.translate-effect:hover {
    transform: translateY(-10px);
}
</style>