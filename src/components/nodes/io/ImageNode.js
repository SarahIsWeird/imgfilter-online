import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('Input Image')
    .setName('Input')
    .addOption('Image', 'ImageOption')
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((n) => {
        const image = n.getOptionValue('Image')

        // No idea why sometimes it's an event. This should fix it.
        // Seems to be caused by the file input, but I have no idea why it bubbles up to here. :(
        if (image == null || image.target !== undefined) return;

        n.getInterface('Output').value = image.rgba8();
    })
    .build();
