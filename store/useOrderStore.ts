/**
 * 订单状态管理
 */
import { create } from 'zustand';
import { Order, OrderFilter } from '@/types/order';
import { getAvailableOrders, getOrderDetail, grabOrder } from '@/services/orderService';
import { Toast } from 'antd-mobile';

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  filter: OrderFilter;
  
  // 方法
  setOrders: (orders: Order[]) => void;
  setCurrentOrder: (order: Order | null) => void;
  setFilter: (filter: OrderFilter) => void;
  fetchOrders: () => Promise<void>;
  fetchOrderDetail: (orderId: number) => Promise<void>;
  grabOrder: (orderId: number, driverId: number) => Promise<boolean>;
  addOrder: (order: Order) => void;
  removeOrder: (orderId: number) => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  filter: {},

  setOrders: (orders) => set({ orders }),
  
  setCurrentOrder: (order) => set({ currentOrder: order }),
  
  setFilter: (filter) => set({ filter }),

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const { filter } = get();
      const response = await getAvailableOrders(filter);
      set({ orders: response.data.list, loading: false });
    } catch (error) {
      console.error('获取订单列表失败:', error);
      set({ loading: false });
    }
  },

  fetchOrderDetail: async (orderId: number) => {
    set({ loading: true });
    try {
      const response = await getOrderDetail(orderId);
      set({ currentOrder: response.data, loading: false });
    } catch (error) {
      console.error('获取订单详情失败:', error);
      set({ loading: false });
    }
  },

  grabOrder: async (orderId: number, driverId: number) => {
    try {
      const response = await grabOrder({ orderId, driverId });
      
      if (response.data.success) {
        Toast.show({
          icon: 'success',
          content: '抢单成功！',
        });
        
        // 从列表中移除已抢订单
        const { orders } = get();
        set({
          orders: orders.filter((order) => order.orderId !== orderId),
        });
        
        return true;
      } else {
        Toast.show({
          icon: 'fail',
          content: '抢单失败',
        });
        return false;
      }
    } catch (error) {
      console.error('抢单失败:', error);
      return false;
    }
  },

  addOrder: (order: Order) => {
    const { orders } = get();
    // 避免重复添加
    if (!orders.find((o) => o.orderId === order.orderId)) {
      set({ orders: [order, ...orders] });
    }
  },

  removeOrder: (orderId: number) => {
    const { orders } = get();
    set({ orders: orders.filter((order) => order.orderId !== orderId) });
  },
}));

