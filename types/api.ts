/**
 * API响应基础类型
 */

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  total: number;
  page: number;
  pageSize: number;
  list: T[];
}

export interface ApiError {
  code: number;
  message: string;
  details?: any;
}

