import { Migration } from '@mikro-orm/migrations';

export class Migration20250308160906 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "tenant" ("id" uuid not null, "name" varchar(255) not null, "description" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "tenant_pkey" primary key ("id"));`);

    this.addSql(`create table "company" ("id" uuid not null, "active" boolean not null, "company_type" text check ("company_type" in ('health_care', 'home_health', 'day_care_only', 'day_care')) not null default 'day_care', "company_code" varchar(255) not null, "email" varchar(255) not null, "legal_name" varchar(255) not null, "metadata" varchar(255) not null, "name" varchar(255) not null, "phone" varchar(255) not null, "website" varchar(255) not null, "tenant_id" uuid not null, constraint "company_pkey" primary key ("id"));`);
    this.addSql(`alter table "company" add constraint "company_email_unique" unique ("email");`);

    this.addSql(`alter table "company" add constraint "company_tenant_id_foreign" foreign key ("tenant_id") references "tenant" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "company" drop constraint "company_tenant_id_foreign";`);

    this.addSql(`drop table if exists "tenant" cascade;`);

    this.addSql(`drop table if exists "company" cascade;`);
  }

}
