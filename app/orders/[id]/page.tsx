/**
 * 订单详情页
 */
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  NavBar,
  Card,
  Button,
  Space,
  Divider,
  Dialog,
} from 'antd-mobile';
import {
  LocationFill,
  PhoneFill,
  UserOutline,
} from 'antd-mobile-icons';
import { useOrderStore } from '@/store/useOrderStore';
import { useDriverStore } from '@/store/useDriverStore';
import { formatMoney, formatPhone } from '@/utils/format';
import { formatDistance, estimateTime, formatTime } from '@/utils/geo';

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = Number(params.id);
  const { currentOrder, fetchOrderDetail, grabOrder: grabOrderAction } = useOrderStore();
  const { driver } = useDriverStore();

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail(orderId);
    }
  }, [orderId, fetchOrderDetail]);

  const handleGrab = async () => {
    if (!driver || !currentOrder) return;

    const result = await Dialog.confirm({
      content: '确认抢单吗？',
    });

    if (result) {
      const success = await grabOrderAction(currentOrder.orderId, driver.driverId);
      if (success) {
        router.push('/my-orders');
      }
    }
  };

  if (!currentOrder) {
    return (
      <div className="page-container flex items-center justify-center">
        <div>加载中...</div>
      </div>
    );
  }

  const estimatedTime = estimateTime(currentOrder.distance);

  return (
    <div className="page-container">
      <NavBar onBack={() => router.back()}>订单详情</NavBar>

      <div className="page-content">
        {/* 地图区域 TODO: 集成高德地图 */}
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
          <div className="text-gray-500">地图加载中...</div>
        </div>

        {/* 订单信息 */}
        <Card title="订单信息" className="mb-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">订单编号</span>
              <span className="font-medium">#{currentOrder.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">运费</span>
              <span className="text-xl font-bold text-primary">
                {formatMoney(currentOrder.freight)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">距离</span>
              <span className="font-medium">
                {formatDistance(currentOrder.distance)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">预计时间</span>
              <span className="font-medium">{formatTime(estimatedTime)}</span>
            </div>
            {currentOrder.isSubscribe && (
              <div className="flex justify-between">
                <span className="text-gray-600">订单类型</span>
                <span className="text-warning font-medium">预约单</span>
              </div>
            )}
          </div>
        </Card>

        {/* 取货信息 */}
        <Card title="📍 取货地点" className="mb-4">
          <div className="space-y-2">
            <div className="flex items-start">
              <LocationFill className="text-success mt-1 mr-2" />
              <div className="flex-1">
                <div className="font-medium mb-1">
                  {currentOrder.pickupAddress}
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserOutline className="mr-2" />
                <span>{currentOrder.pickupContact || '张三'}</span>
              </div>
              <a href={`tel:${currentOrder.pickupPhone || '13900001234'}`}>
                <Button size="small" color="primary" fill="outline">
                  <PhoneFill /> 联系
                </Button>
              </a>
            </div>
          </div>
        </Card>

        {/* 送货信息 */}
        <Card title="📍 送达地点" className="mb-4">
          <div className="space-y-2">
            <div className="flex items-start">
              <LocationFill className="text-danger mt-1 mr-2" />
              <div className="flex-1">
                <div className="font-medium mb-1">
                  {currentOrder.deliveryAddress}
                </div>
              </div>
            </div>
            <Divider />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserOutline className="mr-2" />
                <span>{currentOrder.deliveryContact || '李四'}</span>
              </div>
              <a href={`tel:${currentOrder.deliveryPhone || '13800005678'}`}>
                <Button size="small" color="primary" fill="outline">
                  <PhoneFill /> 联系
                </Button>
              </a>
            </div>
          </div>
        </Card>

        {/* 货物信息 */}
        <Card title="🚚 货物信息">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">货物类型</span>
              <span className="font-medium">{currentOrder.content || '普通货物'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">车型要求</span>
              <span className="font-medium">{currentOrder.vehicleType}</span>
            </div>
            {currentOrder.weight && (
              <div className="flex justify-between">
                <span className="text-gray-600">重量</span>
                <span className="font-medium">{currentOrder.weight}</span>
              </div>
            )}
            {currentOrder.remark && (
              <div>
                <div className="text-gray-600 mb-1">备注</div>
                <div className="text-sm text-gray-500">{currentOrder.remark}</div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* 底部操作按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t safe-area-inset-bottom">
        <Button
          block
          color="primary"
          size="large"
          onClick={handleGrab}
        >
          确认抢单
        </Button>
      </div>
    </div>
  );
}

