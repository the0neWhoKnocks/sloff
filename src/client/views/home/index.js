import { COOKIE } from '../../../constants';
import { getCookie } from '../../utils/cookie';
import mountView from '../mountView';
import Home from './components/Home.svelte';

mountView(Home, {
  userData: JSON.parse(getCookie(COOKIE)),
});
