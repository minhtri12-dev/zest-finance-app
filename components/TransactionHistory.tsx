'use client';

import React from 'react';
import { History, Search, Wallet, Printer, Edit3, Trash2 } from 'lucide-react';

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
  exportPdfReport,
  cardBg,
  inputBg,
  isDarkMode
}) {
  return (
    <div className={`border rounded-[2.5rem] p-6 ${cardBg}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b opacity-90">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-500/10 flex items-center justify-center opacity-70"><History size={16}/></div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider">Lịch sử giao dịch thông minh</h3>
        </div>
        
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Tìm kiếm..." 
              className={`text-xs pl-8 pr-3 py-2 rounded-xl outline-none focus:ring-1 focus:ring-[#34d399] font-medium w-full sm:w-44 border ${inputBg}`} 
            />
          </div>
          <button onClick={exportPdfReport} className={`px-3.5 py-2 border rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${isDarkMode ? 'bg-[#1a1a1a] hover:bg-[#252525] border-white/5 text-zinc-300' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'}`}>
            <Printer size={13}/> Xuất PDF
          </button>
        </div>
      </div>
      
      {filteredTransactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 opacity-50 text-xs gap-2">
          <Wallet size={32} />
          <p>Không tìm thấy giao dịch nào phù hợp.</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-bold opacity-50 border-b">
                <th className="pb-3 pl-3">Danh mục</th>
                <th className="pb-3">Nội dung</th>
                <th className="pb-3">Thời gian</th>
                <th className="pb-3 text-right">Số tiền</th>
                <th className="pb-3 text-center pr-3">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y opacity-90">
              {filteredTransactions.map(tx => {
                const meta = getCategoryMeta(tx.category);
                const isIncome = tx.type === 'income';
                return (
                  <tr key={tx.id} className="hover:bg-slate-500/5 transition-colors group">
                    <td className="py-4 pl-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${meta.badgeBg}`}>{meta.icon}</div>
                        <span className="text-xs font-bold">{tx.category}</span>
                      </div>
                    </td>
                    <td className="py-4 text-xs font-medium">{tx.note}</td>
                    <td className="py-4 text-xs opacity-60 font-medium">{tx.dateStr} - {tx.time}</td>
                    <td className={`py-4 text-xs font-extrabold text-right ${isIncome ? 'text-[#34d399]' : ''}`}>
                      {isIncome ? '+' : '-'}{formatMoney(tx.amount)}
                    </td>
                    <td className="py-4 text-center pr-3">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => { setEditingTx(tx); setEditNote(tx.note); setEditAmount(tx.amount.toString()); }} className="p-1.5 rounded-lg opacity-60 hover:opacity-100 transition-colors cursor-pointer" title="Sửa"><Edit3 size={14}/></button>
                        <button onClick={() => deleteTransaction(tx.id)} className="p-1.5 rounded-lg opacity-60 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Xóa"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}