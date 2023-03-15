<template>
    <button @click="onClick()" :disabled="value == null">Download image</button>
</template>

<script>
import Image from "image-js";

export default {
    name: "DownloadOption",
    props: {
        name: String,
        value: Image,
    },
    methods: {
        onClick() {
            this.value.save('result.png').then(() => {}, (e) => console.error(e));
        }
    }
}
</script>

<style scoped>

</style>