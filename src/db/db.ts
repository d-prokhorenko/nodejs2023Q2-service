import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DataBase {
  public users: User[] = [];
  public tracks: Track[] = [];
  public artists: Artist[] = [];
}
