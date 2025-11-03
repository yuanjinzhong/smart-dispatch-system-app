/**
 * Mock服务 - 用于开发测试
 */
import { mockDriver, mockOrders, mockMyOrders, mockStatistics } from './mockData';
import { Order, OrderStatus } from '@/types/order';

// 是否启用Mock
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock响应包装
 */
function mockResponse<T>(data: T, code = 200, message = 'success') {
  return {
    code,
    message,
    data,
  };
}

/**
 * Mock司机服务
 */
export const mockDriverService = {
  // 登录
  async login(phone: string, password: string) {
    await delay(500);
    if (phone === '13800138000' && password === '123456') {
      return mockResponse({
        token: 'mock_token_' + Date.now(),
        driver: mockDriver,
      });
    }
    throw new Error('用户名或密码错误');
  },

  // 获取司机信息
  async getDriverInfo() {
    await delay(300);
    return mockResponse(mockDriver);
  },

  // 更新司机状态
  async updateDriverStatus(status: string) {
    await delay(200);
    return mockResponse({ success: true });
  },

  // 上报位置
  async reportLocation(data: any) {
    await delay(100);
    return mockResponse({ success: true });
  },

  // 获取统计数据
  async getDriverStatistics() {
    await delay(400);
    return mockResponse(mockStatistics);
  },
};

/**
 * Mock订单服务
 */
export const mockOrderService = {
  // 获取可抢订单列表
  async getAvailableOrders(filter?: any) {
    await delay(500);
    let orders = [...mockOrders];
    
    // 简单过滤
    if (filter?.maxDistance) {
      orders = orders.filter(o => o.distance <= filter.maxDistance);
    }
    if (filter?.minFreight) {
      orders = orders.filter(o => o.freight >= filter.minFreight);
    }
    
    return mockResponse({
      total: orders.length,
      list: orders,
    });
  },

  // 获取订单详情
  async getOrderDetail(orderId: number) {
    await delay(300);
    const order = mockOrders.find(o => o.orderId === orderId) 
      || mockMyOrders.find(o => o.orderId === orderId);
    
    if (order) {
      return mockResponse(order);
    }
    throw new Error('订单不存在');
  },

  // 抢单
  async grabOrder(data: { driverId: number; orderId: number }) {
    await delay(800);
    return mockResponse({
      success: true,
      orderId: data.orderId,
      grabTime: new Date().toISOString(),
    });
  },

  // 我的订单列表
  async getMyOrders(status?: string) {
    await delay(400);
    let orders = [...mockMyOrders];
    
    if (status && status !== 'undefined') {
      orders = orders.filter(o => o.status === status);
    }
    
    return mockResponse({
      total: orders.length,
      list: orders,
    });
  },

  // 接单
  async acceptOrder(orderId: number) {
    await delay(300);
    return mockResponse({ success: true });
  },

  // 完成订单
  async completeOrder(orderId: number) {
    await delay(300);
    return mockResponse({ success: true });
  },

  // 取消订单
  async cancelOrder(orderId: number, reason?: string) {
    await delay(300);
    return mockResponse({ success: true });
  },
};

/**
 * Mock数据生成器 - 生成随机订单
 */
export function generateMockOrder(): Order {
  const id = Date.now() + Math.floor(Math.random() * 1000);
  const addresses = [
    { name: '北京市朝阳区望京SOHO', lat: 40.003, lng: 116.475 },
    { name: '北京市海淀区中关村软件园', lat: 40.056, lng: 116.308 },
    { name: '北京市东城区王府井大街', lat: 39.915, lng: 116.416 },
    { name: '北京市西城区金融街', lat: 39.918, lng: 116.367 },
    { name: '北京市朝阳区三里屯太古里', lat: 39.936, lng: 116.456 },
  ];
  
  const pickup = addresses[Math.floor(Math.random() * addresses.length)];
  const delivery = addresses[Math.floor(Math.random() * addresses.length)];
  
  return {
    orderId: id,
    title: '新订单',
    content: '普通货物',
    freight: Math.floor(Math.random() * 30) + 10,
    distance: Math.floor(Math.random() * 8000) + 1000,
    pickupAddress: pickup.name,
    deliveryAddress: delivery.name,
    pickupLat: pickup.lat,
    pickupLng: pickup.lng,
    deliveryLat: delivery.lat,
    deliveryLng: delivery.lng,
    pickupContact: '张先生',
    pickupPhone: '139****1234',
    deliveryContact: '李女士',
    deliveryPhone: '138****5678',
    orderCreateTime: new Date().toISOString(),
    isSubscribe: Math.random() > 0.7,
    vehicleType: Math.random() > 0.5 ? '小型货车' : '中型货车',
    status: OrderStatus.TBC,
    distanceToDriver: Math.floor(Math.random() * 3000),
  };
}
