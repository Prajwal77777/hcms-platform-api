import { Injectable } from '@nestjs/common';
import type { EntityManager } from "@mikro-orm/core";
import { Tenant } from '../entities/tenant.entity';
import type { CreateTenantDto } from './dto/CreateTenatDto';

@Injectable()
export class TenantService {
  constructor(private readonly em: EntityManager) { };

  async createTenant(dto: CreateTenantDto): Promise<{ message: string; data: Tenant }> {
    const { name, description } = dto
    const tenant = this.em.create(Tenant, {
      name: name,
      description: description,
    },
      {partial: true}
    );
    await this.em.persistAndFlush(tenant);
    return {
      message: "Tenant created successfully",
      data: tenant,
    };
  }

  async getAllTenants(): Promise<{ message: string; data: Tenant[] }> {
    const tenants = await this.em.find(Tenant, {});
    return {
      message: "Tenants data fetched successfully",
      data: tenants
    }
  }

  async getTenantById(id: string): Promise<Tenant | null> {
    return this.em.findOne(Tenant, { id });
  }

  async updateTenant(id: string, tenantData: Partial<Tenant>): Promise<Tenant | null> {
    const tenant = await this.em.findOne(Tenant, { id });
    if (!tenant) return null;
    tenant.name = tenantData.name || tenant.name;
    tenant.description = tenantData.description || tenant.description;
    tenant.updatedAt = new Date();
    await this.em.flush();
    return tenant;
  }

  async deleteTenant(id: string): Promise<boolean> {
    const tenant = await this.em.findOne(Tenant, { id });
    if (!tenant) return false;
    await this.em.removeAndFlush(tenant);
    return true;
  }
}