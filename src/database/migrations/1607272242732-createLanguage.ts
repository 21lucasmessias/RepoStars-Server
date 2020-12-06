import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createLanguage1607272242732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'language',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'searched',
                    type: 'decimal',
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('language');
    }
}
