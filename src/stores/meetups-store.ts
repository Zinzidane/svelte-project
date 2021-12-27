import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Meetup } from '../types/meetup.type';

const meetupsStore: Writable<Meetup[]> = writable([]);

const customMeetupsStore = {
	subscribe: meetupsStore.subscribe,
	setMeetups: (meetups: Meetup[]): void => {
		meetupsStore.set(meetups);
	},
	addMeetup: (meetup: Meetup): void => {
		meetupsStore.update((items) => {
			return [meetup, ...items];
		});
	},
	updateMeetup: (id: string, meetup: Meetup): void => {
		meetupsStore.update((items) => {
			const meetupIndex = items.findIndex((i) => i.id === id);
			const updatedMeetup = { ...items[meetupIndex], ...meetup };
			const updatedMeetups = [...items];
			updatedMeetups[meetupIndex] = updatedMeetup;
			return updatedMeetups;
		});
	},
	removeMeetup: (id: string): void => {
		meetupsStore.update((items) => {
			return items.filter((i) => i.id !== id);
		});
	},
	toggleFavorite: (id: string): void => {
		meetupsStore.update((items) => {
			const updatedMeetup = { ...items.find((m) => m.id === id) };
			updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
			const meetupIndex = items.findIndex((m) => m.id === id);
			const updatedMeetups = [...items];
			updatedMeetups[meetupIndex] = updatedMeetup;
			return updatedMeetups;
		});
	}
};

export default customMeetupsStore;
