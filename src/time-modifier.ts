// https://cubic-bezier.com/#.17,.67,.83,.67

function linear (x: number) {
  return x
}

export function getBezierCurveCubicPos (p1: number, p2: number, p3: number, p4: number, t: number) {
  return Math.pow(1 - t, 3) * p1
    + 3 * Math.pow(1 - t, 2) * t * p2
    + 3 * Math.pow((1 - t), 2) * t * p3
    + Math.pow(t, 3) * p4
}

export const TimeModifier = {
  'linear': linear,
  'ease': getBezierCurveCubicPos.bind(null, 0.25, 0.1, 0.25, 1.0),
  'ease-in': getBezierCurveCubicPos.bind(null, 0.42, 0.0, 1.0, 1.0),
  'ease-out': getBezierCurveCubicPos.bind(null, 0.0, 0.0, 0.58, 1.0),
  'ease-in-out': getBezierCurveCubicPos.bind(null, 0.42, 0.0, 0.58, 1.0),
}

