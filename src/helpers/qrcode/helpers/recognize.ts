import { recognize } from 'tesseract.js';
import sharp from 'sharp';

import { writeFileSync } from 'fs';

export async function recognizeText(buffer: Buffer) {
  writeFileSync('debug-image.png', buffer);

  const { data } = await recognize(buffer, 'rus+eng');

  console.log(data, 'data');

  return data.text;
}
