import {MigrationInterface, QueryRunner} from "typeorm";

export class init1558991500863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `project_color` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(32) NOT NULL, `code` char(6) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `task` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `status` enum ('todo', 'done') NOT NULL DEFAULT 'todo', `name` varchar(128) NOT NULL, `priority` enum ('height', 'medium', 'low') NOT NULL, `projectId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `project` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `status` enum ('active', 'deleted') NOT NULL DEFAULT 'active', `name` varchar(64) NOT NULL, `projectColorId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(254) NOT NULL, `password` varchar(72) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `task` ADD CONSTRAINT `FK_3797a20ef5553ae87af126bc2fe` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `project` ADD CONSTRAINT `FK_d74aae29aa2e008fde5d30d591f` FOREIGN KEY (`projectColorId`) REFERENCES `project_color`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");

        await this.postUp(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `project` DROP FOREIGN KEY `FK_d74aae29aa2e008fde5d30d591f`");
        await queryRunner.query("ALTER TABLE `task` DROP FOREIGN KEY `FK_3797a20ef5553ae87af126bc2fe`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `project`");
        await queryRunner.query("DROP TABLE `task`");
        await queryRunner.query("DROP TABLE `project_color`");
    }

    private async postUp(queryRunner: QueryRunner): Promise<any> {

        // ... User
        //--------------------------------
        const bcrypt = require('bcrypt');
        const saltRounds = 12;

        const adminEmail = 'admin@lit.loc';
        const adminPlaintextPassword = 'lit-admin';
        const password = await bcrypt.hash(adminPlaintextPassword, saltRounds);

        const usersSQL = 'INSERT INTO `user` (`email`, `password`) VALUES ' +
            `('${adminEmail}','${password}')`;

        await queryRunner.query(usersSQL);
        //--------------------------------

        // ... Project Color
        //--------------------------------
        const projectColorsSQL = 'INSERT INTO `project_color` (`name`, `code`) VALUES ' +
            '("Lime","00FF00"), ' +
            '("Red","FF0000"), ' +
            '("Yellow","FFFF00"), ' +
            '("Aqua","00FFFF"), ' +
            '("Fuchsia","FF00FF"), ' +
            '("Maroon","800000"), ' +
            '("Blue","0000FF"), ' +
            '("Gray","808080"), ' +
            '("Black","000000")';

        await queryRunner.query(projectColorsSQL);
    }

}
