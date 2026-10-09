'use client';

import React from 'react';
import { History, Search, Wallet, Calendar, Edit3, Trash2 } from 'lucide-react';

export default function TransactionHistory({
  filteredTransactions,
  searchQuery,
  setSearchQuery,
  getCategoryMeta,
  formatMoney,
  setEditingTx,
  setEditNote,
  setEditAmount,
  deleteTransaction,
  isDarkMode
}) {
  return (
    <div className={`rounded-3xl p-6 shadow-sm border transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b gap-3 ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-500/10 flex items-center justify-center text-[#9EA0A5] shrink-0">
            <History size={18} />
          </div>
          <h2 className={`font-extrabold text-sm uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>Lịch sử giao dịch thông minh</h2>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9EA0A5]" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm kiếm giao dịch..." className={`text-xs pl-8 pr-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-[#D49A65] font-medium w-full sm:w-48 border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] text-white placeholder-slate-500' : 'bg-[#F4F5F7] border-[#D0D4DC] text-[#16181A] placeholder-slate-400'}`} />
          </div>
          <span className={`text-xs px-3 py-2 rounded-xl font-bold border ${isDarkMode ? 'bg-[#16181A] text-[#9EA0A5] border-[#2A2D32]' : 'bg-[#F4F5F7] text-slate-700 border-[#D0D4DC]'}`}>
            {filteredTransactions.length} mục
          </span>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-[#9EA0A5] text-xs gap-2">
          <Wallet size={32} className="text-[#9EA0A5]" />
          <p>Không tìm thấy giao dịch nào phù hợp.</p>
        </div>
      ) : (
        <div className="space-y-3 mt-4">
          {filteredTransactions.map((tx) => {
            const meta = getCategoryMeta(tx.category);
            const isIncome = tx.type === 'income';
            return (
              <div key={tx.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md group ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] hover:border-[#D49A65]/40' : 'bg-[#F4F5F7] border-[#D0D4DC] hover:border-[#16181A]/40'}`}>
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shadow-sm ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
                    {meta.icon}
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{tx.note}</p>
                    <div className="flex items-center gap-2.5 mt-1">
                      <span className={`text-[11px] border px-2.5 py-0.5 rounded-md font-bold ${meta.badgeBg}`}>{tx.category}</span>
                      <span className="text-[11px] text-[#9EA0A5] font-medium flex items-center gap-1">
                        <Calendar size={11} /> {tx.dateStr || 'Hôm nay'} - {tx.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-extrabold text-sm tracking-tight ${isIncome ? 'text-emerald-500' : (isDarkMode ? 'text-white' : 'text-[#16181A]')}`}>
                    {isIncome ? '+' : '-'}{formatMoney(tx.amount)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => { setEditingTx(tx); setEditNote(tx.note); setEditAmount(tx.amount.toString()); }} className={`p-2 rounded-xl transition-colors cursor-pointer ${isDarkMode ? 'text-[#9EA0A5] hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-[#16181A] hover:bg-[#D0D4DC]'}`} title="Sửa"><Edit3 size={15} /></button>
                    <button onClick={() => deleteTransaction(tx.id)} className="text-[#9EA0A5] hover:text-red-400 p-2 rounded-xl hover:bg-red-500/20 transition-colors cursor-pointer" title="Xóa"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}