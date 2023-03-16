import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('SobelFilterNode')
    .setName('Sobel Filter')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addOption('Gradient Direction', 'SelectOption', 'X', null, { items: ['X', 'Y', 'XY'] })
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((node) => {
        const image = node.getInterface('Input').value;

        if (image == null) {
            node.getInterface('Output').value = null;
            return;
        }

        const gradientDirection = node.getOptionValue('Gradient Direction').toLowerCase();

        node.getInterface('Output').value = image.sobelFilter({
            direction: gradientDirection,
        });
    })
    .build();
