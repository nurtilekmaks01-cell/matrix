import { recognize } from 'tesseract.js';

export async function recognizeText(buffer: Buffer) {
  const { data } = await recognize(buffer, 'rus');
  console.log(data, 'data');

  return data.text;
}
