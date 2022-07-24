import { round } from "functionallibrary";

export const twoDecimals = round( 2 );

export const inPercentaje = num => twoDecimals( num * 100 );