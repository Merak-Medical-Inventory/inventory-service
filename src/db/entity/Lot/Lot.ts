import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import { User } from '../user/User';
import Item from '../Item/Item';
import Order from '../Order/Order';
import LotToStock from '../LotToStock/LotToStock';

@Entity()
export class Lot {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    dueDate: Date;

    @Column()
    entryDate: Date;

    @Column()
    amount: number;

    @ManyToOne(type => Item)
    item: Item;

    @ManyToOne(type => Order)
    order: Order;

    @OneToMany(type => LotToStock, lotToStock => lotToStock.lot)
    LotToStock: LotToStock[];
}

export default Order