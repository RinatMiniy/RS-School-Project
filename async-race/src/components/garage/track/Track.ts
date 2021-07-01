import { Builder } from '../../Builder';
import { getCars } from '../../../API';
import { renderCar } from '../../model/car';

export class Track extends Builder {
  readonly NewCar: (id: number | undefined, name: string, color:number) => void;

  constructor(AddCarToTrack:(id: number | undefined, name: string, color:number) => void) {
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
        result.items.forEach((elem:{
          id:number,
          name:string,
          color:number
        }) => {
          this.NewCar(elem.id, elem.name, elem.color);
        });
      },
      (error) => alert(error),
    );
  }
}
