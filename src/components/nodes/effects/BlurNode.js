import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('Blur')
    .setName('Blur')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addOption('Blur Radius', 'IntegerOption', 1, null, { min: 0 })
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((node) => {
        const image = node.getInterface('Input').value;

        if (image == null) return;

        const blurRadius = node.getOptionValue('Blur Radius');
        node.getInterface('Output').value = image.blurFilter({ radius: blurRadius });
    })
    .build();
