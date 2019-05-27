import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ProjectColor } from "./project.color.entity";
import { Task } from "./task.entity";

export enum ProjectStatus {
    active = 'active',
    deleted = 'deleted',
}

@Entity({
    engine: 'InnoDB',
    name: 'project'
})
export class Project {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.active
    })
    status: ProjectStatus;

    @Column({
        type: 'varchar',
        length: 64
    })
    name: string;

    @ManyToOne(type => ProjectColor, {
        eager: true,
        nullable: false
    })
    projectColor: ProjectColor;

    @OneToMany(type => Task, task => task.project)
    tasks: Task[];
}