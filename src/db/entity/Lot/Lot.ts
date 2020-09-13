import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import { User } from '../user/User';
import Item from '../Item/Item';
import Order from '../Order/Order';

@Entity()
export class Lot {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    name: string;

    @Column()
    dueDate: Date;

    @Column()
    entryDate: Date;

    @Column()
    amount: number;

    @ManyToOne(type => Item)
    item: Item;

    @ManyToOne(type => Order)
    order: Order;
}

export default Order