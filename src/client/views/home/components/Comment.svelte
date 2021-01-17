<style>
  .comment {
    display: flex;
  }
  .comment:not(:first-child) {
    margin-top: 1.5em;
  }

  .avatar {
    width: 3em;
    height: 3em;
    overflow: hidden;
    padding: 0;
    border: none;
    border-radius: 0.5em;
    outline: none;
    background: transparent;
    flex-shrink: 0;
  }
  .avatar img {
    width: 100%;
    display: block;
  }
  
  .body {
    font-size: 1.2em;
    line-height: 1em;
    padding-left: 0.5em;
  }
  
  .comment-info {
    font-weight: bold;
    padding-bottom: 0.5em;
  }
  .username {
  }
  .time {
    font-size: 0.7em;
    opacity: 0.4;
  }
</style>

<script>
  import SVGIcon from './SVGIcon.svelte';

  export let avatar = undefined;
  export let content = undefined;
  export let time = undefined;
  export let username = undefined;
</script>

<div class="comment">
  <button class="avatar">
    {#if avatar}
      <img src={avatar} alt="avatar" />
    {:else}
      <SVGIcon icon="avatar" />
    {/if}
  </button>
  <div class="body">
    <div class="comment-info">
      <span class="username">{username}</span>
      <span class="time">{time}</span>
    </div>
    {content}
  </div>
</div>