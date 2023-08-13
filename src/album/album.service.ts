import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DataBase } from 'src/db/db';
import { Album } from './entities/album.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DataBase) {}

  public create({ name, year, artistId }: CreateAlbumDto): Album {
    const album = new Album({ id: randomUUID(), name, year, artistId });

    this.db.albums.push(album);

    return album;
  }

  public findAll(): Album[] {
    return this.db.albums;
  }

  public findOne(albumId: string): Album {
    const album = this.db.albums.find(({ id }: Album) => id === albumId);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  public update(
    albumId: string,
    { name, year, artistId }: UpdateAlbumDto,
  ): Album {
    const album = this.db.albums.find(({ id }: Album) => id === albumId);

    if (!album) {
      throw new NotFoundException();
    }

    album.name = name;
    album.year = year;
    album.artistId = artistId;

    return album;
  }

  public remove(albumId: string): void {
    const albumIndex = this.db.albums.findIndex(
      ({ id }: Album) => id === albumId,
    );

    if (albumIndex === -1) {
      throw new NotFoundException();
    }

    this.db.albums.splice(albumIndex, 1);
  }
}
