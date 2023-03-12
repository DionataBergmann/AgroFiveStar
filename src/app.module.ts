import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { FieldsModule } from './modules/fields/fields.module';
import { FilesModule } from './modules/files/files.module';
import { InventorysModule } from './modules/inventory/inventory.module';
import { ProductionModule } from './modules/production/production.module';
import { UsersModule } from './modules/users/users.module';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { FileController } from './modules/files/controllers/file.controller';
import { graphqlUploadExpress } from 'graphql-upload';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => ({ req }),
    }),
    FieldsModule,
    FilesModule,
    InventorysModule,
    ProductionModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
