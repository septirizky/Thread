import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { threads } from './threads';
import { comments } from './comments';

export interface usersAttributes {
  user_id?: number;
  username?: string;
  email?: string;
  password?: string;
  image?: string;
  role?: string;
}

@Table({ tableName: 'users', schema: 'public', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('users_user_id_seq'::regclass)"),
  })
  user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  username?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  email?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  password?: string;

  @Column({ allowNull: true, type: DataType.STRING(500) })
  image?: string;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  role?: string;

  @HasMany(() => threads, { sourceKey: 'user_id' })
  threads?: threads[];

  @HasMany(() => comments, { sourceKey: 'user_id' })
  comments?: comments[];
}
