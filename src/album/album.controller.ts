import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ClassSerializerInterceptor,
  Header,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ValidateIdParam } from 'src/validators/uuid.validator';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(): Album[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ValidateIdParam) id: string): Album {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id', ValidateIdParam) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Album {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateIdParam) id: string): void {
    return this.albumService.remove(id);
  }
}
