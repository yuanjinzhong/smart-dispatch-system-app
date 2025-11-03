/**
 * 认证状态管理
 */
import { create } from 'zustand';
import { login } from '@/services/driverService';
import { useDriverStore } from './useDriverStore';
import { mockDriver } from '@/mocks/mockData';

interface AuthStore {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  
  // 方法
  login: (phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  setToken: (token: string | null) => void;
  initAuth: () => void;
  mockLogin: () => void; // Mock登录
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  isAuthenticated: false,
  loading: false,

  login: async (phone: string, password: string) => {
    set({ loading: true });
    try {
      const response = await login({ phone, password });
      const { token, driver } = response.data;
      
      // 保存token
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      
      // 设置认证状态
      set({
        token,
        isAuthenticated: true,
        loading: false,
      });
      
      // 设置司机信息
      useDriverStore.getState().setDriver(driver);
      
      return true;
    } catch (error) {
      console.error('登录失败:', error);
      set({ loading: false });
      return false;
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({
      token: null,
      isAuthenticated: false,
    });
    useDriverStore.getState().logout();
  },

  setToken: (token) => {
    set({ token, isAuthenticated: !!token });
  },

  initAuth: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        set({ token, isAuthenticated: true });
        // 获取司机信息
        useDriverStore.getState().fetchDriverInfo();
      } else {
        // Mock模式：自动使用Mock司机数据
        if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
          const mockToken = 'mock_token_' + Date.now();
          localStorage.setItem('token', mockToken);
          set({ 
            token: mockToken, 
            isAuthenticated: true 
          });
          useDriverStore.getState().setDriver(mockDriver);
        }
      }
    }
  },

  // Mock登录 - 直接使用Mock数据
  mockLogin: () => {
    const mockToken = 'mock_token_' + Date.now();
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', mockToken);
    }
    set({
      token: mockToken,
      isAuthenticated: true,
    });
    useDriverStore.getState().setDriver(mockDriver);
  },
}));
