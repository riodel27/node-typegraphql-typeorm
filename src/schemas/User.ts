import { Field, ObjectType, } from 'type-graphql'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectId } from 'mongodb'

@Entity()
@ObjectType()
export default class User {
	@ObjectIdColumn()  /** typeorm */
	@Field() /** type-graphql */
	_id: ObjectId; /** graphql */

	@Field()
	@Column({ readonly: true }) /** readonly not working */
	readonly username: string

	@Field()
	@Column()
	email: string

	@Field()
	@Column()
	password: string

	@Field()
	token: string

	@Field(type => GraphQLJSONObject)
	@Column()
	random: object
}
