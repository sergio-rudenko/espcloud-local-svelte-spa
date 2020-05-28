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
  <h1>Setup</h1>
  <p>
    <Navigate to="/setup/wifi/router">WiFi-R</Navigate>
    |
    <Navigate to="/setup/wifi/softap">WiFi-S</Navigate>
    |
    <Navigate to="/setup/users">Users</Navigate>
    |
    <Navigate to="/setup/cloud">Cloud</Navigate>
  </p>
  <p>
    Time:
    <strong>{formatter.format($time)}</strong>
  </p>
</Transition>
