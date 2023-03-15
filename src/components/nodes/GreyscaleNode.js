import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('GreyscaleNode')
    .setName('Greyscale')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate(async (n) => {
        const image = n.getInterface('Input').value;

        if (image == null) return;

        n.getInterface('Output').value = await image.grey().rgba8();
    })
    .build();
