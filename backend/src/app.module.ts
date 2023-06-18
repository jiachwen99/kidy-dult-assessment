import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadService } from './upload/upload.service';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, UploadController],
  providers: [AppService, UploadService],
})
export class AppModule {}
