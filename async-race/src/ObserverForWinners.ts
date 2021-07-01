export interface SubscriberWin {
  notifycreateWinner(): void;
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
    this.subscriberWin.notifycreateWinner();
  }

  async getWinner(id:number) {
    const res = await fetch(`${'http://127.0.0.1:3000/winners'}/${id}`);
    return res.json();
  }

  async StatusWinner(id:number) {
    const res = await fetch(`${'http://127.0.0.1:3000/winners'}/${id}`);
    return res.status;
  }

  async DeleteWinner(id:number) {
    const res = await fetch(`${'http://127.0.0.1:3000/winners'}/${id}`, { method: 'DELETE' });
    return res.json();
  }

  async updateWinner(id:number, el:{
    id:number,
    wins:number,
    time:number
  }) {
    (
      await fetch(`${'http://127.0.0.1:3000/winners'}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(el),
        headers: {
          'Content-Type': 'application/json',
        },
      })).json();
  }

  async saveWinner({ id, wins, time }:{ id:number, wins:number, time: number }) {
    const winnerStatus = await this.StatusWinner(id);

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
