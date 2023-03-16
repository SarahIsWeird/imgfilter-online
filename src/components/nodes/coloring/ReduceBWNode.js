import { NodeBuilder } from "@baklavajs/core";
import {createBWSet, reduceImage} from "@/components/nodes/util/reduce";

export default new NodeBuilder('Reduce (Greyscale)')
    .setName('Reduce (Greyscale)')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addOption('Greyscale values', 'IntegerOption', 4, null, { min: 0 })
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((node) => {
        const image = node.getInterface('Input').value;

        if (image == null) {
            node.getInterface('Output').value = null;
            return;
        }

        const greyCount = node.getOptionValue('Greyscale values');

        const colorSet = createBWSet(image.maxValue, greyCount);

        node.getInterface('Output').value = reduceImage(image, colorSet);
    })
    .build();
