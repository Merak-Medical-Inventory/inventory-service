import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import LotToStock from '../LotToStock.ts/LotToStock';
import Inventory from '../Inventory/Inventory';
import Item from '../Item/Item';
@Entity()
export class Stock {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    criticUnit: number;

    @OneToMany(type => LotToStock, lotToStock => lotToStock.stock)
    LotToStock: LotToStock[];

    @ManyToOne(type => Inventory)
    inventory!: Inventory;

    @ManyToOne(type => Item)
    item!: Item;
}

export default Stock
