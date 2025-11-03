/**
 * 格式化工具函数
 */

/**
 * 格式化金额
 */
export function formatMoney(amount: number): string {
  return `¥${amount.toFixed(2)}`;
}

/**
 * 格式化手机号（隐藏中间4位）
 */
export function formatPhone(phone: string): string {
  if (!phone || phone.length !== 11) return phone;
  return `${phone.slice(0, 3)}****${phone.slice(7)}`;
}

/**
 * 格式化日期时间
 */
export function formatDateTime(dateStr: string | Date): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // 一分钟内
  if (diff < 60000) {
    return '刚刚';
  }
  
  // 一小时内
  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}分钟前`;
  }
  
  // 今天
  if (date.toDateString() === now.toDateString()) {
    return `今天 ${date.getHours()}:${padZero(date.getMinutes())}`;
  }
  
  // 昨天
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `昨天 ${date.getHours()}:${padZero(date.getMinutes())}`;
  }
  
  // 其他
  return `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${padZero(date.getMinutes())}`;
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * 格式化订单号
 */
export function formatOrderNo(orderNo: string | number): string {
  const str = String(orderNo);
  if (str.length <= 8) return str;
  return `${str.slice(0, 4)}...${str.slice(-4)}`;
}

