import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DataBase } from 'src/db/db';

@Module({
  controllers: [TrackController],
  providers: [TrackService, DataBase],
})
export class TrackModule {}
