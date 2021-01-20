<script>
  import {
    onMount as svelteOnMount,
    onDestroy,
  } from 'svelte';
  import {
    WS__MSG_TYPE__COMMENT_POSTED,
    WS__MSG_TYPE__COMMENT_UPDATED,
    WS__MSG_TYPE__EDIT_COMMENT,
    WS__MSG_TYPE__POST_COMMENT,
    WS__MSG_TYPE__UDPATE_COMMENT,
  } from '../../../../constants';
  import { comments, currUser } from '../../../store';
  
  const KEY__ENTER = 13;
  const KEY__UP = 38;
  let inputEl;
  
  export let cid = undefined;
  export let content = '';
  export let onMount = undefined;
  export let onUnMount = undefined;
  
  function handleSubmit(ev) {
    switch(ev.keyCode) {
      case KEY__ENTER: {
        const handleComment = () => { content = ''; }
        
        window.clientSocket.on(WS__MSG_TYPE__COMMENT_POSTED, handleComment);
        window.clientSocket.on(WS__MSG_TYPE__COMMENT_UPDATED, handleComment);
        
        if (cid) {
          window.clientSocket.emit(WS__MSG_TYPE__UDPATE_COMMENT, { cid, content });
        }
        else {
          window.clientSocket.emit(WS__MSG_TYPE__POST_COMMENT, { ...$currUser, content });
        }
        
        break;
      }
      case KEY__UP: {
        // edit previous comment if there's no text in the creator
        if (content === '') {
          const lastComment = Array.from($comments).reverse().find(([, { uid }]) => uid === $currUser.uid);
          
          if (lastComment) {
            const [, { cid }] = lastComment;
            window.clientSocket.emit(WS__MSG_TYPE__EDIT_COMMENT, cid);
          }
        }
        break;
      }
    }
  }
  
  svelteOnMount(() => {
    if (onMount) onMount(inputEl);
  });
  
  onDestroy(() => {
    if (onUnMount) onUnMount();
  });
</script>

<div class="comment-creator">
  <textarea
    on:keydown={handleSubmit}
    bind:value={content}
    bind:this={inputEl}
  ></textarea>
  <nav class="wysiwyg">
    <button title="Bold">B</button>
    <button title="Italic">I</button>
    <button title="Strikethrough" class="strikethrough">S</button>
    <button title="Code">&lt;/&gt;</button>
    <button title="Link" class="link">8</button>
    <button title="Ordered List">1 -</button>
    <button title="Bulleted List">. -</button>
    <button title="Blockquote">| -</button>
    <button title="Code Block">[&lt;/&gt;]</button>
  </nav>
</div>

<style>
  .comment-creator {
    font-size: 1rem;
    overflow: hidden;
    border: solid 1px;
    border-radius: 0.5em;
    flex-shrink: 0;
  }
  .comment-creator textarea {
    width: 100%;
    height: 3.25em;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1em;
    padding: 1em;
    border: none;
    resize: none;
    display: block;
  }
  .comment-creator textarea:focus {
    outline: none;
  }

  .wysiwyg {
    padding: 0.25em;
    border-top: var(--transDarkBorder);
    border-width: 2px;
    background: #eee;
    display: flex;
  }
  .wysiwyg button {
    padding: 0.5em 0.75em;
    border: none;
    margin: 0.25em;
  }
  .wysiwyg button:hover {
    background:rgba(0, 0, 0, 0.05);
  }
  .wysiwyg button:focus {
    outline: none;
  }
  .wysiwyg button.strikethrough {
    text-decoration: line-through;
  }
  .wysiwyg button.link {
    transform: rotate(90deg);
  }
</style>
