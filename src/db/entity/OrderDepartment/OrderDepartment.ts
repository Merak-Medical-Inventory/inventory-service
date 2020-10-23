import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { User } from '../user/User';
import OrderDepartmentToItem from '../OrderDepartmentToItem/OrderDepartmentToItem';
@Entity()
export class OrderDepartment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    date: Date;

    @Column({ nullable: true })
    dateResponse: Date;

    @Column({ nullable: true })
    response: string;

    @ManyToOne(type => User)
    transmitter: User;

    @ManyToOne(type => User,{ nullable: true })
    sender: User;

    @OneToMany(type => OrderDepartmentToItem, orderDepartmentToItem => orderDepartmentToItem.OrderDepartment)
    OrderDepartmentToItem: OrderDepartmentToItem[];
}

export default OrderDepartment
