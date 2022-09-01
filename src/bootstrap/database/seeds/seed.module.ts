import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import appConfig from "src/bootstrap/config/app.config";
import databaseConfig from "src/bootstrap/config/database.config";
import { DataSource } from "typeorm";
import { TypeOrmConfigService } from "../typeorm-config.service";
import { RoleSeedModule } from "./role/role-seed.module";
import { StatusSeedModule } from "./status/status-seed.module";
import { UserSeedModule } from "./user/user-seed.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: [".env"]
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      }
    }),
    RoleSeedModule,
    StatusSeedModule,
    UserSeedModule
  ]
})
export class SeedModule {
}
