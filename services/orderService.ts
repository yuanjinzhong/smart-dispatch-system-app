/**
 * 订单相关API服务
 */
import request from '@/utils/request';
import {
  Order,
  OrderListResponse,
  OrderDetailResponse,
  GrabOrderRequest,
  GrabOrderResponse,
  OrderFilter,
} from '@/types/order';
import { USE_MOCK, mockOrderService } from '@/mocks/mockServices';

/**
 * 获取可抢订单列表
 */
export async function getAvailableOrders(
  filter?: OrderFilter
): Promise<OrderListResponse> {
  if (USE_MOCK) {
    return mockOrderService.getAvailableOrders(filter);
  }
  return request.get('/api/orders/available', { params: filter });
}

/**
 * 获取订单详情
 */
export async function getOrderDetail(orderId: number): Promise<OrderDetailResponse> {
  if (USE_MOCK) {
    return mockOrderService.getOrderDetail(orderId);
  }
  return request.get(`/api/orders/${orderId}`);
}

/**
 * 抢单
 */
export async function grabOrder(
  data: GrabOrderRequest
): Promise<GrabOrderResponse> {
  if (USE_MOCK) {
    return mockOrderService.grabOrder(data);
  }
  return request.get('/api/order/order', { params: data });
}

/**
 * 获取我的订单列表
 */
export async function getMyOrders(
  status?: string
): Promise<OrderListResponse> {
  if (USE_MOCK) {
    return mockOrderService.getMyOrders(status);
  }
  return request.get('/api/orders/my', { params: { status } });
}

/**
 * 接单
 */
export async function acceptOrder(orderId: number): Promise<any> {
  if (USE_MOCK) {
    return mockOrderService.acceptOrder(orderId);
  }
  return request.post(`/api/orders/${orderId}/accept`);
}

/**
 * 完成订单
 */
export async function completeOrder(orderId: number): Promise<any> {
  if (USE_MOCK) {
    return mockOrderService.completeOrder(orderId);
  }
  return request.post(`/api/orders/${orderId}/complete`);
}

/**
 * 取消订单
 */
export async function cancelOrder(
  orderId: number,
  reason?: string
): Promise<any> {
  if (USE_MOCK) {
    return mockOrderService.cancelOrder(orderId, reason);
  }
  return request.post(`/api/orders/${orderId}/cancel`, { reason });
}
