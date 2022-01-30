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
            name: 'customerId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'productId',
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
            columnNames: ['customerId'],
            referencedTableName: 'Customers',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_ProductOrder',
            columnNames: ['productId'],
            referencedTableName: 'Stock',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Orders');
  }
}
