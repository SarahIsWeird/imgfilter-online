import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('Resize')
    .setName('Resize')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addInputInterface('Size', 'SizeOption', () => ({ width: 1280, height: 720 }), { type: 'size' })
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((node) => {
        const image = node.getInterface('Input').value;

        if (image == null) {
            node.getInterface('Output').value = null;
            return;
        }

        const size = node.getInterface('Size').value;

        node.getInterface('Output').value = image.resize({
            width: size.width <= 0 ? null : size.width,
            height: size.height <= 0 ? null : size.height,
            interpolation: 'nearestNeighbor',
        });
    })
    .build();
