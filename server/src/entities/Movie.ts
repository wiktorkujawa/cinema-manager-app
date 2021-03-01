import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  // CreateDateColumn,
  // UpdateDateColumn,
  Column,
  BaseEntity,
  // OneToMany,
  // ObjectIdColumn,
  // ObjectID,
} from "typeorm";

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  _id!: number;
  // @Field()
  // @ObjectIdColumn()
  // _id!: ObjectID;

  // @Field()
  @Column({ unique: true })
  title!: string;

  // @Field()
  @Column()
  poster!: string;

  // @Field()
  @Column()
  description!: string;

  // @Field()
  @Column()
  duration!: number;
}