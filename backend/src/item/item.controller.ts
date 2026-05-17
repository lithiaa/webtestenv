import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('item_picture', {
      storage: diskStorage({
        destination: './uploads/items',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemService.create(createItemDto, file?.filename);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('item_picture', {
      storage: diskStorage({
        destination: './uploads/items',

        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateItemDto: UpdateItemDto,

    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    console.log(updateItemDto);

    return this.itemService.update(id, updateItemDto, file);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.remove(id);
  }

  @Get()
  findAll(
    @Query('page') page = '1',

    @Query('limit') limit = '10',

    @Query('sortBy') sortBy = 'createdAt',

    @Query('order')
    order: 'asc' | 'desc' = 'desc',

    @Query('search') search = '',

    @Query('categoryId')
    categoryId = '',
  ) {
    return this.itemService.findAll(
      Number(page),
      Number(limit),
      sortBy,
      order,
      search,
      categoryId,
    );
  }

  @Get('category/:id')
  findByCategory(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.findByCategory(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemService.findOne(id);
  }
}
