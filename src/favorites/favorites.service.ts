import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { DataBase } from 'src/db/db';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly db: DataBase,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  public findAll() {
    return {
      artists: this.artistService.findAll().filter((artist) => {
        return this.db.favorites.artists.includes(artist.id);
      }),
      albums: this.albumService.findAll().filter((album) => {
        return this.db.favorites.albums.includes(album.id);
      }),
      tracks: this.trackService.getTracks().filter((track) => {
        return this.db.favorites.tracks.includes(track.id);
      }),
    };
  }

  public addArtist(id: string) {
    const artist = this.artistService.findOne(id);

    if (artist) {
      this.db.favorites.artists.push(id);
    } else {
      throw new UnprocessableEntityException();
    }
  }

  public addAlbum(id: string) {
    const album = this.albumService.findOne(id);

    if (album) {
      this.db.favorites.albums.push(id);
    } else {
      throw new UnprocessableEntityException();
    }
  }

  public addTrack(id: string) {
    const track = this.trackService.getTrack(id);

    if (track) {
      this.db.favorites.tracks.push(id);
    } else {
      throw new UnprocessableEntityException();
    }
  }

  public removeArtist(id: string) {
    const artistIdIndex = this.db.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (artistIdIndex !== -1) {
      this.db.favorites.artists.splice(artistIdIndex, 1);
    } else {
      throw new NotFoundException();
    }
  }

  public removeAlbum(id: string) {
    const albumsIdIndex = this.db.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (albumsIdIndex !== -1) {
      this.db.favorites.albums.splice(albumsIdIndex, 1);
    } else {
      throw new NotFoundException();
    }
  }

  public removeTrack(id: string) {
    const trackIdIndex = this.db.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (trackIdIndex !== -1) {
      this.db.favorites.tracks.splice(trackIdIndex, 1);
    } else {
      throw new NotFoundException();
    }
  }
}
