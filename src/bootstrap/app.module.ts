import { Module } from "@nestjs/common";
import { UsersModule } from "../modules/users/users.module";
import { FilesModule } from "../modules/files/files.module";
import { AuthModule } from "../modules/auth/auth.module";
import databaseConfig from "./config/database.config";
import authConfig from "./config/auth.config";
import appConfig from "./config/app.config";
import fileConfig from "./config/file.config";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { ForgotModule } from "../modules/forgot/forgot.module";
import { HomeModule } from "../modules/home/home.module";
import { DataSource } from "typeorm";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, fileConfig],
      envFilePath: [".env"]
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      }
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    ForgotModule,
    HomeModule
  ]
})
export class AppModule {
}
