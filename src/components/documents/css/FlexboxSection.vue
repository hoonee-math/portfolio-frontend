<template>
    <div class="flexbox-section">
        <p class="section-description">
            Flexbox(Flexible Box Layout)는 1차원 레이아웃 모델로, 요소들을 행과 열 형태로 배치하는 효율적인 방법을 제공합니다.
            특히 요소의 크기가 불명확하거나 동적인 경우에 유용하며, 공간 배분과 정렬을 쉽게 제어할 수 있습니다.
        </p>

        <div class="examples-container">
            <!-- 기본 Flex 컨테이너 -->
            <div class="example-block">
                <h3>기본 Flex 컨테이너</h3>
                <p>display: flex를 사용하면 자식 요소들이 가로 방향으로 배치됩니다.</p>
                <div class="demo-container">
                    <div class="flex-container basic-flex">
                        <div class="flex-item">1</div>
                        <div class="flex-item">2</div>
                        <div class="flex-item">3</div>
                        <div class="flex-item">4</div>
                        <div class="flex-item">5</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.flex-container {
    display: flex;
  }</code></pre>
                </div>
            </div>

            <!-- flex-direction -->
            <div class="example-block">
                <h3>flex-direction</h3>
                <p>flex-direction 속성은 flex 컨테이너 내의 항목 방향을 설정합니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <label>
                            <input type="radio" v-model="flexDirection" value="row" checked> row
                        </label>
                        <label>
                            <input type="radio" v-model="flexDirection" value="row-reverse"> row-reverse
                        </label>
                        <label>
                            <input type="radio" v-model="flexDirection" value="column"> column
                        </label>
                        <label>
                            <input type="radio" v-model="flexDirection" value="column-reverse"> column-reverse
                        </label>
                    </div>
                    <div class="flex-container" :style="flexDirectionStyle">
                        <div class="flex-item">1</div>
                        <div class="flex-item">2</div>
                        <div class="flex-item">3</div>
                        <div class="flex-item">4</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.flex-container {
    display: flex;
    flex-direction: {{ flexDirection }};
  }</code></pre>
                </div>
            </div>

            <!-- justify-content -->
            <div class="example-block">
                <h3>justify-content</h3>
                <p>주축(main axis)을 따라 flex 항목을 정렬하는 방법을 정의합니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <label>
                            <input type="radio" v-model="justifyContent" value="flex-start" checked> flex-start
                        </label>
                        <label>
                            <input type="radio" v-model="justifyContent" value="flex-end"> flex-end
                        </label>
                        <label>
                            <input type="radio" v-model="justifyContent" value="center"> center
                        </label>
                        <label>
                            <input type="radio" v-model="justifyContent" value="space-between"> space-between
                        </label>
                        <label>
                            <input type="radio" v-model="justifyContent" value="space-around"> space-around
                        </label>
                        <label>
                            <input type="radio" v-model="justifyContent" value="space-evenly"> space-evenly
                        </label>
                    </div>
                    <div class="flex-container" :style="{ justifyContent }">
                        <div class="flex-item">1</div>
                        <div class="flex-item">2</div>
                        <div class="flex-item">3</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.flex-container {
    display: flex;
    justify-content: {{ justifyContent }};
  }</code></pre>
                </div>
            </div>

            <!-- align-items -->
            <div class="example-block">
                <h3>align-items</h3>
                <p>교차축(cross axis)을 따라 flex 항목을 정렬하는 방법을 정의합니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <label>
                            <input type="radio" v-model="alignItems" value="flex-start" checked> flex-start
                        </label>
                        <label>
                            <input type="radio" v-model="alignItems" value="flex-end"> flex-end
                        </label>
                        <label>
                            <input type="radio" v-model="alignItems" value="center"> center
                        </label>
                        <label>
                            <input type="radio" v-model="alignItems" value="stretch"> stretch
                        </label>
                        <label>
                            <input type="radio" v-model="alignItems" value="baseline"> baseline
                        </label>
                    </div>
                    <div class="flex-container align-container" :style="{ alignItems }">
                        <div class="flex-item" style="height: 40px">1</div>
                        <div class="flex-item" style="height: 60px">2</div>
                        <div class="flex-item" style="height: 80px">3</div>
                        <div class="flex-item" style="height: 50px">4</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.flex-container {
    display: flex;
    align-items: {{ alignItems }};
    height: 150px; /* 컨테이너에 높이가 필요함 */
  }</code></pre>
                </div>
            </div>

            <!-- flex-wrap -->
            <div class="example-block">
                <h3>flex-wrap</h3>
                <p>flex 항목이 한 줄에 들어가지 않을 때 여러 줄로 나눌지 결정합니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <label>
                            <input type="radio" v-model="flexWrap" value="nowrap" checked> nowrap
                        </label>
                        <label>
                            <input type="radio" v-model="flexWrap" value="wrap"> wrap
                        </label>
                        <label>
                            <input type="radio" v-model="flexWrap" value="wrap-reverse"> wrap-reverse
                        </label>
                    </div>
                    <div class="flex-container wrap-container" :style="{ flexWrap }">
                        <div class="flex-item" v-for="n in 10" :key="n">{{ n }}</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.flex-container {
    display: flex;
    flex-wrap: {{ flexWrap }};
  }</code></pre>
                </div>
            </div>

            <!-- flex-grow -->
            <div class="example-block">
                <h3>flex-grow</h3>
                <p>flex 항목이 필요에 따라 컨테이너를 채우기 위해 얼마나 커질 수 있는지 지정합니다.</p>
                <div class="demo-container">
                    <div class="flex-container">
                        <div class="flex-item" style="flex-grow: 1">flex-grow: 1</div>
                        <div class="flex-item" style="flex-grow: 2">flex-grow: 2</div>
                        <div class="flex-item" style="flex-grow: 1">flex-grow: 1</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.item1 { flex-grow: 1; } /* 가용 공간의 1/4 차지 */
  .item2 { flex-grow: 2; } /* 가용 공간의 2/4 차지 */
  .item3 { flex-grow: 1; } /* 가용 공간의 1/4 차지 */</code></pre>
                </div>
            </div>

            <!-- flex-shrink -->
            <div class="example-block">
                <h3>flex-shrink</h3>
                <p>공간이 부족할 때 flex 항목이 얼마나 줄어들 수 있는지 지정합니다.</p>
                <div class="demo-container">
                    <div class="flex-container shrink-container">
                        <div class="flex-item" style="flex-basis: 200px; flex-shrink: 1">flex-shrink: 1</div>
                        <div class="flex-item" style="flex-basis: 200px; flex-shrink: 2">flex-shrink: 2</div>
                        <div class="flex-item" style="flex-basis: 200px; flex-shrink: 3">flex-shrink: 3</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>/* 세 항목 모두 원래 200px이 필요하지만 공간이 부족함 */
  .item1 { flex-basis: 200px; flex-shrink: 1; }
  .item2 { flex-basis: 200px; flex-shrink: 2; } /* 2배 더 줄어듦 */
  .item3 { flex-basis: 200px; flex-shrink: 3; } /* 3배 더 줄어듦 */</code></pre>
                </div>
            </div>

            <!-- flex-basis -->
            <div class="example-block">
                <h3>flex-basis</h3>
                <p>flex 항목의 초기 크기를 지정합니다.</p>
                <div class="demo-container">
                    <div class="flex-container">
                        <div class="flex-item" style="flex-basis: auto">auto</div>
                        <div class="flex-item" style="flex-basis: 100px">100px</div>
                        <div class="flex-item" style="flex-basis: 200px">200px</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.item1 { flex-basis: auto; } /* 내용에 따라 크기 결정 */
  .item2 { flex-basis: 100px; } /* 초기 크기 100px */
  .item3 { flex-basis: 200px; } /* 초기 크기 200px */</code></pre>
                </div>
            </div>

            <!-- flex 단축 속성 -->
            <div class="example-block">
                <h3>flex 단축 속성</h3>
                <p>flex-grow, flex-shrink, flex-basis를 한 번에 설정합니다.</p>
                <div class="demo-container">
                    <div class="flex-container">
                        <div class="flex-item" style="flex: 1 1 auto">flex: 1 1 auto</div>
                        <div class="flex-item" style="flex: 2 1 auto">flex: 2 1 auto</div>
                        <div class="flex-item" style="flex: 1 1 200px">flex: 1 1 200px</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.item1 { flex: 1 1 auto; } /* grow=1, shrink=1, basis=auto */
  .item2 { flex: 2 1 auto; } /* grow=2, shrink=1, basis=auto */
  .item3 { flex: 1 1 200px; } /* grow=1, shrink=1, basis=200px */</code></pre>
                </div>
            </div>

            <!-- 실전 레이아웃 예시 -->
            <div class="example-block">
                <h3>실전 레이아웃 예시: 반응형 카드 그리드</h3>
                <p>flexbox와 flex-wrap을 사용하여 화면 크기에 따라 자동으로 조정되는 카드 그리드를 만들 수 있습니다.</p>
                <div class="demo-container">
                    <div class="card-container">
                        <div class="card" v-for="n in 6" :key="n">
                            <div class="card-header">카드 {{ n }}</div>
                            <div class="card-body">flexbox 반응형 카드 레이아웃</div>
                        </div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .card {
    flex: 1 1 200px; /* 최소 200px, 남은 공간 균등 분배 */
    max-width: 300px; /* 너무 넓어지지 않도록 제한 */
  }
  
  /* 반응형: 작은 화면에서는 카드가 전체 너비 차지 */
  @media (max-width: 600px) {
    .card {
      flex-basis: 100%;
    }
  }</code></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { CSSProperties } from 'vue';

// 인터랙티브 데모를 위한 상태 관리
// 타입을 명시적으로 지정
const flexDirection = ref<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
const justifyContent = ref<'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'>('flex-start');
const alignItems = ref<'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'>('flex-start');
const flexWrap = ref<'nowrap' | 'wrap' | 'wrap-reverse'>('nowrap');
// 각 스타일에 대한 computed 속성으로 스타일 객체 생성
const flexDirectionStyle = computed<CSSProperties>(() => ({
  flexDirection: flexDirection.value
}));

const justifyContentStyle = computed<CSSProperties>(() => ({
  justifyContent: justifyContent.value
}));

const alignItemsStyle = computed<CSSProperties>(() => ({
  alignItems: alignItems.value
}));

const flexWrapStyle = computed<CSSProperties>(() => ({
  flexWrap: flexWrap.value
}));
</script>

<style scoped>
.flexbox-section {
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
    grid-template-columns: repeat(1, 1fr);
    /* grid-template-columns: repeat(auto-fill, minmax(40%, 1fr)); */
    gap: 30px;
}

@media (min-width: 768px) {
    .examples-container {
        grid-template-columns: repeat(2, 1fr);
        /* grid-template-columns: repeat(1fr); */
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
    min-height: 120px;
}

.control-panel {
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.control-panel label {
    margin-right: 10px;
    cursor: pointer;
}

.flex-container {
    display: flex;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    min-height: 50px;
}

.flex-item {
    padding: 10px;
    background-color: #3498db;
    color: white;
    border-radius: 4px;
    text-align: center;
    margin: 5px;
    min-width: 30px;
}

.align-container {
    height: 150px;
}

.wrap-container {
    width: 100%;
}

.wrap-container .flex-item {
    width: 60px;
}

.shrink-container {
    width: 100%;
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

/* 카드 레이아웃 예시 스타일 */
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.card {
    flex: 1 1 200px;
    max-width: 300px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.card-header {
    padding: 10px 15px;
    background-color: #3498db;
    color: white;
    font-weight: bold;
}

.card-body {
    padding: 15px;
}

@media (max-width: 600px) {
    .card {
        flex-basis: 100%;
    }
}
</style>