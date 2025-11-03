/**
 * 司机相关API服务
 */
import request from '@/utils/request';
import {
  DriverLoginRequest,
  DriverLoginResponse,
  DriverInfoResponse,
  DriverLocationRequest,
  DriverStatisticsResponse,
  DriverStatus,
} from '@/types/driver';
import { USE_MOCK, mockDriverService } from '@/mocks/mockServices';

/**
 * 司机登录
 */
export async function login(
  data: DriverLoginRequest
): Promise<DriverLoginResponse> {
  if (USE_MOCK) {
    return mockDriverService.login(data.phone, data.password);
  }
  return request.post('/api/driver/login', data);
}

/**
 * 获取司机信息
 */
export async function getDriverInfo(): Promise<DriverInfoResponse> {
  if (USE_MOCK) {
    return mockDriverService.getDriverInfo();
  }
  return request.get('/api/driver/info');
}

/**
 * 更新司机状态
 */
export async function updateDriverStatus(status: DriverStatus): Promise<any> {
  if (USE_MOCK) {
    return mockDriverService.updateDriverStatus(status);
  }
  return request.put('/api/driver/status', { status });
}

/**
 * 上报位置
 */
export async function reportLocation(
  data: DriverLocationRequest
): Promise<any> {
  if (USE_MOCK) {
    return mockDriverService.reportLocation(data);
  }
  return request.post('/api/driver/location', data);
}

/**
 * 获取司机统计数据
 */
export async function getDriverStatistics(): Promise<DriverStatisticsResponse> {
  if (USE_MOCK) {
    return mockDriverService.getDriverStatistics();
  }
  return request.get('/api/driver/statistics');
}

/**
 * 获取排行榜
 */
export async function getDriverRanking(): Promise<any> {
  // Mock暂不实现
  if (USE_MOCK) {
    return { code: 200, message: 'success', data: [] };
  }
  return request.get('/api/driver/ranking');
}
