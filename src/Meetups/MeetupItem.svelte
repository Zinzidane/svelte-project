<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Meetup } from "../types/meetup.type";
    import Badge from "../UI/Badge.svelte";
	  import meetups from "./meetups-store";
    import Button from "../UI/Button.svelte";

    export let meetup: Meetup;

    let isLoading = false;

    const dispatch = createEventDispatcher();

    function toggleFavorite(): void {
      fetch(`https://svelte-project-e52c4-default-rtdb.europe-west1.firebasedatabase.app/meetups/${meetup.id}.json`, {
          method: 'PATCH',
          body: JSON.stringify({isFavorite: !meetup.isFavorite}),
          headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
          if (!res.ok) {
              throw new Error('Error occured');
          }
          return res.json();
      })
      .then(data => {
          isLoading = false;
          meetups.toggleFavorite(meetup.id);
      })
      .catch(err => {
        isLoading = false;
        console.error(err);
      });
    }
</script>

<style>
    article {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
      border-radius: 5px;
      background: white;
      margin: 1rem;
    }
  
    header,
    .content,
    footer {
      padding: 1rem;
    }
  
    .image {
      width: 100%;
      height: 14rem;
    }
  
    .image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  
    h1 {
      font-size: 1.25rem;
      margin: 0.5rem 0;
      font-family: "Roboto Slab", sans-serif;
    }
  
    h2 {
      font-size: 1rem;
      color: #808080;
      margin: 0.5rem 0;
    }
  
    p {
      font-size: 1.25rem;
      margin: 0;
    }
  
    div {
      text-align: right;
    }

    .content {
        height: 4rem;
    }
</style>
  

<article>
    <header>
        <h1>
          {meetup.title}
          {#if meetup.isFavorite}
            <Badge>FAVORITE</Badge>
          {/if}
        </h1>
        <h2>{meetup.subtitle}</h2>
        <p>{meetup.address}</p>
    </header>
    <div class="image">
        <img src="{meetup.imageUrl}" alt="{meetup.title}">
    </div>
    <div class="content">{meetup.description}</div>
    <footer>
        <Button mode="outline" type="button" on:click={() => dispatch('edit', meetup)}>
          Edit
        </Button>
        {#if isLoading}
        <span>Changing...</span>
        {:else}
        <Button
          color="{meetup.isFavorite ? null : 'success'}"
          mode="outline"
          on:click={toggleFavorite}>
          {meetup.isFavorite ? 'Unfavorite' : 'Favorite'}
        </Button>
        {/if}
        <Button on:click={() => dispatch('showdetails', meetup.id)}>
          Show Details
        </Button>
    </footer>
</article>