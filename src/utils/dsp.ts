import { Biquad } from 'biquadjs';

export const bandpass = (data: number[], low: number, high: number, sampleRate: number) => {
  const fc = (high + low) / 2;
  const bw = high - low;
  const q = fc / bw;
  const filter = new Biquad('bandpass', fc, sampleRate, q);
  return data.map((value) => filter.applyFilter(value));
};
