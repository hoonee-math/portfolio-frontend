<template>
    <section class="section" id="projects">
        <div class="section-header">
            <h2 class="section-title">프로젝트</h2>
            <p class="section-subtitle">제가 작업한 최근 프로젝트들입니다</p>
        </div>

        <div class="section-body">
            <div class="projects-grid">
                <div v-for="(project, index) in projects" :key="index" class="project-card">
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

        <page-number :current-page="3" :total-pages="6" />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageNumber from '@/components/ui/PageNumber.vue';

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
}

export default defineComponent({
    name: 'ProjectsSection',
    components: {
        PageNumber
    },
    data() {
        return {
            projects: [
                {
                    title: '온라인 쇼핑몰',
                    description: 'React와 Node.js를 활용한 풀스택 이커머스 플랫폼입니다. 사용자 인증, 장바구니, 결제 기능을 구현했습니다.',
                    image: '/hoonee-math-favicon.png',
                    tags: ['React', 'Node.js', 'MongoDB', 'Express']
                },
            ] as Project[]
        };
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/utils' as utils;

.section {
    @include utils.section-style;
    height: 800px;
    position: relative;
    overflow-y: auto;
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
        grid-template-columns: 1fr;
    }
}

.project-card {
    background-color: vars.$white;
    border-radius: 8px;
    overflow: hidden;
    @include utils.box-shadow(vars.$shadow-sm);
    transition: vars.$transition-base;

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
</style>