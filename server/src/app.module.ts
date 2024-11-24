import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresProviderModule } from './providers/databases/postgres/provider.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './models/user/user.resolver';
import { PrismaService } from './prisma/prisma.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserService } from './models/user/user.service';

@Module({
  imports: [
    PostgresProviderModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Auto-generate the schema file
      playground: true, // Optional: GraphQL Playground for testing in the browser
      introspection: true, // Enable introspection for GraphQL tools
      debug: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, UserResolver, PrismaService],
})
export class AppModule {}
