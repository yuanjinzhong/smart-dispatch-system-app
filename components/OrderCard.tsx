/**
 * 订单卡片组件
 */
'use client';

import { Card, Tag, Button } from 'antd-mobile';
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
    <Card
      className="mb-3 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick?.(order.orderId)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {order.isSubscribe && (
            <Tag color="warning" fill="outline">
              预约单
            </Tag>
          )}
          <span className="text-xl font-bold text-primary">
            {formatMoney(order.freight)}
          </span>
          <span className="text-gray-500">
            {formatDistance(order.distance)}
          </span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <ClockCircleOutline className="mr-1" />
          {formatDateTime(order.orderCreateTime)}
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag color="default" fill="outline">
            {order.vehicleType}
          </Tag>
          {order.distanceToDriver !== undefined && (
            <span className="text-sm text-gray-500">
              距你 {formatDistance(order.distanceToDriver)}
            </span>
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
    </Card>
  );
}

