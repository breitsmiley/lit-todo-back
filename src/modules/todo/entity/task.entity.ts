import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { Color } from "./color.entity";

export enum TaskStatus {
    todo = 'todo',
    done = 'done',
}

export enum TaskPriority {
    height = 'height',
    medium = 'medium',
    low = 'low',
}

@Entity({
    engine: 'InnoDB',
    name: 'task'
})
export class Task {

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
        enum: TaskStatus,
        default: TaskStatus.todo
    })
    status: TaskStatus;

    @Column({
        type: 'varchar',
        length: 128
    })
    name: string;

    @Column({
        type: 'enum',
        enum: TaskPriority,
    })
    priority: TaskPriority;

    @ManyToOne(type => Color, {
        eager: true,
        nullable: false
    })
    color: Color;

    @ManyToOne(type => Project, project => project.tasks)
    project: Project;
}