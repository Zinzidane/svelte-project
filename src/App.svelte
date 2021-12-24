<script lang="ts">
	import Header from './UI/Header.svelte';
	import type { Meetup } from './types/meetup.type';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import EditMeetup from './Meetups/EditMeetup.svelte';

	let meetups: Meetup[] = [
		{
		id: "m1",
		title: "Coding Bootcamp",
		subtitle: "Learn to code in 2 hours",
		description:
			"In this meetup, we will have some experts that teach you how to code!",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG",
		address: "27th Nerd Road, 32523 New York",
		contactEmail: "code@test.com",
		isFavorite: false
		},
		{
		id: "m2",
		title: "Swim Together",
		subtitle: "Let's go for some swimming",
		description: "We will simply swim some rounds!",
		imageUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg",
		address: "27th Nerd Road, 32523 New York",
		contactEmail: "swim@test.com",
		isFavorite: false
		}
	];

	function saveMeetup(event): void {
		const meetup = event.detail;
		const meetupIndex = meetups.findIndex(m => m.id === meetup.id);
		if (meetupIndex > -1) {
			meetups = meetups.splice(meetupIndex, 1, meetup);
		} else {
			meetups = [...meetups, meetup];
		}
	}

	function toggleFavorite(event): void {
		const id = event.detail;
		meetups = meetups.map(m => m.id === id ? ({...m, isFavorite: !m.isFavorite}) : m);
	}
</script>

<style>
	main {
		margin-top: 5rem;
	}
</style>

<Header />

<main>
	<EditMeetup on:save={saveMeetup} />
	<MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>