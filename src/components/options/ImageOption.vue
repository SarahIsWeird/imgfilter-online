<template>
<div>
    <label class="fileLabel" :for="id">Upload image</label>
    <input :id="id" class="file" type="file" accept="image/png, image/jpeg" ref="file" @change="onFileUpload()">
    <br><br>
    <span class="fileNameLabel">{{ file !== null ? file.name : 'No file selected' }}</span>
    <ImagePreview :image="image" />
</div>
</template>

<script>
import Image from "image-js";
import uniqueId from 'lodash.uniqueid';
import ImagePreview from "@/components/ImagePreview.vue";

export default {
    name: "ImageOption",
    components: {ImagePreview},
    props: {
        name: String,
        value: Object,
    },
    data() {
        return {
            id: '',
            image: null,
            file: null,
        };
    },
    methods: {
        onFileUpload() {
            this.loadImage().then(
                () => this.$emit('input', this.image),
                (e) => console.error(e)
            );
        },
        async loadImage() {
            this.file = this.$refs.file.files.item(0);
            const buffer = await this.file.arrayBuffer();

            this.image = await Image.load(buffer);
        }
    },
    mounted() {
        this.id = uniqueId('file_');
    }
}
</script>

<style scoped>
.file {
    opacity: 0;
    width: 1px;
    height: 1px;
}

.fileLabel {
    padding: 3px;

    border: 1px solid white;
    border-radius: 5px;
}

.fileLabel:hover {
    background-color: #505050;
}

.fileNameLabel {
    width: 100%;

    display: inline-block;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>