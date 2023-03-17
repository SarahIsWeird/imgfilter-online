<template>
    <div class="container">
        <button class="btn first-btn" @click="onClick()" :disabled="value == null">Download image</button>
        <button class="btn" @click="onTabClick()" :disabled="value == null">Open in new tab</button>
    </div>
</template>

<script>
import Image from "image-js";

export default {
    name: "DownloadOption",
    props: {
        name: String,
        value: Image,
    },
    data() {
        return {
            dataUrl: null,
        };
    },
    watch: {
        value(newValue) {
            if (newValue == null) {
                this.dataUrl = null;
                return;
            }

            this.dataUrl = this.value.toDataURL('png');
        }
    },
    methods: {
        onClick() {
            const a = document.createElement('a');
            a.href = this.dataUrl;
            a.download = 'result.png';
            a.click();
        },
        onTabClick() {
            const a = document.createElement('a');
            a.href = this.dataUrl;
            a.target = '_blank';
            a.click();
        }
    }
}
</script>

<style scoped>
.btn {
    width: 100%;
    background-color: #3f3f3f;
    color: white;

    padding: 3px;

    border: 1px solid white;
    border-radius: 5px;

    text-align: center;
}

.btn:hover {
    background-color: #505050;
}

.first-btn {
    margin-bottom: 5px;
}
</style>