<script>
  export let label = undefined;
  export let open = true;

  function toggle() {
    open = !open;
  }
</script>

<button on:click={toggle}>
  <span class="arrow">
    {#if open}&#x25BE;{:else}&#x25B8;{/if}
  </span>
  {label}
</button>
<ul
  class="collapsable-list"
  class:open
>
  <slot></slot>
</ul>

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
  button:focus {
    outline: none;
  }

  ul {
    padding: 0 0 1em 1.2em;
    margin: 0;
  }
  
  .arrow {
    display: inline-block;
  }
</style>
