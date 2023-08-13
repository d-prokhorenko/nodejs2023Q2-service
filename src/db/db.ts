import { Injectable } from '@nestjs/common';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DataBase {
  public users: User[] = [];
  public tracks: Track[] = [];
}
