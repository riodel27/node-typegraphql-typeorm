import {Field, ObjectType,} from 'type-graphql'
import {Entity, PrimaryGeneratedColumn, Column,ObjectIdColumn,ObjectID,CreateDateColumn,UpdateDateColumn} from "typeorm";
import {ObjectId} from 'mongodb'

@Entity()
@ObjectType()
export default class User {

	@ObjectIdColumn()  /** typeorm */
	@Field() /** type-graphql */
  id: ObjectId; /** graphql */

	@Field()
	@Column({readonly:true}) /** readonly not working */
	readonly username: string

	@Field()
	@Column()
	email: string

	@Field()
	@CreateDateColumn()
	createdAt: Date
	


}
