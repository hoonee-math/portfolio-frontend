<template>
    <div :id="`${sectionId}-wrapper`" class="section-wrapper" :class="{ active: isActive }" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';

export default defineComponent({
    name: 'SectionWrapper',
    props: {
        sectionId: {
            type: String,
            required: true
        },
        activeSection: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const wrapper = ref<HTMLElement | null>(null);

        // 현재 섹션이 활성화되었는지 여부
        const isActive = computed(() => {
            return props.activeSection === props.sectionId;
        });

        // 요소 참조 등록 후 실행할 작업
        onMounted(() => {
            // 필요한 초기화 작업이 있을 경우 여기에 추가
        });

        return {
            wrapper,
            isActive
        };
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss';
@use '@/assets/styles/utils.scss';

.section-wrapper {
    @include section-wrapper;
    opacity: 1;
    transition: opacity 0.5s ease;

    // 필요에 따라 섹션 컨테이너가 활성화되었을 때의 스타일을 정의할 수 있음
    /* &.active {
        // 예: 추가적인 활성화 스타일
    } */
}
</style>