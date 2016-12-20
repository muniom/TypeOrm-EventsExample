import { Table, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import { OneToMany, ManyToOne } from "typeorm";
import { JoinTable } from "typeorm";

import { EventGuest } from './event.guest';

@Table('events')
export class Event {

	constructor(
	) {
		
	}

	/* Guests */
	@OneToMany(type => EventGuest, guest => guest.eventId, { // Error: Relation with property name eventId in EventGuest entity was not found.
		//@ManyToOne(type => EventGuest, guest => guest.event, { //  LEFT JOIN eventguests eg ON eg.event=e.eventId
		cascadeAll: true
	})
	//@JoinTable()
	guests: EventGuest[] = []; //number[] = []; // 

	
	/* Callout Id */
	@PrimaryGeneratedColumn({generated: true})
	//@RelationId((entrant: EventGuest) => entrant.eventId) 
	eventId: number;

	// What
	@Column({})
	name: string;

}
