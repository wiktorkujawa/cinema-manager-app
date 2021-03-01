// import { Hall } from "../entities/Hall";
import {
  Arg,
  Field,
  InputType,
  // FieldResolver,
  Int,
  Mutation,
  // InputType,
  // Field,
  // Int,
  Query,
  // ObjectType,
  Resolver,
  // Root
} from "type-graphql";
import { Session } from "../entities/Session";


@InputType()
class SessionInput {
  @Field()
  movie: string;
  @Field()
  hall_name: string;
}

// @ObjectType()
// class PaginatedSessions {
//   @Field(() => [Session])
//   posts: Session[];
//   @Field()
//   hasMore: boolean;
// }



@Resolver(Session)
export class SessionResolver {
  @Query(() => Session, { nullable: true })
    session(@Arg("id", () => Int) id: number): Promise<Session | undefined> {
      return Session.findOne({id: id});
    }

    @Query(() => [Session], { nullable: true })
    sessions() {
      return Session.find();
    }

    @Mutation(() => Session )
    async createSession(
      @Arg("input") input: SessionInput,
      ): Promise<Session | undefined>{
      return Session.create({
        ...input
      }).save()
    }

    // @FieldResolver(() => Hall)
    // sessions(@Root() session: Session) {
    //   return session;
    // }

    // @Query(() => Session, { nullable: true })
    // taken_sessions(@Arg("hall", () => String) hall: string): Promise<Session | undefined> {
    //   return Session.findOne({hall: hall});
    // }






  }
  