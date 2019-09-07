import { Resolver, Query } from 'type-graphql'
import { getConnection,getRepository } from "typeorm";

import Company from '../schemas/Company'

/**might need to create independent repository file for Company table */
import { CompanyRepository } from '../repository/CompanyRepository'

@Resolver(of => Company)
export default class CompanyResolver {
	@Query(returns => [Company], { description: 'list of companies' })
	async companies(): Promise<Company[]> {
		const companyRepository = getRepository(Company,'postgresql')
		const companiesData = await companyRepository.find()
		return companiesData
	}
}


