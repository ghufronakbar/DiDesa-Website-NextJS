import { PaginationProps } from "./Pagination";

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface ApiSuccess<T = undefined, P = PaginationProps> {
  status: number;
  message: string;
  data: T;
  pagination: P;
}

export interface ApiSuccessUser extends ApiSuccess {
  isLoggedIn: boolean;
}
