/**
 * 抢单大厅页面
 */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PullToRefresh,
  InfiniteScroll,
  Empty,
  Dropdown,
  Button,
  NavBar,
} from 'antd-mobile';
import { FilterOutline, EnvironmentOutline } from 'antd-mobile-icons';
import OrderCard from '@/components/OrderCard';
import BottomNav from '@/components/BottomNav';
import { useOrderStore } from '@/store/useOrderStore';
import { useDriverStore } from '@/store/useDriverStore';
import { useRealTimeOrders } from '@/hooks/useRealTimeOrders';
import { useLocation } from '@/hooks/useLocation';
import { calculateDistance } from '@/utils/geo';

export default function OrdersPage() {
  const router = useRouter();
  const { orders, loading, fetchOrders, grabOrder: grabOrderAction } = useOrderStore();
  const { driver } = useDriverStore();
  const { position } = useLocation(false);
  const [hasMore, setHasMore] = useState(true);

  // 启用实时订单推送
  useRealTimeOrders();

  // 初始加载订单
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // 计算订单距离
  const ordersWithDistance = orders.map((order) => {
    if (position) {
      const distance = calculateDistance(
        position.lat,
        position.lng,
        order.pickupLat,
        order.pickupLng
      );
      return { ...order, distanceToDriver: distance };
    }
    return order;
  });

  // 下拉刷新
  const handleRefresh = async () => {
    await fetchOrders();
  };

  // 加载更多
  const loadMore = async () => {
    // TODO: 实现分页加载
    setHasMore(false);
  };

  // 抢单
  const handleGrab = async (orderId: number) => {
    if (!driver) return;
    
    const success = await grabOrderAction(orderId, driver.driverId);
    if (success) {
      // 抢单成功后可以跳转到订单详情或我的订单
      router.push('/my-orders');
    }
  };

  // 查看订单详情
  const handleOrderClick = (orderId: number) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="page-container">
      <NavBar
        backArrow={false}
        right={
          <div className="flex items-center gap-2">
            <Button
              fill="none"
              size="small"
              onClick={() => {
                // TODO: 打开地图模式
              }}
            >
              <EnvironmentOutline />
              地图
            </Button>
            <Button
              fill="none"
              size="small"
              onClick={() => {
                // TODO: 打开筛选面板
              }}
            >
              <FilterOutline />
              筛选
            </Button>
          </div>
        }
      >
        抢单大厅
      </NavBar>

      <div className="bg-primary text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-90">
              当前位置：{position ? '已定位' : '定位中...'}
            </div>
            <div className="text-xs opacity-75 mt-1">
              今日已接：{driver?.todayOrders || 0}单
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{orders.length}</div>
            <div className="text-xs opacity-75">可抢订单</div>
          </div>
        </div>
      </div>

      <div className="page-content">
        <PullToRefresh onRefresh={handleRefresh}>
          {orders.length === 0 && !loading ? (
            <Empty
              description="暂无可抢订单"
              imageStyle={{ width: 128 }}
            />
          ) : (
            <div>
              {ordersWithDistance.map((order) => (
                <OrderCard
                  key={order.orderId}
                  order={order}
                  onGrab={handleGrab}
                  onClick={handleOrderClick}
                />
              ))}
              <InfiniteScroll
                loadMore={loadMore}
                hasMore={hasMore}
              />
            </div>
          )}
        </PullToRefresh>
      </div>

      <BottomNav />
    </div>
  );
}

