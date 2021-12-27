<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const res = await fetch(
			`https://svelte-project-e52c4-default-rtdb.europe-west1.firebasedatabase.app/meetups.json`
		);

		if (res.ok) {
			const data = await res.json();
			const loadedMeetups = [];
			for (const key in data) {
				loadedMeetups.push({ ...data[key], id: key });
			}
			return {
				props: {
					fetchedMeetups: loadedMeetups.reverse()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load meetups`)
		};
	}
</script>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Meetup } from '../types/meetup.type';
	import meetups from '../stores/meetups-store';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Button from '../components/UI/Button.svelte';
	import LoadingSpinner from '../components/UI/LoadingSpinner.svelte';
	import EditMeetup from '../components/Meetups/EditMeetup.svelte';
	import MeetupFilter from '../components/Meetups/MeetupFilter.svelte';
	import MeetupItem from '../components/Meetups/MeetupItem.svelte';

	export let fetchedMeetups: Meetup[];

	let loadedMeetups = [];
	let unsubscribe;

	let isLoading;

	let editMode = false;
	let editedMeetup: Meetup = {
		title: '',
		subtitle: '',
		description: '',
		imageUrl: '',
		address: '',
		contactEmail: '',
		isFavorite: false
	};

	onMount(() => {
		unsubscribe = meetups.subscribe((items) => (loadedMeetups = items));
		meetups.setMeetups(fetchedMeetups);
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});

	let favsOnly = false;

	$: filteredMeetups = favsOnly ? loadedMeetups.filter((m) => m.isFavorite) : loadedMeetups;

	function setFilter(event): void {
		favsOnly = event.detail === 1;
	}

	function savedMeetup(): void {
		resetEdit();
	}

	function cancelEdit(): void {
		resetEdit();
	}

	function resetEdit(): void {
		editMode = false;
		editedMeetup = {
			title: '',
			subtitle: '',
			description: '',
			imageUrl: '',
			address: '',
			contactEmail: '',
			isFavorite: false
		};
	}

	function startEdit(event): void {
		editMode = true;
		editedMeetup = event.detail;
	}

	function startAdd(): void {
		editMode = true;
	}
</script>

<svelte:head>
	<title>Meetups</title>
</svelte:head>

{#if editMode}
	<EditMeetup meetup={editedMeetup} on:save={savedMeetup} on:cancel={cancelEdit} />
{/if}
{#if isLoading}
	<LoadingSpinner />
{:else}
	<section id="meetup-controls">
		<MeetupFilter on:select={setFilter} />
		<Button on:click={startAdd}>New Meetup</Button>
	</section>

	{#if filteredMeetups?.length === 0}
		<p id="no-meetups">No meetups found.</p>
	{/if}
	<section id="meetups">
		{#each filteredMeetups as meetup (meetup?.id)}
			<div transition:scale animate:flip={{ duration: 300 }}>
				<MeetupItem {meetup} on:togglefavorite on:edit={startEdit} />
			</div>
		{/each}
	</section>
{/if}

<style>
	#meetups {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 1rem;
	}

	#meetup-controls {
		margin: 1rem;
		display: flex;
		justify-content: space-between;
	}

	#no-meetups {
		margin: 1rem;
	}

	@media (min-width: 768px) {
		#meetups {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
