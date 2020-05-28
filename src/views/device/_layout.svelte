<script>
  import { Route } from "svelte-router-spa";
  import Navigation from "@components/Navigation";

  export let currentRoute;
  const params = {};

  console.log("cr:", currentRoute);
</script>

<style>

</style>

<Navigation />
<Route {currentRoute} {params} />
