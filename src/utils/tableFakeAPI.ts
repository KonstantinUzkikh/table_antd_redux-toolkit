import { IData, data } from ".";

// A mock function to mimic making an async request for data
export const fetchTable = () => {
  return new Promise<{ data: IData[] }>(resolve => setTimeout(() => resolve({ data: data }), 500));
}
