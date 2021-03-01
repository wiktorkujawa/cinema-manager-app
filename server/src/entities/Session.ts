import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  // CreateDateColumn,
  // UpdateDateColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  // ManyToOne,
  // OneToMany,
  // ObjectIdColumn,
  // ObjectID,
} from "typeorm";
import { Hall } from "./Hall";
// import { Hall } from "./Hall";

@ObjectType()
@Entity("session")
export class Session extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  // @Field(() => String)
  // @ObjectIdColumn()
  // _id!: string;

  @Field()
  @Column("text")
  hall_name: string;

  @Field()
  @Column("text")
  hall_id: number;

  @Field()
  @Column("text")
  movie: string;

  @Field(() => [Hall], {nullable: true})
  @ManyToOne(() => Hall, (hall: Hall) => hall.sessions)
  @JoinColumn({ name: 'hall_id'})
  hall: Hall;

  // @Field()
  // @Column("text")
  // start: string;


  // @Field()
  // @Column("text")
  // end: string;


}