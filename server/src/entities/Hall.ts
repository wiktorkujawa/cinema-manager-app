import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  // CreateDateColumn,
  // UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
  // JoinColumn,
  // OneToMany,
  // ObjectIdColumn,
  // ObjectID,
} from "typeorm";
import { Session } from "./Session";

@ObjectType()
@Entity("hall")
export class Hall extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  // @Field(() => String)
  // @ObjectIdColumn()
  // _id!: string;

  @Field()
  @Column("text")
  hall_name!: string;


  @Field(() => [Session])
  @OneToMany(() => Session, (session: Session) => session.hall, {onDelete:'CASCADE', onUpdate:'CASCADE'})
  sessions: Array<Session>;

  // @Field()
  // @Column("int", { array: true })
  // taken_sessions: Hall[];
}