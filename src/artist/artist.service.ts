import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DataBase } from 'src/db/db';
import { Artist } from './entities/artist.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DataBase) {}

  create({ name, grammy }: CreateArtistDto): Artist {
    const artist = new Artist({ id: randomUUID(), name, grammy });

    this.db.artists.push(artist);

    return artist;
  }

  findAll(): Artist[] {
    return this.db.artists;
  }

  findOne(artistId: string): Artist {
    const artist = this.db.artists.find(({ id }: Artist) => id === artistId);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  update(artistId: string, { name, grammy }: UpdateArtistDto): Artist {
    const artist = this.db.artists.find(({ id }: Artist) => id === artistId);

    if (!artist) {
      throw new NotFoundException();
    }

    artist.name = name;
    artist.grammy = grammy;

    return artist;
  }

  remove(artistId: string): void {
    const artistIndex = this.db.artists.findIndex(
      ({ id }: Artist) => id === artistId,
    );

    if (artistIndex === -1) {
      throw new NotFoundException();
    }

    this.db.artists.splice(artistIndex, 1);
  }
}
