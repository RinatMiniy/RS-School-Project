import { Builder } from '../../Builder';
import { createCar, UpdateCar, getCar } from '../../../API';

export class SetupCar extends Builder {
  readonly NewCar: any;

  constructor(AddCarToTrack:any) {
    super('div', 'SetupCar');
    this.el.innerHTML = `
    <form>
      <input type = 'text' id="NameCar" class="NameCar">
      <input type = 'color' id="ColorCar" class="ColorCar">
      <button id="SubmitNewCar" class="SubmitNewCar"></button>
    </form>
    <form>
      <input type = 'text' id="NameCarUpdate" class="NameCarUpdate" disabled>
      <input type = 'color' id="ColorCarUpdate" class="ColorCarUpdate" disabled>
      <button id="SubmitNewCarUpdate" class="SubmitNewCarUpdate" disabled></button>
    </form>
    `;
    this.NewCar = AddCarToTrack;
    this.AddCar();
  }

  AddCar() {
    const submit = this.el.getElementsByTagName('button');
    console.log(this, submit[0]);
    submit[0].onclick = (e) => {
      e.preventDefault();
      const NameCar = (this.el.getElementsByClassName('NameCar')[0] as HTMLInputElement).value;
      const ColorCar = (this.el.getElementsByClassName('ColorCar')[0] as HTMLInputElement).value;
      createCar({
        name: NameCar,
        color: ColorCar,
      }).then(
        (result) => this.NewCar(result.id, result.name, result.color),
        (error) => alert(error),
      );
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
      const NameCar = (this.el.getElementsByClassName('NameCarUpdate')[0] as HTMLInputElement).value;
      const ColorCar = (this.el.getElementsByClassName('ColorCarUpdate')[0] as HTMLInputElement).value;
      UpdateCar(id, {
        name: NameCar,
        color: ColorCar,
      });
    };
    return getCar(id).then(
      (result) => console.log(result),
      (error) => alert(error),
    );
  }
}
