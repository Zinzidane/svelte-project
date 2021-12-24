<script lang="ts">
import { createEventDispatcher } from "svelte";
import type { Meetup } from "../types/meetup.type";

import Button from "../UI/Button.svelte";
import TextInput from "../UI/TextInput.svelte";
export let meetup: Meetup = {
    id: Math.random().toString(),
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    address: '',
    contactEmail: '',
    isFavorite: false
};

const dispatch = createEventDispatcher();

function submitForm(): void {
    dispatch('save', meetup);
    meetup = {
        id: Math.random().toString(),
        title: '',
        subtitle: '',
        description: '',
        imageUrl: '',
        address: '',
        contactEmail: '',
        isFavorite: false
    };
}
    
</script>

<style>
	form {
		width: 30rem;
		max-width: 90%;
		margin: auto;
	}
</style>

<form on:submit|preventDefault="{submitForm}">
    <TextInput controlType="input" id="title" label="Title" value={meetup.title} on:input={event => (meetup.title = event.target.value)} />
    <TextInput controlType="input" id="subtitle" label="Subtitle" value={meetup.subtitle} on:input={event => (meetup.subtitle = event.target.value)} />
    <TextInput controlType="input" id="address" label="Address" value={meetup.address} on:input={event => (meetup.address = event.target.value)} />
    <TextInput controlType="input" id="imageurl" label="Image URL" value={meetup.imageUrl} on:input={event => (meetup.imageUrl = event.target.value)} />
    <TextInput controlType="input" inputType="mail" id="email" label="Contact email" value={meetup.contactEmail} on:input={event => (meetup.contactEmail = event.target.value)} />
    <TextInput controlType="textarea" id="description" label="Description" value={meetup.description} on:input={event => (meetup.description = event.target.value)} />
    <Button type="submit" caption="Save"></Button>
</form>
