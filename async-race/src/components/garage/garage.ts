import { Builder } from '../Builder';
import { SetupCar } from './setupCar/SetupCar';
import { Track } from './track/Track';
import {
  DeleteCar, getCar, startEngine, stopEngine, driveStatus, getCars, DeleteWinner,
} from '../../API';
import { APIService, Subscriber } from '../../Observer';

export class Garage extends Builder implements Subscriber {
  private readonly setupCar: SetupCar;

  private readonly track: Track;

  private readonly service: APIService;

  private createWinners: any;

  constructor(createWinner:any) {
    super('div', 'garage');
    this.createWinners = createWinner;
    this.service = new APIService(this);
    this.setupCar = new SetupCar(this.AddCarToTrack, this.service);
    this.el.appendChild(this.setupCar.el);
    this.track = new Track(this.AddCarToTrack);
    this.el.appendChild(this.track.el);
    this.Listener();
  }

  AddCarToTrack = (id = 0, name:any, color = 0) => {
    this.track.el.insertAdjacentHTML('beforeend', `
    <div id = "${id}" class = "car__field">
      <div class="buttom__board">
        <button class="btn__select" data-id="${id}">Select</button>
        <button class="btn__remove" data-id="${id}">Remove</button>
        <span class = "CarName">${name}</span>
      </div>
      <div class="road">
        <div class="engine__board">
          <button class="btn__start" data-id="${id}">Start</button>
          <button class="btn__stop" data-id="${id}">Stop</button>
        </div>
        <div class="car">
        <svg data-stopanimete='' viewBox="0 0 512 512" style = "width: 80px; fill: ${color}; position: relative">
            <g>
              <path d="M505.453,264.607L494.577,252.6c-11.811-13.037-26.609-22.7-42.89-28.335H200.782c-8.185,0-15.228-6.29-15.614-14.466
                c-0.411-8.729,6.545-15.936,15.184-15.936h43.834l-42.594-16.249l-46.847,1.378C99.341,180.622,45.594,198.263,0,229.784
                l6.79,56.906c1.517,12.716,12.302,22.291,25.108,22.291c0-30.772,25.035-55.807,55.807-55.807
                c30.772,0,55.807,25.035,55.807,55.807c0,3.695-0.37,7.305-1.058,10.801c9.928,6.081,21.426,9.4,33.288,9.4h187.719
                c-3.912-8.227-5.789-17.601-4.954-27.473c2.195-25.938,23.234-46.748,49.194-48.667c31.278-2.312,57.467,22.482,57.467,53.279
                c0,5.001-0.705,9.838-1.996,14.433h14.018c8.338,0,16.141-4.11,20.855-10.987l9.522-13.883
                C514.19,286.226,513.315,273.285,505.453,264.607z"/>
            </g>
        </svg>
        </div>
      </div>
    </div>
    `);
    Garage.UpdateCountCars();
  };

  Listener() {
    document.addEventListener('click', (event) => {
      const buttonsRemove = document.querySelectorAll('.btn__remove');
      const buttonsSelect = document.querySelectorAll('.btn__select');
      const buttonsStart = document.querySelectorAll('.btn__start');
      const buttonsStop = document.querySelectorAll('.btn__stop');
      const buttonStartRace = document.querySelector('.StartRace');
      const buttonGenerateCars = document.querySelector('.GenerateCars');
      const buttonReset = document.querySelector('.ResetRace');
      buttonsRemove.forEach((elem) => {
        if (elem === event.target) Garage.DeleteCars(event.target);
      });
      buttonsSelect.forEach((elem) => {
        if (elem === event.target) this.setupCar.UpdateCars((event.target as any).dataset.id);
      });
      buttonsStart.forEach((elem) => {
        if (elem === event.target) this.StartEngines(event.target);
      });
      buttonsStop.forEach((elem) => {
        if (elem === event.target) Garage.StopEngines(event.target);
      });
      if (buttonStartRace === event.target) {
        this.StartRace();
      }
      if (buttonReset === event.target) {
        buttonsStop.forEach((elem) => {
          (elem as HTMLButtonElement).click();
        });
      }
      if (buttonGenerateCars === event.target) this.setupCar.GenerateCars();
    });
  }

  static DeleteCars(elem: any) {
    const deleteElem = document.getElementById(`${elem.dataset.id}`);
    DeleteCar(elem.dataset.id);
    deleteElem?.remove();
    Garage.UpdateCountCars();
  }

  StartEngines(elem: any) {
    console.log(this, elem.dataset.id);
    startEngine(elem.dataset.id).then(
      (result) => {
        driveStatus(elem.dataset.id).catch((error) => {
          const car = document.getElementById(`${elem.dataset.id}`)?.getElementsByTagName('svg')[0] as any;
          car.dataset.stopanimete = 'stop';
        });
        this.animate({
        duration: result.distance / result.velocity,
        timing(timeFraction:any) {
          return timeFraction;
        },
        draw(progress: any) {
          const car = document.getElementById(`${elem.dataset.id}`)?.getElementsByTagName('svg')[0] as any;
          const width = (document.querySelector('.car') as HTMLElement).offsetWidth - 80;
          if (car.dataset.stopanimete !== 'stop') {
            // eslint-disable-next-line
            car.style.left = progress * width + 'px';
          }
        },
        });
        (document.getElementById(`${elem.dataset.id}`)?.getElementsByTagName('svg')[0] as any).dataset.stopanimete = '';
    },
      (error) => alert(error),
    );
  }

  StartRace() {
      const AllCarsOnTrack = document.querySelectorAll('.btn__start');
      let winnerRace:any = null;
      AllCarsOnTrack.forEach((elem:any) => {
        startEngine(elem.dataset.id).then(
          (result) => {
            const car:any = elem.dataset.id;
            let stopAnime = false;
            driveStatus(elem.dataset.id).catch((error) => {
              stopAnime = true;
              const carStop = document.getElementById(`${elem.dataset.id}`)?.getElementsByTagName('svg')[0] as any;
              carStop.dataset.stopanimete = 'stop';
            });
            this.animate ({
            duration: result.distance / result.velocity,
            timing(timeFraction:any) {
              return timeFraction;
            },
            draw(progress: any) {
              const animateCar = document.getElementById(`${elem.dataset.id}`)?.getElementsByTagName('svg')[0] as any;
              const width = (document.querySelector('.car') as HTMLElement).offsetWidth - 80;
              if (animateCar.dataset.stopanimete !== 'stop') {
                // eslint-disable-next-line
                animateCar.style.left = progress * width + 'px';
              }
            },
            YouAreWinner() {
              if (winnerRace === null && !stopAnime) {
                winnerRace = car;
              //   this.createWinners({
              //     "id": car,
              //     "wins": 1,
              //     "time": result.distance / result.velocity,
              // })
              }

            },
            stopAnime,
            });
            (document.getElementById(`${elem.dataset.id}`)?.getElementsByTagName('svg')[0] as any).dataset.stopanimete = '';
        },
          (error) => alert(error),
        );
      });
  }

  animate({
    timing, draw, duration, YouAreWinner, stopAnime,
   }:any) {
    const start = performance.now();
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
        YouAreWinner();
      }
      if (stopAnime) timeFraction = 1;
      const progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

  static StopEngines(elem:any) {
    stopEngine(elem.dataset.id).finally(() => {
    const car = document.getElementById(`${elem.dataset.id}`)?.getElementsByTagName('svg')[0] as any;
    car.dataset.stopanimete = 'stop';
    car.style.left = '0px';
    });
  }

  static UpdateCountCars() {
    getCars(1, 1000).then(
      (result) => {
        const counter = document.getElementsByTagName('h2')[0] as HTMLElement;
        counter.innerHTML = `<span>Garage(${result.items.length})</span>`;
      },
      (error) => console.log(error),
    );
  }

  GeneretaPage() {
    let cars = [];

  }

  notifyUpdateCar(id:number, el:any) {
    console.log('Rab', id, el, this);
    const Updatingcar = document.getElementById(`${id}`);
    (Updatingcar?.getElementsByClassName('CarName')[0] as HTMLElement).innerHTML = `${el.name}`;
    (Updatingcar?.getElementsByTagName('svg')[0] as any).style.fill = `${el.color}`;
  }
}
