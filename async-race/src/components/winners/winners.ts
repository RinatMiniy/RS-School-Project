import { Builder } from '../Builder';
import { getWinners } from '../../API';

export class Winners extends Builder {
  constructor() {
    super('div', 'winners');
    this.el.innerHTML = `
    <table class="table_sort">
      <thead>
          <tr>
              <th>id</th>
              <th>Car</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Best Time</th>
          </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    `;
    this.RenderTable();
  }

  RenderTable() {
    const table = this.el.getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    getWinners({ page: 1 }).then(
      (result) => {
        console.log('winners', result);
        result.items.forEach((elem:any) => {
          console.log('elem', elem);
          table.insertAdjacentHTML('beforebegin', `
          <tr>
              <th>${elem.id}</th>
              <th>${elem.car.color}</th>
              <th>${elem.car.name}</th>
              <th>${elem.wins}</th>
              <th>${elem.time}</th>
          </tr>
          `);
        });
      },
      (e) => alert(e),
    );
  }
}
