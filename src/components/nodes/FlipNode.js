import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('FlipNode')
    .setName('Flip')
    .addInputInterface('Input', null, null, { type: 'image'})
    .addOption('Flip Direction', 'SelectOption', 'X', null, { items: ['X', 'Y', 'Both']})
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((node) => {
        const image = node.getInterface('Input').value;

        if (image == null) return;

        const flipDirection = node.getOptionValue('Flip Direction');
        const flipX = flipDirection === 'X' || flipDirection === 'Both';
        const flipY = flipDirection === 'Y' || flipDirection === 'Both';

        const newImage = image.clone();

        if (flipX) newImage.flipX();
        if (flipY) newImage.flipY();

        node.getInterface('Output').value = newImage;
    })
    .build();
