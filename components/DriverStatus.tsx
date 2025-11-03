/**
 * 司机状态组件
 */
'use client';

import { Switch, Badge } from 'antd-mobile';
import { useDriverStore } from '@/store/useDriverStore';
import { DriverStatus as Status } from '@/types/driver';

export default function DriverStatus() {
  const { driver, updateStatus } = useDriverStore();

  if (!driver) return null;

  const isIdle = driver.status === Status.IDLE;

  const handleToggle = async (checked: boolean) => {
    try {
      await updateStatus(checked ? Status.IDLE : Status.BUSY);
    } catch (error) {
      console.error('切换状态失败:', error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-3">
        <Badge
          content={Badge.dot}
          color={isIdle ? '#52c41a' : '#ff4d4f'}
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            🚗
          </div>
        </Badge>
        <div>
          <div className="font-medium">{driver.name}</div>
          <div className="text-sm text-gray-500">
            {isIdle ? '空闲中' : '忙碌中'}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">
          {isIdle ? '接单中' : '休息中'}
        </span>
        <Switch
          checked={isIdle}
          onChange={handleToggle}
        />
      </div>
    </div>
  );
}

