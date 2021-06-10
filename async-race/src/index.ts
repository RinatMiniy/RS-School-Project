import './style.scss';
import { App } from './app';
import { createCar } from './API';

window.onload = () => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('Root element now found');
  // eslint-disable-next-line
  const app = new App(appElement);
};
