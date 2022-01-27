/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCustumer1642781443667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Costumers',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'username',
            type: 'varchar(20)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar(255)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'gems',
            type: 'int(11)',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'update_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],

      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Costumers');
  }
}
