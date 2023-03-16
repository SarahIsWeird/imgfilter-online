import { Node } from "@baklavajs/core";
import Image from "image-js";

export default class ChannelMergeNode extends Node {
    type = 'Merge Channels';
    name = 'Merge Color Channels';

    constructor() {
        super();

        for (const channel of ['Red', 'Green', 'Blue']) {
            const intf = this.addInputInterface(channel, null, null, { type: 'channel' });

            intf.events.setConnectionCount.addListener(this, (count) => this.maybeRecalculate(channel, count));
        }

        this.addOutputInterface('Output', { type: 'image' });
    }

    calculate(data) {
        this.recalculateOutput();
    }

    maybeRecalculate(channel, connectionCount) {
        if (connectionCount === 0) {
            this.getInterface(channel).value = null;
            this.recalculateOutput();
        }
    }

    recalculateOutput() {
        const red = this.getInterface('Red').value;
        const green = this.getInterface('Green').value;
        const blue = this.getInterface('Blue').value;

        if (red == null && green == null && blue == null) {
            this.getInterface('Output').value = null;
            return;
        }

        let newImage;

        const options = {
            components: 4,
            kind: 'RGB',
        };

        if (red != null) {
            newImage = Image.createFrom(red, options);
        } else if (green != null) {
            newImage = Image.createFrom(green, options);
        } else {
            newImage = Image.createFrom(blue, options);
        }

        if (red != null) newImage.setChannel(0, red);
        if (green != null) newImage.setChannel(1, green);
        if (blue != null) newImage.setChannel(2, blue);

        // Set alpha channel to completely opaque
        for (let i = 3; i < newImage.data.length; i += newImage.channels) {
            newImage.data[i] = newImage.maxValue;
        }

        this.getInterface('Output').value = newImage;
    }
}
