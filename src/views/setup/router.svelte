<script>
  import { Navigate, navigateTo } from "svelte-router-spa";
  import Transition from "@components/RouteTransition";
  import WiFiLevel from "@components/IconLevelWiFi";

  import { fade, scale } from "svelte/transition";

  // import MdWifi from "svelte-icons/md/MdWifi.svelte";
  // import MdLock from "svelte-icons/md/MdLock.svelte";

  // import MdVisibility from "svelte-icons/md/MdVisibility.svelte";
  // import MdVisibilityOff from "svelte-icons/md/MdVisibilityOff.svelte";
  // import MdEdit from "svelte-icons/md/MdEdit.svelte";

  // import MdCloudQueue from "svelte-icons/md/MdCloudQueue.svelte";

  // import MdRefresh from "svelte-icons/md/MdRefresh.svelte";

  import { onMount } from "svelte";
  import { ws } from "@stores/wsapi";

  export let currentRoute;
  export let params;

  const networks_mock_data = [
    { ssid: "ROSTELECOM_563C", rssi: -88, chnl: 1, enc: 8 },
    { ssid: "Beeline_2G_F24191", rssi: -68, chnl: 1, enc: 8 },
    { ssid: "ASUS", rssi: -93, chnl: 1, enc: 4 },
    { ssid: "Beeline_2G_FF3551", rssi: -72, chnl: 1, enc: 8 },
    { ssid: "RT-WiFi-760E", rssi: -88, chnl: 2, enc: 4 },
    { ssid: "SMART__91", rssi: -52, chnl: 3, enc: 4 },
    { ssid: "TP-LINK_A56DAA", rssi: -78, chnl: 5, enc: 8 },
    { ssid: "Beeline_Marseilles90", rssi: -87, chnl: 6, enc: 4 },
    { ssid: "счастье вдруг", rssi: -90, chnl: 8, enc: 4 }
  ];
  let networks = [];

  $: networks_sorted = networks
    .map(i => {
      let level = 0;
      if (i.rssi < -50 /*dBm*/)
        level = Math.floor((2 * (i.rssi + 100)) / 33 + 1);
      else level = 3;

      return {
        ssid: i.ssid,
        rssi: level
      };
    })
    .sort((a, b) => {
      return a.rssi < b.rssi ? 1 : b.rssi < a.rssi ? -1 : 0;
    });

  let ssid = null;
  let password = "";

  $: is_valid_password = String(password).length < 8;

  /**
   *
   */
  function refreshNetworkList() {
    networks = [];

    if (ws.isConnected()) {
      ws.send({
        ep: "wifi",
        path: "station",
        param: {
          action: "scan"
        },
        token: "_factory_"
      });
    } else {
      setTimeout(refreshNetworkList, 5000);
    }
  }

  /**
   *
   */
  onMount(() => {
    refreshNetworkList();
  });

  /**
   *
   */
  $: if ("ep" in $ws) {
    if ($ws.ep == "wifi" && $ws.path == "station") {
      if ($ws.result.length) {
        networks = [...$ws.result];
        console.log("networks:", $ws.result);
      } else {
        setTimeout(refreshNetworkList, 2500);
      }
    }
  }

  // $: if ("state" in $ws && $ws.state == "connected") {
  //   //ws.send("Hello, I`m here!");
  //   ws.send({
  //     ep: "/api/module",
  //     path: "wifi",
  //     param: {
  //       action: "scan"
  //     },
  //     token: "__factory__"
  //   });
  // } else {
  //   console.log("ws:", $ws);
  //   setTimeout(() => (networks = [...networks_mock_data]), 5000);
  // }

  function rssiIcon(level) {
    return `/static/icons/wifi-strength-${level}.svg`;
  }
</script>

<style>
  .container {
    padding: 1rem;
  }

  .list {
    height: 8.25rem;
    overflow-y: scroll;
  }

  .list-item {
    height: 2.75rem;
  }

  .ssid {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-rendering: unset;
  }

  p {
    padding-bottom: 0.25rem;
  }
</style>

<Transition>
  <!-- <p>
    <Navigate to="/setup">Назад</Navigate>
  </p> -->
  <div class="container">
    {#if networks.length === 0}
      <p in:fade={{ duration: 500 }} class="has-text-centered">
        Поиск доступных сетей...
      </p>
    {/if}
    <nav class="level is-mobile" style="margin-bottom: 0.5rem;">
      <button
        class="button level-item is-white"
        class:is-loading={networks.length === 0}
        on:click={refreshNetworkList}>
        Найдено {networks.length} WiFi сетей.
      </button>
    </nav>

    {#if networks.length !== 0}
      <div in:fade={{ duration: 500 }} class="list is-loading">
        {#each networks_sorted as net}
          <div
            class="list-item"
            class:is-active={ssid == net.ssid}
            on:click={() => (ssid = net.ssid)}>
            <div class="columns is-gapless is-vcentered is-mobile">
              <div class="ssid column is-11">{net.ssid}</div>
              <div
                class="column"
                style="width: 24px;height: 24px;"
                class:has-text-grey={ssid != net.ssid}
                class:has-text-white={ssid == net.ssid}>
                <WiFiLevel level={net.rssi} />
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- SSID -->
      <p in:fade={{ duration: 500 }}>Идентификатор сети:</p>
      <div class="field">
        <p in:scale={{ duration: 500 }} class="control">
          <input
            class="input"
            type="text"
            placeholder="SSID"
            bind:value={ssid} />
        </p>
      </div>

      <!-- Password -->
      <p in:fade={{ duration: 500 }}>Пароль:</p>
      <div class="field">
        <p in:scale={{ duration: 500 }} class="control">
          <input
            class="input"
            class:is-danger={is_valid_password}
            type="password"
            placeholder="********"
            bind:value={password} />
        </p>
      </div>
    {/if}

    <nav class="level is-mobile">
      <button
        class="button level-item is-warning"
        on:click={() => navigateTo('/setup')}>
        Отмена
      </button>
      {#if ssid !== null}
        <button
          in:fade={{ duration: 500 }}
          class="button level-item is-primary"
          class:is-static={is_valid_password}>
          Подключить
        </button>
      {/if}
    </nav>
  </div>

</Transition>
