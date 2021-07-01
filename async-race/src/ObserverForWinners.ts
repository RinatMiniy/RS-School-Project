export interface SubscriberWin {
  notifycreateWinner(el:any): void;
}

export class APIServiceForWinners {
  constructor(private readonly subscriberWin: SubscriberWin) {}

  async createWinner(el:{
    id: number,
    wins: number,
    time: number
  }) {
    (await fetch(`${'http://127.0.0.1:3000/winners'}`,
    {
      method: 'POST',
      body: JSON.stringify(el),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
    this.subscriberWin.notifycreateWinner(el);
  }

async getWinner(id:number) {
  console.log(this);
  const res = await fetch(`${'http://127.0.0.1:3000/winners'}/${id}`);
  return res.json();
}

async StatusWinner(id:number) {
  console.log(this);
  const res = await fetch(`${'http://127.0.0.1:3000/winners'}/${id}`);
  return res.status;
}

async DeleteWinner(id:number) {
  console.log(this);
  const res = await fetch(`${'http://127.0.0.1:3000/winners'}/${id}`, { method: 'DELETE' });
  return res.json();
}

async updateWinner(id:number, el:any) {
  (
  await fetch(`${'http://127.0.0.1:3000/winners'}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(el),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();
  console.log(this);
}

  async saveWinner({ id, time }:{ id:number, time: number }) {
      const winnerStatus = await this.StatusWinner(id);
      console.log(this);

      if (winnerStatus === 404) {
        await this.createWinner({
          id,
          wins: 1,
          time,
        });
      } else {
        const winner = await this.getWinner(id);
        await this.updateWinner(id, {
          id,
          wins: winner.wins + 1,
          time: time < winner.time ? time : winner.time,
        });
      }
    }
}
