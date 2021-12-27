<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { isEmpty, isValidEmail } from '../../helpers/validation';
	import type { Meetup } from '../../types/meetup.type';
	import meetups from '../../stores/meetups-store';

	import Button from '../UI/Button.svelte';
	import Modal from '../UI/Modal.svelte';
	import TextInput from '../UI/TextInput.svelte';
	export let meetup: Meetup = null;

	const requiredMessage = 'Value is required';
	const emailMessage = 'Please enter a valid email address.';

	$: meetupValidityFields = meetup && {
		title: { valid: !isEmpty(meetup.title), validityMessage: requiredMessage },
		subtitle: { valid: !isEmpty(meetup.subtitle), validityMessage: requiredMessage },
		address: { valid: !isEmpty(meetup.address), validityMessage: requiredMessage },
		description: { valid: !isEmpty(meetup.description), validityMessage: requiredMessage },
		imageUrl: { valid: !isEmpty(meetup.imageUrl), validityMessage: requiredMessage },
		contactEmail: { valid: isValidEmail(meetup.contactEmail), validityMessage: emailMessage }
	};

	$: formInvalid =
		meetupValidityFields && Object.values(meetupValidityFields).some((k) => !k.valid);

	const dispatch = createEventDispatcher();

	function submitForm(): void {
		if (meetup.id) {
			const { id, ...meetupData } = meetup;
			fetch(
				`https://svelte-project-e52c4-default-rtdb.europe-west1.firebasedatabase.app/meetups/${id}.json`,
				{
					method: 'PATCH',
					body: JSON.stringify(meetupData),
					headers: { 'Content-Type': 'application/json' }
				}
			)
				.then((res) => {
					if (!res.ok) {
						throw new Error('Error occured during updating the meetup');
					}
					return res.json();
				})
				.then((data) => {
					meetups.updateMeetup(data.name, meetup);
				})
				.catch(console.error);
		} else {
			fetch(
				`https://svelte-project-e52c4-default-rtdb.europe-west1.firebasedatabase.app/meetups.json`,
				{
					method: 'POST',
					body: JSON.stringify(meetup),
					headers: { 'Content-Type': 'application/json' }
				}
			)
				.then((res) => {
					if (!res.ok) {
						throw new Error('Error occured during adding new meetup');
					}
					return res.json();
				})
				.then((data) => {
					meetups.addMeetup({ ...meetup, id: data.name });
				})
				.catch(console.error);
		}
		dispatch('save');
	}

	function deleteMeetup(): void {
		fetch(
			`https://svelte-project-e52c4-default-rtdb.europe-west1.firebasedatabase.app/meetups/${meetup.id}.json`,
			{
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			}
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error('Error occured during deleting the meetup');
				}
				return res.json();
			})
			.then(() => {
				meetups.removeMeetup(meetup.id);
				dispatch('save');
			})
			.catch(console.error);
	}

	function cancel(): void {
		dispatch('cancel');
	}
</script>

<Modal title="Edit meetup data" on:cancel>
	<form>
		<TextInput
			controlType="input"
			id="title"
			label="Title"
			value={meetup.title}
			{...meetupValidityFields?.title}
			on:input={(event) => (meetup.title = event.target.value)}
		/>
		<TextInput
			controlType="input"
			id="subtitle"
			label="Subtitle"
			value={meetup.subtitle}
			{...meetupValidityFields?.subtitle}
			on:input={(event) => (meetup.subtitle = event.target.value)}
		/>
		<TextInput
			controlType="input"
			id="address"
			label="Address"
			value={meetup.address}
			{...meetupValidityFields?.address}
			on:input={(event) => (meetup.address = event.target.value)}
		/>
		<TextInput
			controlType="input"
			id="imageurl"
			label="Image URL"
			value={meetup.imageUrl}
			{...meetupValidityFields?.imageUrl}
			on:input={(event) => (meetup.imageUrl = event.target.value)}
		/>
		<TextInput
			controlType="input"
			inputType="mail"
			id="email"
			label="Contact email"
			value={meetup.contactEmail}
			{...meetupValidityFields?.contactEmail}
			on:input={(event) => (meetup.contactEmail = event.target.value)}
		/>
		<TextInput
			controlType="textarea"
			id="description"
			label="Description"
			bind:value={meetup.description}
			{...meetupValidityFields?.description}
		/>
	</form>
	<div slot="footer">
		<Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
		<Button type="button" on:click={submitForm} disabled={formInvalid}>Save</Button>
		{#if meetup.id}
			<Button type="button" on:click={deleteMeetup}>Delete</Button>
		{/if}
	</div>
</Modal>

<style>
	form {
		width: 100%;
	}
</style>
