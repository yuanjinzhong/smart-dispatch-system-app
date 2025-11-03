# 智能调度系统 - 司机端移动应用

基于 Next.js + React + Ant Design Mobile 构建的同城货运智能调度系统司机端H5应用。

## 📱 项目简介

这是一个面向同城货运司机的移动端应用，主要功能包括：

- 🚗 **实时抢单**：查看可抢订单列表，支持实时推送新订单
- 📦 **订单管理**：查看订单详情、历史订单
- 📍 **智能匹配**：基于H3地理索引的位置匹配
- 💰 **收益统计**：查看日/周/月收益统计
- 👤 **个人中心**：司机信息、状态管理

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **UI组件**: Ant Design Mobile 5
- **状态管理**: Zustand
- **HTTP客户端**: Axios
- **样式方案**: Tailwind CSS
- **地图SDK**: 高德地图 JS API
- **TypeScript**: 完整的类型支持

## 📦 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

## 🚀 开发运行

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🔧 环境配置

复制 `.env.example` 为 `.env.local` 并配置：

```env
# 后端API地址
NEXT_PUBLIC_API_BASE_URL=http://localhost:8070

# 高德地图API Key (需要自行申请)
NEXT_PUBLIC_AMAP_KEY=your_amap_key_here
```

### 获取高德地图Key

1. 访问 [高德开放平台](https://console.amap.com/)
2. 注册/登录账号
3. 创建应用，选择"Web端(JS API)"
4. 获取Key并填入 `.env.local`

## 📱 页面结构

```
app/
├── page.tsx              # 首页（工作台）
├── orders/
│   ├── page.tsx         # 抢单大厅
│   └── [id]/
│       └── page.tsx     # 订单详情
├── my-orders/
│   └── page.tsx         # 我的订单
└── profile/
    └── page.tsx         # 个人中心
```

## 🎨 核心功能

### 1. 抢单大厅

- 实时订单列表
- 下拉刷新
- 订单筛选（距离、运费、车型）
- 一键抢单
- SSE实时推送新订单

### 2. 订单详情

- 订单基本信息
- 取货/送货地址
- 路线规划（地图）
- 联系人信息
- 货物信息

### 3. 我的订单

- 全部/进行中/已完成/已取消
- 订单历史记录

### 4. 个人中心

- 司机信息展示
- 收益统计
- 状态管理（空闲/忙碌）
- 退出登录

## 🔌 API接口

### 必需接口（后端需实现）

```typescript
// 司机相关
POST   /api/driver/login           # 登录
GET    /api/driver/info            # 获取信息
PUT    /api/driver/status          # 更新状态
POST   /api/driver/location        # 上报位置
GET    /api/driver/statistics      # 统计数据

// 订单相关
GET    /api/orders/available       # 可抢订单
GET    /api/orders/:id             # 订单详情
GET    /api/orders/my              # 我的订单
GET    /api/order/order            # 抢单（已实现）

// 实时推送
GET    /api/sse/orders             # SSE推送
```

## 📂 项目目录

```
smart-dispatch-system-app/
├── app/                   # Next.js页面
├── components/            # UI组件
│   ├── OrderCard.tsx
│   ├── BottomNav.tsx
│   ├── DriverStatus.tsx
│   └── StatisticsCard.tsx
├── store/                 # Zustand状态管理
│   ├── useDriverStore.ts
│   ├── useOrderStore.ts
│   └── useAuthStore.ts
├── services/              # API服务
│   ├── orderService.ts
│   ├── driverService.ts
│   └── locationService.ts
├── hooks/                 # 自定义Hooks
│   ├── useLocation.ts
│   ├── useRealTimeOrders.ts
│   └── useInterval.ts
├── utils/                 # 工具函数
│   ├── request.ts        # Axios封装
│   ├── geo.ts            # 地理计算
│   └── format.ts         # 格式化
├── types/                 # TypeScript类型
│   ├── order.ts
│   ├── driver.ts
│   └── api.ts
└── public/                # 静态资源
```

## 🎯 特性

- ✅ 移动端优先设计
- ✅ PWA支持（可安装到桌面）
- ✅ 实时订单推送
- ✅ 响应式布局
- ✅ TypeScript类型安全
- ✅ 暗黑模式支持（可选）
- ✅ 离线缓存
- ✅ 性能优化

## 📝 待完善功能

- [ ] 登录页面
- [ ] 地图集成（路线规划、订单标记）
- [ ] 订单筛选面板
- [ ] 地图模式切换
- [ ] 消息通知
- [ ] 个人设置
- [ ] 车辆信息管理

## 🚀 部署

### Vercel部署

1. 推送代码到GitHub
2. 在Vercel导入项目
3. 配置环境变量
4. 部署

### 自建服务器

```bash
# 构建
npm run build

# 启动
npm run start
```

## 📄 协议

MIT License

## 👨‍💻 开发者

智能调度系统团队

---

**注意**: 本项目为Demo版本，生产环境使用前请完善安全认证、错误处理等功能。
