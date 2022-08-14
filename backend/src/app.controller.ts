import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => cb(null, resolve('./assets/upload')),
        filename: (req, file, cb) => cb(null, Date.now() + extname(file.originalname))
      }),
      fileFilter: (req, file, callback) => {
        const ext = extname(file.originalname);
        const allowedTypes = ['.png', '.jpg', '.gif', '.jpeg', '.webp', '.svg'];
        if (!allowedTypes.includes(ext)) 
          return callback(new BadRequestException('This file type is not allowed'), null);
        callback(null, true);
      },
      limits: { fileSize: 1024 * 1024 }
    })
  )
  @Post('/upload')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.uploadFile(file);
  }
}
