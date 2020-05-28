<script>
  import "./bulma.scss";
  import { Router } from "svelte-router-spa";
  import { routes } from "./routes";

  import Navigation from "@components/Navigation";

  import { ws } from "@stores/wsapi";

  let data = {};

  $: if ("event" in $ws) {
    data = { ...data, ...$ws };
    console.log("event >>", data);
  }
</script>

<style>
  :global(h1) {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>

<Navigation />
<section class="hero is-fullheight-with-navbar">
  <Router {routes} />
</section>
