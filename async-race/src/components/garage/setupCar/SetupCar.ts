import { Builder } from '../../Builder';
import { createCar, getCar, UpdateCar } from '../../../API';
import { APIService } from '../../../Observer';

export class SetupCar extends Builder {
  readonly NewCar: any;

  readonly observer: any;

  constructor(AddCarToTrack:any, service:any) {
    super('div', 'SetupCar');
    this.el.innerHTML = `
    <form>
      <input type = 'text' id="NameCar" class="NameCar">
      <input type = 'color' id="ColorCar" class="ColorCar">
      <button id="SubmitNewCar" class="SubmitNewCar">Create</button>
    </form>
    <form>
      <input type = 'text' id="NameCarUpdate" class="NameCarUpdate" disabled>
      <input type = 'color' id="ColorCarUpdate" class="ColorCarUpdate" disabled>
      <button id="SubmitNewCarUpdate" class="SubmitNewCarUpdate" disabled>Update</button>
    </form>
    <div>
      <button id="StartRace" class="StartRace">Start Race</button>
      <button id="ResetRace" class="ResetRace">Reset</button>
      <button id="GenerateCars" class="GenerateCars">GenerateCars</button>
    </div>
    `;
    this.NewCar = AddCarToTrack;
    this.observer = service;
    this.AddCar();
  }

  AddCar() {
    const submit = this.el.getElementsByTagName('button');
    console.log(this, submit[0]);
    submit[0].onclick = (e) => {
      e.preventDefault();
      const NameCar = (this.el.getElementsByClassName('NameCar')[0] as HTMLInputElement);
      const ColorCar = (this.el.getElementsByClassName('ColorCar')[0] as HTMLInputElement);
      createCar({
        name: NameCar.value,
        color: ColorCar.value,
      }).then(
        (result) => this.NewCar(result.id, result.name, result.color),
        (error) => alert(error),
      );
      NameCar.value = '';
      ColorCar.value = '#000000';
    };
  }

  UpdateCars(id:number) {
    (this.el.getElementsByClassName('NameCarUpdate')[0] as HTMLInputElement).disabled = false;
    (this.el.getElementsByTagName('button')[1]).disabled = false;
    (this.el.getElementsByClassName('ColorCarUpdate')[0] as HTMLInputElement).disabled = false;
    const submit = this.el.getElementsByTagName('button')[1];
    console.log(this);
    submit.onclick = (e) => {
      e.preventDefault();
      const NameCar = (this.el.getElementsByClassName('NameCarUpdate')[0] as HTMLInputElement);
      const ColorCar = (this.el.getElementsByClassName('ColorCarUpdate')[0] as HTMLInputElement);
      this.observer.UpdateCar(id, {
        name: NameCar.value,
        color: ColorCar.value,
      });
      NameCar.value = '';
      ColorCar.value = '#000000';
      (this.el.getElementsByClassName('NameCarUpdate')[0] as HTMLInputElement).disabled = true;
      (this.el.getElementsByTagName('button')[1]).disabled = true;
      (this.el.getElementsByClassName('ColorCarUpdate')[0] as HTMLInputElement).disabled = true;
    };
  }

  GenerateCars() {
    const MARK = ['Ford', 'Reno', 'BMV', 'Audi', 'Mazda', 'Mercedes', 'Tesla'];
    const MODEL = ['Model S', 'Vantage', 'X5', 'X7', 'Camry', 'Rio', 'Mustang', 'Ranger', 'Focus'];
    const NUMBER_GENERATE_CARS = 10;
    for (let i = 0; i < NUMBER_GENERATE_CARS; i++) {
      // eslint-disable-next-line
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      // eslint-disable-next-line
      const mark =  Math.floor(Math.random() * (MARK.length));
      const model = Math.floor(Math.random() * (MODEL.length));
      console.log(mark, model);
      createCar({
        // eslint-disable-next-line
        name: (MARK[mark]) + ' ' + MODEL[model],
        // eslint-disable-next-line
        color: color,
      }).then(
        (result) => this.NewCar(result.id, result.name, result.color),
        (error) => alert(error),
      );
    }
  }
}
