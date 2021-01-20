<script>
  import { COOKIE } from '../../../../constants';
  import { deleteCookie } from '../../../utils/cookie';
  import SVGIcon from './SVGIcon.svelte';
  
  let open = false;
  
  function handleToggle() {
    open = !open;
  }
  
  function handleSignOut() {
    deleteCookie(COOKIE);
    window.location.reload();
  }
</script>

<div class="user">
  <button on:click={handleToggle}>
    <SVGIcon icon="avatar" />
  </button>
  {#if open}
    <nav>
      <button on:click={handleSignOut}>Sign out</button>
    </nav>
  {/if}
</div>

<style>
  .user {
    margin-right: 1em;
    position: relative;
  }
  
  .user > button {
    width: 1.75em;
    height: 1.75em;
    padding: 0;
  }
  
  .user > nav {
    padding: 1em 0;
    border: solid 1px #ccc;
    border-radius: 0.3em;
    box-shadow: 0 0 10px 0px rgba(0,0,0,0.25);
    background: #fff;
    position: absolute;
    top: 100%;
    right: 0;
  }
  .user > nav > * {
    white-space: nowrap;
    padding: 0.5em 1em;
    border: none;
    background: transparent;
  }
  .user > nav > *:hover {
    color: #fff;
    background: #188ff5;
  }
</style>
