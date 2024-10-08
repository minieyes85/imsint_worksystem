import {
  AfterInsert,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeRemove,
  OneToMany,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  up_id: number;

  @Column()
  order_no: number;

  @Column({nullable: true})
  service_code: string;

  @Column({nullable: true})
  note: string;
  
  hierarchy?: string;

  _children?: Menu[];

}