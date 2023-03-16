import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('Display Image')
    .setName('Display')
    .addInputInterface('Image', null, null, { type: 'image' })
    .addOption('Preview', 'PreviewOption')
    .addOption('Download', 'DownloadOption')
    .onCalculate((n) => {
        const image = n.getInterface('Image').value;

        const newImage = image != null ? image.clone() : null;

        n.setOptionValue('Preview', newImage);
        n.setOptionValue('Download', newImage);
    })
    .build();
