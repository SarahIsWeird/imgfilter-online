import { NodeBuilder } from "@baklavajs/core";
import Image from "image-js";

export default new NodeBuilder('Threshold')
    .setName('Threshold')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addInputInterface('Red Threshold', 'IntegerOption', 128)
    .addInputInterface('Green Threshold', 'IntegerOption', 128)
    .addInputInterface('Blue Threshold', 'IntegerOption', 128)
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((node) => {
        const image = node.getInterface('Input').value;

        if (image == null) {
            node.getInterface('Output').value = null;
            return;
        }

        const redThreshold = node.getInterface('Red Threshold').value;
        const greenThreshold = node.getInterface('Green Threshold').value;
        const blueThreshold = node.getInterface('Blue Threshold').value;
        const thresholds = [redThreshold, greenThreshold, blueThreshold];

        const newImage = Image.createFrom(image, {});

        for (let c = 0; c < image.channels - image.alpha; c++) {
            const threshold = thresholds[c];

            for (let i = c; i < image.data.length; i += image.channels) {
                newImage.data[i] = (image.data[i] >= threshold) ? image.maxValue : 0;
            }
        }

        if (image.alpha) {
            newImage.setChannel(3, image.getChannel(3));
        }

        node.getInterface('Output').value = newImage;
    })
    .build();
