import {MigrationInterface, QueryRunner} from "typeorm";

export class test1574114921269 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `institutions` (`id` varchar(36) NOT NULL, `slug` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `organizations` (`id` varchar(36) NOT NULL, `slug` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `institutionId` varchar(36) NULL, `campusId` varchar(36) NULL, UNIQUE INDEX `IDX_f80cd1631d335008c33b66e5d7` (`institutionId`, `campusId`), UNIQUE INDEX `IDX_963693341bd612aa01ddf3a4b6` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `campus` (`id` varchar(36) NOT NULL, `slug` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` enum ('ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER') NOT NULL DEFAULT 'ROLE_USER', `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `activated` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `studentCode` varchar(255) NULL, `type` varchar(255) NOT NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), INDEX `IDX_94e2000b5f7ee1f9c491f0f8a8` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `organizations` ADD CONSTRAINT `FK_7d9292d7b3a86621fb82ee7caa7` FOREIGN KEY (`institutionId`) REFERENCES `institutions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `organizations` ADD CONSTRAINT `FK_ab56b9056d9ad7c8b25f4fd689d` FOREIGN KEY (`campusId`) REFERENCES `campus`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `organizations` DROP FOREIGN KEY `FK_ab56b9056d9ad7c8b25f4fd689d`");
        await queryRunner.query("ALTER TABLE `organizations` DROP FOREIGN KEY `FK_7d9292d7b3a86621fb82ee7caa7`");
        await queryRunner.query("DROP INDEX `IDX_94e2000b5f7ee1f9c491f0f8a8` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `campus`");
        await queryRunner.query("DROP INDEX `IDX_963693341bd612aa01ddf3a4b6` ON `organizations`");
        await queryRunner.query("DROP INDEX `IDX_f80cd1631d335008c33b66e5d7` ON `organizations`");
        await queryRunner.query("DROP TABLE `organizations`");
        await queryRunner.query("DROP TABLE `institutions`");
    }

}
