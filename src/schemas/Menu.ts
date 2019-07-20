import {Query,Resolver,Field, ObjectType} from 'type-graphql'
import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";
import {ObjectId} from 'mongodb'
import {GraphQLJSON, GraphQLJSONObject} from 'graphql-type-json'
import {ObjectScalar} from '../my-scalars/ObjectJson'

@ObjectType()
export  class Menu {

	@Field()
	readonly _id: ObjectId;

	@Field()
	name: string
	// need to figure out the type object/json here
}


@Resolver()
export class MenuResolver {
  
  private data: Menu[] = [
    {
			_id:new ObjectId("5c51bbef70ceca0001fd928f"),
      name:'test'
    }
	];
	
  @Query(returns => [Menu])
  menus(): Menu[] {
    return this.data;
  }
}