<script lang="ts">
	import Header from './UI/Header.svelte';
	import type { Meetup } from './types/meetup.type';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
	import TextInput from './UI/TextInput.svelte';
	import Button from './UI/Button.svelte';

	export let title = '';
	export let subtitle = '';
	export let address = '';
	export let description = '';
	export let imageUrl = '';
	export let contactEmail = '';

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

	function addMeetup() {
		meetups = [...meetups, {id: Math.random().toString(), title, subtitle, description, imageUrl, address, contactEmail, isFavorite: false}]
	}

	function toggleFavorite(event) {
		const id = event.detail;
		meetups = meetups.map(m => m.id === id ? ({...m, isFavorite: !m.isFavorite}) : m);
	}
</script>

<style>
	main {
		margin-top: 5rem;
	}

	form {
		width: 30rem;
		max-width: 90%;
		margin: auto;
	}
</style>

<Header />

<main>
	<form on:submit|preventDefault="{addMeetup}">
		<TextInput controlType="input" id="title" label="Title" value={title} on:input={event => (title = event.target.value)} />
		<TextInput controlType="input" id="subtitle" label="Subtitle" value={subtitle} on:input={event => (subtitle = event.target.value)} />
		<TextInput controlType="input" id="address" label="Address" value={address} on:input={event => (address = event.target.value)} />
		<TextInput controlType="input" id="imageurl" label="Image URL" value={imageUrl} on:input={event => (imageUrl = event.target.value)} />
		<TextInput controlType="input" inputType="mail" id="email" label="Contact email" value={contactEmail} on:input={event => (contactEmail = event.target.value)} />
		<TextInput controlType="textarea" id="description" label="Description" value={description} on:input={event => (description = event.target.value)} />
		<Button type="submit" caption="Save"></Button>
	</form>
	<MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>