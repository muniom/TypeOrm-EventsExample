import { Table, PrimaryColumn, PrimaryGeneratedColumn, Column} from "typeorm";

@Table('members')
export class Member {

	constructor(
	) {
		
	} 
	 
	/* Member Id */
	@PrimaryGeneratedColumn({generated: true})
	memberId: number; 
		
	/* Nick-Name*/
	@Column({})
	nick: string; 
	

};