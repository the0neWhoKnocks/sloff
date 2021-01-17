<script>
  import {
    WS__MSG_TYPE__COMMENT_POSTED,
    WS__MSG_TYPE__POST_COMMENT,
  } from '../../../../constants';
  import { currUser } from '../../../store';
  
  const KEY__ENTER = 13;
  let inputField;
  
  function handleSubmit(ev) {
    if (ev.keyCode === KEY__ENTER) {
      window.clientSocket.on(WS__MSG_TYPE__COMMENT_POSTED, () => {
        inputField.value = '';
      });
      
      const comment = ev.currentTarget.value;
      window.clientSocket.emit(WS__MSG_TYPE__POST_COMMENT, {
        ...$currUser,
        content: comment,
      });
    }
  }
</script>

<div class="comment-creator">
  <textarea
    on:keydown={handleSubmit}
    bind:this={inputField}
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
    overflow: hidden;
    border: solid 1px;
    border-radius: 0.5em;
    margin: 1.5em;
    flex-shrink: 0;
  }
  .comment-creator textarea {
    width: 100%;
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
