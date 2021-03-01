import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  // UpdateDateColumn,
  Column,
  BaseEntity,
  // OneToMany,
  // ObjectIdColumn,
  // ObjectID,
} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  // @Field()
  // @ObjectIdColumn()
  // _id!: ObjectID;

  // @Field()
  @Column({ unique: true })
  username!: string;

  // @Field()
  @Column({ unique: true })
  email!: string;

  // @Column()
  password!: string;

  // @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

}