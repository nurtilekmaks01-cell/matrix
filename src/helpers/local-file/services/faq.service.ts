/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs-extra';

@Injectable()
export class FileFaqService {
  private readonly faqJsonFilePath = path.resolve(
    __dirname,
    '../../../../public/database/faq.db.json',
  );

  private readonly faqJsonDir = path.dirname(this.faqJsonFilePath);

  async readFaqJsonFile(): Promise<any> {
    if (!(await fs.pathExists(this.faqJsonFilePath))) {
      return {};
    }
    try {
      const data = await fs.readJson(this.faqJsonFilePath);
      return data;
    } catch (error) {
      throw new Error(`Error reading faq JSON file: ${error.message}`);
    }
  }

  async writeFaqJsonFile(data: any): Promise<void> {
    try {
      // Ensure the directory exists
      await fs.ensureDir(this.faqJsonDir);
      // Write the file
      await fs.writeJson(this.faqJsonFilePath, data, { spaces: 2 });
    } catch (error) {
      throw new Error(`Error writing JSON file: ${error.message}`);
    }
  }
}
