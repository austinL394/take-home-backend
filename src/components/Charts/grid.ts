import { d3SVG, mm2mV, mm2px, mm2s, mV2px, Range, s2px } from './utils';

export type GridStyle = {
  major: {
    color: string;
    size: number;
  };
  minor: {
    color?: string;
    size: number;
  };
};

// horizontal units are seconds, vertical units are millivolts, sizes are in millimeters
export const drawGrid = (svg: d3SVG, range: Range, style?: GridStyle) => {
  style ??= {
    major: {
      color: '#ffbebe',
      size: 0.2,
    },
    minor: {
      color: '#ffe1e1',
      size: 0.15,
    },
  };

  if (!style.minor.color) {
    style.minor.color = style.major.color;
  }

  // draw horizontal minor grid lines
  for (let y = range[1], i = 0; y <= range[1] + range[3]; y += 0.1, i++) {
    // don't bother drawing minor lines that will be under major lines
    if (i % 5 === 0) continue;

    const x0 = range[0] - mm2s(style.minor.size / 2);
    svg
      .append('line')
      .attr('x1', s2px(x0))
      .attr('y1', mV2px(y))
      .attr('x2', s2px(x0 + range[2]) + mm2px(style.minor.size))
      .attr('y2', mV2px(y))
      .attr('stroke', style.minor.color)
      .attr('stroke-width', mm2px(style.minor.size));
  }

  // draw vertical minor grid lines
  for (let x = range[0], i = 0; x <= range[0] + range[2]; x += 0.04, i++) {
    // don't bother drawing minor lines that will be under major lines
    if (i % 5 === 0) continue;
    const y0 = range[1] - mm2mV(style.minor.size / 2);
    svg
      .append('line')
      .attr('x1', s2px(x))
      .attr('y1', mV2px(y0))
      .attr('x2', s2px(x))
      .attr('y2', mV2px(y0 + range[3]) + mm2px(style.minor.size))
      .attr('stroke', style.minor.color)
      .attr('stroke-width', mm2px(style.minor.size));
  }

  // draw horizontal major grid lines
  for (let y = range[1]; y <= range[1] + range[3]; y += 0.5) {
    const x0 = range[0] - mm2s(style.major.size / 2);
    svg
      .append('line')
      .attr('x1', s2px(x0))
      .attr('y1', mV2px(y))
      .attr('x2', s2px(x0 + range[2]) + mm2s(style.major.size))
      .attr('y2', mV2px(y))
      .attr('stroke', style.major.color)
      .attr('stroke-width', mm2px(style.major.size));
  }

  // draw vertical major grid lines
  for (let x = range[0]; x <= range[0] + range[2]; x += 0.2) {
    const y0 = range[1] - mm2mV(style.major.size / 2);
    svg
      .append('line')
      .attr('x1', s2px(x))
      .attr('y1', mV2px(y0))
      .attr('x2', s2px(x))
      .attr('y2', mV2px(y0 + range[3]) + mm2px(style.major.size))
      .attr('stroke', style.major.color)
      .attr('stroke-width', mm2px(style.major.size));
  }
};
