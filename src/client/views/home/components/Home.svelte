<style>
  :root {
    --color1: #332733;
    --color2: #4a334a;
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
  }
  
  .app-body {
    height: 100%;
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
    border: solid 4px black;
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
    box-shadow: 0 0 0 3px #fff;
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
    color: rgba(255, 255, 255, 0.75);
    border: none;
    background: transparent;
  }
  .cl-item.for--add-app span {
    padding: 0.1em 0.4em;
    margin-right: 0.25em;
    background: rgba(255, 255, 255, 0.25);
    display: inline-block;
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
  }

  .comments {
    height: 100%;
    padding: 1.5em;
  }

  .comment-creator {
    overflow: hidden;
    border: solid 1px;
    border-radius: 0.5em;
    margin: 1.5em;
    flex-shrink: 0;
  }
  .comment-creator input {
    width: 100%;
    padding: 1em;
    border: none;
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

<script>
  // import Modal from '../../components/Modal.svelte';
  import CollapsableList from './CollapsableList.svelte';
  
  const workspaces = [
    { label: '01', current: true },
    { label: '02' },
  ];
  const channels = [
    { label: 'Public channel', public: true },
    { label: 'Private channel', public: false },
  ];
  const DMs = [
    { username: 'John Doe', online: true },
    { username: 'Jane Doe', online: false },
  ];
  const apps = [
    { name: 'Outlook Calendar' },
  ];
</script>

<div class="wrapper">
  <nav class="app-nav"></nav>
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
                class="cl-item"
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
        <div>Room Name</div>
        <div># of users in room</div>
      </div>
      <div class="comments">
        <div class="comment">
          <img src="" alt="avatar" />
          <div>
            User Name | time of comment
          </div>
          <div>
            Comment
          </div>
        </div>
      </div>
      <div class="comment-creator">
        <input type="text" />
        <nav class="wysiwyg">
          <button title="Bold">B</button>
          <button title="Italic">I</button>
          <button title="Strikethrough">S</button>
          <button title="Code">&lt;/&gt;</button>
          <button title="Link">8</button>
          <button title="Ordered List">1 -</button>
          <button title="Bulleted List">. -</button>
          <button title="Blockquote">| -</button>
          <button title="Code Block">&lt;/&gt; []</button>
        </nav>
      </div>
    </div>
  </div>
</div>
