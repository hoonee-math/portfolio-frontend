<template lang="html">
    <div>
        hello world
        <BaseButton text="기본 버튼" type="type1" width="120px" height="40px" @click="handleClick" />
    </div>
</template>
<script lang="ts">
import BaseButton from '@/components/common/BaseButton.vue';

export default {
    components: {
        BaseButton
    },
    methods: {
        handleClick() {
            console.log('Button clicked!');
            fetch('http://localhost:8080/api/test/name', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',}
                },
            )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("요청 성공:", data);
            })
            .catch(error => {
                console.error("요청 실패:", error);
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    
</style>