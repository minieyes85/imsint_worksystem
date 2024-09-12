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
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @Column()
    name: string;
    
    // @Column({ default: true})
    // admin: boolean;
    
    // @AfterInsert()
    // logInsert() {
    //   console.log('Inserted User with id,', this.id);
    // }
  
    // @AfterUpdate()
    // logUpdate() {
    //   console.log('Updated User widh id', this.id);
    // }
  
    // @BeforeRemove()
    // logRemove() {
    //   console.log('Removed User with id', this.id);
    // }
  }
  