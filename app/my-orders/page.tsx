/**
 * 我的订单页面
 */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  NavBar,
  Tabs,
  Empty,
  PullToRefresh,
} from 'antd-mobile';
import OrderCard from '@/components/OrderCard';
import BottomNav from '@/components/BottomNav';
import { getMyOrders } from '@/services/orderService';
import { Order, OrderStatus } from '@/types/order';

export default function MyOrdersPage() {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (status?: string) => {
    setLoading(true);
    try {
      const response = await getMyOrders(status);
      setOrders(response.data.list);
    } catch (error) {
      console.error('获取订单失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const statusMap: Record<string, string | undefined> = {
      all: undefined,
      fulfilling: OrderStatus.FULFILLING,
      completed: OrderStatus.COMPLETED,
      cancelled: OrderStatus.CANCELLED,
    };
    fetchOrders(statusMap[activeKey]);
  }, [activeKey]);

  const handleRefresh = async () => {
    const statusMap: Record<string, string | undefined> = {
      all: undefined,
      fulfilling: OrderStatus.FULFILLING,
      completed: OrderStatus.COMPLETED,
      cancelled: OrderStatus.CANCELLED,
    };
    await fetchOrders(statusMap[activeKey]);
  };

  const handleOrderClick = (orderId: number) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="page-container">
      <NavBar backArrow={false}>我的订单</NavBar>

      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
      >
        <Tabs.Tab title="全部" key="all" />
        <Tabs.Tab title="进行中" key="fulfilling" />
        <Tabs.Tab title="已完成" key="completed" />
        <Tabs.Tab title="已取消" key="cancelled" />
      </Tabs>

      <div className="page-content">
        <PullToRefresh onRefresh={handleRefresh}>
          {orders.length === 0 ? (
            <Empty
              description="暂无订单"
              imageStyle={{ width: 128 }}
            />
          ) : (
            <div>
              {orders.map((order) => (
                <OrderCard
                  key={order.orderId}
                  order={order}
                  onClick={handleOrderClick}
                />
              ))}
            </div>
          )}
        </PullToRefresh>
      </div>

      <BottomNav />
    </div>
  );
}

