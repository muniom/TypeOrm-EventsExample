import "reflect-metadata";
import { createConnection } from "typeorm";
import { Member } from "./entity/member";
import { Event } from "./entity/event";
import { EventGuest } from "./entity/event.guest";

createConnection(
	{
		"name": "default",
		"driver": {
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "typeorm_example",
			password: "test",
			database: "typeorm_example"
		},
		"autoSchemaSync": true,
		"entities": [
		  "src/entity/*.js"
		],
		"subscribers": [
		  "src/subscriber/*.js,"
		],
		"migrations": [
		  "src/migration/*.js"
		],
		"cli": {
		  "entitiesDir": "src/entity",
		  "migrationsDir": "src/migration",
		  "subscribersDir": "src/subscriber"
		},
		"logging": {
			"logQueries": true,
			"logFailedQueryError": true
		} 
	}).then(async connection => {
		
		// Repositories
		const memberRepository = connection.getRepository(Member);
		const eventRepository = connection.getRepository(Event);
		const eventGuestRepository = connection.getRepository(EventGuest);

		// Add Example Entities
		let addData = true;
		if (addData) {
			// Members
			const member1 = new Member();
			member1.nick = "Johno";
			await memberRepository.persist(member1);
			const member2 = new Member();
			member2.nick = "Robbo";
			await memberRepository.persist(member2);

			// Event 1
			/*const event1 = new Event();
			event1.name = "Birthday";
			await eventRepository.persist(event1);
			const event1Guest1 = new EventGuest();
			event1Guest1.memberId = member1.memberId;
			event1Guest1.eventId = event1.eventId;
			await eventGuestRepository.persist(event1Guest1);*/

			// Event 2
			const event2 = new Event();
			event2.name = "Meeting";
			//await eventRepository.persist(event2);
			const event2Guest1 = new EventGuest();
			event2Guest1.memberId = member1.memberId;
			//event2Guest1.eventId = event2.eventId;
			event2.guests.push(event2Guest1);
			//await eventGuestRepository.persist(event2Guest1);
			const event2Guest2 = new EventGuest();
			event2Guest2.memberId = member2.memberId;
			//event2Guest2.eventId = event2.eventId;
			event2.guests.push(event2Guest2);
			//await eventGuestRepository.persist(event2Guest2);

			console.log(event2);
			await eventRepository.persist(event2);

			// ..later
			//event2Guest2.respondedWith = 'Yes';
			//await eventGuestRepository.persist(event2Guest2);
			//console.log(event2Guest2);

			console.log("Event has been saved: ", event2);
		}

		// Extract Data
		let tryWithEntityManager = false;
		if (tryWithEntityManager) {
			const entityManager = connection.entityManager;
			const event = await entityManager.find(Event, {
				alias: 'e',
				leftJoinAndSelect: { eg: 'e.eventId' } // Error: Relation metadata for e#eventId was not found.
				//leftJoinRelationId: { eg: 'e.eventId' }
				//innerJoinAndSelect: { eg: 'e.guests' } 
			}).catch(error => console.log("Error: ", error));
			console.log("Event: ", event);
		} else {
			// Produces 2 events with empty guests array in node, 3 rows in raw sql with correct relational id's (which would reuire merging)
			const event:any = await connection
				.getRepository(Event)
				.createQueryBuilder("e")
				.innerJoinAndSelect(EventGuest, "eg", "eg.eventId=e.eventId")
				//.leftJoinAndSelect(EventGuest, "eg", "eg.eventId=e.eventId")
				.getMany(); // SELECT e.eventId AS e_eventId, e.name AS e_name, eg.memberId AS eg_memberId, eg.eventId AS eg_eventId, eg.eventGuestId AS eg_eventGuestId, eg.respondedWith AS eg_respondedWith FROM typeorm_example.events e LEFT JOIN typeorm_example.eventguests eg ON eg.eventId=e.eventId
			console.log("Event: ", event, event.guests);
		}
	}
).catch(error => console.log("Error: ", error));
