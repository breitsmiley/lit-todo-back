import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity({
    engine: 'InnoDB',
    name: 'project_color'
})
export class ProjectColor {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 32
    })
    name: string;

    @Column({
        type: 'char',
        length: 6
    })
    code: string;
}