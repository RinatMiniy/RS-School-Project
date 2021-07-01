export const renderCar = (id = 0, name:string, color = 0) => `
  <div class="buttom__board">
    <button>Select</button>
    <button>Remove</button>
    <span>${name}</span>
  </div>
  <div class="road">
    <div class="engine__board">
      <button>Start</button>
      <button>Stop</button>
    </div>
    <div class="car">

    </div>
  </div>
  `;
