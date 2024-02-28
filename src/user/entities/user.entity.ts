/* eslint-disable prettier/prettier */
import { Cr } from "src/cr/entities/cr.entity";


import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id : number;
      
    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column()
    email: string;

    @Column()
    password : string;

    @Column()
    role : string;

    @Column()
    status : string;

    //one user can have multiple crs
    @OneToMany(()=> Cr ,  (cr)=>cr.user)
    crs : Cr[];
  userType: any;


}
