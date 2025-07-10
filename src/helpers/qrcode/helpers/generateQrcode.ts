/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { GenerateQrcodeDto } from '../dto/generate-qr-code.dto';
import * as QRCode from 'qrcode';

export const generateQrcodeData = async (
  generateQrcodeDto: GenerateQrcodeDto,
) => {
  const { url } = generateQrcodeDto;

  try {
    return await QRCode.toDataURL(url);
  } catch (error) {
    throw new Error(`Failed to generate QR code buffer ${error}`);
  }
};

export const generateQrcodeBuffer = async (
  generateQrcodeDto: GenerateQrcodeDto,
) => {
  const { url } = generateQrcodeDto;

  try {
    return await QRCode.toBuffer(url);
  } catch (error) {
    throw new Error(`Failed to generate QR code buffer ${error}`);
  }
};
