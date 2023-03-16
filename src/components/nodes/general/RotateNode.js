import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('Rotate')
    .setName('Rotate')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addOption('Angle', 'NumberOption', 90, null)
    .addOption('Interpolation', 'SelectOption', 'nearestNeighbor', null, {
        items: [
            { text: 'Nearest Neighbor', value: 'nearestNeighbor' },
            { text: 'Bilinear', value: 'bilinear' },
        ],
    })
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((node) => {
        const image = node.getInterface('Input').value;

        if (image == null) {
            node.getInterface('Output').value = null;
            return;
        }

        const angle = node.getOptionValue('Angle');
        const interpolationAlgorithm = node.getOptionValue('Interpolation');

        node.getInterface('Output').value = image.rotate(angle, {
            interpolation: interpolationAlgorithm,
        });
    })
    .build();
