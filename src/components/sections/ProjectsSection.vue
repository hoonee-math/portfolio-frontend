<template>
    <section class="section" id="projects">
        <div class="section-header">
            <h2 class="section-title">프로젝트</h2>
            <p class="section-subtitle">현재 작업 중입니다.</p>
        </div>

        <div class="section-body">
            <div class="projects-grid">
                <div v-for="(project, index) in projects" :key="index" class="project-card" @click="openModal(project)">
                    <div class="project-image">
                        <img :src="project.image" :alt="project.title">
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">{{ project.title }}</h3>
                        <p class="project-desc">{{ project.description }}</p>
                        <div class="project-tags">
                            <span v-for="(tag, tagIndex) in project.tags" :key="tagIndex" class="project-tag">
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 모달 추가 -->
        <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <h3>프로젝트 링크</h3>
                <p><strong>{{ selectedProject.title }}</strong> 프로젝트 페이지로 이동하시겠습니까?</p>
                <p v-if="selectedProject.src" class="modal-url">{{ selectedProject.src }}</p>
                <p v-else class="modal-unavailable">링크가 제공되지 않는 프로젝트입니다.</p>
                <div class="modal-actions">
                    <button class="btn-cancel" @click="closeModal">취소</button>
                    <button v-if="selectedProject.src" class="btn-confirm" @click="navigateToLink">
                        이동하기
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PageNumber from '@/components/ui/PageNumber.vue';

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    src?: string; // 선택적 속성
}

export default defineComponent({
    name: 'ProjectsSection',
    components: {
        PageNumber
    },
    setup() {
        // 모달 관련 상태 추가
        const showModal = ref(false);
        const selectedProject = ref<Project>({
            title: '',
            description: '',
            image: '',
            tags: []
        });

        // 프로젝트 데이터
        const projects = ref([
            {
                title: '천재의 서재',
                description: '천재교육 문제은행 API를 활용한 문제은행 웹사이트입니다.',
                image: '/천재의서재.png',
                tags: ['Vue.js', 'java', 'Spring-boot', 'JPA', 'OracleDB', 'AWS', 'Docker'],
                src: 'http://43.202.6.90:3000/home'
            },
            {
                title: 'GenieQ',
                description: '비문학 지문 및 문항 AI 생성 서비스',
                image: '/genieq.png',
                tags: ['Vue.js', 'java', 'Spring-boot', 'JPA', 'OracleDB', 'AWS', 'Docker'],
                src: 'http://43.202.6.90/team/genius/kwanghoon'
            },
            {
                title: '시범강의 예약 시스템',
                description: '해법수학 학생 전용 시범강의 예약 시스템',
                image: '/reservation.png',
                tags: ['JSP', 'java', 'Spring-Legacy', 'JPA', 'OracleDB', 'AWS', 'Docker'],
                src: 'http://43.202.6.90:8080/reservation/'
            },
            {
                title: 'HoneyT',
                description: 'zoom을 활용한 실시간 온라인 강의 웹 서비스',
                image: '/honeyT.png',
                tags: ['JSP', 'java', 'myBatis', 'OracleDB']
            },
            {
                title: '티꿀모아',
                description: '학교와 학원 선생님들을 위한 교보재 중고거래 플랫폼',
                image: '/Thoneymoa.png',
                tags: ['JSP', 'java', 'myBatis', 'OracleDB']
            },
            {
                title: '맘스티처',
                description: '다양한 정보를 공유할 수 있는 학부모 커뮤니티 웹 서비스',
                image: '/momsT.png',
                tags: ['JSP', 'java', 'myBatis', 'OracleDB']
            },
        ] as Project[]);
        // 모달 열기
        const openModal = (project: Project) => {
            selectedProject.value = project;
            showModal.value = true;
        };

        // 모달 닫기
        const closeModal = () => {
            showModal.value = false;
        };

        // 링크로 이동
        const navigateToLink = () => {
            if (selectedProject.value.src) {
                window.open(selectedProject.value.src, '_blank');
            }
            closeModal();
        };

        return {
            projects,
            showModal,
            selectedProject,
            openModal,
            closeModal,
            navigateToLink
        };
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/utils' as utils;

.section {
    @include utils.section-style;
    // height: 800px;
    // position: relative;
    overflow-y: auto;

    @media (max-width: 768px) {
        padding: 20px 12px;
        /* 모바일에서 좌우 패딩 축소 */
    }
}

.slide-image {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: vars.$shadow;
    margin-bottom: 2rem;
}

.section-header {
    margin-bottom: 1.5rem;

    .section-title {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        @include utils.gradient-text(vars.$gradient-primary);
    }

    .section-subtitle {
        color: vars.$gray-600;
        font-weight: vars.$font-weight-medium;
    }
}

.section-body {
    flex: 1;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;

    @include utils.respond-to('sm') {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 1200px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
}

.project-card {
    background-color: vars.$white;
    border: solid 1px vars.$gray-300;
    border-radius: 8px;
    overflow: hidden;
    @include utils.box-shadow(vars.$shadow-sm);
    transition: vars.$transition-base;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        @include utils.box-shadow(vars.$shadow);
    }
}

.project-image {
    height: 200px;
    background-color: vars.$gray-200;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.project-info {
    padding: 1.5rem;
}

.project-title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: vars.$text-color;
}

.project-desc {
    color: vars.$gray-600;
    margin-bottom: 1rem;
    line-height: 1.5;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.project-tag {
    background-color: vars.$gray-200;
    color: vars.$gray-700;
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
    border-radius: 50px;
}

/* 모달 스타일 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    padding: 24px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-url {
    margin: 16px 0;
    padding: 8px 12px;
    background-color: #f5f5f5;
    border-radius: 4px;
    word-break: break-all;
}

.modal-unavailable {
    margin: 16px 0;
    padding: 8px 12px;
    background-color: #ffebee;
    border-radius: 4px;
    color: #d32f2f;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
}

.btn-cancel,
.btn-confirm {
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    border: none;
}

.btn-cancel {
    background-color: #f1f1f1;
    color: #333;
}

.btn-confirm {
    background: linear-gradient(45deg, vars.$primary-color, vars.$secondary-color);
    color: white;
}
</style>