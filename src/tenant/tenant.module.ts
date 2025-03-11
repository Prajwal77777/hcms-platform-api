import { Module } from "@nestjs/common";
import { TenantController } from "./tenant.controller";
import { TenantService } from "./tenant.service";
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tenant } from "../entities/tenant.entity";

@Module({
    imports: [MikroOrmModule.forFeature([Tenant])],
    controllers: [TenantController],
    providers: [TenantService]
})
export class TenantModule { }