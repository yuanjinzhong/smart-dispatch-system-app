/**
 * 统计卡片组件
 */
'use client';

import { Card, Grid } from 'antd-mobile';
import { formatMoney } from '@/utils/format';

interface StatisticsCardProps {
  todayOrders: number;
  todayIncome: number;
  completionRate: number;
  rating: number;
}

export default function StatisticsCard({
  todayOrders,
  todayIncome,
  completionRate,
  rating,
}: StatisticsCardProps) {
  return (
    <Card className="mb-4">
      <div className="mb-3">
        <div className="text-sm text-gray-500">今日收益</div>
        <div className="text-2xl font-bold text-primary mt-1">
          {formatMoney(todayIncome)}
        </div>
      </div>
      
      <Grid columns={3} gap={8}>
        <Grid.Item>
          <div className="text-center">
            <div className="text-lg font-bold">{todayOrders}</div>
            <div className="text-xs text-gray-500 mt-1">今日订单</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className="text-center">
            <div className="text-lg font-bold">{completionRate}%</div>
            <div className="text-xs text-gray-500 mt-1">完单率</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className="text-center">
            <div className="text-lg font-bold">{rating.toFixed(1)}</div>
            <div className="text-xs text-gray-500 mt-1">评分</div>
          </div>
        </Grid.Item>
      </Grid>
    </Card>
  );
}

