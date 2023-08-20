import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DataBase } from 'src/db/db';
import { Artist } from './entities/artist.entity';
import { randomUUID } from 'crypto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly db: DataBase,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  public create({ name, grammy }: CreateArtistDto): Artist {
    const artist = new Artist({ id: randomUUID(), name, grammy });

    this.db.artists.push(artist);

    return artist;
  }

  public findAll(): Artist[] {
    return this.db.artists;
  }

  public findOne(artistId: string): Artist {
    const artist = this.db.artists.find(({ id }: Artist) => id === artistId);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  public update(artistId: string, { name, grammy }: UpdateArtistDto): Artist {
    const artist = this.db.artists.find(({ id }: Artist) => id === artistId);

    if (!artist) {
      throw new NotFoundException();
    }

    artist.name = name;
    artist.grammy = grammy;

    return artist;
  }

  public remove(artistId: string): void {
    const artistIndex = this.db.artists.findIndex(
      ({ id }: Artist) => id === artistId,
    );

    if (artistIndex === -1) {
      throw new NotFoundException();
    }

    this.removeArtistFromFavs(artistId);
    this.trackService.removeArtistFromTracks(artistId);
    this.albumService.removeArtistFromAlbums(artistId);
    this.db.artists.splice(artistIndex, 1);
  }

  private removeArtistFromFavs(artistId: string): void {
    const artistIdIndex = this.db.favorites.artists.findIndex(
      (id) => id === artistId,
    );

    if (artistIdIndex !== -1) {
      this.db.favorites.artists.splice(artistIdIndex, 1);
    }
  }
}
