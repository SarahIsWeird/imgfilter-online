import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('Split Channels')
    .setName('Split Color Channels')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addOutputInterface('Red', { type: 'channel' })
    .addOutputInterface('Green', { type: 'channel' })
    .addOutputInterface('Blue', { type: 'channel' })
    .onCalculate((node) => {
        const image = node.getInterface('Input').value;

        if (image == null) return;

        node.getInterface('Red').value = image.getChannel(0);
        node.getInterface('Green').value = image.getChannel(1);
        node.getInterface('Blue').value = image.getChannel(2);
    })
    .build();
