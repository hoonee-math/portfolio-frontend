<template>
    <aside class="sidebar no-print" :class="{ 'sidebar-hidden': !isVisible }">
        <nav>
            <ul class="sidebar-nav">
                <li v-for="item in navItems" :key="item.id" class="nav-item">
                    <a :href="`#${item.id}`" :class="['nav-link', { active: activeSection === item.id }]"
                        @click.prevent="handleNavClick(item.id)">
                        {{ item.label }}
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

interface NavItem {
    id: string;
    label: string;
}

export default defineComponent({
    name: 'TheSidebar',
    props: {
        navItems: {
            type: Array as PropType<NavItem[]>,
            required: true
        },
        activeSection: {
            type: String,
            default: 'home'
        },
        isVisible: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        handleNavClick(sectionId: string): void {
            // 섹션 ID로 현재 활성화된 섹션 변경 이벤트 발생
            this.$emit('update:activeSection', sectionId);

            // 해당 섹션으로 스크롤 이벤트 발생
            this.$emit('navigate', sectionId);
        }
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/utils' as utils;

.sidebar {
    width: vars.$sidebar-width;
    background-color: vars.$white;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
    padding: 20px 10px;
    @include utils.position(fixed, vars.$header-height, null, 0, 0);
    overflow-y: auto;
    z-index: 90;
    transition: transform 0.3s ease;
    /* 부드러운 전환 효과 */

    @include utils.respond-to('md') {
        width: vars.$sidebar-width;
    }
}

.sidebar-nav {
    list-style: none;
}

.nav-item {
    margin-bottom: 8px;
}

.nav-link {
    display: block;
    padding: 10px 15px;
    color: vars.$text-color;
    text-decoration: none;
    @include utils.rounded(4px);
    transition: vars.$transition-base;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    &.active {
        background: vars.$gradient-primary;
        color: vars.$white;
    }
}

/* 모바일 반응형 스타일 */
@media (max-width: 768px) {
    .sidebar {
        transform: translateX(0);
        width: 250px;
        /* 모바일에서의 사이드바 너비 */

        &.sidebar-hidden {
            transform: translateX(-100%);
        }
    }
}
</style>