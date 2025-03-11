import { Controller, Get, HttpCode, HttpStatus, Post, Body, Param, Patch } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant } from '../entities/tenant.entity'
import { CreateTenantDto } from './dto/CreateTenatDto';

@Controller('tenants')
export class TenantController {
  constructor(private tenantsService: TenantService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<{message: string; data: Tenant[]}> {
    return this.tenantsService.getAllTenants();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): string {
    return "This is a tenant"
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body('tenant') createTenantDto: CreateTenantDto) {
   return  this.tenantsService.createTenant(createTenantDto)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() createTenantDto: CreateTenantDto) {
    return "Tenant updated successfully.";
  }
}
