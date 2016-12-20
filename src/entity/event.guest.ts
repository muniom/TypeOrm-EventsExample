import { Table, PrimaryColumn, PrimaryGeneratedColumn, Column, JoinColumn, RelationId } from "typeorm";
import { ManyToOne, OneToMany, OneToOne } from "typeorm";

import { Member } from './member';
import { Event } from './event';

@Table('eventguests')
export class EventGuest {

	constructor(
	) {
		
	} 
	 

	/* Event Relation
	//@ManyToOne(type => Event, event => event.eventId, { // Error: Relation with property name eventId in EventGuest entity was not found
	@ManyToOne(type => Event, event => event.guests, { // 
	})
	event: Event; */
	
	/* Member Relation 
	@OneToOne(type => Member, member => member.memberId, {
	})
	@JoinColumn()
	member: Member;*/
	

	/* MemberId */
	//@Column({})
	@OneToOne(type => Member, member => member.memberId, { // Error: ER_CANT_CREATE_TABLE: Can't create table
	})
	@JoinColumn()
	memberId: number;

	/* Event Id */
	//@Column({})
	//@RelationId((event: Event) => event.eventId) // ? 
	@ManyToOne(type => Event, event => event.eventId, { // Error: Relation with property name eventId in EventGuest entity was not found
		//primary: true
	})
	@JoinColumn()
	eventId: number;

	/* Rel. Id */
	@PrimaryGeneratedColumn({
		generated: true 
	})
	eventGuestId: number;
		
	/* Response Answer */
	@Column({nullable: true})
	respondedWith: string;


};