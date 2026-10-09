'use client';

import React from 'react';
import { ShieldAlert, PieChart, Printer, Download, Trash2 } from 'lucide-react';

export default function AnalyticsMatrix({
  targetEssential,
  essentialSpend,
  targetLifestyle,
  lifestyleSpend,
  targetSavings,
  categoriesList,
  getCategoryMonthlyTotal,
  monthlyExpense,
  formatMoney,
  exportPdfReport,
  exportCsvReport,
  clearAllTransactions,
  isDarkMode
}) {
  return (
    <div className="space-y-6">
      <div className={`rounded-3xl p-6 shadow-sm border-2 border-[#D49A65]/20 transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-[#191A1C]' : 'bg-white'}`}>
        <div className={`flex items-center justify-between mb-4 pb-3 border-b ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D49A65]/10 flex items-center justify-center text-[#D49A65]">
              <ShieldAlert size={18} />
            </div>
            <h2 className={`font-extrabold text-xs uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>Trụ cột 2: Ma trận phân bổ ngân sách chuẩn 50/30/20</h2>
          </div>
          <span className="text-[11px] text-[#9EA0A5] italic hidden sm:block">50% Nhu cầu • 30% Mong muốn • 20% Tiết kiệm</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-[#D49A65]">Thiết yếu (50%)</span>
              <span>{formatMoney(targetEssential)}</span>
            </div>
            <p className="text-xs font-extrabold text-[#9EA0A5] mb-2">Tháng này dùng: {formatMoney(essentialSpend)}</p>
            <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
              <div className={`h-full rounded-full ${essentialSpend > targetEssential ? 'bg-red-500' : 'bg-[#D49A65]'}`} style={{ width: `${Math.min(Math.round((essentialSpend / targetEssential) * 100), 100)}%` }}></div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-[#E2A368]">Mong muốn (30%)</span>
              <span>{formatMoney(targetLifestyle)}</span>
            </div>
            <p className="text-xs font-extrabold text-[#9EA0A5] mb-2">Tháng này dùng: {formatMoney(lifestyleSpend)}</p>
            <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
              <div className={`h-full rounded-full ${lifestyleSpend > targetLifestyle ? 'bg-red-500' : 'bg-[#E2A368]'}`} style={{ width: `${Math.min(Math.round((lifestyleSpend / targetLifestyle) * 100), 100)}%` }}></div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-[#D49A65]">Tiết kiệm / Đầu tư (20%)</span>
              <span>{formatMoney(targetSavings)}</span>
            </div>
            <p className="text-xs font-extrabold text-[#9EA0A5] mb-2">Quỹ dự phòng an toàn</p>
            <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
              <div className="h-full rounded-full bg-[#D49A65]" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`rounded-3xl p-6 shadow-sm border transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3 pb-3 border-b ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D49A65]/10 flex items-center justify-center text-[#D49A65]">
              <PieChart size={18} />
            </div>
            <h2 className={`font-extrabold text-xs uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>Phân tích chi tiêu theo danh mục (Tháng này)</h2>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button onClick={exportPdfReport} className={`px-3.5 py-2 border rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${isDarkMode ? 'bg-[#2A2D32] hover:bg-[#33373D] border-[#2A2D32] text-[#9EA0A5]' : 'bg-[#F4F5F7] hover:bg-[#D0D4DC] border-[#D0D4DC] text-slate-700'}`}>
              <Printer size={13} /> Xuất PDF
            </button>
            <button onClick={exportCsvReport} className={`px-3.5 py-2 border rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${isDarkMode ? 'bg-[#2A2D32] hover:bg-[#33373D] border-[#2A2D32] text-[#9EA0A5]' : 'bg-[#F4F5F7] hover:bg-[#D0D4DC] border-[#D0D4DC] text-slate-700'}`}>
              <Download size={13} /> Xuất CSV
            </button>
            <button onClick={clearAllTransactions} className="px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
              <Trash2 size={13} /> Xóa sạch
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {categoriesList.map((cat) => {
            const amount = getCategoryMonthlyTotal(cat);
            const percent = monthlyExpense > 0 ? Math.round((amount / monthlyExpense) * 100) : 0;
            return (
              <div key={cat} className={`p-3.5 rounded-2xl border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-sm ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
                <p className="text-[11px] font-bold text-[#9EA0A5]">{cat}</p>
                <p className={`text-sm font-extrabold mt-1 ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{formatMoney(amount)}</p>
                <div className={`w-full h-1.5 rounded-full mt-2.5 overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
                  <div className="bg-[#D49A65] h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}