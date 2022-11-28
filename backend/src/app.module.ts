import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver } from '@nestjs/apollo';
import { UserModule } from './modules/user/user.module';
import { DataSource } from 'typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';
import { LocalStrategy } from './modules/auth/local.strategy';
import { AuthModule } from './modules/auth/auth.module';
import { UserService } from './modules/user/services/user.service';
import { User } from './modules/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './modules/auth/constants';
import { JwtStrategy } from './modules/auth/jwt-strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.env'],
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    }),
    UserModule,
    PassportModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy, JwtStrategy, AuthService, UserService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
