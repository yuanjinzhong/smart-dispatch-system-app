/**
 * 订单卡片组件
 */
'use client';

import { Tag, Button } from 'antd-mobile';
import { ClockCircleOutline, LocationFill } from 'antd-mobile-icons';
import { Order } from '@/types/order';
import { formatMoney, formatDateTime } from '@/utils/format';
import { formatDistance } from '@/utils/geo';

interface OrderCardProps {
  order: Order;
  onGrab?: (orderId: number) => void;
  onClick?: (orderId: number) => void;
}

export default function OrderCard({ order, onGrab, onClick }: OrderCardProps) {
  const handleGrab = (e: React.MouseEvent) => {
    e.stopPropagation();
    onGrab?.(order.orderId);
  };

  return (
    <div
      className="bg-white px-4 py-3 border-b border-gray-100 cursor-pointer"
      onClick={() => onClick?.(order.orderId)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {order.isSubscribe && (
            <Tag color="warning" fill="outline" className="text-xs">
              预约单
            </Tag>
          )}
          <span className="text-xl font-bold text-primary">
            {formatMoney(order.freight)}
          </span>
        </div>
        <div className="flex flex-col items-end text-xs text-muted gap-1">
          <div className="flex items-center gap-1">
            <ClockCircleOutline />
            {formatDateTime(order.orderCreateTime)}
          </div>
          {order.distance !== undefined && (
            <span>里程 {formatDistance(order.distance)}</span>
          )}
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-start mb-2">
          <LocationFill className="text-success mt-1 mr-2 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-sm text-gray-500">取货地点</div>
            <div className="font-medium">{order.pickupAddress}</div>
          </div>
        </div>
        <div className="flex items-start">
          <LocationFill className="text-danger mt-1 mr-2 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-sm text-gray-500">送达地点</div>
            <div className="font-medium">{order.deliveryAddress}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Tag color="default" fill="outline">
            {order.vehicleType}
          </Tag>
          {order.distanceToDriver !== undefined && (
            <span>距你 {formatDistance(order.distanceToDriver)}</span>
          )}
        </div>
        {onGrab && (
          <Button
            color="primary"
            size="small"
            onClick={handleGrab}
          >
            立即抢单
          </Button>
        )}
      </div>
    </div>
  );
}

