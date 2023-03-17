import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('Size to Numbers')
    .setName('Size to Numbers')
    .addInputInterface('Size', null, null, { type: 'size' })
    .addOutputInterface('Width', { type: 'number' })
    .addOutputInterface('Height', { type: 'number' })
    .onCalculate((node) => {
        const size = node.getInterface('Size').value;

        if (size == null) {
            node.getInterface('Width').value = null;
            node.getInterface('Height').value = null;
            return;
        }

        node.getInterface('Width').value = size.width;
        node.getInterface('Height').value = size.height;
    })
    .build();
