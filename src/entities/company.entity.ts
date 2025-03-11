import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Tenant } from './tenant.entity';
import { CompanyType } from "../enums/companyEnum";

@Entity()
export class Company {
    @PrimaryKey({ type: 'uuid' })
    id: string = uuidv4();

    @Property()
    active!: boolean;

    @Enum({ items: () => CompanyType, default: CompanyType.DayCare })
    companyType!: CompanyType;

    @Property()
    companyCode!: string;

    @Property({ type: 'string', unique: true })
    email: string;

    @Property()
    legalName!: string;

    @Property()
    metadata!: JSON;

    @Property()
    name!: string;

    @Property()
    phone!: string;

    @Property()
    website!: string;

    @ManyToOne(() => Tenant)
    tenant!: Tenant;

}