import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs-extra';

@Injectable()
export class FileTelegramService {
  private readonly telegramJsonFilePath = path.resolve(
    __dirname,
    '../../../../public/database/telegram.db.json',
  );

  private readonly telegramJsonDir = path.dirname(this.telegramJsonFilePath);

  async readTelegramJsonFile(): Promise<any> {
    if (!(await fs.pathExists(this.telegramJsonFilePath))) {
      return {};
    }
    try {
      const data = await fs.readJson(this.telegramJsonFilePath);
      return data;
    } catch (error) {
      throw new Error(`Error reading telegram JSON file: ${error.message}`);
    }
  }

  async writeTelegramJsonFile(data: any): Promise<void> {
    try {
      // Ensure the directory exists
      await fs.ensureDir(this.telegramJsonDir);
      // Write the file
      await fs.writeJson(this.telegramJsonFilePath, data, { spaces: 2 });
    } catch (error) {
      throw new Error(`Error writing JSON file: ${error.message}`);
    }
  }
}
