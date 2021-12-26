<script lang="ts">
	import Header from './UI/Header.svelte';
	import type { Meetup } from './types/meetup.type';
	import MeetupGrid from './Meetups/MeetupGrid.svelte';
    import EditMeetup from './Meetups/EditMeetup.svelte';
	import meetups from "./Meetups/meetups-store";
	import MeetupDetail from './Meetups/MeetupDetail.svelte';

	let page = "overview";
	let pageData: {id?: string} = {};

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
</script>

<style>
	main {
		margin-top: 5rem;
	}
</style>

<Header />

<main>
	{#if page === 'overview'}
		{#if editMode}
		<EditMeetup meetup={editedMeetup} on:save={savedMeetup} on:cancel={cancelEdit} />
		{/if}
		<MeetupGrid
			meetups={$meetups}
			on:showdetails={showDetails}
			on:edit={startEdit}
			on:add={() => {editMode = true}} />
	{:else}
		<MeetupDetail id={pageData.id} on:close={closeDetails} />
	{/if}
</main>
