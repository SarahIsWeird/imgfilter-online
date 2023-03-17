import { NodeBuilder } from "@baklavajs/core";

export const buildUnaryFunction = (name, func) =>
    new NodeBuilder(name)
        .setName(name)
        .addInputInterface('Number', 'NumberOption', 0, { type: 'number' })
        .addOutputInterface('Result', { type: 'number' })
        .onCalculate((node) => {
            const number = node.getInterface('Number').value;

            if (number == null) {
                node.getInterface('Result').value = null;
            }

            node.getInterface('Result').value = func(number);
        })
        .build();

export const buildBinaryFunction = (name, func) =>
    new NodeBuilder(name)
        .setName(name)
        .addInputInterface('number1', 'NumberOption', 0, { type: 'number', displayName: 'Number' })
        .addInputInterface('number2', 'NumberOption', 0, { type: 'number', displayName: 'Number' })
        .addOutputInterface('Result', { type: 'number' })
        .onCalculate((node) => {
            const number1 = node.getInterface('number1').value;
            const number2 = node.getInterface('number2').value;

            if (number1 == null || number2 == null) {
                node.getInterface('Result').value = null;
                return;
            }

            node.getInterface('Result').value = func(number1, number2);
        })
        .build();
