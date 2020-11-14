import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import Item from '../Item/Item';
import { OrderDepartment } from '../OrderDepartment/OrderDepartment';
@Entity()
export class OrderDepartmentToItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount : number;

    @ManyToOne(type => Item)
    item!: Item;

    @Column({nullable : true})
    acceptedAmount : number;

    @ManyToOne(type => OrderDepartment)
    orderDepartment!: OrderDepartment;

}

export default OrderDepartmentToItem
