export interface Subscriber {
  notifyUpdateCar(id:number, el:any): void;
}

export class APIService {
  constructor(private readonly subscriber: Subscriber) {}

  async UpdateCar(id:number, el:any) {
    (await fetch(`${'http://127.0.0.1:3000/garage'}/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(el),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
    this.subscriber.notifyUpdateCar(id, el);
  }
}
