<script lang="ts">
    import { slide } from 'svelte/transition';
</script>
<style>
    span {
        display: inline-block;
        margin: 0 0.25rem;
        padding: 0 0.5rem;
        border-radius: 3px;
        border: 1px solid #cf0056;
        background-color: #cf0056;
        color: white;
        font-family: 'Lato', sans-serif;
        font-size: 0.8rem;
    }
</style>


<span transition:slide><slot></slot></span>