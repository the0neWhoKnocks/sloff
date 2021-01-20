<script>
  import { currUser } from '../../../store';
  import CommentCreator from './CommentCreator.svelte';
  import SVGIcon from './SVGIcon.svelte';

  export let avatar = undefined;
  export let cid = undefined;
  export let content = undefined;
  export let editing = false;
  export let onEditorMount = undefined;
  export let onEditorUnMount = undefined;
  export let time = undefined;
  export let uid = undefined;
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
    {#if editing && uid === $currUser.uid}
      <CommentCreator
        {cid}
        {content}
        onMount={onEditorMount}
        onUnMount={onEditorUnMount}
      />
    {:else}
      <div
        class="content"
        class:editing
      >
        {#if editing}
          <div>{content}</div>
        {:else}
          {content}
        {/if}
      </div>
    {/if}
  </div>
</div>

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
    width: 100%;
    font-size: 1.2em;
    line-height: 1em;
    padding-left: 0.5em;
  }
  
  .comment-info {
    font-weight: bold;
    padding-bottom: 0.5em;
  }

  .time {
    font-size: 0.7em;
    opacity: 0.4;
  }
  
  .content.editing {
    position: relative;
  }
  .content.editing > div {
    filter: blur(4px);
  }
  .content.editing::after {
    content: '[ Editing ]';
    white-space: nowrap;
    padding: 0.25em 0.5em;
    border-radius: 0.5em;
    background: yellow;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
