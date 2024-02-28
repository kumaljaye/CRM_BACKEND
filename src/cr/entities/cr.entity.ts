/* eslint-disable prettier/prettier */
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Cr {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    date: string;

    @Column()
    completed: boolean;

// many todos can belong to single user
    @ManyToOne(()=> User, (user)=> user.crs)
    user : User;
}
