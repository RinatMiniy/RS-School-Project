import './style.scss';
import { App } from './app';

window.onload = () => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('Root element now found');
  // eslint-disable-next-line
  const app = new App(appElement);
};
