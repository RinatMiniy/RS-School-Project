import { Builder } from '../Builder';

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
  }
}
