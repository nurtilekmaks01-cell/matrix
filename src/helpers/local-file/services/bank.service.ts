/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs-extra';

@Injectable()
export class FileBankService {
  private readonly bankJsonFilePath = path.resolve(
    __dirname,
    '../../../../public/database/bank.db.json',
  );

  private readonly bankJsonDir = path.dirname(this.bankJsonFilePath);

  async readBankJsonFile(): Promise<any> {
    if (!(await fs.pathExists(this.bankJsonFilePath))) {
      return {};
    }
    try {
      const data = await fs.readJson(this.bankJsonFilePath);
      return data;
    } catch (error) {
      throw new Error(`Error reading faq JSON file: ${error.message}`);
    }
  }

  async writeBankJsonFile(data: any): Promise<void> {
    try {
      // Ensure the directory exists
      await fs.ensureDir(this.bankJsonDir);
      // Write the file
      await fs.writeJson(this.bankJsonFilePath, data, { spaces: 2 });
    } catch (error) {
      throw new Error(`Error writing JSON file: ${error.message}`);
    }
  }
}
