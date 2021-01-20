<script>
  import { onMount, tick } from 'svelte';
  import {
    WS__MSG_TYPE__COMMENT_POSTED,
    WS__MSG_TYPE__COMMENT_UPDATED,
    WS__MSG_TYPE__EDITING_COMMENT,
    WS__MSG_TYPE__GET_COMMENTS,
    WS__MSG_TYPE__GOT_COMMENTS,
  } from '../../../../constants';
  import { comments, currUser } from '../../../store';
  import CollapsableList from './CollapsableList.svelte';
  import Comment from './Comment.svelte';
  import CommentCreator from './CommentCreator.svelte';
  import UserMenu from './UserMenu.svelte';
  
  export let userData = undefined;
  
  const workspaces = [
    { label: '01', current: true },
    { label: '02' },
  ];
  const channels = [
    { label: 'Public channel', public: true },
    { label: 'Private channel', public: false },
  ];
  const DMs = [
    { username: 'slackbot', online: true },
    { username: `${userData.username} (you)`, online: true },
    { username: 'John Doe', online: false },
    { username: 'Jane Doe', online: false },
  ];
  const apps = [
    { name: 'Outlook Calendar' },
  ];
  let commentsEl;
  let mainEditorEl;
  
  function handleCommentEditorMount(input) {
    input.focus();
    commentsEl.scrollTop = commentsEl.scrollHeight;
  }
  
  function handleCommentEditorUnMount() {
    mainEditorEl.focus();
  }
  
  function handleMainEditorMount(input) {
    mainEditorEl = input;
  }
  
  onMount(() => {
    currUser.update(user => ({ ...user, ...userData }));
    
    window.clientSocket.on(WS__MSG_TYPE__GOT_COMMENTS, async (data) => {
      const parsedComments = new Map(JSON.parse(data));
      comments.set(parsedComments);
      
      await tick();
      commentsEl.scrollTop = commentsEl.scrollHeight;
    });
    window.clientSocket.on(WS__MSG_TYPE__COMMENT_POSTED, async (comment) => {
      $comments.set(comment.cid, comment);
      comments.set($comments);
      
      await tick();
      commentsEl.scrollTop = commentsEl.scrollHeight;
    });
    window.clientSocket.on(WS__MSG_TYPE__EDITING_COMMENT, (data) => {
      const parsedComments = new Map(JSON.parse(data));
      comments.set(parsedComments);
    });
    window.clientSocket.on(WS__MSG_TYPE__COMMENT_UPDATED, (data) => {
      const parsedComments = new Map(JSON.parse(data));
      comments.set(parsedComments);
    });
    
    window.clientSocket.emit(WS__MSG_TYPE__GET_COMMENTS);
  });
</script>

<div class="wrapper">
  <nav class="app-nav">
    <UserMenu />
  </nav>
  <div class="app-body">
    <div class="side-bar">
      <nav class="workspaces">
        {#each workspaces as { current, label }}
          <button class:current={current}>{label}</button>
        {/each}
        <!-- workspace buttons, + button to add workspace -->
        <button class="is--add">+</button>
      </nav>
      <nav class="workspace__nav">
        <div class="workspace__bar">
          Workspace Title
        </div>
        <div class="workspace__sections">
          <CollapsableList label="Channels">
            {#each channels as { label, public: _public }}
              <button
                class="cl-item"
                class:public={_public}
              >{label}</button>
            {/each}
          </CollapsableList>
          <CollapsableList label="Direct Messages">
            {#each DMs as { username, online }}
              <button
                class="cl-item is--user"
                class:online
              >{username}</button>
            {/each}
          </CollapsableList>
          <CollapsableList label="Apps">
            {#each apps as { name }}
              <button
                class="cl-item"
              >{name}</button>
            {/each}
            <button class="cl-item for--add-app"><span>+</span> Add Apps</button>
          </CollapsableList>
        </div>
      </nav>
    </div>
    <div class="comments-section">
      <div class="comments-bar">
        <div class="room-name">Room Name</div>
        <div class="number-of-users"># of users in room</div>
      </div>
      <div class="comments" bind:this={commentsEl}>
        {#each [...$comments] as [, comment]}
          <Comment
            {...comment}
            onEditorMount={handleCommentEditorMount}
            onEditorUnMount={handleCommentEditorUnMount}
          />
        {/each}
      </div>
      <CommentCreator onMount={handleMainEditorMount} />
    </div>
  </div>
</div>

<style>
  :root {
    --color1: #332733;
    --color2: #4a334a;
    --color2Trans: rgba(74, 51, 74, 0.15);
    --transLightBorder: solid 1px rgba(255, 255, 255, 0.25);
    --transDarkBorder: solid 1px rgba(0, 0, 0, 0.1);
  }

  .wrapper {
    height: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
  }

  .app-nav {
    height: 2em;
    background-color: var(--color1);
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;
    position: relative;
    z-index: 1;
  }
  
  .app-body {
    height: 100%;
    overflow: hidden;
    display: flex;
  }
  
  .side-bar {
    width: 26em;
    height: 100%;
    border-top: var(--transLightBorder);
    background-color: var(--color2);
    display: flex;
  }
  
  .workspaces {
    min-width: 3.75em;
    padding-top: 0.5em;
    border-right: var(--transLightBorder);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }
  .workspaces button {
    border: solid 4px var(--color2);
    border-radius: 0.5em;
    margin: 0.5em;
    background: #fff;
  }
  .workspaces button.is--add {
    color: #fff;
    font-size: 2em;
    padding: 0;
    border: none;
    background: transparent;
  }
  .workspaces button.current {
    box-shadow: 0 0 0 2px #fff;
  }
  
  .workspace__nav {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .workspace__bar {
    color: rgba(255, 255, 255, 0.75);
    font-size: 1.25em;
    font-weight: bold;
    padding: 1em;
    border-bottom: var(--transLightBorder);
  }
  
  .workspace__sections {
    padding: 1em;
    overflow-y: auto;
  }
  .cl-item {
    width: 100%;
    color: rgba(255, 255, 255, 0.75);
    text-align: left;
    border: none;
    background: transparent;
    position: relative;
  }
  .cl-item.for--add-app span {
    padding: 0.1em 0.4em;
    margin-right: 0.25em;
    background: rgba(255, 255, 255, 0.25);
    display: inline-block;
  }
  .cl-item.is--user:not(.online) {
    opacity: 0.5;
  }
  .cl-item.is--user.online::before {
    content: '';
    width: 0.65em;
    height: 0.65em;
    border-radius: 100%;
    box-shadow: 0 0 10px 5px green;
    background: #4dff4d;
    position: absolute;
    top: 0.65em;
    right: 99%;
  }
  
  .comments-section {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .comments-bar {
    height: 4.5em;
    padding: 1em 1.5em;
    border-bottom: var(--transDarkBorder);
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  .room-name {
    width: 100%;
  }
  .number-of-users {
    flex-shrink: 0;
  }

  .comments {
    height: 100%;
    padding: 1.5em;
    overflow: auto;
  }
  
  :global(.comment .svg-icon) {
    color: var(--color2);
    background-color: var(--color2Trans);
  }
  
  :global(.comments-section > .comment-creator) {
    margin: 1.5em;
  }

  /* 
  @media (max-width: 849px) {
    .start-form {
      font-size: 0.7em;
    }

    p {
      font-size: 0.7em;
    }
  } */
</style>
