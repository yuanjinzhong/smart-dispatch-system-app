/**
 * 首页 - 工作台
 */
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Grid, Button } from 'antd-mobile';
import {
  UnorderedListOutline,
  FileOutline,
  PieOutline,
  SetOutline,
} from 'antd-mobile-icons';
import BottomNav from '@/components/BottomNav';
import DriverStatus from '@/components/DriverStatus';
import StatisticsCard from '@/components/StatisticsCard';
import { useDriverStore } from '@/store/useDriverStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useInterval } from '@/hooks/useInterval';
import { useLocation } from '@/hooks/useLocation';

export default function HomePage() {
  const router = useRouter();
  const { driver, reportLocation, fetchDriverInfo } = useDriverStore();
  const { isAuthenticated, initAuth } = useAuthStore();
  const { position } = useLocation(false);

  // 初始化认证
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // 获取司机信息
  useEffect(() => {
    if (isAuthenticated && !driver) {
      fetchDriverInfo();
    }
  }, [isAuthenticated, driver, fetchDriverInfo]);

  // 未登录跳转
  useEffect(() => {
    if (!isAuthenticated) {
      // TODO: 跳转到登录页
      console.log('未登录，需要跳转到登录页');
    }
  }, [isAuthenticated]);

  // 定时上报位置（5分钟）
  useInterval(() => {
    if (position && driver) {
      reportLocation(position.lat, position.lng);
    }
  }, 5 * 60 * 1000);

  if (!driver) {
    return (
      <div className="page-container flex items-center justify-center">
        <div>加载中...</div>
      </div>
    );
  }

  const quickActions = [
    {
      key: 'orders',
      title: '抢单大厅',
      icon: <UnorderedListOutline className="text-2xl" />,
      color: 'text-primary',
      path: '/orders',
    },
    {
      key: 'my-orders',
      title: '我的订单',
      icon: <FileOutline className="text-2xl" />,
      color: 'text-success',
      path: '/my-orders',
    },
    {
      key: 'statistics',
      title: '收益统计',
      icon: <PieOutline className="text-2xl" />,
      color: 'text-warning',
      path: '/profile',
    },
    {
      key: 'settings',
      title: '设置',
      icon: <SetOutline className="text-2xl" />,
      color: 'text-gray-600',
      path: '/profile',
    },
  ];

  return (
    <div className="page-container bg-gray-50">
      <div className="page-content">
        {/* 司机状态 */}
        <div className="mb-4">
          <DriverStatus />
        </div>

        {/* 统计卡片 */}
        <StatisticsCard
          todayOrders={driver.todayOrders || 0}
          todayIncome={driver.todayIncome || 0}
          completionRate={driver.completionRate || 0}
          rating={driver.rating || 0}
        />

        {/* 快捷入口 */}
        <Card title="快捷入口" className="mb-4">
          <Grid columns={4} gap={16}>
            {quickActions.map((action) => (
              <Grid.Item key={action.key}>
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => router.push(action.path)}
                >
                  <div className={`${action.color} mb-2`}>{action.icon}</div>
                  <div className="text-xs text-gray-600">{action.title}</div>
                </div>
              </Grid.Item>
            ))}
          </Grid>
        </Card>

        {/* 今日数据 */}
        <Card title="今日数据">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">已接订单</span>
              <span className="font-bold text-lg">{driver.todayOrders || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">总收益</span>
              <span className="font-bold text-lg text-primary">
                ¥{(driver.todayIncome || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">完单率</span>
              <span className="font-bold text-lg text-success">
                {driver.completionRate || 0}%
              </span>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
