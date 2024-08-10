import * as d3 from 'd3';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { bandpass } from '../../utils/dsp';
import { GridStyle, drawGrid } from './grid';
import { mV2px, px2mV, px2s, s2px } from './utils';
import { drawWaveformTrace } from './waveform';
import { drawCalibrationMark } from './calibration';
import { LeadId, Waveform } from 'features/reports/types';

export type EcgChart12x1Props = {
  waveform: Waveform;
  height_mV?: number;
  width_s?: number;
  grid?: GridStyle;
};

const EcgChart12x1 = ({ waveform, height_mV = 23, width_s = 7.6, grid }: EcgChart12x1Props) => {
  const ref = useRef<HTMLDivElement>(null);

  // round up width_s to nearest 0.2s
  width_s = Math.ceil(width_s / 0.2) * 0.2;
  // round up height_mV to nearest 0.5mV
  height_mV = Math.ceil(height_mV / 0.5) * 0.5;

  const sps = waveform.SampleBase;
  const maxTime = width_s - 0.2 * 5; // bounds bottom baseline waveform subtractions are for padding of 3 squares on left and 1 on right
  const maxSamples = maxTime * sps;

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

    const ids: LeadId[] = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

    const x = px2s(2) + 0.2 * 4; // s
    let y = px2mV(2) + 1; // mV
    for (const id of ids) {
      const waveform = waveforms[id];

      drawWaveformTrace(svg, {
        origin: [x, y],
        sampleRate: sps,
        waveform,
      });

      // draw lead id text
      const fontSize = 14;
      svg
        .append('text')
        .attr('x', s2px(x - 0.75))
        .attr('y', mV2px(y))
        .text(id)
        .attr('font-size', fontSize)
        .attr('font-family', 'sans-serif')
        .attr('fill', 'black');

      drawCalibrationMark(svg, [x - 0.5, y + 0.5]);

      y += 2;
    }

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
  }, [waveforms, sps, width_s, height_mV, grid]);

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

export default EcgChart12x1;
