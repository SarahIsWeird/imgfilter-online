<template>
    <div :id="id" class="preview">
        <img v-if="previewUrl != null" class="preview" alt="Image preview" :src="previewUrl">
    </div>
</template>

<script>
import { uniqueId } from 'lodash';
import Image from "image-js";

export default {
    name: "ImagePreview",
    props: {
        image: Image,
    },
    data() {
        return {
            id: '',
            previewUrl: null,
        };
    },
    watch: {
        image() {
            this.updatePreview();
        }
    },
    methods: {
        async updatePreview() {
            if (this.image == null) {
                this.previewUrl = null;
                return;
            }

            const previewWidth = document.getElementById(this.id).clientWidth;
            const previewImage = await this.image.resize({ width: previewWidth });

            this.previewUrl = previewImage.toDataURL();
        }
    },
    mounted() {
        this.id = uniqueId('imagePreview_');
    }
}
</script>

<style scoped>
.preview {
    width: 100%;
    max-width: 100%;
}
</style>