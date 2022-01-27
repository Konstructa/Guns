/* eslint-disable class-methods-use-this */
import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export class CreateOrder1642801837198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Orders',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'products_quantity',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'int(11)',
            isNullable: false,
          },
          {
            name: 'costumer_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'product_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_CostumerOrder',
            columnNames: ['costumer_id'],
            referencedTableName: 'Costumers',
            referencedColumnNames: ['id'],
          },
          {
            name: 'FK_ProductOrder',
            columnNames: ['product_id'],
            referencedTableName: 'Stock',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Orders');
  }
}
