import { minBy } from "lodash";
import Image from "image-js";

const colorDistance = (color1, color2) => {
    const r = color2[0] - color1[0];
    const g = color2[1] - color1[1];
    const b = color2[2] - color1[2];

    return r * r + g * g + b * b;
};

const reduce = (color, colorSet) => {
    const distances = colorSet.map((c, i) => [i, colorDistance(color, c)]);
    const min = minBy(distances, ([_, d]) => d);

    return colorSet[min[0]];
};

export const reduceImage = (image, colorSet) => {
    const newImage = Image.createFrom(image, {});

    for (let i = 0; i < image.data.length; i += image.channels) {
        const pixel = [image.data[i], image.data[i + 1], image.data[i + 2]];
        const newPixel = reduce(pixel, colorSet);

        newImage.data[i] = newPixel[0];
        newImage.data[i + 1] = newPixel[1];
        newImage.data[i + 2] = newPixel[2];
    }

    if (image.alpha) {
        newImage.setChannel(3, image.getChannel(3));
    }

    return newImage;
};

export const getEqualDistancedValues = (max, count) => {
    if (count === 0) return [0];

    let res = [];
    const step = max / (count - 1);

    for (let i = 0; i < count - 1; i++) {
        res.push(Math.floor(step * i));
    }

    res.push(max);

    return res;
};

export const createColorSet = (reds, greens, blues) => {
    const colorSet = [];

    for (let i = 0; i < reds.length; i++) {
        for (let j = 0; j < greens.length; j++) {
            for (let k = 0; k < blues.length; k++) {
                colorSet.push([reds[i], greens[j], blues[k]]);
            }
        }
    }

    return colorSet;
};

export const createColorSetFromCounts = (maxValue, redCount, greenCount, blueCount) => {
    const reds = getEqualDistancedValues(maxValue, redCount);
    const greens = getEqualDistancedValues(maxValue, greenCount);
    const blues = getEqualDistancedValues(maxValue, blueCount);

    return createColorSet(reds, greens, blues);
};

export const createBWSet = (max, count) => {
    return getEqualDistancedValues(max, count).map(val => [val, val, val]);
};
