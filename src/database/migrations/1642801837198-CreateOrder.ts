/* eslint-disable class-methods-use-this */
import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class CreateOrder1642801837198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Orders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(210)',
            isNullable: false,
          },
          {
            name: 'item',
            type: 'varchar(210)',
            isNullable: false,
          },
          {
            name: 'costumerID',
            type: 'int',
          },
          {
            name: 'productId',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey('Orders', new TableForeignKey({
      columnNames: ['costumerID'],
      referencedColumnNames: ['id'],
      referencedTableName: 'Costumers',
      onDelete: 'CASCADE',
    }));

    await queryRunner.createForeignKey('Orders', new TableForeignKey({
      columnNames: ['productID'],
      referencedColumnNames: ['id'],
      referencedTableName: 'Stock',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Orders');
  }
}
