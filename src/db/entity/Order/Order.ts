import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import { User } from '../user/User';
import Provider from '../Provider/Provider';
import OrderToItem from '../OrderToItem/OrderToItem';
@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    date: Date;

    @ManyToOne(type => User)
    user: User;

    @ManyToOne(type => Provider)
    provider: Provider;

    @OneToMany(type => OrderToItem, orderToItem => orderToItem.order)
    orderToItem: OrderToItem[];
}

export default Order