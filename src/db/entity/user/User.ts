import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import Rol from "../Rol/Rol";
import Department from '@db/entity/Department/Department';
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @ManyToOne(type => Rol, { onDelete: 'CASCADE' })
    rol: Rol;

    @ManyToOne(type => Department,{ nullable: true, onDelete: 'CASCADE' })
    department: Department;
}

export default User
