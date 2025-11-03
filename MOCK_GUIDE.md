# Mock数据使用指南

## 🎯 Mock模式说明

项目已集成完整的Mock数据系统，可以在没有后端服务的情况下独立运行和测试。

## 🚀 启用Mock模式

### 方法1: 环境变量配置

编辑 `.env.local` 文件：

```env
# Mock模式 (true: 使用Mock数据, false: 使用真实API)
NEXT_PUBLIC_USE_MOCK=true
```

### 方法2: 默认启用

项目默认已启用Mock模式，可以直接运行：

```bash
npm run dev
```

## 📦 Mock数据内容

### 1. Mock司机数据

```typescript
{
  driverId: 1001,
  name: '张三',
  phone: '13800138000',
  status: 'idle',
  vehicleType: '小型货车',
  vehicleNo: '京A12345',
  rating: 4.8,
  completionRate: 95,
  memberLevel: 3,
  todayOrders: 8,
  todayIncome: 320.50
}
```

### 2. Mock订单数据

提供了5个可抢订单：
- 订单ID: 2001 - 2005
- 包含普通订单和预约单
- 不同距离和运费
- 完整的地址和联系人信息

### 3. Mock登录

**测试账号:**
- 手机号: `13800138000`
- 密码: `123456`

**自动登录:**
- Mock模式下会自动使用Mock司机数据
- 无需手动登录

## 🔄 Mock功能列表

### ✅ 已实现的Mock接口

| 功能 | 接口 | Mock状态 |
|------|------|----------|
| 司机登录 | POST /api/driver/login | ✅ |
| 获取司机信息 | GET /api/driver/info | ✅ |
| 更新司机状态 | PUT /api/driver/status | ✅ |
| 上报位置 | POST /api/driver/location | ✅ |
| 可抢订单列表 | GET /api/orders/available | ✅ |
| 订单详情 | GET /api/orders/:id | ✅ |
| 抢单 | GET /api/order/order | ✅ |
| 我的订单 | GET /api/orders/my | ✅ |
| 统计数据 | GET /api/driver/statistics | ✅ |

### 🎨 Mock特性

1. **模拟延迟**: 所有Mock请求都有真实的网络延迟
2. **数据完整**: 包含完整的订单、司机、统计数据
3. **自动登录**: Mock模式下自动完成认证
4. **订单筛选**: 支持按距离、运费等条件筛选
5. **状态管理**: 完整的状态流转和数据管理

## 📝 使用示例

### 启动项目

```bash
# 1. 确保在项目目录
cd smart-dispatch-system-app

# 2. 确认Mock模式已启用
cat .env.local | grep USE_MOCK
# 应该显示: NEXT_PUBLIC_USE_MOCK=true

# 3. 启动开发服务器
npm run dev

# 4. 访问
# http://localhost:3000
```

### 切换到真实API

修改 `.env.local`:

```env
NEXT_PUBLIC_USE_MOCK=false
```

然后重启服务器。

## 🔧 自定义Mock数据

### 修改Mock数据

编辑文件: `mocks/mockData.ts`

```typescript
// 修改司机信息
export const mockDriver: Driver = {
  driverId: 1001,
  name: '你的名字',
  // ... 其他字段
};

// 添加更多订单
export const mockOrders: Order[] = [
  // ... 现有订单
  {
    orderId: 2006,
    // ... 新订单数据
  }
];
```

### 添加新的Mock服务

编辑文件: `mocks/mockServices.ts`

```typescript
export const mockOrderService = {
  // 添加新的Mock方法
  async newMethod() {
    await delay(300);
    return mockResponse({ /* 数据 */ });
  }
};
```

## 🎯 Mock数据文件结构

```
mocks/
├── mockData.ts          # Mock数据定义
└── mockServices.ts      # Mock服务实现
```

## 📊 Mock数据统计

- **司机数据**: 1个完整司机信息
- **可抢订单**: 5个不同类型的订单
- **历史订单**: 2个历史订单
- **统计数据**: 完整的收益统计
- **响应延迟**: 100ms - 800ms（模拟真实网络）

## 🐛 问题排查

### Mock数据不显示

1. 检查 `.env.local` 中 `NEXT_PUBLIC_USE_MOCK=true`
2. 重启开发服务器
3. 清除浏览器缓存
4. 检查浏览器控制台是否有错误

### 订单列表为空

- Mock模式下默认会显示5个订单
- 检查 `mocks/mockData.ts` 是否正确导出

### 登录失败

Mock模式下会自动登录，无需手动操作。如果需要测试登录：
- 手机号: `13800138000`
- 密码: `123456`

## 🚀 生产环境切换

部署到生产环境时，记得切换到真实API：

```env
# .env.production
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
```

---

## 💡 提示

Mock模式非常适合：
- ✅ 前端独立开发
- ✅ UI/UX测试
- ✅ 演示和展示
- ✅ 后端接口未就绪时的开发

**现在可以直接运行项目，体验完整的功能！** 🎉

