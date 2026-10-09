'use client';

import React from 'react';
import { Bot, BarChart3, TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';

export default function BudgetSummary({
  totalFilteredExpense,
  totalFilteredIncome,
  chartData,
  maxChartVal,
  currChartHeight,
  prevChartHeight,
  formatMoney,
  formatShortMoney,
  isPrivacyMode,
  setIsPrivacyMode,
  monthlyExpense,
  monthlyBudget,
  burnRate,
  dailyLimit,
  getAiAdvice,
  isDarkMode
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className={`rounded-3xl shadow-sm border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32] hover:border-[#D49A65]/30' : 'bg-white border-[#D0D4DC] hover:border-[#16181A]/30'}`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[#9EA0A5] text-[10px] font-bold uppercase tracking-wider">Tổng chi (Theo bộ lọc)</p>
            <p className={`font-extrabold text-2xl md:text-3xl mt-1 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{formatMoney(totalFilteredExpense)}</p>
            {totalFilteredIncome > 0 && (
              <p className="text-xs font-bold text-emerald-500 mt-1">Thu vào: +{formatMoney(totalFilteredIncome)}</p>
            )}
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#D49A65]/10 flex items-center justify-center text-[#D49A65]">
            <BarChart3 size={22} />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-dashed flex items-end gap-6 h-32 justify-center border-[#9EA0A5]/20">
           <div className="flex flex-col items-center gap-2 h-full justify-end w-16 group cursor-pointer">
              <span className="text-[11px] font-bold text-[#9EA0A5] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{formatShortMoney(chartData.prev)}</span>
              <div className={`w-10 rounded-t-md transition-all duration-700 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} style={{ height: `${prevChartHeight}%` }}></div>
              <span className="text-[11px] font-bold text-[#9EA0A5] whitespace-nowrap">{chartData.prevLabel}</span>
           </div>
           
           <div className="flex flex-col items-center gap-2 h-full justify-end w-16 group cursor-pointer">
              <span className={`text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{formatShortMoney(chartData.curr)}</span>
              <div className={`w-10 rounded-t-md transition-all duration-700 ${chartData.isUp ? 'bg-red-400' : 'bg-emerald-400'}`} style={{ height: `${currChartHeight}%` }}></div>
              <span className={`text-[11px] font-bold whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{chartData.currLabel}</span>
           </div>
        </div>

        <div className="flex items-center justify-center mt-4 text-[11px] font-bold">
           {chartData.isNeutral ? (
              <span className="text-slate-500 bg-slate-500/10 px-2.5 py-1.5 rounded-lg border border-slate-500/20">Không biến động (0%)</span>
           ) : (
              <span className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 shadow-sm ${chartData.isUp ? 'text-red-500 bg-red-500/10 border-red-500/20' : 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'}`}>
                 {chartData.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                 <b>{chartData.percent}%</b> so với {chartData.prevLabel.toLowerCase()}
              </span>
           )}
        </div>

        <div className={`mt-5 pt-3 border-t flex items-center justify-center ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
          <button onClick={() => setIsPrivacyMode(!isPrivacyMode)} className={`px-3 py-1.5 border rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${isDarkMode ? 'bg-[#16181A] hover:bg-white/10 border-[#2A2D32] text-[#9EA0A5]' : 'bg-[#F4F5F7] hover:bg-[#D0D4DC] border-[#D0D4DC] text-slate-700'}`}>
            {isPrivacyMode ? <EyeOff size={13} className="text-[#D49A65]" /> : <Eye size={13} className="text-[#D49A65]" />}
            <span>{isPrivacyMode ? 'Đã ẩn số dư' : 'Ẩn số dư'}</span>
          </button>
        </div>
      </div>

      <div className={`md:col-span-2 border rounded-3xl p-6 flex flex-col justify-center gap-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32] hover:border-[#D49A65]/30' : 'bg-white border-[#D0D4DC] hover:border-[#16181A]/30'}`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#D49A65]/10 border border-[#D49A65]/20 flex items-center justify-center shrink-0 text-[#D49A65]">
            <Bot size={26} />
          </div>
          <div>
            <p className="text-xs font-extrabold text-[#D49A65] uppercase tracking-wider">Cảnh báo Dòng tiền (Tháng này)</p>
            <p className={`text-sm mt-1.5 font-medium leading-relaxed ${monthlyExpense >= monthlyBudget ? 'text-red-400 font-bold' : (isDarkMode ? 'text-slate-200' : 'text-slate-700')}`}>
              {getAiAdvice()}
            </p>
          </div>
        </div>
        <div className={`grid grid-cols-2 gap-3 pt-5 border-t ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
           <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
              <p className="text-[11px] font-bold text-[#9EA0A5] mb-1">Tốc độ đốt tiền tháng</p>
              <p className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{burnRate.toLocaleString('vi-VN')} đ/ngày</p>
           </div>
           <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
              <p className="text-[11px] font-bold text-[#9EA0A5] mb-1">Ngưỡng an toàn ngày</p>
              <p className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{dailyLimit.toLocaleString('vi-VN')} đ/ngày</p>
           </div>
        </div>
      </div>
    </div>
  );
}