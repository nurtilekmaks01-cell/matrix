import { recognize } from 'tesseract.js';

import { writeFileSync } from 'fs';

export async function recognizeText(buffer: Buffer) {
  writeFileSync('debug-image.png', buffer);

  const { data } = await recognize(buffer, 'rus+eng');

  return data.text;
}
