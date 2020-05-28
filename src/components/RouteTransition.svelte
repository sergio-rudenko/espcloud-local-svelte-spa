<script>
  //   import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";
</script>

<style>

</style>

<!-- <div in:fade={{ duration: 750 }}> -->
<div in:fly={{ x: 200, duration: 750 }} class="">
  <slot />
</div>
