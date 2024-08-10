import * as d3 from 'd3';
import { LeadId } from '../../features/reports/types';
import { d3SVG, mV2px, mm2px, s2px } from './utils';

export type WaveformTraceProps = {
  lead?: LeadId;
  origin: [x: number, y: number];
  sampleRate: number;
  waveform: number[];
};

export type WaveformStyle = Partial<{
  color: string;
  width: number;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
}>;

// horizonal units are seconds, vertical units are millivolts, sizes are in millimeters
export const drawWaveformTrace = (
  svg: d3SVG,
  { lead: lead, origin, sampleRate, waveform }: WaveformTraceProps,
  style: WaveformStyle = {},
) => {
  style.color ??= 'black';
  style.width ??= 0.2;
  style.fontSize ??= 14;
  style.fontFamily ??= 'sans-serif';
  style.fontColor ??= 'black';

  const x0 = origin[0];
  const y0 = origin[1];

  svg
    .append('path')
    .attr(
      'd',
      d3
        .line<number>()
        .x((_, i) => s2px(x0 + i / sampleRate))
        .y((d) => mV2px(y0 - d))(waveform),
    )
    .attr('fill', 'none')
    .attr('shape-rendering', 'quality')
    .attr('stroke-width', mm2px(style.width))
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round')
    .attr('stroke', style.color);

  if (lead) {
    svg
      .append('text')
      .attr('x', s2px(x0))
      .attr('y', mV2px(y0 - 1.25) + 14)
      .text(lead)
      .attr('font-size', style.fontSize)
      .attr('font-family', style.fontFamily)
      .attr('fill', style.fontColor);
  }
};
