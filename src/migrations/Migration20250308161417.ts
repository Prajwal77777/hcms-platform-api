import { Migration } from '@mikro-orm/migrations';

export class Migration20250308161417 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tenant" alter column "name" type text using ("name"::text);`);
    this.addSql(`alter table "tenant" alter column "name" set default 'development';`);
    this.addSql(`alter table "tenant" add constraint "tenant_name_check" check("name" in ('development', 'staging', 'production'));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tenant" drop constraint if exists "tenant_name_check";`);

    this.addSql(`alter table "tenant" alter column "name" drop default;`);
    this.addSql(`alter table "tenant" alter column "name" type varchar(255) using ("name"::varchar(255));`);
  }

}
