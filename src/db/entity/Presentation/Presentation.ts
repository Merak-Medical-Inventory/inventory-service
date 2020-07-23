import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
@Entity()
export class Presentation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    measure: string;

    @Column()
    measure_value: number;
}

export default Presentation
