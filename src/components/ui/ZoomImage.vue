<template>
    <div class="zoom-image-container">
        <img :src="src" :alt="alt" class="zoom-image" :class="additionalClass" @click="handleImageClick">
        <div class="overlay" @click="handleOverlayClick" ref="overlay"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ZoomImage',
    props: {
        src: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: 'Image'
        },
        additionalClass: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            activeImage: null as HTMLImageElement | null
        };
    },
    methods: {
        handleImageClick(event: MouseEvent) {
            const target = event.currentTarget as HTMLImageElement;
            target.classList.toggle('zoomed');

            if (target.classList.contains('zoomed')) {
                this.activeImage = target;
                const overlay = this.$refs.overlay as HTMLElement;
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
            } else {
                this.closeZoom();
            }
        },
        handleOverlayClick() {
            this.closeZoom();
        },
        closeZoom() {
            if (this.activeImage) {
                this.activeImage.classList.remove('zoomed');
                this.activeImage = null;
            }
            const overlay = this.$refs.overlay as HTMLElement;
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // 배경 스크롤 복원
        }
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as vars;

.zoom-image-container {
    position: relative;
    display: inline-block;
    width: 100%;
}

.zoom-image {
    border-radius: 10px;
    box-shadow: vars.$shadow;
    margin-bottom: 2rem;
    max-width: 100%;
    height: auto;
    cursor: zoom-in;
    transition: transform 0.3s ease, border-radius 0.3s ease;
}

.zoom-image.zoomed {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90vw;
    max-height: 90vh;
    width: auto;
    height: auto;
    z-index: 1001;
    cursor: zoom-out;
    object-fit: contain;
    border-radius: 0;
    margin-bottom: 0;
    box-shadow: none;
}

.overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    cursor: zoom-out;
}

.overlay.active {
    display: block;
}
</style>