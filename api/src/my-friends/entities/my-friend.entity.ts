import { AbstractEntity } from '../../common/entities';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('my_friends')
export class MyFriend extends AbstractEntity {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  gender: string;
}
