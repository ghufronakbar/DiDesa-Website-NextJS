export interface ApiSuccessUser<T, D = DataLength> {
  status: number;
  isLoggedIn: boolean;
  message: string;
  data: T;
  dataLength: D;
}

export interface DataLength {
  currentData: number;
  totalData: number;
}
