import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import Item from '../Item/Item';
import { Order } from '../Order/Order';
@Entity()
export class OrderToItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount : number;

    @ManyToOne(type => Item)
    item!: Item;

    @ManyToOne(type => Order)
    order!: Order;

}

export default OrderToItem