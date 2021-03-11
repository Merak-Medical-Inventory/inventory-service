import {Entity, PrimaryGeneratedColumn, Column,ManyToOne} from 'typeorm';
import Inventory from '../Inventory/Inventory';
import Item from '../Item/Item';
import User from '../user/User';
@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;
    
    @Column(type => User)
    sender: User;
    
    @ManyToOne(type => Inventory)
    inventory1!: Inventory;

    @ManyToOne(type => Inventory)
    inventory2!: Inventory;

    @ManyToOne(type => Item)
    item!: Item;
}

export default Transaction
