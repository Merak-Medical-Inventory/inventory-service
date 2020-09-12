import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import Privilege from "@db/entity/Privilege/Privilege";

@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  description: string;

  @ManyToMany((type) => Privilege,{cascade : true})
  @JoinTable()
  privileges: Privilege[];
}

export default Rol;
