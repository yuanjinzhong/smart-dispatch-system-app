/**
 * 底部导航组件
 */
'use client';

import type { CSSProperties } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { TabBar } from 'antd-mobile';
import {
  AppOutline,
  UnorderedListOutline,
  FileOutline,
  UserOutline,
} from 'antd-mobile-icons';

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/orders',
      title: '抢单',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/my-orders',
      title: '订单',
      icon: <FileOutline />,
    },
    {
      key: '/profile',
      title: '我的',
      icon: <UserOutline />,
    },
  ];

  const tabBarStyle: CSSProperties = {
    '--height': '60px',
    '--icon-size': '22px',
    '--background-color': '#ffffff',
  } as CSSProperties;

  return (
    <div
      className="bg-white border-t border-gray-200 safe-area-inset-bottom shadow-[0_-4px_12px_rgba(0,0,0,0.04)]"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
        borderTop: '1px solid #e5e7eb',
      }}
    >
      <TabBar
        activeKey={pathname}
        onChange={(key) => router.push(key)}
          style={tabBarStyle}
        safeArea
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}

