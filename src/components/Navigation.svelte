<script>
  import { navigateTo } from "svelte-router-spa";
  let menuActive = false;

  function onClickHome() {
    menuActive = false;
    navigateTo("/");
  }

  document.body.classList.add("has-navbar-fixed-top"); // << is-fixed-top
</script>

<nav
  class="navbar is-primary is-transparent is-fixed-top"
  role="navigation"
  aria-label="main navigation">
  <div class="navbar-brand ">
    <a class="navbar-item" href="http://localhost:5000">
      <img src="/static/logo-bastion.png" alt="BASTION" />
    </a>
    <div
      role="button"
      class="navbar-burger"
      class:is-active={menuActive}
      on:click={() => (menuActive = !menuActive)}>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
    <!-- navbar items, navbar burger... -->
  </div>
  <div class="navbar-menu" class:is-active={menuActive}>
    <div class="navbar-start">
      <!-- navbar items -->
      <a class="navbar-item" on:click={onClickHome}>Home</a>
      <a class="navbar-item">Login</a>
    </div>

    <div class="navbar-end">
      <!-- navbar items -->
    </div>
  </div>
</nav>
