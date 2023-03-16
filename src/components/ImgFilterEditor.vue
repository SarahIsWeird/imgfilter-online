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
import ImageNode from "@/components/nodes/io/ImageNode";
import RenderNode from "@/components/nodes/io/RenderNode";
import PreviewOption from "@/components/options/PreviewOption.vue";
import DownloadOption from "@/components/options/DownloadOption.vue";
import GreyscaleNode from "@/components/nodes/coloring/GreyscaleNode";
import ChannelSplitNode from "@/components/nodes/general/ChannelSplitNode";
import ChannelMergeNode from "@/components/nodes/general/ChannelMergeNode";
import BlurNode from "@/components/nodes/effects/BlurNode";
import FlipNode from "@/components/nodes/general/FlipNode";
import SobelFilterNode from "@/components/nodes/effects/SobelFilterNode";
import AddNode from "@/components/nodes/general/AddNode";
import ThresholdNode from "@/components/nodes/coloring/ThresholdNode";
import ReduceNode from "@/components/nodes/coloring/ReduceNode";
import ReduceBWNode from "@/components/nodes/coloring/ReduceBWNode";

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

        this.editor.registerNodeType('Input Image', ImageNode, 'IO');
        this.editor.registerNodeType('Display Image', RenderNode, 'IO');

        this.editor.registerNodeType('Split Channels', ChannelSplitNode, 'General');
        this.editor.registerNodeType('Merge Channels', ChannelMergeNode, 'General');
        this.editor.registerNodeType('Add Images', AddNode, 'General');
        this.editor.registerNodeType('Flip', FlipNode, 'General');

        this.editor.registerNodeType('Blur', BlurNode, 'Effects');
        this.editor.registerNodeType('Sobel Filter', SobelFilterNode, 'Effects');

        this.editor.registerNodeType('Greyscale', GreyscaleNode, 'Coloring');
        this.editor.registerNodeType('Threshold', ThresholdNode, 'Coloring');
        this.editor.registerNodeType('Reduce Colors', ReduceNode, 'Coloring');
        this.editor.registerNodeType('Reduce (Greyscale)', ReduceBWNode, 'Coloring');

        const inputNode = new ImageNode();
        this.editor.addNode(inputNode);
        inputNode.position = { x: 100, y: 200 };

        const outputNode = new RenderNode();
        this.editor.addNode(outputNode);
        outputNode.position = { x: 1000, y: 200 };
    },
}
</script>

<style scoped>

</style>