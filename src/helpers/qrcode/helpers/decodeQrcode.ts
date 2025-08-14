/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DecodeQrCodeDto } from '../dto/decode-qr-code.dto';
import { Jimp } from 'jimp';
import jsQR from 'jsqr';
import { recognizeText } from './recognize';

export const decodeQrCodeBuffer = async (qrcodeDto: DecodeQrCodeDto) => {
  const { buffer } = qrcodeDto;

  try {
    const image = await Jimp.read(buffer);

    const imageData = {
      data: new Uint8ClampedArray(image.bitmap.data),
      width: image.bitmap.width,
      height: image.bitmap.height,
    };

    const text = recognizeText(buffer);

    const decodeQR = jsQR(imageData.data, imageData.width, imageData.height);

    if (decodeQR) {
      return {
        link: decodeQR.data,
        text,
      };
    } else {
      throw new Error('QR-код не найден на изображении.');
    }
  } catch (error) {
    throw new Error(`Ошибка при обработке изображения: ${error?.message}`);
  }
};
