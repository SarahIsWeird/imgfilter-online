import { NodeBuilder } from "@baklavajs/core";
import {createColorSetFromCounts, reduceImage} from "@/components/nodes/util/reduce";

export default new NodeBuilder('Reduce Colors')
    .setName('Reduce')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addOption('Red colors', 'IntegerOption', 2, null, { min: 0 })
    .addOption('Green colors', 'IntegerOption', 2, null, { min: 0 })
    .addOption('Blue colors', 'IntegerOption', 2, null, { min: 0 })
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((node) => {
        const image = node.getInterface('Input').value;

        if (image == null) {
            node.getInterface('Output').value = null;
            return;
        }

        const redColors = node.getOptionValue('Red colors');
        const greenColors = node.getOptionValue('Green colors');
        const blueColors = node.getOptionValue('Blue colors');

        const colorSet = createColorSetFromCounts(image.maxValue, redColors, greenColors, blueColors);

        node.getInterface('Output').value = reduceImage(image, colorSet);
    })
    .build();
