import { Node } from "@baklavajs/core";

export default class ConstantNode extends Node {
    type = 'Constant';
    name = 'Constant';

    constructor() {
        super();

        const valueOption = this.addOption('Value', 'SelectOption', Math.PI, null, {
            items: [
                { text: 'π', value: Math.PI },
                { text: 'e', value: Math.E },
                { text: '√2', value: Math.SQRT2 },
                { text: 'Custom', value: -1 },
            ],
        });

        valueOption.events.setValue.addListener(this, (newValue) => this.maybeUpdateOptions(newValue));

        this.addOutputInterface('Output', { type: 'number' });
    }

    maybeUpdateOptions(newValue) {
        if (newValue !== -1) {
            this.removeOption('Custom Value');
            return;
        }

        this.addOption('Custom Value', 'NumberOption', 0);
    }

    calculate(data) {
        const value = this.getOptionValue('Value');

        if (value !== -1) {
            this.getInterface('Output').value = value;
            return;
        }

        this.getInterface('Output').value = this.getOptionValue('Custom Value');
    }
}
