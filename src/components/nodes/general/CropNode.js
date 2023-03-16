import { NodeBuilder } from "@baklavajs/core";

export default new NodeBuilder('Crop')
    .setName('Crop')
    .addInputInterface('Input', null, null, { type: 'image' })
    .addInputInterface('Size', 'SizeOption', () => ({ width: 100, height: 100 }), { type: 'size' })
    .addOption('Anchor', 'SelectOption', 'cc', null, {
        items: [
            { text: 'Top Left', value: 'tl' },
            { text: 'Top Center', value: 'tc' },
            { text: 'Top Right', value: 'tr' },
            { text: 'Center Left', value: 'cl' },
            { text: 'Center', value: 'cc' },
            { text: 'Center Right', value: 'cr' },
            { text: 'Bottom Left', value: 'bl' },
            { text: 'Bottom Center', value: 'bc' },
            { text: 'Bottom Right', value: 'br' },
        ],
    })
    .addOutputInterface('Output', { type: 'image' })
    .onCalculate((node) => {
        const image = node.getInterface('Input').value;

        if (image == null) {
            node.getInterface('Output').value = null;
            return;
        }

        const size = node.getInterface('Size').value;
        const anchor = node.getOptionValue('Anchor');

        let y;

        switch (anchor[0]) {
            case 't':
                y = 0;
                break;
            case 'c':
                y = Math.floor((image.height - size.height) / 2);
                break;
            case 'b':
                y = image.height - size.height;
                break;
        }

        let x;

        switch (anchor[1]) {
            case 'l':
                x = 0;
                break;
            case 'c':
                x = Math.floor((image.width - size.width) / 2);
                break;
            case 'r':
                x = image.width - size.width;
                break;
        }

        node.getInterface('Output').value = image.crop({
            x: x,
            y: y,
            width: size.width,
            height: size.height,
        });
    })
    .build();
