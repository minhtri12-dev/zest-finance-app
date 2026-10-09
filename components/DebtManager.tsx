'use client';

import React from 'react';
import { Users, Wallet, ArrowUpRight, ArrowDownLeft, Plus, Trash2 } from 'lucide-react';

export default function DebtManager({
  splitNote,
  setSplitNote,
  splitTotal,
  setSplitTotal,
  splitPeople,
  setSplitPeople,
  handleSplitSubmit,
  debtPerson,
  setDebtPerson,
  debtAmount,
  setDebtAmount,
  debtType,
  setDebtType,
  handleAddDebt,
  debts,
  toggleDebtStatus,
  deleteDebt,
  formatMoney,
  isDarkMode
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className={`lg:col-span-6 rounded-3xl p-6 border shadow-sm space-y-4 transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
        <div className={`flex items-center gap-2.5 pb-2.5 border-b ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
          <div className="w-8 h-8 rounded-xl bg-[#E2A368]/10 flex items-center justify-center text-[#E2A368] shrink-0">
            <Users size={18} />
          </div>
          <h2 className={`font-extrabold text-xs uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>Tiện ích chia tiền nhóm</h2>
        </div>
        <form onSubmit={handleSplitSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5">
            <label className="text-[11px] font-bold text-[#9EA0A5] mb-1 block">Nội dung bữa ăn</label>
            <input type="text" value={splitNote} onChange={(e) => setSplitNote(e.target.value)} placeholder="VD: Lẩu haidilao..." className={`w-full text-xs font-medium p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#D49A65] border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] text-white' : 'bg-[#F4F5F7] border-[#D0D4DC] text-[#16181A]'}`} />
          </div>
          <div className="sm:col-span-3">
            <label className="text-[11px] font-bold text-[#9EA0A5] mb-1 block">Tổng tiền</label>
            <input type="text" value={splitTotal} onChange={(e) => setSplitTotal(e.target.value)} placeholder="800k" required className={`w-full text-xs font-medium p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#D49A65] border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] text-white' : 'bg-[#F4F5F7] border-[#D0D4DC] text-[#16181A]'}`} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[11px] font-bold text-[#9EA0A5] mb-1 block">Số người</label>
            <input type="number" value={splitPeople} onChange={(e) => setSplitPeople(e.target.value)} min="1" required className={`w-full text-xs font-medium p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#D49A65] border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] text-white' : 'bg-[#F4F5F7] border-[#D0D4DC] text-[#16181A]'}`} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="w-full py-3.5 bg-[#D49A65] hover:bg-[#E2A368] text-[#16181A] rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5">Lưu</button>
          </div>
        </form>
      </div>

      <div className={`lg:col-span-6 rounded-3xl p-6 border shadow-sm space-y-4 transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
        <div className={`flex items-center justify-between pb-2.5 border-b ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#D49A65]/10 flex items-center justify-center text-[#D49A65] shrink-0">
              <Wallet size={18} />
            </div>
            <h2 className={`font-extrabold text-xs uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>Trụ cột 3: Sổ cái Công nợ</h2>
          </div>
        </div>

        <form onSubmit={handleAddDebt} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5">
            <label className="text-[11px] font-bold text-[#9EA0A5] mb-1 block">Tên người</label>
            <input type="text" value={debtPerson} onChange={(e) => setDebtPerson(e.target.value)} placeholder="Nguyễn Văn A" required className={`w-full text-xs font-medium p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#D49A65] border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] text-white' : 'bg-[#F4F5F7] border-[#D0D4DC] text-[#16181A]'}`} />
          </div>
          <div className="sm:col-span-3">
            <label className="text-[11px] font-bold text-[#9EA0A5] mb-1 block">Số tiền</label>
            <input type="text" value={debtAmount} onChange={(e) => setDebtAmount(e.target.value)} placeholder="500k" required className={`w-full text-xs font-medium p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#D49A65] border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] text-white' : 'bg-[#F4F5F7] border-[#D0D4DC] text-[#16181A]'}`} />
          </div>
          <div className="sm:col-span-4 flex gap-2">
             <div className={`flex flex-1 p-1 rounded-xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
              <button type="button" onClick={() => setDebtType('lend')} className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${debtType === 'lend' ? 'bg-[#D49A65] text-[#16181A] shadow-md' : 'text-[#9EA0A5] hover:text-white'}`}>Cho vay</button>
              <button type="button" onClick={() => setDebtType('borrow')} className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${debtType === 'borrow' ? 'bg-[#D49A65] text-[#16181A] shadow-md' : 'text-[#9EA0A5] hover:text-white'}`}>Mượn</button>
             </div>
             <button type="submit" className="px-3 bg-[#D49A65] hover:bg-[#E2A368] text-[#16181A] rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"><Plus size={16}/></button>
          </div>
        </form>

        {debts.length > 0 && (
          <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto pr-1">
            {debts.map((d) => (
              <div key={d.id} className={`p-3 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${d.type === 'lend' ? 'bg-[#D49A65]/10 text-[#D49A65]' : 'bg-red-500/10 text-red-400'}`}>
                    {d.type === 'lend' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                  </div>
                  <div>
                    <p className="font-bold text-xs">{d.person}</p>
                    <p className="text-[10px] text-[#9EA0A5] font-medium">
                      <span className={d.status === 'paid' ? 'text-[#D49A65] font-bold' : 'text-amber-400 font-bold'}>{d.status === 'paid' ? 'Đã xong' : 'Chưa trả'}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-xs">{formatMoney(d.amount)}</span>
                  <button onClick={() => toggleDebtStatus(d.id)} className="text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 rounded-md font-bold cursor-pointer transition-all">
                    {d.status === 'paid' ? 'Hoàn tác' : 'Thu/Trả'}
                  </button>
                  <button onClick={() => deleteDebt(d.id)} className="text-[#9EA0A5] hover:text-red-400 p-1 cursor-pointer"><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}