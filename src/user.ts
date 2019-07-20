import { Resolver, ObjectType, Field, Query } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  name!: string;

  @Field()
  age!: number;
}

@Resolver()
export class UserResolver {
  private data: User[] = [
    {
      age: 30,
      name: "floross"
    }
  ];

  @Query(returns => [User])
  users(): User[] {
    return this.data;
  }
}