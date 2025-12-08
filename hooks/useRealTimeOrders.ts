/**
 * 实时订单推送Hook
 */
import { useEffect } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { Toast } from 'antd-mobile';
import { Order } from '@/types/order';
import { USE_MOCK, generateMockOrder } from '@/mocks/mockServices';

export function useRealTimeOrders() {
  const addOrder = useOrderStore((state) => state.addOrder);

  useEffect(() => {
    if (USE_MOCK) {
      // Mock模式：模拟订单推送
      const timer = setInterval(() => {
        const newOrder = generateMockOrder();

        playNotificationSound();

        Toast.show({
          icon: 'success',
          content: `新订单：${newOrder.title}，运费¥${newOrder.freight}`,
          duration: 3000,
        });

        addOrder(newOrder);
      }, 8000);

      return () => clearInterval(timer);
    }

    // 真实模式：SSE连接
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8070'}/api/sse/orders`
    );

    eventSource.onmessage = (event) => {
      try {
        const newOrder: Order = JSON.parse(event.data);
        
        // 播放提示音
        playNotificationSound();
        
        // 显示Toast提示
        Toast.show({
          icon: 'success',
          content: `新订单：${newOrder.title}`,
          duration: 3000,
        });
        
        // 添加到订单列表
        addOrder(newOrder);
      } catch (error) {
        console.error('解析订单数据失败:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE连接错误:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [addOrder]);
}

function playNotificationSound() {
  if (typeof window !== 'undefined') {
    const audio = new Audio('/sounds/order-notify.mp3');
    audio.play().catch((err) => {
      console.error('播放提示音失败:', err);
    });
  }
}
