import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DataBase {
  public users: User[] = [];
  public tracks: Track[] = [];
  public artists: Artist[] = [];
  public albums: Album[] = [];
  public favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
