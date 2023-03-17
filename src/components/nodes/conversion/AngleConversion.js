import { buildUnaryFunction } from "@/components/nodes/math/util";

export const DegreesToRadiansNode = buildUnaryFunction('Degrees to Radians', (deg) => deg * Math.PI / 180);
export const RadiansToDegreesNode = buildUnaryFunction('Radians to Degrees', (rad) => rad * 180 / Math.PI);
