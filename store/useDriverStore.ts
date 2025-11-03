/**
 * 司机状态管理
 */
import { create } from 'zustand';
import { Driver, DriverStatus } from '@/types/driver';
import { getDriverInfo, updateDriverStatus, reportLocation } from '@/services/driverService';

interface DriverStore {
  driver: Driver | null;
  loading: boolean;
  
  // 方法
  setDriver: (driver: Driver | null) => void;
  fetchDriverInfo: () => Promise<void>;
  updateStatus: (status: DriverStatus) => Promise<void>;
  reportLocation: (lat: number, lng: number) => Promise<void>;
  logout: () => void;
}

export const useDriverStore = create<DriverStore>((set, get) => ({
  driver: null,
  loading: false,

  setDriver: (driver) => set({ driver }),

  fetchDriverInfo: async () => {
    set({ loading: true });
    try {
      const response = await getDriverInfo();
      set({ driver: response.data, loading: false });
    } catch (error) {
      console.error('获取司机信息失败:', error);
      set({ loading: false });
    }
  },

  updateStatus: async (status: DriverStatus) => {
    const { driver } = get();
    if (!driver) return;

    try {
      await updateDriverStatus(status);
      set({
        driver: {
          ...driver,
          status,
        },
      });
    } catch (error) {
      console.error('更新状态失败:', error);
      throw error;
    }
  },

  reportLocation: async (lat: number, lng: number) => {
    const { driver } = get();
    if (!driver) return;

    try {
      await reportLocation({
        driverId: driver.driverId,
        lat,
        lng,
        timestamp: Date.now(),
      });
      
      set({
        driver: {
          ...driver,
          lat,
          lng,
        },
      });
    } catch (error) {
      console.error('上报位置失败:', error);
    }
  },

  logout: () => {
    set({ driver: null });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },
}));

