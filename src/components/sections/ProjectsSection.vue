<template>
    <section class="section" id="projects">
        <div class="section-header">
            <h2 class="section-title">프로젝트</h2>
            <p class="section-subtitle">프로젝트를 선택하여 자세한 내용을 확인해볼 수 있습니다.</p>
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

        <!-- 개선된 모달 -->
        <div v-if="showModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h3 class="modal-title">{{ selectedProject.title }}</h3>
                    <button class="modal-close" @click="closeModal">&times;</button>
                </div>
                
                <div class="modal-body">
                    <!-- 이미지 슬라이더 -->
                    <div class="image-slider">
                        <div class="slider-container">
                            <div class="slider-wrapper" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                                <div v-for="(image, index) in selectedProject.images" :key="index" class="slide">
                                    <img :src="image.src" :alt="image.alt" class="slide-image" @click="openImageInNewTab(image.src)">
                                    <div class="slide-caption">{{ image.caption }}</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 슬라이더 컨트롤 -->
                        <button v-if="selectedProject.images && selectedProject.images.length > 1" 
                                class="slider-btn prev" @click="prevSlide">
                            &#10094;
                        </button>
                        <button v-if="selectedProject.images && selectedProject.images.length > 1" 
                                class="slider-btn next" @click="nextSlide">
                            &#10095;
                        </button>
                        
                        <!-- 인디케이터 -->
                        <div v-if="selectedProject.images && selectedProject.images.length > 1" class="slider-indicators">
                            <button v-for="(image, index) in selectedProject.images" 
                                    :key="index" 
                                    class="indicator"
                                    :class="{ active: index === currentSlide }"
                                    @click="goToSlide(index)">
                            </button>
                        </div>
                    </div>
                    
                    <!-- 프로젝트 상세 정보 -->
                    <div class="project-details">
                        <div class="project-description">
                            <h4>프로젝트 소개</h4>
                            <p>{{ selectedProject.fullDescription || selectedProject.description }}</p>
                        </div>
                                            
                        <div v-if="selectedProject.features && selectedProject.features.length" class="project-features">
                            <h4>주요 기능</h4>
                            <ul>
                                <li v-for="(feature, index) in selectedProject.features" :key="index">
                                    {{ feature }}
                                </li>
                            </ul>
                        </div>
                        
                        <div class="project-tech-stack">
                            <h4>기술 스택</h4>
                            <div class="tech-tags">
                                <span v-for="(tag, index) in selectedProject.tags" :key="index" class="tech-tag">
                                    {{ tag }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 모달 푸터 -->
                <div class="modal-footer">
                    <button class="btn-close" @click="closeModal">닫기</button>
                    <button v-if="selectedProject.src" class="btn-visit" @click="navigateToLink">
                        사이트 방문하기
                    </button>
                    <span v-else class="unavailable-notice">사이트 링크가 제공되지 않습니다</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import PageNumber from '@/components/ui/PageNumber.vue';

interface ProjectImage {
    src: string;
    alt: string;
    caption: string;
}

interface Project {
    title: string;
    description: string;
    fullDescription?: string;
    image: string;
    images?: ProjectImage[];
    tags: string[];
    src?: string;
    architecture?: string;
    features?: string[];
}

export default defineComponent({
    name: 'ProjectsSection',
    components: {
        PageNumber
    },
    setup() {
        // 기술 스택 필터링 관련 상태 추가
        const selectedTags = ref<string[]>(["전체"]);
        const allTags = computed(() => {
            const tagsSet = new Set<string>();
            projects.value.forEach(project => {
                project.tags.forEach(tag => tagsSet.add(tag));
            });
            return Array.from(tagsSet).sort();
        });

        const filteredProjects = computed(() => {
            if (selectedTags.value.includes("전체")) {
                return projects.value;
            }
            return projects.value.filter(project =>
                project.tags.some(tag => selectedTags.value.includes(tag))
            );
        });

        // 필터링 함수
        const setFilter = (tag: string) => {
            if (tag === "전체") {
                selectedTags.value = ["전체"];
            } else {
                if (selectedTags.value.includes(tag)) {
                    selectedTags.value = selectedTags.value.filter(t => t !== tag);
                } else {
                    selectedTags.value.push(tag);
                }
            }
        };


        // 모달 관련 상태
        const showModal = ref(false);
        const selectedProject = ref<Project>({
            title: '',
            description: '',
            image: '',
            tags: []
        });
        
        // 슬라이더 관련 상태
        const currentSlide = ref(0);
        
        // 자동 슬라이드 관련 변수
        let autoSlideInterval: ReturnType<typeof setInterval> | null = null;
        const autoSlideDelay = 3000; // 3초마다 자동 전환
        const isHovered = ref(false);

        // 프로젝트 데이터 (이미지와 상세 정보 추가)
        const projects = ref([
            {
                title: '개인 서버, 포트폴리오 웹사이트',
                description: '개인 서버를 활용한 포트폴리오 웹사이트입니다.',
                fullDescription: '개인 서버를 구축하여 포트폴리오 웹사이트를 운영하고 있습니다. 다양한 프로젝트와 기술 스택을 소개하며, 지속적으로 업데이트하고 있습니다.',
                image: '/image/architecture/Architecture_MyServer.png',
                images: [
                    { src: '/image/architecture/Architecture_MyServer.png', alt: '서버 아키텍처', caption: '서버 아키텍처' },
                    { src: '/image/project/security_headers_A.png', alt: 'security_headers_A', caption: 'securityheaders.com A등급' }
                ],
                tags: ['Vue.js', 'java', 'Spring-boot', 'JPA', 'MySql', 'Docker-compose', 'Nginx', 'Linux-ubuntu',],
                src: 'https://hoonee-math.info',
                features: [
                    '개인 서버 구축 및 운영',
                    '포트폴리오 웹사이트 개발',
                    '다양한 프로젝트 소개 및 기술 스택 공유'
                ]
            },
            {
                title: '천재의 서재',
                description: '천재교육 문제은행 API를 활용한 문제은행 웹사이트입니다.',
                fullDescription: '천재교육에서 제공하는 문제은행 API를 활용하여 학생들이 다양한 문제를 풀어볼 수 있는 웹사이트를 개발했습니다. 사용자 친화적인 UI와 효율적인 문제 검색 기능을 제공합니다.',
                image: '/image/project/천재의서재.png',
                images: [
                    { src: '/image/project/천재의서재.png', alt: '메인 화면', caption: '메인 화면 - 문제은행 검색 및 카테고리' },
                    { src: '/image/architecture/Architecture_천재의서재.png', alt: '천재의 서재 아키텍처', caption: '천재의 서재 아키텍처' },
                ],
                tags: ['Vue.js', 'java', 'Spring-boot', 'JPA', 'OracleDB', 'AWS', 'Docker'],
                src: 'http://43.202.6.90:3000/home',
                features: [
                    '천재교육 API 연동을 통한 실시간 문제 데이터 조회',
                    '교과서별, 단원별 문제 조회 민 학습지 제작',
                    '학습지 저장, 수정, 다운로드 기능'
                ]
            },
            {
                title: 'GenieQ',
                description: '비문학 지문 및 문항 AI 생성 서비스',
                fullDescription: 'AI 기술을 활용하여 비문학 지문과 관련 문항을 자동으로 생성하는 서비스입니다. 교육자들이 보다 효율적으로 교육 자료를 제작할 수 있도록 돕습니다.',
                image: '/image/project/GenieQ_main.png',
                images: [
                    { src: '/image/project/genieq.png', alt: 'GenieQ', caption: 'GenieQ 지문 생성화면' },
                    { src: '/image/architecture/Architecture_GenieQ.png', alt: 'GeineQ 아키텍처', caption: 'GeineQ 아키텍처' },
                    { src: '/image/project/GenieQ_main.png', alt: '생성 결과', caption: 'GenieQ 메인 화면' }
                ],
                tags: ['Vue.js', 'java', 'Spring-boot', 'JPA', 'OracleDB', 'AWS', 'Docker'],
                src: 'http://43.202.6.90/team/genius/kwanghoon',
                features: [
                    'AI 기반 비문학 지문 자동 생성',
                    '생성된 지문에 맞는 문항 자동 생성',
                    '생성 이력 관리 및 재편집 기능',
                    '다양한 난이도별 문제 생성 옵션'
                ]
            },
            {
                title: '시범강의 예약 시스템',
                description: '해법수학 학생 전용 시범강의 예약 시스템',
                fullDescription: '해법수학 학원의 시범강의를 온라인으로 예약할 수 있는 시스템입니다. 학생과 학부모가 편리하게 시범강의를 예약하고 관리할 수 있습니다.',
                image: '/image/project/reservation.png',
                images: [
                    { src: '/image/project/reservation.png', alt: '예약 시스템 메인', caption: '예약 시스템 메인 화면' },
                ],
                tags: ['JSP', 'java', 'Spring-Legacy', 'JPA', 'OracleDB', 'AWS', 'Docker'],
                src: 'http://43.202.6.90:8080/reservation/',
                features: [
                    '실시간 강의 일정 확인 및 예약',
                    '학생별 예약 이력 관리',
                    '강사별 일정 관리 시스템',
                    '예약 확인 및 취소 기능'
                ]
            },
            {
                title: 'HoneyT',
                description: 'zoom을 활용한 실시간 온라인 강의 웹 서비스',
                fullDescription: 'Zoom을 연동하여 실시간 온라인 강의를 진행할 수 있는 플랫폼입니다. 강사와 학생 간의 원활한 소통을 위한 다양한 기능을 제공합니다.',
                image: '/image/project/honeyT.png',
                images: [
                    { src: '/image/project/honeyT.png', alt: 'HoneyT 메인', caption: 'HoneyT 메인 화면' },
                ],
                tags: ['JSP', 'java', 'myBatis', 'OracleDB'],
                features: [
                    'Zoom API 연동을 통한 실시간 화상 강의',
                    '강의 일정 관리 및 예약 시스템',
                ]
            },
            {
                title: '티꿀모아',
                description: '학교와 학원 선생님들을 위한 교보재 중고거래 플랫폼',
                fullDescription: '교육 현장의 선생님들이 필요한 교보재를 효율적으로 거래할 수 있는 전용 플랫폼입니다. 신뢰할 수 있는 교육자 간의 안전한 거래를 지원합니다.',
                image: '/image/project/Thoneymoa.png',
                images: [
                    { src: '/image/project/Thoneymoa.png', alt: '티꿀모아 메인', caption: '티꿀모아 메인 화면' }
                ],
                tags: ['JSP', 'java', 'myBatis', 'OracleDB'],
                features: [
                    '교보재 카테고리별 분류 및 검색',
                    '안전한 거래를 위한 평점 시스템',
                    '지역별 거래 매칭 서비스'
                ]
            },
            {
                title: '맘스티처',
                description: '다양한 정보를 공유할 수 있는 학부모 커뮤니티 웹 서비스',
                fullDescription: '학부모들이 교육 정보와 육아 팁을 공유하고 소통할 수 있는 커뮤니티 플랫폼입니다. 지역별, 관심사별로 다양한 정보를 나눌 수 있습니다.',
                image: '/image/project/momsT.png',
                images: [
                    { src: '/image/project/momsT.png', alt: '맘스티처 메인', caption: '맘스티처 메인 화면' }
                ],
                tags: ['JSP', 'java', 'myBatis', 'OracleDB'],
                features: [
                    '지역별 학부모 커뮤니티 구성',
                    '교육 정보 및 육아 팁 공유',
                    '학교별 정보 게시판'
                ]
            },
            {
                title: 'AI 임계값 경보 시스템',
                description: '인구 밀집 지역의 AI 기반 임계값 경보 시스템',
                fullDescription: '인구 밀집 지역에서 발생할 수 있는 다양한 위험 요소를 AI 기술을 활용하여 실시간으로 모니터링하고 경고하는 시스템입니다. 안전한 도시 환경을 위한 필수 서비스입니다.',
                image: '/image/project/emergency.png',
                images: [
                    { src: '/image/project/emergency.png', alt: 'ai emergency 메인', caption: 'ai emergency main' }
                ],
                tags: ['python', 'yolo', 'pip', '화소처리기법'],
                features: [
                    '실시간 인구 밀집 지역 모니터링',
                    '객체 종류, 객체 수에 따른 임계값 설정',
                    'python yolo 모델을 활용한 객체 인식'
                ]
            },
            {
                title: '야간 자율학습 좌석 발급 시스템',
                description: '교사의 업무 부담을 줄이고, 학생들도 편하게 야간 자율학습을 신청할 수 있는 좌석 발급 시스템',
                fullDescription: '야간 자율학습을 효율적으로 관리하기 위한 좌석 발급 시스템입니다. 교사의 업무 부담을 줄이고, 학생들이 자율학습 시간을 효과적으로 활용할 수 있도록 돕습니다.',
                image: '/image/project/seatApplication.png',
                images: [
                    { src: '/image/project/seatApplication.png', alt: 'seatApplication', caption: 'seatApplication' }
                ],
                tags: ['google', 'App Script', 'Spread Sheets', 'forms'],
                features: [
                    '구글 스프레드시트와 폼을 활용한 좌석 신청 시스템',
                    '매일 교사들이 관리하던 좌석 신청을 자동화',
                    '학생들이 편리하게 좌석 신청 및 현황 확인 가능',
                    '실시간 좌석 현황 확인 기능'
                ]
            },
            {
                title: '교과융합캠프 신청 프로그램',
                description: '1,2학년 학생들의 교과융합캠프 신청을 선착순으로 관리하는 프로그램',
                fullDescription: '1,2학년 학생들이 참여할 수 있는 교과융합캠프 신청을 선착순으로 관리하는 프로그램입니다. 학생들이 쉽게 신청하고, 교사가 신청 현황을 효율적으로 관리할 수 있도록 돕습니다.',
                image: '/image/project/campApplication.png',
                images: [
                    { src: '/image/project/campApplication.png', alt: 'campApplication', caption: 'campApplication' }
                ],
                tags: ['google', 'App Script', 'Spread Sheets', 'forms'],
                features: [
                    '구글 스프레드시트와 폼을 활용한 캠프 신청 시스템',
                    '선착순 신청 관리 및 현황 확인 기능',
                    '학생들이 쉽게 신청하고, 교사가 신청 현황을 효율적으로 관리할 수 있도록 지원'
                ]
            }
        ] as Project[]);

        // 모달 열기
        const openModal = (project: Project) => {
            selectedProject.value = project;
            currentSlide.value = 0;
            showModal.value = true;
            startAutoSlide();
        };

        // 모달 닫기
        const closeModal = () => {
            showModal.value = false;
            currentSlide.value = 0;
            stopAutoSlide();
        };

        // 링크로 이동
        const navigateToLink = () => {
            if (selectedProject.value.src) {
                window.open(selectedProject.value.src, '_blank');
            }
            closeModal();
        };

        // 자동 슬라이드 시작
        const startAutoSlide = () => {
            if (autoSlideInterval) return;
            autoSlideInterval = setInterval(() => {
                if (!isHovered.value) {
                    nextSlide();
                }
            }, autoSlideDelay);
        };

        // 자동 슬라이드 정지
        const stopAutoSlide = () => {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        };

        // 슬라이더 함수들
        const nextSlide = () => {
            if (selectedProject.value.images) {
                currentSlide.value = (currentSlide.value + 1) % selectedProject.value.images.length;
            }
        };

        const prevSlide = () => {
            if (selectedProject.value.images) {
                currentSlide.value = currentSlide.value === 0 
                    ? selectedProject.value.images.length - 1 
                    : currentSlide.value - 1;
            }
        };

        const goToSlide = (index: number) => {
            currentSlide.value = index;
        };

        const openImageInNewTab = (imageSrc: string) => {
            window.open(imageSrc, '_blank');
        };
        
        return {
            selectedTags, allTags, filteredProjects, setFilter,
            projects,
            showModal,
            selectedProject,
            currentSlide,
            openModal,
            closeModal,
            navigateToLink,
            nextSlide,
            prevSlide,
            goToSlide,
            openImageInNewTab
        };
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/utils' as utils;

.section {
    @include utils.section-style;
    overflow-y: auto;

    @media (max-width: 768px) {
        padding: 20px 12px;
    }
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
        // width: 100%;
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

/* 개선된 모달 스타일 */
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
    padding: 20px;
}

.modal-content {
    background-color: white;
    border-radius: 12px;
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 24px 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 24px;

    .modal-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: vars.$text-color;
        margin: 0;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: vars.$gray-500;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;

        &:hover {
            background-color: vars.$gray-100;
        }
    }
}

.modal-body {
    padding: 0 24px;
}

/* 이미지 슬라이더 스타일 */
.image-slider {
    position: relative;
    margin-bottom: 24px;
}

.slider-container {
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.slider-wrapper {
    display: flex;
    transition: transform 0.3s ease;
}

.slide {
    min-width: 100%;
    text-align: center;
}

.slide-image {
    //width: 100%;
    height: 300px;
    object-fit: cover;
    cursor: pointer;
}
.slide-image:hover {
    opacity: 0.9;
}

.slide-caption {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px 16px;
    font-size: 0.9rem;
}

.slider-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.9);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.2s;

    &:hover {
        background-color: white;
    }

    &.prev {
        left: 10px;
    }

    &.next {
        right: 10px;
    }
}

.slider-indicators {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;

    .indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: none;
        background-color: vars.$gray-300;
        cursor: pointer;
        transition: background-color 0.2s;

        &.active {
            background-color: vars.$primary-color;
        }
    }
}

/* 프로젝트 상세 정보 스타일 */
.project-details {
    h4 {
        font-size: 1.1rem;
        margin-bottom: 8px;
        color: vars.$text-color;
        font-weight: 600;
    }

    p {
        color: vars.$gray-600;
        line-height: 1.6;
        margin-bottom: 20px;
    }

    ul {
        color: vars.$gray-600;
        line-height: 1.6;
        margin-bottom: 20px;
        padding-left: 20px;
    }

    li {
        margin-bottom: 4px;
    }
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tech-tag {
    background: linear-gradient(45deg, vars.$primary-color, vars.$secondary-color);
    color: white;
    font-size: 0.85rem;
    padding: 6px 12px;
    border-radius: 20px;
    font-weight: 500;
}

/* 모달 푸터 스타일 */
.modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-top: 1px solid #eee;
    margin-top: 24px;

    .btn-close {
        background-color: vars.$gray-200;
        color: vars.$gray-700;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;

        &:hover {
            background-color: vars.$gray-300;
        }
    }

    .btn-visit {
        background: linear-gradient(45deg, vars.$primary-color, vars.$secondary-color);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: transform 0.2s;

        &:hover {
            transform: translateY(-1px);
        }
    }

    .unavailable-notice {
        color: vars.$gray-500;
        font-size: 0.9rem;
        font-style: italic;
    }
}

/* 반응형 디자인 */
@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        max-height: 95vh;
    }

    .modal-header {
        padding: 16px 16px 0;
        
        .modal-title {
            font-size: 1.3rem;
        }
    }

    .modal-body {
        padding: 0 16px;
    }

    .modal-footer {
        padding: 16px;
        flex-direction: column;
        gap: 12px;
        
        .btn-close,
        .btn-visit {
            width: 100%;
        }
    }

    .slide-image {
        height: 200px;
    }

    .slider-btn {
        width: 35px;
        height: 35px;
        font-size: 16px;
    }
}
</style>