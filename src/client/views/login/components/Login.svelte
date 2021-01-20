<script>
  import {
    COOKIE,
    WS__MSG_TYPE__CREATE_USER,
    WS__MSG_TYPE__USER_CREATED,
  } from '../../../../constants';
  import { setCookie } from '../../../utils/cookie';

  function login() {
    window.clientSocket.on(WS__MSG_TYPE__USER_CREATED, (data) => {
      setCookie(COOKIE, JSON.stringify(data));
      window.location.reload();
    });
    
    window.clientSocket.emit(WS__MSG_TYPE__CREATE_USER);
  }
</script>

<div>
  <button on:click={login}>Login</button>
</div>

<style>
  :global(#view) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
