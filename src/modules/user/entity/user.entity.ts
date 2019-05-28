import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    engine: 'InnoDB',
    name: 'user'
})
export class User {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 254
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 72
    })
    password: string;
}