import { ObjectType, Field } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
@ObjectType()
export default class Company {
	@PrimaryGeneratedColumn()
	@Field()
	id: number

	@Field({nullable:false})
	@Column()
	name: string

	@Field()
	@Column()
	age: number

	@Field()
	@Column()
	address: string
}