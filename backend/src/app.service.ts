import { Injectable } from '@nestjs/common';
import { extname, resolve } from 'path';
import { promisify } from 'util';
import { readFile, rename } from 'fs';
import { createHash } from 'crypto';

@Injectable()
export class AppService {
  private readonly uploadDir = resolve('./assets/upload');
  private readonly renameAsync = promisify(rename);
  private readonly readFileAsync = promisify(readFile);

  async uploadFile(file: Express.Multer.File) {
    const buffer = await this.readFileAsync(file.path);
    const hash = createHash('md5').update(buffer).digest('hex');
    const newFileName = hash + extname(file.originalname);
    await this.renameAsync(file.path, `${this.uploadDir}/${newFileName}`);
    const url = `/upload/${newFileName}`;
    return { hash, url };
  }
}
