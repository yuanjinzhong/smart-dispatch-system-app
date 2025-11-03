# 快速启动指南

## 🚀 3分钟快速启动

### 1. 安装依赖（已完成）

项目依赖已经安装完成，包括：
- ✅ Next.js 15
- ✅ React 18
- ✅ Ant Design Mobile 5
- ✅ Zustand (状态管理)
- ✅ Axios (HTTP客户端)
- ✅ Tailwind CSS
- ✅ TypeScript

### 2. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑 .env.local，修改API地址
NEXT_PUBLIC_API_BASE_URL=http://localhost:8070
```

### 3. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问: **http://localhost:3000**

### 4. 启动后端服务

确保后端服务已启动：

```bash
cd ../smart-dispatch-system
mvn spring-boot:run
```

后端服务地址: **http://localhost:8070**

---

## 📱 在手机上预览

### 方法1: 使用局域网IP

1. 获取电脑IP地址（例如: 192.168.1.100）
2. 手机和电脑连接同一WiFi
3. 手机浏览器访问: http://192.168.1.100:3000

### 方法2: 使用Chrome DevTools

1. 打开Chrome浏览器
2. 按F12打开开发者工具
3. 点击设备工具栏图标（手机图标）
4. 选择目标设备型号

---

## 🔧 后端接口开发指南

### 必需实现的接口

前端已经集成完成，但后端还需实现以下接口：

#### 1. 司机登录

```java
POST /api/driver/login
Content-Type: application/json

Request:
{
  "phone": "13800138000",
  "password": "123456"
}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "driver": {
      "driverId": 1001,
      "name": "张三",
      "phone": "13800138000",
      "status": "idle",
      "lat": 39.908823,
      "lng": 116.397470,
      "vehicleType": "小型货车",
      "vehicleNo": "京A12345",
      "rating": 4.8,
      "completionRate": 95,
      "memberLevel": 3,
      "todayOrders": 8,
      "todayIncome": 320.50
    }
  }
}
```

#### 2. 获取可抢订单列表

```java
GET /api/orders/available?minDistance=0&maxDistance=5000&minFreight=10&maxFreight=100

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 25,
    "list": [
      {
        "orderId": 2001,
        "title": "货物运输",
        "content": "普通货物",
        "freight": 18.00,
        "distance": 3500,
        "pickupAddress": "北京市朝阳区望京SOHO T3",
        "deliveryAddress": "北京市朝阳区三里屯太古里",
        "pickupLat": 40.003,
        "pickupLng": 116.475,
        "deliveryLat": 39.936,
        "deliveryLng": 116.456,
        "pickupContact": "张三",
        "pickupPhone": "13900001234",
        "deliveryContact": "李四",
        "deliveryPhone": "13800005678",
        "orderCreateTime": "2025-10-31T10:30:00",
        "isSubscribe": false,
        "vehicleType": "小型货车",
        "status": "TBC",
        "weight": "50kg",
        "remark": "请轻拿轻放"
      }
    ]
  }
}
```

#### 3. 获取司机信息

```java
GET /api/driver/info
Authorization: Bearer {token}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "driverId": 1001,
    "name": "张三",
    // ... 其他字段同登录接口
  }
}
```

#### 4. 更新司机状态

```java
PUT /api/driver/status
Content-Type: application/json
Authorization: Bearer {token}

Request:
{
  "status": "idle"  // idle: 空闲, busy: 忙碌, offline: 离线
}

Response:
{
  "code": 200,
  "message": "success"
}
```

#### 5. 上报位置

```java
POST /api/driver/location
Content-Type: application/json
Authorization: Bearer {token}

Request:
{
  "driverId": 1001,
  "lat": 39.908823,
  "lng": 116.397470,
  "timestamp": 1698739200000
}

Response:
{
  "code": 200,
  "message": "success"
}
```

#### 6. 获取订单详情

```java
GET /api/orders/2001
Authorization: Bearer {token}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "orderId": 2001,
    // ... 完整订单信息
  }
}
```

#### 7. 我的订单列表

```java
GET /api/orders/my?status=FULFILLING
Authorization: Bearer {token}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 5,
    "list": [...]
  }
}
```

#### 8. 统计数据

```java
GET /api/driver/statistics
Authorization: Bearer {token}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "todayOrders": 8,
    "todayIncome": 320.50,
    "weekOrders": 45,
    "weekIncome": 1850.00,
    "monthOrders": 180,
    "monthIncome": 7200.00,
    "totalOrders": 520,
    "totalIncome": 22000.00,
    "completionRate": 95,
    "rating": 4.8
  }
}
```

#### 9. SSE实时推送（可选）

```java
GET /api/sse/orders
Authorization: Bearer {token}

// 服务端推送事件示例
data: {"orderId":2002,"title":"新订单","freight":25.00,...}
```

---

## 📝 开发注意事项

### 1. 跨域配置

后端需要配置CORS允许前端访问：

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

### 2. 响应格式统一

所有接口返回格式应统一为：

```json
{
  "code": 200,
  "message": "success",
  "data": {...}
}
```

### 3. 错误处理

```json
{
  "code": 400,
  "message": "参数错误",
  "data": null
}
```

---

## 🎯 测试数据

### 测试司机账号

```
手机号: 13800138000
密码: 123456
```

### 测试订单

可以在Kafka中发送测试订单消息到 `order-topic`

---

## 🐛 常见问题

### Q1: 无法连接后端API

**A**: 检查以下几点：
1. 后端服务是否启动（端口8070）
2. `.env.local`中的API地址是否正确
3. 是否配置了CORS

### Q2: 订单列表为空

**A**: 
1. 检查后端是否有订单数据
2. 查看浏览器控制台是否有错误
3. 确认司机已登录

### Q3: 定位失败

**A**: 
1. 浏览器需要HTTPS或localhost才能使用定位
2. 授予浏览器定位权限
3. 检查系统定位服务是否开启

---

## 📚 更多文档

- [README.md](./README.md) - 完整项目文档
- [后端项目](../smart-dispatch-system/readme.md) - 后端系统说明

---

**祝开发顺利！** 🎉

