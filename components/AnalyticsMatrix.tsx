'use client';

import React from 'react';
import { PieChart } from 'lucide-react';

export default function AnalyticsMatrix({
  targetEssential = 0,
  essentialSpend = 0,
  targetLifestyle = 0,
  lifestyleSpend = 0,
  targetSavings = 0,
  formatMoney = (v) => v,
  cardBg = ''
}) {
  return (
    <div className={`border rounded-[2.5rem] p-6 space-y-4 ${cardBg}`}>
      <div className="flex items-center gap-2.5 pb-3 border-b opacity-90">
        <div className="w-8 h-8 rounded-xl bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7]"><PieChart size={16}/></div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider">Ma trận ngân sách chuẩn 50/30/20</h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-[#38bdf8]">Thiết yếu (50%): {formatMoney(targetEssential)}</span>
            <span className="opacity-70">Dùng: {formatMoney(essentialSpend)}</span>
          </div>
          <div className="w-full h-2 bg-slate-500/20 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${essentialSpend > targetEssential ? 'bg-red-500' : 'bg-[#38bdf8]'}`} style={{ width: `${Math.min(Math.round((essentialSpend / (targetEssential || 1)) * 100), 100)}%` }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-[#a855f7]">Mong muốn (30%): {formatMoney(targetLifestyle)}</span>
            <span className="opacity-70">Dùng: {formatMoney(lifestyleSpend)}</span>
          </div>
          <div className="w-full h-2 bg-slate-500/20 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${lifestyleSpend > targetLifestyle ? 'bg-red-500' : 'bg-[#a855f7]'}`} style={{ width: `${Math.min(Math.round((lifestyleSpend / (targetLifestyle || 1)) * 100), 100)}%` }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-[#34d399]">Tiết kiệm (20%): {formatMoney(targetSavings)}</span>
            <span className="opacity-70">Quỹ dự phòng an toàn</span>
          </div>
          <div className="w-full h-2 bg-slate-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-[#34d399] rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}