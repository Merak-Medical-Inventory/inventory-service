import {Entity, PrimaryGeneratedColumn, Column,ManyToOne} from 'typeorm';
import Inventory from '../Inventory/Inventory';
import Item from '../Item/Item';
import User from '../user/User';
@Entity()
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    blockchainTx: string;

    @Column()
    bcTransactionId: string;

    @Column()
    amount: number;
    
    @Column({nullable : true})
    sender: User;
    
    @ManyToOne(type => Inventory,{nullable : true})
    inventory1!: Inventory;

    @ManyToOne(type => Inventory,{nullable : true})
    inventory2!: Inventory;

    @ManyToOne(type => Item)
    item!: Item;
}

export default Transaction
