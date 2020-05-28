<script>
  import { Navigate, navigateTo } from "svelte-router-spa";
  import Transition from "@components/RouteTransition";
  import { time } from "@stores/global";

  export let currentRoute;
  export let params;

  const formatter = new Intl.DateTimeFormat("en", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  });
</script>

<style>

</style>

<Transition>
  <h1>Home</h1>
  <p>
    Now I want to generate a
    <Navigate to="/setup">link to Setup</Navigate>
  </p>
  <p>
    Now I want to generate a
    <Navigate to="/factory">link to Factory</Navigate>
  </p>
  <p>
    Time:
    <strong>{formatter.format($time)}</strong>
  </p>
</Transition>
