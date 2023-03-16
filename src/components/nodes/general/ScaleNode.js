import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('Scale')
    .setName('Scale')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addOption('Percent', 'NumberOption', 50, null, { min: 0.1 })
    .addOption('Interpolation', 'SelectOption', 'nearestNeighbor', null, {
        items: [
            { text: 'Nearest Neighbor', value: 'nearestNeighbor' },
            // { text: 'Bilinear', value: 'bilinear' }, // Not supported yet by image-js ;(
        ],
    })
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((node) => {
        const image = node.getInterface('Input').value;

        if (image == null) {
            node.getInterface('Output').value = null;
            return;
        }

        const scaleFactor = node.getOptionValue('Percent') / 100.0;
        const interpolationAlgorithm = node.getOptionValue('Interpolation');

        node.getInterface('Output').value = image.resize({
            factor: scaleFactor,
            interpolation: interpolationAlgorithm,
        });
    })
    .build();
