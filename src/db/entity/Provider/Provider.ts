import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany} from "typeorm";
import Item from "@entity/Item/Item";
import Order from '../Order/Order';

@Entity()
export class Provider {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
    })
    name: string;

    @Column({
    })
    last_name: string;

    @Column({
    })
    company: string;

    @Column({
    })
    address: string;

    @Column({
    })
    email: string;

    @Column({
    })
    country: string;

    @Column({
    })
    city: string;

    @Column({
    })
    description: string;

    @Column({
    })
    phone_number: string;

    @OneToMany(type => Order, order => order.provider)
    order: Order[];

    @ManyToMany(type => Item, item => item.providers, { cascade: true })
    @JoinTable()
    items: Item[]
}

export default Provider
