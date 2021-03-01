import {
  Arg,
  Field,
  InputType,
  Mutation,
  // InputType,
  // Field,
  // Int,
  Query,
  // ObjectType,
  Resolver
} from "type-graphql";
import { Hall } from "../entities/Hall";


// @InputType()
// class HallInput {
//   @Field()
//   name: string;
// }

@InputType()
class HallInput {
  @Field()
  hall_name: string;
}

// @ObjectType()
// class PaginatedHalls {
//   @Field(() => [Hall])
//   posts: Hall[];
//   @Field()
//   hasMore: boolean;
// }



@Resolver(Hall)
export class HallResolver {
  @Query(() => Hall, { nullable: true })
    hall(@Arg("name", () => String) name: string): Promise<Hall | undefined> {
      return Hall.findOne({hall_name: name});
    }

    @Query(() => [Hall])
    halls() {
      return Hall.find({relations:["sessions"]});
    }

    @Mutation(() => Hall )
    async createHall(
      @Arg("input") input: HallInput
      ): Promise<Hall | undefined>{
      return Hall.create({
        ...input
      }).save()
    }





  }
  