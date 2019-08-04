export interface Chart {
  options: object;
  labels: Array<string>;
  type: string;
  legend: boolean;
  data: Array<Data>;
}

export interface Data {
  data: Array<string>;
  label: string;
}
