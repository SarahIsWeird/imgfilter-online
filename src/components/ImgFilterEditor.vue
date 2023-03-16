<template>
    <baklava-editor :plugin="viewPlugin"></baklava-editor>
</template>

<script>
import { Editor } from '@baklavajs/core';
import { OptionPlugin } from '@baklavajs/plugin-options-vue3';
import { ViewPlugin } from '@baklavajs/plugin-renderer-vue3';
import { Engine } from '@baklavajs/plugin-engine';
import { InterfaceTypePlugin } from '@baklavajs/plugin-interface-types';

import ImageOption from "@/components/options/ImageOption.vue";
import ImageNode from "@/components/nodes/ImageNode";
import RenderNode from "@/components/nodes/RenderNode";
import PreviewOption from "@/components/options/PreviewOption.vue";
import DownloadOption from "@/components/options/DownloadOption.vue";
import GreyscaleNode from "@/components/nodes/GreyscaleNode";
import ChannelSplitNode from "@/components/nodes/ChannelSplitNode";
import ChannelMergeNode from "@/components/nodes/ChannelMergeNode";
import BlurNode from "@/components/nodes/BlurNode";
import FlipNode from "@/components/nodes/FlipNode";
import SobelFilterNode from "@/components/nodes/SobelFilterNode";
import AddNode from "@/components/nodes/AddNode";

export default {
    name: "Editor",
    data() {
        return {
            editor: new Editor(),
            optionPlugin: new OptionPlugin(),
            viewPlugin: new ViewPlugin(),
            engine: new Engine(true),
            intfTypePlugin: new InterfaceTypePlugin(),
        };
    },
    created() {
        this.intfTypePlugin.addType('image', '#ef1e3c');
        this.intfTypePlugin.addType('channel', '#02f6a2');

        this.editor.use(this.optionPlugin);
        this.editor.use(this.viewPlugin);
        this.editor.use(this.engine);
        this.editor.use(this.intfTypePlugin);

        this.viewPlugin.registerOption('ImageOption', ImageOption);
        this.viewPlugin.registerOption('PreviewOption', PreviewOption);
        this.viewPlugin.registerOption('DownloadOption', DownloadOption);

        this.editor.registerNodeType('ImageNode', ImageNode);
        this.editor.registerNodeType('RenderNode', RenderNode);
        this.editor.registerNodeType('GreyscaleNode', GreyscaleNode);
        this.editor.registerNodeType('ChannelSplitNode', ChannelSplitNode);
        this.editor.registerNodeType('ChannelMergeNode', ChannelMergeNode);
        this.editor.registerNodeType('BlurNode', BlurNode);
        this.editor.registerNodeType('FlipNode', FlipNode);
        this.editor.registerNodeType('SobelFilterNode', SobelFilterNode);
        this.editor.registerNodeType('AddNode', AddNode);
    },
}
</script>

<style scoped>

</style>