export interface SubscriberWin {
  notifycreateWinner(el:any, car:any): void;
}

export class APIServiceForWinners {
  constructor(private readonly subscriberWin: SubscriberWin) {}

  async createWinner(el:any, car:any) {
    (await fetch(`${'http://127.0.0.1:3000/winners'}`,
    {
      method: 'POST',
      body: JSON.stringify(el),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
    this.subscriberWin.notifycreateWinner(el, car);
  }
}
