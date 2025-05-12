import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAuthUser1747042885021 implements MigrationInterface {
  name = 'UpdateAuthUser1747042885021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`gender\` enum ('0', '1', '2') NOT NULL DEFAULT '2'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`birthday\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`phone\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birthday\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
  }
}
