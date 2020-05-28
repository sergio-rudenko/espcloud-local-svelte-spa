<script>
  import { Navigate } from "svelte-router-spa";
  import { navigateTo } from "svelte-router-spa";

  import { counter } from "@stores/global";
  import Transition from "@components/Transition";

  export let name = "Login";
  console.log("name:", name);

  $: doubled = $counter * 2;

  function onClickRedirect() {
    navigateTo("/");
  }
</script>

<style>
  .my-content {
    padding: 1em;
    margin-top: 3.25rem;
    text-align: center;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>

<Transition>
  <div class="my-content">
    <p>
      Now I want to generate a
      <Navigate to="/">link to /</Navigate>
    </p>
    <h1>Page: {name}</h1>
    <h3>counter: {$counter} / {doubled}</h3>
    <button class="button" on:click={counter.increment}>++</button>
    <button class="button" on:click={counter.decrement}>--</button>
    <button class="button is-warning" on:click={counter.reset(123)}>
      reset
    </button>

    <button class="button is-primary" on:click={onClickRedirect}>ToHome</button>
  </div>
</Transition>
