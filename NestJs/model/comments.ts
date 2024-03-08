import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { users } from './users';
import { threads } from './threads';

export interface commentsAttributes {
  comment_id?: number;
  comment?: string;
  comment_user_id?: number;
  comment_thread_id?: number;
  createdat?: Date;
  updateat?: Date;
}

@Table({ tableName: 'comments', schema: 'public', timestamps: false })
export class comments
  extends Model<commentsAttributes, commentsAttributes>
  implements commentsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('comments_comment_id_seq'::regclass)",
    ),
  })
  comment_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  comment?: string;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  comment_user_id?: number;

  @ForeignKey(() => threads)
  @Column({ allowNull: true, type: DataType.INTEGER })
  comment_thread_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  createdat?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  updateat?: Date;

  @BelongsTo(() => users)
  user?: users;

  @BelongsTo(() => threads)
  thread?: threads;
}
