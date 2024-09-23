import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
  } from 'typeorm';
  import { User } from './user.entity';
  
  @Entity()
  export class Notice {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    is_pinned: boolean;
  
    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.notices)
    user: User;

    // createdAt 필드의 기본값을 현재 시간으로 설정
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    // updatedAt 필드도 기본값 설정 및 업데이트 시 자동 갱신
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    
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
  