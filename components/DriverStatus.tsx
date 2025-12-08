/**
 * 司机状态组件
 */
'use client';

import { Switch, Badge, Tag, Space } from 'antd-mobile';
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
    <div className="card-panel p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge content={Badge.dot} color={isIdle ? '#12b76a' : '#ff4d4f'}>
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-semibold text-[var(--text-primary)]">
              {driver.name?.charAt(0) || '司'}
            </div>
          </Badge>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-[var(--text-primary)]">
              {driver.name || '司机'}
            </div>
            <div className="flex flex-wrap gap-1">
              <Tag color="success" fill="outline">
                {isIdle ? '空闲中' : '忙碌中'}
              </Tag>
              <Tag color="primary" fill="outline">
                {driver.vehicleType || '车型待填'}
              </Tag>
            </div>
            <div className="text-xs text-muted">
              车牌：{driver.vehicleNo || '未填写'}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm text-muted">
            {isIdle ? '接单中' : '休息中'}
          </span>
          <Switch checked={isIdle} onChange={handleToggle} />
        </div>
      </div>
    </div>
  );
}

