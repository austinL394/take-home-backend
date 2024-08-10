import * as d3 from 'd3';

export type d3SVG = d3.Selection<SVGSVGElement, undefined, null, undefined>;

export type Range = [x: number, y: number, width: number, height: number];

// scale 1mv to 10mm in standard pixel units
export const mV2px = (value: number) => mm2px(value * 10);

// scale 1mv to 10mm
export const mV2mm = (value: number) => value * 10;

// scale 10mm to 1mV
export const mm2mV = (value: number) => value / 10;

// scale px in standard pixel units to mV
export const px2mV = (value: number) => ((value / 96) * 25.4) / 10;

// scale 1s to 25mm in standard pixel units
export const s2px = (value: number) => mm2px(value * 25);

// scale standard pixels to seconds where 25mm = 1s
export const px2s = (value: number) => ((value / 96) * 25.4) / 25;

// scale 1s to 25mm
export const s2mm = (value: number) => value * 25;

// scale mm to seconds where 25mm = 1s
export const mm2s = (value: number) => value / 25;

// scale 1px in standard pixel units to mm
export const px2mm = (value: number) => 25.4 * (value / 96);

// scale 1mm to standard pixel units
export const mm2px = (value: number) => 96 * (value / 25.4);
