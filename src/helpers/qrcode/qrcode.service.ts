import { Injectable } from '@nestjs/common';
import { DecodeQrCodeDto } from './dto/decode-qr-code.dto';
import { decodeQrCodeBuffer } from './helpers/decodeQrcode';
import {
  generateQrcodeBuffer,
  generateQrcodeData,
} from './helpers/generateQrcode';
import { GenerateQrcodeDto } from './dto/generate-qr-code.dto';
import { recognizeText } from './helpers/recognize';

@Injectable()
export class QrcodeService {
  async decodeQrCodeFromBuffer(qrcodeDto: DecodeQrCodeDto) {
    return await decodeQrCodeBuffer(qrcodeDto);
  }

  async generateQRCode(generateQrcodeDto: GenerateQrcodeDto) {
    await generateQrcodeData(generateQrcodeDto);
  }
  async generateQRCodeBuffer(generateQrcodeDto: GenerateQrcodeDto) {
    return await generateQrcodeBuffer(generateQrcodeDto);
  }

  async getImageText(imageDto: DecodeQrCodeDto) {
    return await recognizeText(imageDto.buffer);
  }
}
