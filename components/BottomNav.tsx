/**
 * 底部导航组件
 */
'use client';

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

  return (
    <div 
      className="bg-white border-t border-gray-200 safe-area-inset-bottom"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <TabBar
        activeKey={pathname}
        onChange={(key) => router.push(key)}
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}

