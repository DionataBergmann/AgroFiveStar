import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { FilesModule } from '../files/files.module';
import { FilesService } from '../files/files.service';

import { CreateFieldInput } from './dto/create-field.input';
import { FieldDTO } from './dto/field.dto';
import { UpdateFieldInput } from './dto/update-field.input';
import { Field } from './entities/field.entity';
import { FieldsResolver } from './fields.resolver';
import { FieldsService } from './fields.service';
import { Inventory } from '../inventory/entities/inventory.entity';
import { Production } from '../production/entities/production.entity';
import { File } from '../files/entities/files.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          Field,
          File,
          Inventory,
          Production,
        ]),
      ],

      services: [FilesService, FieldsService],
      resolvers: [
        {
          DTOClass: FieldDTO,
          EntityClass: Field,
          ServiceClass: FieldsService,
          pagingStrategy: PagingStrategies.OFFSET,
          CreateDTOClass: CreateFieldInput,
          UpdateDTOClass: UpdateFieldInput,
          enableAggregate: true,
          enableSubscriptions: true,
          create: {
            disabled: true,
          },
          update: {
            disabled: true,
          },
          delete: {
            disabled: true,
          },
        },
      ],
    }),
  ],
  providers: [FieldsService, FieldsResolver, FilesService, FilesModule],
})
export class FieldsModule {}
