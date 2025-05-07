<template>
    <div class="grid-section">
        <p class="section-description">
            CSS Grid는 2차원 레이아웃 시스템으로, 웹 페이지를 행과 열로 구성된 그리드로 나누어 요소들을 배치할 수 있습니다.
            복잡한 레이아웃을 쉽게 만들 수 있으며, 반응형 디자인에 매우 효과적입니다.
        </p>

        <div class="examples-container">
            <!-- 기본 Grid 컨테이너 -->
            <div class="example-block">
                <h3>기본 Grid 컨테이너</h3>
                <p>display: grid를 사용하면 자식 요소들이 그리드 형태로 배치됩니다.</p>
                <div class="demo-container">
                    <div class="grid-container basic-grid">
                        <div class="grid-item">1</div>
                        <div class="grid-item">2</div>
                        <div class="grid-item">3</div>
                        <div class="grid-item">4</div>
                        <div class="grid-item">5</div>
                        <div class="grid-item">6</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 100px);
    gap: 10px;
  }</code></pre>
                </div>
            </div>

            <!-- grid-template-columns & grid-template-rows -->
            <div class="example-block">
                <h3>grid-template-columns & grid-template-rows</h3>
                <p>그리드의 열과 행 구조를 정의합니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <div>
                            <label>grid-template-columns:</label>
                            <select v-model="templateColumns">
                                <option value="1fr 1fr 1fr">1fr 1fr 1fr</option>
                                <option value="100px 200px 100px">100px 200px 100px</option>
                                <option value="auto 1fr 2fr">auto 1fr 2fr</option>
                                <option value="repeat(3, 1fr)">repeat(3, 1fr)</option>
                                <option value="minmax(100px, 1fr) 2fr 1fr">minmax(100px, 1fr) 2fr 1fr</option>
                            </select>
                        </div>
                        <div>
                            <label>grid-template-rows:</label>
                            <select v-model="templateRows">
                                <option value="100px 100px">100px 100px</option>
                                <option value="auto auto">auto auto</option>
                                <option value="1fr 2fr">1fr 2fr</option>
                                <option value="repeat(2, minmax(50px, auto))">repeat(2, minmax(50px, auto))</option>
                            </select>
                        </div>
                    </div>
                    <div class="grid-container"
                        :style="{ gridTemplateColumns: templateColumns, gridTemplateRows: templateRows }">
                        <div class="grid-item">1</div>
                        <div class="grid-item">2</div>
                        <div class="grid-item">3</div>
                        <div class="grid-item">4</div>
                        <div class="grid-item">5</div>
                        <div class="grid-item">6</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.grid-container {
    display: grid;
    grid-template-columns: {{ templateColumns }};
    grid-template-rows: {{ templateRows }};
    gap: 10px;
  }</code></pre>
                </div>
            </div>

            <!-- grid-gap, grid-row-gap, grid-column-gap -->
            <div class="example-block">
                <h3>grid-gap, grid-row-gap, grid-column-gap</h3>
                <p>그리드 항목 사이의 간격을 제어합니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <div>
                            <label>column-gap:</label>
                            <input type="range" v-model="columnGap" min="0" max="50">
                            <span>{{ columnGap }}px</span>
                        </div>
                        <div>
                            <label>row-gap:</label>
                            <input type="range" v-model="rowGap" min="0" max="50">
                            <span>{{ rowGap }}px</span>
                        </div>
                    </div>
                    <div class="grid-container" :style="{ columnGap: `${columnGap}px`, rowGap: `${rowGap}px` }">
                        <div class="grid-item">1</div>
                        <div class="grid-item">2</div>
                        <div class="grid-item">3</div>
                        <div class="grid-item">4</div>
                        <div class="grid-item">5</div>
                        <div class="grid-item">6</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: {{ columnGap }}px;
    row-gap: {{ rowGap }}px;
    /* 단축 속성: gap: {{ rowGap }}px {{ columnGap }}px; */
  }</code></pre>
                </div>
            </div>

            <!-- grid-column, grid-row -->
            <div class="example-block">
                <h3>grid-column, grid-row</h3>
                <p>특정 그리드 항목의 배치를 제어합니다.</p>
                <div class="demo-container">
                    <div class="grid-container placement-grid">
                        <div class="grid-item">1</div>
                        <div class="grid-item">2</div>
                        <div class="grid-item special-item">3</div>
                        <div class="grid-item">4</div>
                        <div class="grid-item">5</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
  }
  
  .special-item {
    background-color: #e74c3c;
    grid-column: 1 / 3; /* 1번 열에서 시작하여 3번 열 전까지 */
    grid-row: 2 / 4; /* 2번 행에서 시작하여 4번 행 전까지 */
  }</code></pre>
                </div>
            </div>

            <!-- grid-area & grid-template-areas -->
            <div class="example-block">
                <h3>grid-area & grid-template-areas</h3>
                <p>이름으로 그리드 영역을 정의하고 배치할 수 있습니다.</p>
                <div class="demo-container">
                    <div class="grid-container template-areas-grid">
                        <div class="grid-item header">헤더</div>
                        <div class="grid-item sidebar">사이드바</div>
                        <div class="grid-item content">컨텐츠</div>
                        <div class="grid-item footer">푸터</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.grid-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
      "header header"
      "sidebar content"
      "footer footer";
    gap: 10px;
    height: 250px;
  }
  
  .header { grid-area: header; }
  .sidebar { grid-area: sidebar; }
  .content { grid-area: content; }
  .footer { grid-area: footer; }</code></pre>
                </div>
            </div>

            <!-- align-items & justify-items -->
            <div class="example-block">
                <h3>align-items & justify-items</h3>
                <p>그리드 셀 내에서 항목을 정렬하는 방법을 지정합니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <div>
                            <label>justify-items:</label>
                            <select v-model="justifyItems">
                                <option value="start">start</option>
                                <option value="end">end</option>
                                <option value="center">center</option>
                                <option value="stretch">stretch</option>
                            </select>
                        </div>
                        <div>
                            <label>align-items:</label>
                            <select v-model="alignItems">
                                <option value="start">start</option>
                                <option value="end">end</option>
                                <option value="center">center</option>
                                <option value="stretch">stretch</option>
                            </select>
                        </div>
                    </div>
                    <div class="grid-container alignment-grid" :style="{ justifyItems, alignItems }">
                        <div class="grid-item alignment-item">1</div>
                        <div class="grid-item alignment-item">2</div>
                        <div class="grid-item alignment-item">3</div>
                        <div class="grid-item alignment-item">4</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 100px);
    gap: 10px;
    justify-items: {{ justifyItems }}; /* 수평 정렬 */
    align-items: {{ alignItems }}; /* 수직 정렬 */
  }</code></pre>
                </div>
            </div>

            <!-- auto-fill & auto-fit -->
            <div class="example-block">
                <h3>repeat() 함수의 auto-fill & auto-fit</h3>
                <p>반응형 그리드를 만들 수 있는 강력한 기능입니다.</p>
                <div class="demo-container">
                    <div class="control-panel">
                        <div>
                            <label>
                                <input type="radio" v-model="autoType" value="auto-fill" checked> auto-fill
                            </label>
                            <label>
                                <input type="radio" v-model="autoType" value="auto-fit"> auto-fit
                            </label>
                        </div>
                    </div>
                    <div class="grid-container"
                        :style="{ gridTemplateColumns: `repeat(${autoType}, minmax(100px, 1fr))` }">
                        <div class="grid-item auto-item" v-for="n in 3" :key="n">{{ n }}</div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.grid-container {
    display: grid;
    /* 최소 100px, 여유 공간이 있으면 확장 */
    grid-template-columns: repeat({{ autoType }}, minmax(100px, 1fr));
    gap: 10px;
  }</code></pre>
                </div>
                <p class="note">
                    <strong>auto-fill</strong>: 가능한 많은 열을 만들어 채웁니다. 빈 공간이 남을 수 있습니다.<br>
                    <strong>auto-fit</strong>: 가능한 많은 열을 만들고, 남은 공간을 채우기 위해 항목을 확장합니다.
                </p>
            </div>

            <!-- 실전 레이아웃 예시 -->
            <div class="example-block">
                <h3>실전 레이아웃 예시: 반응형 갤러리</h3>
                <p>Grid와 minmax()를 사용하여 자동으로 조정되는 이미지 갤러리를 만들 수 있습니다.</p>
                <div class="demo-container">
                    <div class="gallery-grid">
                        <div class="gallery-item" v-for="n in 8" :key="n">
                            <div class="image-placeholder">이미지 {{ n }}</div>
                        </div>
                    </div>
                </div>
                <div class="code-block">
                    <pre><code>.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
  
  .gallery-item {
    aspect-ratio: 1 / 1; /* 정사각형 유지 */
    overflow: hidden;
    border-radius: 8px;
    transition: transform 0.3s;
  }
  
  .gallery-item:hover {
    transform: scale(1.05);
  }
  
  /* 미디어 쿼리로 반응형 조정 */
  @media (max-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
  }</code></pre>
                </div>
            </div>

            <!-- Grid vs Flexbox -->
            <div class="example-block">
                <h3>Grid vs Flexbox</h3>
                <p>Grid와 Flexbox는 각각 다른 상황에 적합합니다.</p>
                <div class="demo-container comparison-container">
                    <div class="comparison-item">
                        <h4>Flexbox</h4>
                        <ul>
                            <li>1차원 레이아웃에 적합 (행 또는 열)</li>
                            <li>콘텐츠 흐름에 따라 크기 조정</li>
                            <li>요소의 순서 쉽게 변경 가능</li>
                            <li>작은 UI 요소, 내비게이션 등에 이상적</li>
                        </ul>
                    </div>
                    <div class="comparison-item">
                        <h4>Grid</h4>
                        <ul>
                            <li>2차원 레이아웃에 적합 (행과 열)</li>
                            <li>명시적 배치 제어 용이</li>
                            <li>복잡한 레이아웃 구성에 강점</li>
                            <li>페이지 레이아웃, 갤러리 등에 이상적</li>
                        </ul>
                    </div>
                </div>
                <p class="note">최신 웹 개발에서는 두 기술을 함께 사용하는 것이 일반적입니다. 전체 페이지 레이아웃은 Grid로, 내부 컴포넌트는 Flexbox로 구현하는 방식이
                    효과적입니다.</p>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 인터랙티브 데모를 위한 상태 관리
const templateColumns = ref('1fr 1fr 1fr');
const templateRows = ref('100px 100px');
const columnGap = ref(10);
const rowGap = ref(10);
const justifyItems = ref('stretch');
const alignItems = ref('stretch');
const autoType = ref('auto-fill');
</script>

<style scoped>
.grid-section {
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
    min-height: 120px;
}

.control-panel {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.control-panel label {
    margin-right: 10px;
    cursor: pointer;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, minmax(50px, auto));
    gap: 10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
}

.grid-item {
    padding: 10px;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.basic-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 100px);
}

.placement-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 80px);
}

.special-item {
    background-color: #e74c3c;
    grid-column: 1 / 3;
    grid-row: 2 / 4;
}

.template-areas-grid {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header"
        "sidebar content"
        "footer footer";
    height: 250px;
}

.header {
    grid-area: header;
    background-color: #f39c12;
}

.sidebar {
    grid-area: sidebar;
    background-color: #2ecc71;
}

.content {
    grid-area: content;
    background-color: #3498db;
}

.footer {
    grid-area: footer;
    background-color: #9b59b6;
}

.alignment-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 100px);
}

.alignment-item {
    width: 60px;
    height: 60px;
}

.auto-item {
    height: 80px;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
}

.gallery-item {
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 8px;
    transition: transform 0.3s;
}

.gallery-item:hover {
    transform: scale(1.05);
}

.image-placeholder {
    width: 100%;
    height: 100%;
    background-color: #3498db;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
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

.comparison-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

@media (min-width: 576px) {
    .comparison-container {
        flex-direction: row;
    }
}

.comparison-item {
    flex: 1;
    background-color: #fff;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.comparison-item h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
}

.comparison-item ul {
    padding-left: 20px;
    margin: 0;
}

.comparison-item li {
    margin-bottom: 5px;
}
</style>