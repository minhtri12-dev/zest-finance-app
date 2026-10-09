'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft, TrendingUp, Edit2, Check } from 'lucide-react';

export default function BudgetSummary({
  totalExpense,
  totalIncome,
  monthlyBudget,
  setMonthlyBudget,
  budgetPercentage,
  timeFilter,
  setTimeFilter,
  isPrivacyMode,
  setIsPrivacyMode,
  formatMoney,
  cardBg
}) {
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(monthlyBudget.toString());

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const val = parseInt(budgetInput.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(val) && val > 0) {
      setMonthlyBudget(val);
    }
    setIsEditingBudget(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className={`md:col-span-5 border rounded-[2.5rem] p-6 relative overflow-hidden group transition-all ${cardBg}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Ngân sách tháng</p>
              <button onClick={() => setIsPrivacyMode(!isPrivacyMode)} className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer" title="Ẩn/Hiện số dư">
                {isPrivacyMode ? <EyeOff size={13} className="text-[#34d399]" /> : <Eye size={13} />}
              </button>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-1">{formatMoney(totalExpense)}</h2>
          </div>
          <div className="flex rounded-full p-1 text-[11px] font-bold border border-white/10 bg-black/20">
            <button onClick={() => setTimeFilter('today')} className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${timeFilter === 'today' ? 'bg-white/20 text-white' : 'opacity-60'}`}>Hôm nay</button>
            <button onClick={() => setTimeFilter('month')} className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${timeFilter === 'month' ? 'bg-white/20 text-white' : 'opacity-60'}`}>Tháng này</button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          {isEditingBudget ? (
            <form onSubmit={handleSaveBudget} className="flex items-center gap-2">
              <input 
                type="text" 
                value={budgetInput} 
                onChange={(e) => setBudgetInput(e.target.value)} 
                className="bg-black/50 border border-white/20 text-xs px-3 py-1.5 rounded-xl text-white outline-none w-36"
                placeholder="Nhập hạn mức..."
                autoFocus
              />
              <button type="submit" className="p-1.5 bg-[#34d399] text-black rounded-xl font-bold"><Check size={14}/></button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-xs font-medium opacity-70">
              <span>Đã dùng {budgetPercentage}% hạn mức ({formatMoney(monthlyBudget)})</span>
              <button onClick={() => { setBudgetInput(monthlyBudget.toString()); setIsEditingBudget(true); }} className="p-1 hover:text-[#34d399] transition-colors cursor-pointer" title="Sửa hạn mức">
                <Edit2 size={13}/>
              </button>
            </div>
          )}
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#34d399] bg-[#34d399]/10 px-2.5 py-1 rounded-xl">
            <TrendingUp size={14} />
            <span>-4.2% so với tháng trước</span>
          </div>
          <div className="w-32 h-8">
            <svg viewBox="0 0 100 30" className="w-full h-full stroke-[#34d399] fill-none stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
              <path d="M0 25 Q 25 15, 50 18 T 100 5" />
            </svg>
          </div>
        </div>
      </div>

      <div className={`md:col-span-3 border rounded-[2.5rem] p-6 relative overflow-hidden group transition-all flex flex-col justify-between ${cardBg}`}>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#34d399]/15 blur-3xl rounded-full"></div>
        <div className="flex justify-between items-start relative z-10">
          <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Tổng Thu nhập</p>
          <div className="w-8 h-8 rounded-xl bg-[#34d399]/10 flex items-center justify-center text-[#34d399]"><ArrowDownLeft size={16}/></div>
        </div>
        <div className="relative z-10 my-4">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{formatMoney(totalIncome)}</h2>
        </div>
        <div className="flex justify-between items-center text-[11px] relative z-10 pt-4 border-t border-white/5 opacity-80">
          <span className="font-bold text-emerald-400">Dòng tiền ổn định</span>
          <span className="text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded-md font-bold">Active</span>
        </div>
      </div>

      <div className={`md:col-span-4 border rounded-[2.5rem] p-6 relative group transition-all flex flex-col justify-between ${cardBg}`}>
        <div className="flex justify-between items-start">
          <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Tổng Chi tiêu</p>
          <div className="w-8 h-8 rounded-xl bg-slate-500/10 flex items-center justify-center opacity-70"><ArrowUpRight size={16}/></div>
        </div>
        <div className="my-4">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{formatMoney(totalExpense)}</h2>
        </div>
        <div className="flex justify-between items-center text-[11px] pt-4 border-t border-white/5 opacity-70">
          <span className="font-medium">Hạn mức an toàn ngày</span>
          <span className="text-[#38bdf8] font-bold">{formatMoney(Math.round(monthlyBudget / 30))}</span>
        </div>
      </div>
    </div>
  );
}