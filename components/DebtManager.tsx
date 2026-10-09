'use client';

import React from 'react';
import { BarChart3, Plus, Trash2 } from 'lucide-react';

export default function DebtManager({
  debts = [],
  debtPerson = '',
  setDebtPerson,
  debtAmount = '',
  setDebtAmount,
  debtType = 'lend',
  setDebtType,
  handleAddDebt,
  toggleDebtStatus,
  deleteDebt,
  formatMoney = (v) => v,
  isDarkMode = true,
  cardBg = '',
  inputBg = ''
}) {
  return (
    <div className={`border rounded-[2.5rem] p-6 space-y-4 ${cardBg}`}>
      <div className="flex items-center justify-between pb-3 border-b opacity-90">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b]"><BarChart3 size={16}/></div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider">Giao dịch định kỳ</h3>
        </div>
      </div>

      <form onSubmit={handleAddDebt} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
        <div className="sm:col-span-5">
          <input type="text" value={debtPerson} onChange={(e) => setDebtPerson(e.target.value)} placeholder="Tên khoản / Người..." required className={`w-full text-xs p-3 rounded-xl outline-none border focus:ring-1 focus:ring-[#34d399] ${inputBg}`} />
        </div>
        <div className="sm:col-span-3">
          <input type="text" value={debtAmount} onChange={(e) => setDebtAmount(e.target.value)} placeholder="Số tiền..." required className={`w-full text-xs p-3 rounded-xl outline-none border focus:ring-1 focus:ring-[#34d399] ${inputBg}`} />
        </div>
        <div className="sm:col-span-4 flex gap-1.5">
          <button type="button" onClick={() => setDebtType('lend')} className={`flex-1 py-3 text-[10px] font-bold rounded-xl border transition-all cursor-pointer ${debtType === 'lend' ? 'bg-[#34d399] text-black border-transparent' : 'bg-slate-500/10'}`}>Cố định</button>
          <button type="submit" className="px-3 bg-gradient-to-r from-[#d4f900] to-[#34d399] text-black rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center"><Plus size={16}/></button>
        </div>
      </form>

      {debts && debts.length > 0 && (
        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
          {debts.map(d => (
            <div key={d.id} className={`p-3 border rounded-2xl flex items-center justify-between ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
              <div>
                <p className="text-xs font-bold">{d.person}</p>
                <p className="text-[10px] opacity-70 font-medium"><span className={d.status === 'paid' ? 'text-[#34d399]' : 'text-amber-500'}>{d.status === 'paid' ? 'Đã thanh toán' : 'Đang chờ'}</span></p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold">{formatMoney(d.amount)}</span>
                <button onClick={() => toggleDebtStatus(d.id)} className="px-2.5 py-1 bg-slate-500/10 hover:bg-slate-500/20 rounded-lg text-[10px] font-bold cursor-pointer">{d.status === 'paid' ? 'Hoàn tác' : 'Xong'}</button>
                <button onClick={() => deleteDebt(d.id)} className="opacity-50 hover:text-red-400 p-1 cursor-pointer"><Trash2 size={13}/></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}