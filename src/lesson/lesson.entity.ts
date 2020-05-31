import { Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class Lesson {
    @ObjectIdColumn()
    _id: string;

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    students: string[]
}