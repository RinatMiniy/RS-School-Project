export interface Subscriber {
  notifyUpdateCar(id:number, el:any): void;
  notifycreateCar(el:any) : void;
}

interface Car {
  id: number;
  name: string;
  color: string;
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

  async createCar(newCar: Car) {
    const res = await fetch(`${'http://127.0.0.1:3000/garage'}`, {
      method: 'POST',
      body: JSON.stringify(newCar),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.subscriber.notifycreateCar(newCar);
    return res.json();
  }
}
