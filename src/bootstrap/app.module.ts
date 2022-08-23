import { Module } from "@nestjs/common";
import { UsersModule } from "../modules/users/users.module";
import { FilesModule } from "../modules/files/files.module";
import { AuthModule } from "../modules/auth/auth.module";
import databaseConfig from "./config/database.config";
import authConfig from "./config/auth.config";
import appConfig from "./config/app.config";
import mailConfig from "./config/mail.config";
import fileConfig from "./config/file.config";
import facebookConfig from "./config/facebook.config";
import googleConfig from "./config/google.config";
import twitterConfig from "./config/twitter.config";
import appleConfig from "./config/apple.config";
import * as path from "path";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthAppleModule } from "../modules/auth-apple/auth-apple.module";
import { AuthFacebookModule } from "../modules/auth-facebook/auth-facebook.module";
import { AuthGoogleModule } from "../modules/auth-google/auth-google.module";
import { AuthTwitterModule } from "../modules/auth-twitter/auth-twitter.module";
import { I18nModule } from "nestjs-i18n/dist/i18n.module";
import { HeaderResolver } from "nestjs-i18n";
import { TypeOrmConfigService } from "./database/typeorm-config.service";
import { MailConfigService } from "../modules/mail/mail-config.service";
import { ForgotModule } from "../modules/forgot/forgot.module";
import { MailModule } from "../modules/mail/mail.module";
import { HomeModule } from "../modules/home/home.module";
import { DataSource } from "typeorm";

console.log(__dirname);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        facebookConfig,
        googleConfig,
        twitterConfig,
        appleConfig
      ],
      envFilePath: [".env"]
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      }
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get("app.fallbackLanguage"),
        loaderOptions: { path: path.join(__dirname, "/i18n/"), watch: true }
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService) => {
            return configService.get("app.headerLanguage");
          },
          inject: [ConfigService]
        }
      ],
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    AuthFacebookModule,
    AuthGoogleModule,
    AuthTwitterModule,
    AuthAppleModule,
    ForgotModule,
    MailModule,
    HomeModule
  ]
})
export class AppModule {
}
