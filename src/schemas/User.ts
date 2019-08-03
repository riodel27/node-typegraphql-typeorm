import {Query,Resolver,Field, ObjectType} from 'type-graphql'
import {Entity, PrimaryGeneratedColumn, Column,ObjectIdColumn,ObjectID} from "typeorm";
import {ObjectId} from 'mongodb'


@Entity()
@ObjectType()
export default class User {

	@ObjectIdColumn() //typeorm
	@Field() // type-graphql
  id: ObjectId; // graphql

	@Field()
	@Column()
	username: string

	@Field()
	@Column()
	email: string
}
