import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Inventory from '../Inventory/Inventory';
import {  OrderDepartment } from "../OrderDepartment/OrderDepartment";
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

    @OneToMany(type => OrderDepartment, orderDepartment => orderDepartment.department)
    orderDepartment: OrderDepartment[];
}

export default Department
