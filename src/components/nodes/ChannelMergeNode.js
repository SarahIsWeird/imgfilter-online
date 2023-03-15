import { Node } from "@baklavajs/core";
import Image from "image-js";

export default class ChannelMergeNode extends Node {
    type = 'ChannelMerge';
    name = 'Channel Merge';

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

        if (red != null) {
            newImage = Image.createFrom(red, { components: 3 });
        } else if (green != null) {
            newImage = Image.createFrom(green, { components: 3 });
        } else {
            newImage = Image.createFrom(blue, { components: 3 });
        }

        if (red != null) newImage.setChannel(0, red);
        if (green != null) newImage.setChannel(1, green);
        if (blue != null) newImage.setChannel(2, blue);

        this.getInterface('Output').value = newImage;
    }
}
