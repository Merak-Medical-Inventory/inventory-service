import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany} from "typeorm";
import Brand from '@db/entity/Brand/Brand';
import Category from '@db/entity/Category/Category';
import Presentation from '@db/entity/Presentation/Presentation';
import GeneralItem from '@entity/GeneralItem/GeneralItem';
import Provider from '@entity/Provider/Provider';
import OrderToItem from '../OrderToItem/OrderToItem';
import Stock from '../Stock/Stock';

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    code: string;

    @Column({
        nullable: true
    })
    brand_code: string;

    @ManyToOne(type => GeneralItem, { onDelete: 'CASCADE' })
    generalItem: GeneralItem;

    @ManyToOne(type => Brand, { onDelete: 'CASCADE' })
    brand: Brand;

    @ManyToOne(type => Category, { onDelete: 'CASCADE' })
    category: Category;

    @ManyToOne(type => Presentation, { onDelete: 'CASCADE' })
    presentation: Presentation;

    @ManyToMany(type => Provider, provider => provider.items, { onDelete: 'CASCADE', nullable: true })
    providers: Provider[]

    @OneToMany(type => OrderToItem, orderToItem => orderToItem.item)
    orderToItem: OrderToItem[];

    @ManyToMany(type => Stock, stock => stock.item)
    stock: Stock[]
}

export default Item
