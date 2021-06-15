import { Builder } from '../../Builder';
import { getCars } from '../../../API';
import { renderCar } from '../../model/car';

export class Track extends Builder {
  readonly NewCar: any;

  constructor(AddCarToTrack:any) {
    super('div', 'track');
    this.NewCar = AddCarToTrack;
    this.el.innerHTML = `
    <div>
    <h2><h2>
    </div>
    `;
    this.DefaultCars();
  }

  DefaultCars() {
    console.log(this);
    getCars(1, 7).then(
      (result) => {
        result.items.forEach((elem:any) => {
          this.NewCar(elem.id, elem.name, elem.color);
        });
      },
      (error) => alert(error),
    );
  }
}
