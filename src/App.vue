<template>
    <div id="app">
        <router-view />
        <UpdateNotificationModal />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UpdateNotificationModal from '@/components/ui/UpdateNotificationModal.vue';

export default defineComponent({
    name: 'App',
    components: {
        UpdateNotificationModal  // 이 줄 추가
    }
});
</script>

<style lang="scss">
@use '@/assets/styles/global';
</style>