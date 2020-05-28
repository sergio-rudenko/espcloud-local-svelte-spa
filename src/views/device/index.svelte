<script>
  import { Navigate, navigateTo } from "svelte-router-spa";

  import { time } from "@stores/global";

  import { ws } from "@stores/wsapi";

  $: if ("state" in $ws && $ws.state == "connected") {
    ws.send("Hello, I`m here!");
    ws.reconnect();
  } else {
    console.log("ws:", $ws);
  }

  import Transition from "@components/Transition";

  export let name = "Home";
  console.log("name:", name);

  function onClickRedirect(path) {
    navigateTo("login");
    // console.log("click");
  }

  const onRedirect = path => () => {
    navigateTo(path);
  };

  const onClick = num => () => {
    ws.send(JSON.stringify({ num: num }));
    // console.log("pressed:", num);
  };

  const formatter = new Intl.DateTimeFormat("en", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  });
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
      <Navigate to="/login">link to /login</Navigate>
    </p>
    <h1>Page: {name}</h1>
    <h3>
      Time:
      <strong>{formatter.format($time)}</strong>
    </h3>

    <p>{JSON.stringify($ws)}</p>

    <button on:click={onRedirect('/login')}>ToLogin</button>

    <button on:click={onClick(1)}>1</button>
    <button on:click={onClick(2)}>2</button>
    <button on:click={onClick(3)}>3</button>

  </div>
</Transition>
