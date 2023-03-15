import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('RenderNode')
    .setName('Render')
    .addInputInterface('Image', null, null, { type: 'image' })
    .addOption('Preview', 'PreviewOption')
    .addOption('Download', 'DownloadOption')
    .onCalculate((n) => {
        const image = n.getInterface('Image').value;

        n.setOptionValue('Preview', image);
        n.setOptionValue('Download', image);
    })
    .build();
