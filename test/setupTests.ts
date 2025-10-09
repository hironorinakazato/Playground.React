import '@testing-library/jest-dom';
import {TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder, } from 'node:util';

const g = globalThis as typeof globalThis & {
  TextEncoder?: new () => TextEncoder;
  TextDecoder?: new (label?: string, options?: TextDecoderOptions) => TextDecoder;
};

type EncoderCtor = new () => TextEncoder;
type DecoderCtor = new (label?: string, options?: TextDecoderOptions) => TextDecoder;

if (!g.TextEncoder) {
  g.TextEncoder = NodeTextEncoder as unknown as EncoderCtor;
}

if (!g.TextDecoder) {
  g.TextDecoder = NodeTextDecoder as unknown as DecoderCtor;
}
