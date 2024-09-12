import {
    AfterInsert,
    AfterUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeRemove,
    OneToMany,
  } from 'typeorm';
  //import { Report } from 'src/reports/report.entity';
  
  @Entity()
  export class Sample {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @Column({ default: true})
    admin: boolean;
  
    //@OneToMany(() => Report, (report) => report.user)
    reports: Report[];
  
    @AfterInsert()
    logInsert() {
      console.log('Inserted User with id,', this.id);
    }
  
    @AfterUpdate()
    logUpdate() {
      console.log('Updated User widh id', this.id);
    }
  
    @BeforeRemove()
    logRemove() {
      console.log('Removed User with id', this.id);
    }
  }
  