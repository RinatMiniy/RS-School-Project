import { Builder } from '../Builder';
import { SetupCar } from './setupCar/SetupCar';
import { Track } from './track/Track';
import { DeleteCar } from '../../API';

export class Garage extends Builder {
  private readonly setupCar: SetupCar;

  private readonly track: Track;

  constructor() {
    super('div', 'garage');
    this.setupCar = new SetupCar(this.AddCarToTrack);
    this.el.appendChild(this.setupCar.el);
    this.track = new Track(this.AddCarToTrack);
    this.el.appendChild(this.track.el);
    this.Listener();
  }

  AddCarToTrack = (id = 0, name:any, color = 0) => {
    this.track.el.insertAdjacentHTML('beforebegin', `
    <div id = "${id}" class = "car__field">
      <div class="buttom__board">
        <button class="btn__select" data-id="${id}">Select</button>
        <button class="btn__remove" data-id="${id}">Remove</button>
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

  Listener() {
    document.addEventListener('click', (event) => {
      const buttonsRemove = document.querySelectorAll('.btn__remove');
      const buttonsSelect = document.querySelectorAll('.btn__select');
      buttonsRemove.forEach((elem) => {
        if (elem === event.target) this.DeleteCar(event.target);
      });
      buttonsSelect.forEach((elem) => {
        if (elem === event.target) this.UpdateCar(event.target);
      });
    });
  }

  DeleteCar(elem: any) {
    const deleteElem = document.getElementById(`${elem.dataset.id}`);
    console.log(deleteElem, this);
    DeleteCar(elem.dataset.id);
    deleteElem?.remove();
  }

  UpdateCar(elem:any) {
    console.log(this);
    const updateElem = document.getElementById(`${elem.dataset.id}`);
    (this.setupCar.el.querySelector('.NameCarUpdate') as HTMLInputElement).disabled = false;
    (this.setupCar.el.querySelector('.ColorCarUpdate') as HTMLInputElement).disabled = false;
    (this.setupCar.el.querySelector('.SubmitNewCarUpdate') as HTMLInputElement).disabled = false;
  }
}
