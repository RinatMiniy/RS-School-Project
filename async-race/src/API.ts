const garage = 'http://127.0.0.1:3000/garage';
const engine = 'http://127.0.0.1:3000/engine';
const winners = 'http://127.0.0.1:3000/winners';

export const getCar = async (id:number) => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (el:any) => (
  await fetch(`${garage}`, {
    method: 'POST',
    body: JSON.stringify(el),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

export const getCars = async (page:number, limit = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const DeleteCar = async (id:number) => (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const UpdateCar = async (id:number, el:any) => (
  await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(el),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

export const startEngine = async (id:number) => (await fetch(`${engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id:number) => (await fetch(`${engine}?id=${id}&status=stopped`)).json();

export const driveStatus = async (id:number) => {
  const response = await fetch(`${engine}?id=${id}&status=drive`).catch();
  return response.status !== 200 ? { success: false } : { ...(await response.json()) };
};

// console.log('createCar', createCar({
//   name: 'string',
//   color: 'string',
// }).then(
//     (result) => console.log(result),
//     (error) => alert(error),
// ));

export const getWinner = async (id:number) => (await fetch(`${winners}/${id}`)).json();

export const StatusWinner = async (id:number) => (await fetch(`${winners}/${id}`)).status;

export const DeleteWinner = async (id:number) => (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

// export const getWinners = async ({page, limit = 10, sort, order}) => {
//   const response = await fetch(`${winners}&_page${page}&_limit=${limit}${getSortOrder(sort, order)}`);
//   const items = await response.json();

//   return {
//     items: await Promise.all(items.map(async winners => ({...winners, car: await getCar(winner.id)})))
//   }
// }
