import { getConnection } from "typeorm";

export const CompanyRepository = () => {
	return getConnection('postgresql')
}