import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { Lot } from '../Lot/Lot';
import Stock from '../Stock/Stock';
@Entity()
export class LotToStock {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @ManyToOne(type => Lot)
    lot!: Lot;

    @ManyToOne(type => Stock)
    stock!: Stock;
}

export default LotToStock
