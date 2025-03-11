import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './tenant/tenant.module';
import config from "src/mikro-orm.config";

@Module({
  imports: [MikroOrmModule.forRoot({ ...config, autoLoadEntities: true }),
    TenantModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
