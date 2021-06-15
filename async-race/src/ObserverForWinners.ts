export interface Subscriber {
  notifycreateWinner(): void;
}

export class APIServiceForWinners {
  constructor(private readonly subscriber: Subscriber) {}

   async createWinner(el:any) {
    (await fetch(`${'http://127.0.0.1:3000/winners'}`, {
      method: 'POST',
      body: JSON.stringify(el),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
    this.subscriber.notifycreateWinner();
  }
}
