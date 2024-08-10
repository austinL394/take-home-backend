import * as d3 from 'd3';
import { d3SVG, mV2px, mm2px, s2px } from './utils';

export type CalibrationMarkStyle = Partial<{
  color: string;
  size: number;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
}>;

// horizonal units are seconds, vertical units are millivolts, sizes are in millimeters
export const drawCalibrationMark = (svg: d3SVG, origin: [x: number, y: number], style: CalibrationMarkStyle = {}) => {
  // 100ms low, then 200ms high @ 1mV, then 100ms low

  style.color ??= 'DodgerBlue';
  style.size ??= 0.5;
  style.fontSize ??= 10;
  style.fontFamily ??= 'sans-serif';
  style.fontColor ??= 'DodgerBlue';

  const x0 = s2px(origin[0]);
  const y0 = mV2px(origin[1]);

  // removed due to commend from David
  // svg
  //   .append('text')
  //   .attr('x', x0 - 6)
  //   .attr('y', y0 - 4)
  //   .text('10')
  //   .attr('font-size', style.fontSize)
  //   .attr('font-family', style.fontFamily)
  //   .attr('fill', style.fontColor);

  // draw pulse line
  const pulse = d3.line()([
    [x0, y0],
    [x0 + s2px(0.1), y0],
    [x0 + s2px(0.1), y0 - mV2px(1)],
    [x0 + s2px(0.3), y0 - mV2px(1)],
    [x0 + s2px(0.3), y0],
    [x0 + s2px(0.4), y0],
  ]);
  svg
    .append('path')
    .attr('d', pulse)
    .attr('stroke', style.color)
    .attr('stroke-width', mm2px(style.size))
    .attr('fill', 'none');
};
