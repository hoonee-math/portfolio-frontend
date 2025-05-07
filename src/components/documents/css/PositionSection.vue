<template>
    <div class="position-section">
        <p class="section-description">
            CSS의 position 속성은 요소를 어떻게 배치할지 결정하는 중요한 속성입니다.
            static, relative, absolute, fixed, sticky의 다섯 가지 값을 가질 수 있습니다.
        </p>

        <div class="examples-container">
            <!-- Static Position -->
            <div class="example-block">
                <h3>Position: Static (기본값)</h3>
                <p>요소는 일반적인 문서 흐름에 따라 배치됩니다. top, right, bottom, left 속성이 적용되지 않습니다.</p>
                <div class="demo-container">
                    <div class="box static-box">Static</div>
                </div>
                <div class="code-block">
                    <pre><code>.static-box {
    position: static;
    /* top, left 등의 값은 적용되지 않음 */
  }</code></pre>
                </div>
            </div>

            <!-- Relative Position -->
            <div class="example-block">
                <h3>Position: Relative</h3>
                <p>요소의 원래 위치를 기준으로 상대적으로 배치됩니다. 다른 요소에 영향을 주지 않습니다.</p>
                <div class="demo-container">
                    <div class="box">Normal</div>
                    <div class="box relative-box">Relative</div>
                    <div class="box">Normal</div>
                </div>
                <div class="code-block">
                    <pre><code>.relative-box {
    position: relative;
    top: 20px;
    left: 20px;
  }</code></pre>
                </div>
            </div>

            <!-- Absolute Position -->
            <div class="example-block">
                <h3>Position: Absolute</h3>
                <p>가장 가까운 positioned 조상(static이 아닌)을 기준으로 배치됩니다.</p>
                <div class="demo-container relative-container">
                    <div class="position-reference">부모 요소 (position: relative)</div>
                    <div class="box absolute-box">Absolute</div>
                </div>
                <div class="code-block">
                    <pre><code>.relative-container {
    position: relative;
    height: 150px;
  }
  
  .absolute-box {
    position: absolute;
    top: 40px;
    right: 20px;
  }</code></pre>
                </div>
            </div>

            <!-- Fixed Position -->
            <div class="example-block">
                <h3>Position: Fixed</h3>
                <p>뷰포트(브라우저 창)를 기준으로 고정 배치됩니다. 스크롤해도 위치가 변하지 않습니다.</p>
                <div class="demo-container">
                    <div class="box fixed-demo">Fixed (오른쪽 하단 고정)</div>
                </div>
                <div class="code-block">
                    <pre><code>.fixed-box {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }</code></pre>
                </div>
            </div>

            <!-- Sticky Position -->
            <div class="example-block">
                <h3>Position: Sticky</h3>
                <p>스크롤 위치에 따라 relative와 fixed 사이를 전환합니다.</p>
                <div class="demo-container sticky-demo-container">
                    <div class="sticky-header">Sticky Header (스크롤해 보세요)</div>
                    <div class="dummy-content">
                        <p v-for="n in 5" :key="n">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
                            dui mauris.</p>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.sticky-header {
    position: sticky;
    top: 0;
    background-color: #3498db;
    color: white;
    padding: 10px;
  }</code></pre>
                </div>
            </div>

            <!-- Z-index Example -->
            <div class="example-block">
                <h3>Z-index로 쌓임 순서 제어하기</h3>
                <p>z-index 속성으로 요소의 쌓임 순서를 제어할 수 있습니다.</p>
                <div class="demo-container z-index-container">
                    <div class="z-box z-box-1">z-index: 1</div>
                    <div class="z-box z-box-2">z-index: 2</div>
                    <div class="z-box z-box-3">z-index: 3</div>
                </div>
                <div class="code-block">
                    <pre><code>.z-box {
    position: absolute;
    width: 100px;
    height: 100px;
  }
  .z-box-1 { z-index: 1; left: 10px; top: 10px; }
  .z-box-2 { z-index: 2; left: 40px; top: 30px; }
  .z-box-3 { z-index: 3; left: 70px; top: 50px; }</code></pre>
                </div>
            </div>

            <!-- Center Alignment Technique -->
            <div class="example-block">
                <h3>요소 중앙 정렬 테크닉</h3>
                <p>absolute 위치와 transform을 사용해 요소를 완벽하게 중앙에 배치할 수 있습니다.</p>
                <div class="demo-container centering-container">
                    <div class="centered-box">중앙 정렬</div>
                </div>
                <div class="code-block">
                    <pre><code>.centering-container {
    position: relative;
    height: 200px;
  }
  .centered-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }</code></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 필요한 경우 추가 스크립트 코드
</script>

<style scoped>
.position-section {
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
    min-height: 120px;
    position: relative;
    overflow: hidden;
}

.box {
    width: 100px;
    height: 50px;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    border-radius: 4px;
}

.static-box {
    /* 기본 static */
}

.relative-box {
    position: relative;
    top: 20px;
    left: 20px;
    background-color: #e74c3c;
}

.relative-container {
    position: relative;
    height: 150px;
    border: 1px dashed #ccc;
}

.position-reference {
    background-color: #f1c40f;
    padding: 10px;
    text-align: center;
    width: 100%;
}

.absolute-box {
    position: absolute;
    top: 40px;
    right: 20px;
    background-color: #2ecc71;
}

/* 실제 fixed 예시는 데모용 */
.fixed-demo {
    /* 데모에서는 실제 fixed 대신 시뮬레이션 */
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: #9b59b6;
}

/* position: fixed 요소는 별도로 문서에 추가 */
.fixed-box {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 100px;
    height: 50px;
    background-color: #9b59b6;
    color: white;
    display: none;
    /* 기본적으로 숨김 */
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 100;
}

.sticky-demo-container {
    height: 200px;
    overflow-y: auto;
    padding: 0;
}

.sticky-header {
    position: sticky;
    top: 0;
    background-color: #3498db;
    color: white;
    padding: 10px;
    text-align: center;
    z-index: 10;
}

.dummy-content {
    padding: 10px;
}

.dummy-content p {
    margin-bottom: 15px;
}

.z-index-container {
    height: 180px;
}

.z-box {
    position: absolute;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 6px;
}

.z-box-1 {
    z-index: 1;
    left: 10px;
    top: 10px;
    background-color: rgba(231, 76, 60, 0.8);
}

.z-box-2 {
    z-index: 2;
    left: 40px;
    top: 30px;
    background-color: rgba(46, 204, 113, 0.8);
}

.z-box-3 {
    z-index: 3;
    left: 70px;
    top: 50px;
    background-color: rgba(52, 152, 219, 0.8);
}

.centering-container {
    position: relative;
    height: 200px;
    border: 1px dashed #ccc;
}

.centered-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ff9f43;
    padding: 20px;
    border-radius: 6px;
    color: white;
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

/* 반응형 디자인 */
@media (min-width: 768px) {
    .examples-container {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>