<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const id = page.params.id;
		const res = await fetch(
			`https://svelte-project-e52c4-default-rtdb.europe-west1.firebasedatabase.app/meetups/${id}.json`
		);

		if (res.ok) {
			const data = await res.json();
			return {
				props: {
					fetchedMeetup: { ...data, id }
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load the meetup`)
		};
	}
</script>

<script lang="ts">
	import Button from '../components/UI/Button.svelte';
	import type { Meetup } from '../types/meetup.type';

	export let fetchedMeetup: Meetup;
</script>

<section>
	<div class="image">
		<img src={fetchedMeetup.imageUrl} alt={fetchedMeetup.title} />
	</div>
	<div class="content">
		<h1>{fetchedMeetup.title}</h1>
		<h2>{fetchedMeetup.subtitle} - {fetchedMeetup.address}</h2>
		<p>{fetchedMeetup.description}</p>
		<Button href="mailto:{fetchedMeetup.contactEmail}">Contact</Button>
		<Button mode="outline" href="/">Close</Button>
	</div>
</section>

<style>
	section {
		margin-top: 4rem;
	}

	.image {
		width: 100%;
		height: 25rem;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image {
		background: #e7e7e7;
	}

	.content {
		text-align: center;
		width: 80%;
		margin: auto;
	}

	h1 {
		font-size: 2rem;
		font-family: 'Roboto Slab', sans-serif;
		margin: 0.5rem 0;
	}

	h2 {
		font-size: 1.25rem;
		color: #6b6b6b;
	}

	p {
		font-size: 1.5rem;
	}
</style>
