<script lang="ts">
import { createEventDispatcher } from "svelte";

import Button from "../UI/Button.svelte";
import TextInput from "../UI/TextInput.svelte";

export let title = '';
export let subtitle = '';
export let address = '';
export let description = '';
export let imageUrl = '';
export let contactEmail = '';

const dispatch = createEventDispatcher();

function submitForm(): void {
    dispatch('save', {
        id: Math.random().toString(),
        title,
        subtitle,
        description,
        imageUrl,
        address,
        contactEmail,
        isFavorite: false
    });
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
    <TextInput controlType="input" id="title" label="Title" value={title} on:input={event => (title = event.target.value)} />
    <TextInput controlType="input" id="subtitle" label="Subtitle" value={subtitle} on:input={event => (subtitle = event.target.value)} />
    <TextInput controlType="input" id="address" label="Address" value={address} on:input={event => (address = event.target.value)} />
    <TextInput controlType="input" id="imageurl" label="Image URL" value={imageUrl} on:input={event => (imageUrl = event.target.value)} />
    <TextInput controlType="input" inputType="mail" id="email" label="Contact email" value={contactEmail} on:input={event => (contactEmail = event.target.value)} />
    <TextInput controlType="textarea" id="description" label="Description" value={description} on:input={event => (description = event.target.value)} />
    <Button type="submit" caption="Save"></Button>
</form>
