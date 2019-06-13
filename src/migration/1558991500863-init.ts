import { MigrationInterface, QueryRunner } from "typeorm";
import { BCRYPT_SALT_ROUNDS } from "../modules/auth/auth.service";
import { ProjectStatus } from "../modules/todo/entity/project.entity";
import {TaskPriority, TaskStatus} from "../modules/todo/entity";

export class init1558991500863 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `color` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(32) NOT NULL, `code` char(6) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `task` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `status` enum ('todo', 'done') NOT NULL DEFAULT 'todo', `name` varchar(128) NOT NULL, `priority` enum ('height', 'medium', 'low') NOT NULL, `colorId` int NOT NULL, `projectId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `project` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `status` enum ('active', 'deleted') NOT NULL DEFAULT 'active', `name` varchar(64) NOT NULL, `colorId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(254) NOT NULL, `password` varchar(72) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `task` ADD CONSTRAINT `FK_092479d40bec506972d9d0db50d` FOREIGN KEY (`colorId`) REFERENCES `color`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `task` ADD CONSTRAINT `FK_3797a20ef5553ae87af126bc2fe` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `project` ADD CONSTRAINT `FK_718eacbc70047fa4b6fffc2a646` FOREIGN KEY (`colorId`) REFERENCES `color`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");

        await this.postUp(queryRunner);

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `project` DROP FOREIGN KEY `FK_718eacbc70047fa4b6fffc2a646`");
        await queryRunner.query("ALTER TABLE `task` DROP FOREIGN KEY `FK_3797a20ef5553ae87af126bc2fe`");
        await queryRunner.query("ALTER TABLE `task` DROP FOREIGN KEY `FK_092479d40bec506972d9d0db50d`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `project`");
        await queryRunner.query("DROP TABLE `task`");
        await queryRunner.query("DROP TABLE `color`");
    }

    private async postUp(queryRunner: QueryRunner): Promise<any> {

        // ... User
        //--------------------------------
        const bcrypt = require('bcrypt');

        const adminEmail = 'breitsmiley@gmail.com';
        const adminPlaintextPassword = '111';
        const password = await bcrypt.hash(adminPlaintextPassword, BCRYPT_SALT_ROUNDS);

        const usersSQL = 'INSERT INTO `user` (`email`, `password`) VALUES ' +
            `('${adminEmail}','${password}')`;

        await queryRunner.query(usersSQL);
        //--------------------------------

        // ... Color
        //--------------------------------
        const colorsSQL = 'INSERT INTO `color` (`name`, `code`) VALUES ' +
            '("Lime","00FF00"), ' +
            '("Red","FF0000"), ' +
            '("Yellow","FFFF00"), ' +
            '("Aqua","00FFFF"), ' +
            '("Fuchsia","FF00FF"), ' +
            '("Maroon","800000"), ' +
            '("Blue","0000FF"), ' +
            '("Gray","808080"), ' +
            '("Black","000000")';

        await queryRunner.query(colorsSQL);

        // ... Project
        //--------------------------------
        const projectSQL = 'INSERT INTO `project` (status, name, colorId) VALUES ' +
            `("${ProjectStatus.active}","Home", 1), ` +
            `("${ProjectStatus.deleted}","Work", 1)`;

        await queryRunner.query(projectSQL);

        // ... Task
        //--------------------------------
        const taskSQL = 'INSERT INTO `task` (status, name, priority, colorId, projectId) VALUES ' +
            `("${TaskStatus.done}","Washing car","${TaskPriority.height}", 2, 1), ` +
            `("${TaskStatus.todo}","Meeting","${TaskPriority.low}", 4, 2)`;

        await queryRunner.query(taskSQL); 
    }

}
