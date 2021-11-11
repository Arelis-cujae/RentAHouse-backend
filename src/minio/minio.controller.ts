import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MinioService } from './minio.service';

@Controller('files')
export class MinioController {
  constructor(private readonly service: MinioService) { }

  @Get('/:name')
  async getFile(@Param('name') name: string, @Res() res: Response) {
    const result = (await this.service.getFile(name)).pipe(res);
    return result;
  }

  @Post('/:name')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('name') name: string,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // const lastDot = file.originalname.lastIndexOf('.');
    // const extension = file.originalname.substring(lastDot + 1);
    return this.service.uploadFile(name, file.buffer, file.size);
  }
}
