<template>
    <div>
        <button @click="onClick()" :disabled="value == null">Download image</button><br>
        <button @click="onTabClick()" :disabled="value == null">Open in new tab</button>
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

</style>