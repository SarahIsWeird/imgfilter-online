<template>
<div>
    <label>
        Width
        <input type="number" v-model="width" @blur="emitNewSize">
    </label>
    <label>
        Height
        <input type="number" v-model="height" @blur="emitNewSize">
    </label>
</div>
</template>

<script>
export default {
    name: "SizeOption",
    props: {
        name: String,
        value: Object,
    },
    data() {
        return {
            width: 1280,
            height: 720,
        };
    },
    methods: {
        emitNewSize() {
            this.$emit('input', { width: this.width, height: this.height });
        },
    },
}
</script>

<style scoped>

</style>