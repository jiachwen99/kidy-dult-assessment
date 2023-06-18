import { Controller, HttpException, HttpStatus, Logger, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';
import { UserWordCountDto } from './dto/user-word-count.dto';
import * as fs from 'fs';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', null, {
      storage: diskStorage({
        destination: '../../tmp/uploads',
        filename: (req, file, callback) => {
          Logger.warn('warning');
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const isValid = ['.txt'].includes(extname(file.originalname).toLowerCase());
        if (isValid) {
          callback(null, true);
        } else {
          const error = new HttpException('Only .txt files are allowed.', HttpStatus.BAD_REQUEST);
          callback(error, false);
        }
      },
    }),
  )
  async uploadFiles(@Res() res, @UploadedFiles() files): Promise<UserWordCountDto[]> {
    if (!files || files.length === 0) {
      throw new Error('No file uploaded.');
    }

    const userWordCounts = await this.uploadService.processFiles(files);

    files.forEach(file => {
      fs.unlinkSync(file.path);
    });

    return res.status(HttpStatus.OK).json(userWordCounts);
  }
}
