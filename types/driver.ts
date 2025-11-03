/**
 * 司机相关类型定义
 */

export enum DriverStatus {
  IDLE = 'idle',        // 空闲
  BUSY = 'busy',        // 忙碌
  OFFLINE = 'offline'   // 离线
}

export interface Driver {
  driverId: number;
  name: string;
  phone: string;
  avatar?: string;
  status: DriverStatus;
  lat: number;
  lng: number;
  vehicleType: string;      // 车型
  vehicleNo: string;        // 车牌号
  rating: number;           // 评分
  completionRate: number;   // 完单率
  memberLevel: number;      // 会员等级
  totalOrders?: number;     // 总订单数
  todayOrders?: number;     // 今日订单数
  todayIncome?: number;     // 今日收益
}

export interface DriverLoginRequest {
  phone: string;
  password: string;
}

export interface DriverLoginResponse {
  code: number;
  message: string;
  data: {
    token: string;
    driver: Driver;
  };
}

export interface DriverInfoResponse {
  code: number;
  message: string;
  data: Driver;
}

export interface DriverLocationRequest {
  driverId: number;
  lat: number;
  lng: number;
  timestamp: number;
}

export interface DriverStatistics {
  todayOrders: number;
  todayIncome: number;
  weekOrders: number;
  weekIncome: number;
  monthOrders: number;
  monthIncome: number;
  totalOrders: number;
  totalIncome: number;
  completionRate: number;
  rating: number;
}

export interface DriverStatisticsResponse {
  code: number;
  message: string;
  data: DriverStatistics;
}

