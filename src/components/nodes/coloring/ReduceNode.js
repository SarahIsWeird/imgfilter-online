import { NodeBuilder } from "@baklavajs/core";
import {createColorSetFromCounts, filterGreyColors, reduceImage} from "@/components/nodes/util/reduce";

export default new NodeBuilder('Reduce Colors')
    .setName('Reduce')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addOption('Red colors', 'IntegerOption', 2, null, { min: 0 })
    .addOption('Green colors', 'IntegerOption', 2, null, { min: 0 })
    .addOption('Blue colors', 'IntegerOption', 2, null, { min: 0 })
    .addOption('Filter grey colors', 'CheckboxOption', true)
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

        let colorSet = createColorSetFromCounts(image.maxValue, redColors, greenColors, blueColors);

        if (node.getOptionValue('Filter grey colors')) {
            colorSet = filterGreyColors(image.maxValue, colorSet);
        }

        console.log(colorSet);

        node.getInterface('Output').value = reduceImage(image, colorSet);
    })
    .build();
