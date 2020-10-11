import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Inventory from '../Inventory/Inventory';
@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    code: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(type => Inventory, Inventory => Inventory.deparment)
    inventory: Inventory[];
}

export default Department
