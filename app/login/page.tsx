'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from 'antd-mobile';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);

  const handleLogin = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md flex flex-col gap-10 py-12">
        <div className="space-y-2">
          <div className="text-3xl font-semibold text-[var(--text-primary)] leading-tight">
            欢迎登录
          </div>
          <div className="text-sm text-muted">
            使用手机号或企业账号快捷登录
          </div>
        </div>

        <div className="space-y-6">
          <input
            type="tel"
            placeholder="请输入手机号码"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-14 rounded-xl bg-[#f5f6f7] px-4 text-lg outline-none border border-transparent focus:border-[var(--brand-primary)] transition"
          />

          <label className="flex items-start gap-2 text-sm text-muted">
            <input
              type="checkbox"
              className="mt-1"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
              我已阅读并同意
              <span className="text-[var(--brand-primary)]">《信息服务协议》</span>
              <span className="text-[var(--brand-primary)]">《软件使用协议》</span>
              <span className="text-[var(--brand-primary)]">《隐私政策》</span>
            </span>
          </label>

          <Button
            color="warning"
            block
            size="large"
            className="h-14 text-base rounded-xl"
            disabled={!agree || !phone}
          >
            获取验证码
          </Button>
        </div>

        <div className="mt-6">
          <div className="text-center text-sm text-gray-500 mb-4">其他登录方式</div>
          <div className="flex items-center justify-center gap-12">
            {[
              { key: 'feishu', label: '飞书', provider: 'feishu' },
              { key: 'github', label: 'GitHub', provider: 'github' },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => handleLogin(item.provider)}
                className="w-12 h-12 rounded-full bg-[#f5f6f7] flex items-center justify-center text-sm font-medium text-[var(--text-primary)]"
                aria-label={`使用${item.label}登录`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

