import { Header } from "./components/header/Header";
import { MainPage } from "./components/main-page/MainPage";

export class App {

  private readonly rootElement: HTMLElement;

  private readonly header: Header;

  private readonly mainPage: MainPage;

  constructor(el: HTMLElement) {
    this.rootElement = el;
    this.header = new Header();
    this.rootElement.appendChild(this.header.el);
    this.mainPage = new MainPage();
    this.rootElement.appendChild(this.mainPage.el);
  }
}
