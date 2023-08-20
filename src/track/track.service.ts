import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DataBase } from 'src/db/db';
import { randomUUID } from 'crypto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly db: DataBase) {}

  public createTrack({
    name,
    artistId,
    albumId,
    duration,
  }: CreateTrackDto): Track {
    const track = new Track({
      id: randomUUID(),
      name,
      artistId,
      albumId,
      duration,
    });

    this.db.tracks.push(track);

    return track;
  }

  public getTracks(): Track[] {
    return this.db.tracks;
  }

  public getTrack(trackId: string): Track {
    const track = this.db.tracks.find(({ id }: Track) => id === trackId);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  public updateTrack(
    trackId: string,
    { name, artistId, albumId, duration }: UpdateTrackDto,
  ) {
    const track = this.db.tracks.find(({ id }: Track) => id === trackId);

    if (!track) {
      throw new NotFoundException();
    }

    track.name = name;
    track.artistId = artistId;
    track.albumId = albumId;
    track.duration = duration;

    return track;
  }

  public deleteTrack(trackId: string): void {
    const trackIndex = this.db.tracks.findIndex(
      ({ id }: Track) => id === trackId,
    );

    if (trackIndex === -1) {
      throw new NotFoundException();
    }

    this.removeTrackFromFavs(trackId);

    this.db.tracks.splice(trackIndex, 1);
  }

  public removeArtistFromTracks(artistId: string): void {
    const tracksWithCurrentArtist = this.db.tracks.filter(
      (track: Track) => track.artistId === artistId,
    );

    tracksWithCurrentArtist.forEach((track: Track) => {
      track.artistId = null;
    });
  }

  public removeAlbumFromTrack(albumId: string): void {
    const tracksWithCurrentAlbum = this.db.tracks.filter(
      (track: Track) => track.albumId === albumId,
    );

    tracksWithCurrentAlbum.forEach((track: Track) => {
      track.albumId = null;
    });
  }

  private removeTrackFromFavs(trackId: string): void {
    const trackIdIndex = this.db.favorites.tracks.findIndex(
      (id) => id === trackId,
    );

    if (trackIdIndex !== -1) {
      this.db.favorites.tracks.splice(trackIdIndex, 1);
    }
  }
}
