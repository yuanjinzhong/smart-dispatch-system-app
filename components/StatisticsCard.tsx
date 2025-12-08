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
    <Card className="card-panel">
      <div className="flex flex-col gap-2 mb-4">
        <div className="text-sm text-muted">今日收益</div>
        <div className="text-3xl font-bold text-primary leading-tight">
          {formatMoney(todayIncome)}
        </div>
        <div className="text-xs text-muted">数据每 5 分钟刷新</div>
      </div>

      <Grid columns={3} gap={12}>
        <Grid.Item>
          <div className="flex flex-col items-center gap-1">
            <div className="text-xl font-semibold text-[var(--text-primary)]">
              {todayOrders}
            </div>
            <div className="text-xs text-muted">今日订单</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className="flex flex-col items-center gap-1">
            <div className="text-xl font-semibold text-success">
              {completionRate}%
            </div>
            <div className="text-xs text-muted">完单率</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className="flex flex-col items-center gap-1">
            <div className="text-xl font-semibold text-[var(--text-primary)]">
              {rating.toFixed(1)}
            </div>
            <div className="text-xs text-muted">评分</div>
          </div>
        </Grid.Item>
      </Grid>
    </Card>
  );
}

