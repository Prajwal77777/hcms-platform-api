import { Injectable } from '@nestjs/common';
import type { EntityManager } from "@mikro-orm/core";
import { Tenant } from '../entities/tenant.entity';
import type { CreateTenantDto } from './dto/CreateTenatDto';

@Injectable()
export class TenantService {
  constructor(private readonly em: EntityManager) { };

  async createTenant(dto: CreateTenantDto): Promise<{ status: number, message: string; data: Tenant }> {
    const { name, description } = dto
    const tenant = this.em.create(Tenant, {
      name: name,
      description: description,
    },
      { partial: true }
    );
    await this.em.persistAndFlush(tenant);
    return {
      status: 201,
      message: "Tenant created successfully",
      data: tenant,
    };
  }

  async getAllTenants(): Promise<{ status: number, message: string; data: Tenant[] }> {
    const tenants = await this.em.find(Tenant, {});
    return {
      status: 200,
      message: "Tenants data fetched successfully",
      data: tenants
    }
  }

  async getTenantById(id: string): Promise<Tenant | null> {
    return this.em.findOne(Tenant, { id });
  }

  async updateTenant(id: string, dto: CreateTenantDto): Promise<{ status: number, message: string, data: Tenant | null }> {
    const { name, description } = dto

    const tenant = await this.em.findOne(Tenant, { id })

    if (!tenant) {
      return { status: 404, message: "Tenant not found", data: null }
    }

    this.em.assign(tenant, { name, description })

    await this.em.flush()

    return {
      status: 200,
      message: "Tenant updated successfully",
      data: tenant
    }
  }

  async deleteTenant(id: string): Promise<{ success: boolean }> {
    const tenant = await this.em.findOne(Tenant, { id });
    if (!tenant) {
      return { success: false };
    }
    await this.em.removeAndFlush(tenant);
    return {
      success: true
    };
  }
}