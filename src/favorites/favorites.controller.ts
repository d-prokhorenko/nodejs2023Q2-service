import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ClassSerializerInterceptor,
  Header,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ValidateIdParam } from 'src/validators/uuid.validator';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/artist/:id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  addArtist(@Param('id', ValidateIdParam) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Post('/album/:id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  addAlbum(@Param('id', ValidateIdParam) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Post('/track/:id')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(ClassSerializerInterceptor)
  addTrack(@Param('id', ValidateIdParam) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('/artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  removeArtist(@Param('id', ValidateIdParam) id: string) {
    return this.favoritesService.removeArtist(id);
  }

  @Delete('/album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  removeAlbum(@Param('id', ValidateIdParam) id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Delete('/track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeTrack(@Param('id', ValidateIdParam) id: string) {
    this.favoritesService.removeTrack(id);
  }
}
