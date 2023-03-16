import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('Invert Colors')
    .setName('Invert Colors')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((node) => {
        const image = node.getInterface('Input').value;

        if (image == null) {
            node.getInterface('Output').value = null;
            return;
        }

        node.getInterface('Output').value = image.invert();
    })
    .build();
