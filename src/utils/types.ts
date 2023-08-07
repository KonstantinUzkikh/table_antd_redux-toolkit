import dayjs from "dayjs";

export interface IData {
  name: string;
  vocation: 'Frontender' | 'Backender';
  date: dayjs.Dayjs;
  projects: number;
}

export interface ITableRec extends IData {
  id: string;
}
