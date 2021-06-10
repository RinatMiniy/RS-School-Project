import { Builder } from '../Builder';
import { SetupCar } from './setupCar/SetupCar';
import { Track } from './track/Track';

export class Garage extends Builder {
  private readonly setupCar: SetupCar;

  private readonly track: Track;

  constructor() {
    super('div', 'garage');
    this.setupCar = new SetupCar();
    this.el.appendChild(this.setupCar.el);
    this.track = new Track();
    this.el.appendChild(this.track.el);
  }
}
