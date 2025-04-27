<template>
    <aside class="sidebar no-print">
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
@use '@/assets/styles/variables.scss';
@use '@/assets/styles/utils.scss';

.sidebar {
    width: $sidebar-width;
    background-color: $white;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
    padding: 20px 10px;
    @include position(fixed, $header-height, null, 0, 0);
    overflow-y: auto;
    z-index: 90;

    @include respond-to('md') {
        width: $sidebar-width;
    }

    @include respond-to('sm') {
        width: 200px;
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
    color: $text-color;
    text-decoration: none;
    @include rounded(4px);
    transition: $transition-base;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    &.active {
        background: $gradient-primary;
        color: $white;
    }
}

@media (max-width: $breakpoint-md) {
    .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;

        &.active {
            transform: translateX(0);
        }
    }
}
</style>