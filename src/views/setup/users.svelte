<script>
  import { Navigate, navigateTo } from "svelte-router-spa";
  import Transition from "@components/RouteTransition";

  export let currentRoute = null;
  export let params = {};

  console.log("currentRoute:", currentRoute);
  console.log("params:", params);
</script>

<Transition>
  <h1>Users</h1>
  <p>
    <Navigate to="/setup">Назад</Navigate>
  </p>
</Transition>
