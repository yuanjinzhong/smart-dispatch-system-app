/**
 * 个人中心页面
 */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  NavBar,
  Card,
  List,
  Avatar,
  Dialog,
  Toast,
} from 'antd-mobile';
import {
  RightOutline,
  FileOutline,
  PieOutline,
  StarFill,
  TruckOutline,
  SetOutline,
  ExclamationCircleOutline,
} from 'antd-mobile-icons';
import BottomNav from '@/components/BottomNav';
import { useDriverStore } from '@/store/useDriverStore';
import { useAuthStore } from '@/store/useAuthStore';
import { getDriverStatistics } from '@/services/driverService';
import { DriverStatistics } from '@/types/driver';
import { formatMoney } from '@/utils/format';

export default function ProfilePage() {
  const router = useRouter();
  const { driver } = useDriverStore();
  const { logout } = useAuthStore();
  const [statistics, setStatistics] = useState<DriverStatistics | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await getDriverStatistics();
        setStatistics(response.data);
      } catch (error) {
        console.error('获取统计数据失败:', error);
      }
    };

    fetchStatistics();
  }, []);

  const handleLogout = async () => {
    const result = await Dialog.confirm({
      content: '确认退出登录吗？',
    });

    if (result) {
      logout();
      Toast.show({ content: '已退出登录' });
      // TODO: 跳转到登录页
      router.push('/');
    }
  };

  if (!driver) {
    return (
      <div className="page-container flex items-center justify-center">
        <div>加载中...</div>
      </div>
    );
  }

  return (
    <div className="page-container bg-[var(--bg-page)]">
      <NavBar backArrow={false}>个人中心</NavBar>

      <div className="page-content">
        {/* 用户信息卡片 */}
        <Card className="card-panel">
          <div className="flex items-center gap-3">
            <Avatar
              src={driver.avatar}
              style={{ '--size': '56px' }}
            >
              {driver.name.charAt(0)}
            </Avatar>
            <div className="flex-1">
              <div className="text-base font-semibold mb-1">{driver.name}</div>
              <div className="text-xs text-muted">{driver.phone}</div>
              <div className="flex items-center mt-2 gap-3 text-xs text-muted">
                <div className="flex items-center gap-1">
                  <StarFill className="text-warning" />
                  <span>{driver.rating.toFixed(1)}</span>
                </div>
                <div>完单率 {driver.completionRate}%</div>
                <div>L{driver.memberLevel}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* 收益统计 */}
        {statistics && (
          <Card className="card-panel">
            <div className="text-sm text-muted mb-3">收益统计</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted">今日收益</span>
                <span className="text-lg font-semibold text-primary">
                  {formatMoney(statistics.todayIncome)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted">本周收益</span>
                <span className="text-lg font-semibold text-[var(--text-primary)]">
                  {formatMoney(statistics.weekIncome)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted">本月收益</span>
                <span className="text-lg font-semibold text-[var(--text-primary)]">
                  {formatMoney(statistics.monthIncome)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted">总收益</span>
                <span className="text-lg font-semibold text-[var(--text-primary)]">
                  {formatMoney(statistics.totalIncome)}
                </span>
              </div>
            </div>
          </Card>
        )}

        {/* 功能列表 */}
        <Card className="card-panel">
          <List>
            <List.Item
              prefix={<FileOutline />}
              onClick={() => router.push('/my-orders')}
              clickable
            >
              我的订单
              <RightOutline />
            </List.Item>
            <List.Item
              prefix={<PieOutline />}
              onClick={() => Toast.show({ content: '功能开发中' })}
              clickable
            >
              收益详情
              <RightOutline />
            </List.Item>
            <List.Item
              prefix={<TruckOutline />}
              onClick={() => Toast.show({ content: '功能开发中' })}
              clickable
            >
              车辆信息
              <RightOutline />
            </List.Item>
            <List.Item
              prefix={<SetOutline />}
              onClick={() => Toast.show({ content: '功能开发中' })}
              clickable
            >
              设置
              <RightOutline />
            </List.Item>
          </List>
        </Card>

        {/* 退出登录 */}
        <Card className="card-panel">
          <List>
            <List.Item
              prefix={<ExclamationCircleOutline />}
              onClick={handleLogout}
              clickable
              className="text-danger"
            >
              退出登录
            </List.Item>
          </List>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}

