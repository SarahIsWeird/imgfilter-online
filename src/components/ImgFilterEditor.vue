<template>
    <baklava-editor :plugin="viewPlugin"></baklava-editor>
    <div id="menu" class="menu">
        <button class="menu-button" @click="copy(getEditorData())">Save</button>
        <button class="menu-button" @click="setEditorData(this.text)">Load</button>
    </div>
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
import ChannelSplitNode from "@/components/nodes/conversion/ChannelSplitNode";
import ChannelMergeNode from "@/components/nodes/conversion/ChannelMergeNode";
import BlurNode from "@/components/nodes/effects/BlurNode";
import FlipNode from "@/components/nodes/general/FlipNode";
import SobelFilterNode from "@/components/nodes/effects/SobelFilterNode";
import AddImagesNode from "@/components/nodes/general/AddNode";
import ThresholdNode from "@/components/nodes/coloring/ThresholdNode";
import ReduceNode from "@/components/nodes/coloring/ReduceNode";
import ReduceBWNode from "@/components/nodes/coloring/ReduceBWNode";
import InvertNode from "@/components/nodes/effects/InvertNode";
import ScaleNode from "@/components/nodes/general/ScaleNode";
import SizeOption from "@/components/options/SizeOption.vue";
import ResizeNode from "@/components/nodes/general/ResizeNode";
import RotateNode from "@/components/nodes/general/RotateNode";
import CropNode from "@/components/nodes/general/CropNode";
import SizeToNumbersNode from "@/components/nodes/conversion/SizeToNumbersNode";
import NumbersToSizeNode from "@/components/nodes/conversion/NumbersToSizeNode";
import {
    AddNode,
    SubtractNode,
    MultiplyNode,
    DivideNode,
    ModuloNode,
    AbsoluteValueNode,
    RoundNode,
    FloorNode,
    CeilingNode,
    SineNode,
    CosineNode,
    TangentNode,
    ArcsineNode,
    ArccosineNode,
    ArctangentNode,
} from "@/components/nodes/math/ElementaryNodes";
import ConstantNode from "@/components/nodes/math/ConstantNode";
import { DegreesToRadiansNode, RadiansToDegreesNode } from "@/components/nodes/conversion/AngleConversion";
import { useClipboard } from "@vueuse/core";
import { ref } from "vue";

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
    methods: {
        getEditorData() {
            console.log(this.editor.save());
            console.log(this.editor.connections);
            const data = {
                nodes: [],
                connections: [],
            };

            for (const node of this.editor.nodes) {
                const nodeData = {
                    id: node.id,
                    name: node.name,
                    type: node.type,
                    position: node.position,
                    options: [],
                };

                for (const [name, value] of node.options.entries()) {
                    nodeData.options.push([name, value.value]);
                }

                data.nodes.push(nodeData);
            }

            for (const connection of this.editor.connections) {
                const connectionData = {
                    from: connection.from.id,
                    to: connection.to.id,
                };

                data.connections.push(connectionData);
            }

            const foo = JSON.stringify(data) + '\n';
            console.log(foo);
            return foo;
        },
        setEditorData(data) {
            data = JSON.parse(data);
            console.log(data);

            for (const connection of this.editor.connections) {
                this.editor.removeConnection(connection);
            }

            for (const node of this.editor.nodes) {
                this.editor.removeNode(node);
            }

            for (const node of data.nodes) {
                const nodeConstructor = this.editor.nodeTypes.get(node.type);
                const nodeInstance = nodeConstructor.call(null);

                nodeInstance.position = node.position;
                nodeInstance.name = node.name;

                for (const [name, value] of node.options) {
                    nodeInstance.setOptionValue(name, value);
                }
            }
        },
    },
    setup() {
        const source = ref('menu');
        const { text, copy } = useClipboard({ source, legacy: true });

        return { source, text, copy };
    },
    created() {
        this.intfTypePlugin.addType('image', '#ef1e3c');
        this.intfTypePlugin.addType('channel', '#02f6a2');
        this.intfTypePlugin.addType('size', '#e3ba36');

        this.intfTypePlugin.addConversion('image', 'size', (image) => ({
            width: image != null ? image.width : 0,
            height: image != null ? image.height : 0,
        }));

        this.editor.use(this.optionPlugin);
        this.editor.use(this.viewPlugin);
        this.editor.use(this.engine);
        this.editor.use(this.intfTypePlugin);

        this.viewPlugin.registerOption('ImageOption', ImageOption);
        this.viewPlugin.registerOption('PreviewOption', PreviewOption);
        this.viewPlugin.registerOption('DownloadOption', DownloadOption);
        this.viewPlugin.registerOption('SizeOption', SizeOption);

        this.editor.registerNodeType('Input Image', ImageNode, 'IO');
        this.editor.registerNodeType('Display Image', RenderNode, 'IO');

        this.editor.registerNodeType('Add Images', AddImagesNode, 'General');
        this.editor.registerNodeType('Flip', FlipNode, 'General');
        this.editor.registerNodeType('Scale', ScaleNode, 'General');
        this.editor.registerNodeType('Resize', ResizeNode, 'General');
        this.editor.registerNodeType('Rotate', RotateNode, 'General');
        this.editor.registerNodeType('Crop', CropNode, 'General');

        this.editor.registerNodeType('Split Channels', ChannelSplitNode, 'Conversion');
        this.editor.registerNodeType('Merge Channels', ChannelMergeNode, 'Conversion');
        this.editor.registerNodeType('Size to Numbers', SizeToNumbersNode, 'Conversion');
        this.editor.registerNodeType('Numbers to Size', NumbersToSizeNode, 'Conversion');
        this.editor.registerNodeType('Degrees to Radians', DegreesToRadiansNode, 'Conversion');
        this.editor.registerNodeType('Radians to Degrees', RadiansToDegreesNode, 'Conversion');

        this.editor.registerNodeType('Constant', ConstantNode, 'Math');
        this.editor.registerNodeType('Add', AddNode, 'Math');
        this.editor.registerNodeType('Subtract', SubtractNode, 'Math');
        this.editor.registerNodeType('Multiply', MultiplyNode, 'Math');
        this.editor.registerNodeType('Divide', DivideNode, 'Math');
        this.editor.registerNodeType('Modulo', ModuloNode, 'Math');
        this.editor.registerNodeType('Absolute Value', AbsoluteValueNode, 'Math');
        this.editor.registerNodeType('Round', RoundNode, 'Math');
        this.editor.registerNodeType('Floor', FloorNode, 'Math');
        this.editor.registerNodeType('Ceiling', CeilingNode, 'Math');

        this.editor.registerNodeType('Sine', SineNode, 'Trigonometry');
        this.editor.registerNodeType('Cosine', CosineNode, 'Trigonometry');
        this.editor.registerNodeType('Tangent', TangentNode, 'Trigonometry');
        this.editor.registerNodeType('Arcsine', ArcsineNode, 'Trigonometry');
        this.editor.registerNodeType('Arccosine', ArccosineNode, 'Trigonometry');
        this.editor.registerNodeType('Arctangent', ArctangentNode, 'Trigonometry');

        this.editor.registerNodeType('Blur', BlurNode, 'Effects');
        this.editor.registerNodeType('Invert Colors', InvertNode, 'Effects');
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
.menu {
    position: fixed;
    top: 10px;
    left: 10px;

    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.menu-button {
    background-color: #3f3f3f;
    color: white;

    padding: 10px 20px;

    border: 1px solid white;
    border-radius: 5px;

    text-align: center;
}

.menu-button:hover {
    background-color: #505050;
}
</style>