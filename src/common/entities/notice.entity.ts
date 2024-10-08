import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
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
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
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

  // 삽입 전 createdAt 필드를 KST로 설정
  // @BeforeInsert()
  // setCreatedAt() {
  //   const currentUTC = new Date();
  //   this.createdAt = new Date(currentUTC.getTime() + 9 * 60 * 60 * 1000); // UTC를 KST로 변환
  // }

  // 업데이트 전 updatedAt 필드를 KST로 설정
  // @BeforeUpdate()
  // setUpdatedAt() {
  //   const currentUTC = new Date();
  //   this.updatedAt = new Date(currentUTC.getTime() + 9 * 60 * 60 * 1000); // UTC를 KST로 변환
  // }
}
