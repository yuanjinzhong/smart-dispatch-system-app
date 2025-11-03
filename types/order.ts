/**
 * 订单相关类型定义
 */

export enum OrderStatus {
  TBC = 'TBC',              // 待确认
  CONFIRMED = 'CONFIRMED',   // 已确认
  FULFILLING = 'FULFILLING', // 履约中
  COMPLETED = 'COMPLETED',   // 已完成
  CANCELLED = 'CANCELLED'    // 已取消
}

export interface Order {
  orderId: number;
  title: string;
  content: string;
  freight: number;            // 运费（元）
  distance: number;           // 距离（米）
  pickupAddress: string;      // 取货地址
  deliveryAddress: string;    // 送货地址
  pickupLat: number;
  pickupLng: number;
  deliveryLat: number;
  deliveryLng: number;
  pickupContact: string;      // 取货联系人
  pickupPhone: string;        // 取货电话
  deliveryContact: string;    // 送货联系人
  deliveryPhone: string;      // 送货电话
  orderCreateTime: string;
  pushCreateTime?: string;
  isSubscribe: boolean;       // 是否预约单
  vehicleType: string;        // 车型要求
  status: OrderStatus;
  distanceToDriver?: number;  // 距离司机的距离（米）
  freightNo?: string;         // 运单号
  uuid?: string;
  cityId?: number;
  orderVehicleId?: number;
  weight?: string;            // 货物重量
  remark?: string;            // 备注
}

export interface OrderListResponse {
  code: number;
  message: string;
  data: {
    total: number;
    list: Order[];
  };
}

export interface OrderDetailResponse {
  code: number;
  message: string;
  data: Order;
}

export interface GrabOrderRequest {
  driverId: number;
  orderId: number;
}

export interface GrabOrderResponse {
  code: number;
  message: string;
  data: {
    success: boolean;
    orderId: number;
    grabTime: string;
  };
}

export interface OrderFilter {
  minDistance?: number;
  maxDistance?: number;
  minFreight?: number;
  maxFreight?: number;
  vehicleType?: string;
  isSubscribe?: boolean;
}

