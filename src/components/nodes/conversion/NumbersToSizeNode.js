import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('Numbers to Size')
    .setName('Numbers to Size')
    .addInputInterface('Width', null, null, { type: 'number' })
    .addInputInterface('Height', null, null, { type: 'number' })
    .addOutputInterface('Size', { type: 'size' })
    .onCalculate((node) => {
        const width = node.getInterface('Width').value;
        const height = node.getInterface('Height').value;

        if (width == null || height == null) {
            node.getInterface('Size').value = null;
            return;
        }

        node.getInterface('Size').value = {
            width: Math.floor(width),
            height: Math.floor(height),
        };
    })
    .build();
