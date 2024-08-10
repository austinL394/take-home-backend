import * as d3 from 'd3';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { bandpass } from '../../utils/dsp';
import { GridStyle, drawGrid } from './grid';
import { mV2px, px2mV, px2s, s2px } from './utils';
import { drawWaveformTrace } from './waveform';
import { drawCalibrationMark } from './calibration';
import { LeadId, Waveform } from 'features/reports/types';

export type Ecg4x3ChartProps = {
  waveform: Waveform;
  height_mV: number;
  width_s: number;
  baselead?: LeadId;
  grid?: GridStyle;
};

const Ecg4x3Chart = ({ waveform, height_mV, width_s, baselead = 'II', grid }: Ecg4x3ChartProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // signals are spaced 30mm (3mV) wide, 15mm (1.5mV) on either side of zero mV

  // round up width_s to nearest 0.2s
  width_s = Math.ceil(width_s * 5) / 5;

  const sps = waveform.SampleBase;
  const maxTime = width_s - 0.2 * 4; // bounds bottom baseline waveform subtractions are for padding of 3 squares on left and 1 on right
  const maxSamples = maxTime * sps;

  const squares = Math.floor((maxTime - 0.2 * 2) / 4 / 0.2) * 0.2;
  const samples = squares * sps;
  const samplesWithPad = samples + 0.2 * sps;

  const waveforms = useMemo(() => {
    const waveforms = Object.fromEntries(
      waveform.LeadData.map((lead) => {
        const filtered = bandpass(lead.WaveFormData.slice(0, maxSamples), 0.5, 40, sps);
        return [lead.LeadID, filtered];
      }),
    );

    const waveformLeads = Object.keys(waveforms);
    if (!['I', 'II'].every((lead) => waveformLeads.includes(lead))) {
      throw new Error(`Invalid lead data: ${waveformLeads.join(', ')}`);
    }

    if (!('III' in waveforms)) {
      // III = II - I
      waveforms['III'] = waveforms['II'].map((value, index) => value - waveforms['I'][index]);
    }

    if (!('aVR' in waveforms)) {
      // aVR = -(I + II) / 2
      waveforms['aVR'] = waveforms['I'].map((_, index) => -(waveforms['I'][index] + waveforms['II'][index]) / 2);
    }

    if (!('aVL' in waveforms)) {
      // aVL = I - (II / 2)
      waveforms['aVL'] = waveforms['I'].map((_, index) => waveforms['I'][index] - waveforms['II'][index] / 2);
    }

    if (!('aVF' in waveforms)) {
      // aVF = II - (I / 2)
      waveforms['aVF'] = waveforms['II'].map((_, index) => waveforms['II'][index] - waveforms['I'][index] / 2);
    }

    return waveforms;
  }, [waveform, maxSamples, sps]);

  const svg = useMemo(() => {
    const svg = d3
      .create('svg')
      .attr('width', s2px(width_s) + 5)
      .attr('height', mV2px(height_mV) + 5);

    drawGrid(svg, [px2s(2), px2mV(2), width_s, height_mV], grid);

    const ids: LeadId[][] = [
      ['I', 'aVR', 'V1', 'V4'],
      ['II', 'aVL', 'V2', 'V5'],
      ['III', 'aVF', 'V3', 'V6'],
    ];

    let y = px2mV(2) + 1.5; // mV
    for (let row = 0; row < ids.length; row++) {
      const slices = ids[row].map((lead, col) => {
        const start = col * samplesWithPad;
        const end = start + samples;
        const slice = waveforms[lead].slice(start, end);
        const filtered = bandpass(slice, 0.5, 40, sps);
        return filtered;
      });
      for (let col = 0, x = px2s(2) + 0.2 * 3; col < ids[row].length; col++, x += squares + 0.2) {
        drawWaveformTrace(svg, {
          lead: ids[row][col],
          origin: [x, y],
          sampleRate: sps,
          waveform: slices[col],
        });
      }

      drawCalibrationMark(svg, [px2s(2) + 0.1, y + 0.5]);

      y += 3;
    }

    // draw full width lead at the bottom
    const data = bandpass(waveforms[baselead].slice(0, maxSamples), 0.5, 40, sps);

    drawWaveformTrace(svg, {
      lead: baselead,
      origin: [px2s(2) + 0.2 * 3, y],
      sampleRate: sps,
      waveform: data,
    });

    drawCalibrationMark(svg, [px2s(2) + 0.1, y + 0.5]);

    // bounding box
    svg
      .append('rect')
      .attr('x', 1)
      .attr('y', 1)
      .attr('width', s2px(width_s) + 2)
      .attr('height', mV2px(height_mV) + 2)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    return svg;
  }, [width_s, height_mV, grid, waveforms, baselead, maxSamples, sps, samplesWithPad, samples, squares]);

  useLayoutEffect(() => {
    if (ref.current) {
      while (ref.current.firstChild) {
        ref.current.removeChild(ref.current.firstChild);
      }
      d3.select(ref.current).append(() => svg.node());
    }
  }, [svg]);

  return <div ref={ref}></div>;
};

export default Ecg4x3Chart;
