import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [TrackController],
  imports: [DbModule],
  providers: [TrackService],
})
export class TrackModule {}
