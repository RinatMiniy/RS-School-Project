import { Builder } from '../../Builder';
import { getCars } from '../../../API';
import { renderCar } from '../../model/car';

export class Track extends Builder {
  constructor() {
    super('div', 'track');
    this.el.innerHTML = renderCar(0, 'de');
    this.Cars(this.el);
  }

  Cars(el:HTMLElement) {
    getCars(1, 100).then(
      // eslint-disable-next-line
      function(result) {
        result.items.forEach((elem:any) => {
          el.innerHTML = renderCar(elem.id, elem.name, elem.color);
        });
      },
      (error) => alert(error),
    );
    console.log(this);
  }
}
