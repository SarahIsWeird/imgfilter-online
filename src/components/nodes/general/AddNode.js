import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('Add Images')
    .setName('Add images')
    .addInputInterface('image1', null, null, { type: 'image', displayName: 'Image' })
    .addInputInterface('image2', null, null, { type: 'image', displayName: 'Image' })
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((node) => {
        const image1 = node.getInterface('image1').value;
        const image2 = node.getInterface('image2').value;

        if (image1 == null && image2 == null) return;

        let newImage;

        if (image1 == null) {
            newImage = image2;
        } else if (image2 == null) {
            newImage = image1;
        } else {
            newImage = image1.clone();
            newImage.add(image2);
        }

        node.getInterface('Output').value = newImage;
    })
    .build();
