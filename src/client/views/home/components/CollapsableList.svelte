<style>
  .collapsable-list:not(.open) {
    display: none;
  }

  button {
    width: 100%;
    color: rgba(255, 255, 255, 0.75);
    text-align: left;
    border: none;
    background: transparent;
  }

  ul {
    padding: 0 0 1em 1.5em;
    margin: 0;
  }
</style>

<script>
  export let label = undefined;
  export let open = true;

  function toggle() {
    open = !open;
  }
</script>

<button on:click={toggle}>
  {#if open}&#x25BE;{:else}&#x25B8;{/if} {label}
</button>
<ul
  class="collapsable-list"
  class:open
>
  <slot></slot>
</ul>