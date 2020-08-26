import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from "typeorm";
import Item from "@entity/Item/Item";

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
    phone_number: string;

    @ManyToMany(type => Item, item => item.providers, { cascade: true })
    items: Item[]
}

export default Provider
