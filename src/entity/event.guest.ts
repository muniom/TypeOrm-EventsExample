import { Table, PrimaryColumn, PrimaryGeneratedColumn, Column, RelationId } from "typeorm";
import { ManyToOne, OneToMany } from "typeorm";

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
	event: Event;*/
	
	/* Member Relation 
	@ManyToOne(type => Member, member => member.memberId, {
	})
	member: Member;*/
	

	/* MemberId */
	@Column({})
	/*@OneToMany(type => Member, member => member.memberId, { // Error: ER_CANT_CREATE_TABLE: Can't create table
	})*/
	memberId: number;

	/* Event Id*/
	@Column({})
	@RelationId((event: Event) => event.eventId) // ? 
	/*@OneToMany(type => Event, event => event.eventId, { // Error: Relation with property name eventId in EventGuest entity was not found
		//primary: true
	})*/
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