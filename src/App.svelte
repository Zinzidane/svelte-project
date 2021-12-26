<script lang="ts">
	import Header from './UI/Header.svelte';
	import type { Meetup } from './types/meetup.type';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import EditMeetup from './Meetups/EditMeetup.svelte';
	import meetups from "./Meetups/meetups-store";
	import MeetupDetail from './Meetups/MeetupDetail.svelte';
	import { onMount } from 'svelte';
	import LoadingSpinner from './UI/LoadingSpinner.svelte';
	import CustomError from './UI/CustomError.svelte';

	let page = "overview";
	let pageData: {id?: string} = {};
	let isLoading = true;
	let error = null;

	let editMode: boolean = false;
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
		fetch(`https://svelte-project-e52c4-default-rtdb.europe-west1.firebasedatabase.app/meetups.json`)
		.then(res => {
			if (!res.ok) {
				throw new Error('Error occured during fetching meetups');
			}
			return res.json();
		})
		.then(data => {
			const loadedMeetups = [];
			for (const key in data) {
				loadedMeetups.push({ ...data[key], id: key });
			}
			isLoading = false
			meetups.setMeetups(loadedMeetups.reverse());
		})
		.catch(err => {
			isLoading = false;
			error = err;
			console.error(err);
		});
	})

	function savedMeetup(): void {
		resetEdit();
	}
  
	function cancelEdit(): void {
		resetEdit();
	}

	function resetEdit(): void {
		editMode = false;
		editedMeetup ={
			title: '',
			subtitle: '',
			description: '',
			imageUrl: '',
			address: '',
			contactEmail: '',
			isFavorite: false
		};
	}
  
	function showDetails(event): void {
	  page = "details";
	  pageData.id = event.detail;
	}
  
	function closeDetails(): void {
	  page = "overview";
	  pageData = {};
	}
  
	function startEdit(event): void {
	  editMode = true;
	  editedMeetup = event.detail;
	}

	function clearError() {
		error = null;
	}
</script>

<style>
	main {
		margin-top: 5rem;
	}
</style>

<Header />

{#if error}
<CustomError message={error.message} on:cancel={clearError}>
</CustomError>
{/if}

<main>
	{#if page === 'overview'}
		{#if editMode}
		<EditMeetup meetup={editedMeetup} on:save={savedMeetup} on:cancel={cancelEdit} />
		{/if}
		{#if isLoading}
			<LoadingSpinner />
		{:else}
			<MeetupGrid
				meetups={$meetups}
				on:showdetails={showDetails}
				on:edit={startEdit}
				on:add={() => {editMode = true}} />
		{/if}
	{:else}
		<MeetupDetail id={pageData.id} on:close={closeDetails} />
	{/if}
</main>
