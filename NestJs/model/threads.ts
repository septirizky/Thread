import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { users } from './users';
import { comments } from './comments';

export interface threadsAttributes {
  thread_id?: number;
  thread_post?: string;
  thread_user_id?: number;
  thread_likes?: number;
  createdAt?: Date;
  updateAt?: string;
}

@Table({ tableName: 'threads', schema: 'public', timestamps: false })
export class threads
  extends Model<threadsAttributes, threadsAttributes>
  implements threadsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('threads_thread_id_seq'::regclass)",
    ),
  })
  thread_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(300) })
  thread_post?: string;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  thread_user_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  thread_likes?: number;

  @Column({ allowNull: true, type: DataType.DATE })
  createdAt?: Date;

  @Column({ allowNull: true, type: DataType.STRING })
  updateAt?: string;

  @BelongsTo(() => users)
  user?: users;

  @HasMany(() => comments, { sourceKey: 'thread_id' })
  comments?: comments[];
}
