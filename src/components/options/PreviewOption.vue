<template>
    <ImagePreview :image="value" />
</template>

<script>
import ImagePreview from "@/components/ImagePreview.vue";
import Image from "image-js";

export default {
    name: "PreviewOption",
    components: {ImagePreview},
    props: {
        name: String,
        value: Image,
    },
}
</script>

<style scoped>

</style>