import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Company } from './company.entity';
import { TenentEnum } from '../enums/tenentEnum';

@Entity()
export class Tenant {
    @PrimaryKey({ type: 'uuid' })
    id: string = uuidv4();

    @Enum({items: () => TenentEnum, default: TenentEnum.Development})
    name!: string;

    @Property()
    description!: string;

    @OneToMany(() => Company, (company) => company.tenant)
    companies = new Collection<Company>(this);

    @Property()
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
