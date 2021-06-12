import { Builder } from '../Builder';
import { SetupCar } from './setupCar/SetupCar';
import { Track } from './track/Track';

export class Garage extends Builder {
  private readonly setupCar: SetupCar;

  private readonly track: Track;

  constructor() {
    super('div', 'garage');
    this.setupCar = new SetupCar(this.AddCarToTrack);
    this.el.appendChild(this.setupCar.el);
    this.track = new Track();
    this.el.appendChild(this.track.el);
  }

  AddCarToTrack = (id = 0, name:any, color = 0) => {
    this.track.el.insertAdjacentHTML('beforebegin', `
    <div class = "car__field">
      <div class="buttom__board">
        <button>Select</button>
        <button>Remove</button>
        <span>${name}${id}${color}</span>
      </div>
      <div class="road">
        <div class="engine__board">
          <button>Start</button>
          <button>Stop</button>
        </div>
        <div class="car">

        </div>
      </div>
    </div>
    `);
  };

  // StartEngine() {

  // };
}
