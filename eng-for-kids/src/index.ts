import './style.scss';
import { App } from './App';

window.onload = () => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('Root element now found');
  // eslint-disable-next-line
  const app = new App(appElement);
};
