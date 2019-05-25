import {MigrationInterface, QueryRunner} from "typeorm";

export class init1558801287280 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(254) NOT NULL, `password` varchar(72) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");

        await this.postUp(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `user`");
    }

    private async postUp(queryRunner: QueryRunner): Promise<any> {

        const bcrypt = require('bcrypt');
        const saltRounds = 12;

        const adminEmail = 'admin@lit.loc';
        const adminPlaintextPassword = 'lit-admin';
        const password = await bcrypt.hash(adminPlaintextPassword, saltRounds);

        const clientSQL = 'INSERT INTO `user` (`id`,`email`, `password`) VALUES ' +
            `(1,'${adminEmail}','${password}')`;
        
        await queryRunner.query(clientSQL);

    }

}
