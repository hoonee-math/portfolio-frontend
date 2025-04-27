<template>
    <div class="page-number">{{ currentPage }} / {{ totalPages }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PageNumber',
    props: {
        currentPage: {
            type: [Number, String],
            required: true
        },
        totalPages: {
            type: [Number, String],
            required: true
        }
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss';
@use '@/assets/styles/utils.scss';

.page-number {
    @include page-number-style;
}
</style>