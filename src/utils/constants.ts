import dayjs from 'dayjs';

import { IData, ITableRec } from './';

export const initialFieldsValues: ITableRec = {
  id: '',
  name: '',
  vocation: 'Frontender',
  date: dayjs().date(0),
  projects: 0,
}

export const data: IData[] = [
  {
    name: 'Петр Петров',
    vocation: 'Frontender',
    date: dayjs("2023-07-31"),
    projects: 1,
  },
  {
    name: 'John Brown',
    vocation: 'Frontender',
    date: dayjs('2019-01-25'),
    projects: 11,
  },
  {
    name: 'Jim Green',
    vocation: 'Frontender',
    date: dayjs('2019-09-05'),
    projects: 15,
  },
  {
    name: 'Joe Black',
    vocation: 'Backender',
    date: dayjs('2021-05-27'),
    projects: 8,
  },
  {
    name: 'Сергей Сергеев ',
    vocation: 'Backender',
    date: dayjs('2022-04-07'),
    projects: 5,
  },
  {
    name: 'Иван Иванов',
    vocation: 'Frontender',
    date: dayjs('2023-01-22'),
    projects: 2,
  },
];
