/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GetBufferResponseDto } from '../dto/buffer-response.dto';

@Injectable()
export class AxiosFileService {
  constructor(private readonly httpService: HttpService) {}

  async getBufferResponse(getBufferResponseDto: GetBufferResponseDto) {
    const { href } = getBufferResponseDto;

    const response = await this.httpService.axiosRef.get(href, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(response.data, 'binary');

    return buffer;
  }
}
