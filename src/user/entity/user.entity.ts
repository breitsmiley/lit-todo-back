import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm";

@Entity({
    engine: 'InnoDB',
    name: 'requisite'
})
export class User {

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 64
    })
    requisite: string;
}