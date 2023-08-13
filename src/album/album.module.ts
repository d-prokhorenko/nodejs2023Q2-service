import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DataBase } from 'src/db/db';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, DataBase],
})
export class AlbumModule {}
