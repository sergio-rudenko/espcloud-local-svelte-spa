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

<Transition>
  <h1>Factory</h1>
  <p>
    <Navigate to="/factory/firmware">Firmware</Navigate>
    |
    <Navigate to="/factory/reset">Reset</Navigate>
  </p>
  <p>
    Time:
    <strong>{formatter.format($time)}</strong>
  </p>
</Transition>
