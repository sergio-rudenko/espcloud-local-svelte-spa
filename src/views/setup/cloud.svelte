<script>
  import { Navigate, navigateTo } from "svelte-router-spa";
  import Transition from "@components/RouteTransition";

  export let currentRoute;
  export let params;
</script>

<Transition>
  <h1>Cloud</h1>
  <p>
    <Navigate to="/setup">Назад</Navigate>
  </p>
</Transition>
