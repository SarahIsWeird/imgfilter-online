import {buildBinaryFunction, buildUnaryFunction} from "@/components/nodes/math/util";

export const AddNode = buildBinaryFunction('Add', (a, b) => a + b);
export const SubtractNode = buildBinaryFunction('Subtract', (a, b) => a - b);
export const MultiplyNode = buildBinaryFunction('Multiply', (a, b) => a * b);
export const DivideNode = buildBinaryFunction('Divide', (a, b) => a / b);
export const ModuloNode = buildBinaryFunction('Modulo', (a, b) => a % b);
export const AbsoluteValueNode = buildUnaryFunction('Absolute Value', Math.abs);
export const RoundNode = buildUnaryFunction('Round', Math.round);
export const FloorNode = buildUnaryFunction('Floor', Math.floor);
export const CeilingNode = buildUnaryFunction('Ceiling', Math.ceil);

export const SineNode = buildUnaryFunction('Sine', Math.sin);
export const CosineNode = buildUnaryFunction('Cosine', Math.cos);
export const TangentNode = buildUnaryFunction('Tangent', Math.tan);
export const ArcsineNode = buildUnaryFunction('Arcsine', Math.asin);
export const ArccosineNode = buildUnaryFunction('Arccosine', Math.acos);
export const ArctangentNode = buildUnaryFunction('Arctangent', Math.atan);
