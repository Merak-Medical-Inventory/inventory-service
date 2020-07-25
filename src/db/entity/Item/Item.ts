import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import Brand from '@db/entity/Brand/Brand';
import Category from '@db/entity/Category/Category';
import Presentation from '@db/entity/Presentation/Presentation';

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    code: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        nullable: true
    })
    brand_code: string;

    @Column()
    serial_number: string;

    @ManyToOne(type => Brand, { onDelete: 'CASCADE' })
    brand: Brand;

    @ManyToOne(type => Category, { onDelete: 'CASCADE' })
    category: Category;

    @ManyToOne(type => Brand, { onDelete: 'CASCADE' })
    presentation: Presentation;
}

export default Item