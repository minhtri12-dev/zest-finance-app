'use client';

import React from 'react';
import { Target, Plus, Trash2 } from 'lucide-react';

export default function SavingsGoals({
  goals = [],
  goalName = '',
  setGoalName,
  goalTarget = '',
  setGoalTarget,
  handleAddGoal,
  depositGoal,
  deleteGoal,
  formatMoney,
  isDarkMode,
  cardBg,
  inputBg
}) {
  return (
    <div className={`border rounded-[2.5rem] p-6 space-y-4 ${cardBg}`}>
      <div className="flex items-center justify-between pb-3 border-b opacity-90">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#34d399]/10 flex items-center justify-center text-[#34d399]"><Target size={16}/></div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider">Mục tiêu tiết kiệm</h3>
        </div>
      </div>

      <form onSubmit={handleAddGoal} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
        <div className="sm:col-span-5">
          <input type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)} placeholder="Tên mục tiêu..." required className={`w-full text-xs p-3 rounded-xl outline-none border focus:ring-1 focus:ring-[#34d399] ${inputBg}`} />
        </div>
        <div className="sm:col-span-4">
          <input type="text" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} placeholder="Số tiền mục tiêu..." required className={`w-full text-xs p-3 rounded-xl outline-none border focus:ring-1 focus:ring-[#34d399] ${inputBg}`} />
        </div>
        <div className="sm:col-span-3">
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#d4f900] to-[#34d399] text-black rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"><Plus size={14}/> Tạo</button>
        </div>
      </form>

      {goals && goals.length > 0 && (
        <div className="space-y-3 max-h-44 overflow-y-auto pr-1">
          {goals.map(g => {
            const percent = Math.min(Math.round((g.current / g.target) * 100), 100);
            return (
              <div key={g.id} className={`p-3.5 border rounded-2xl space-y-2 ${isDarkMode ? 'bg-[#1a1a1a] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold">{g.name}</p>
                    <p className="text-[10px] opacity-70 font-medium">{formatMoney(g.current)} / {formatMoney(g.target)} ({percent}%)</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => depositGoal(g.id)} className="px-2.5 py-1 bg-[#34d399]/10 text-[#34d399] hover:bg-[#34d399]/20 rounded-lg text-[10px] font-bold cursor-pointer transition-all">+ Nạp</button>
                    <button onClick={() => deleteGoal(g.id)} className="opacity-50 hover:text-red-400 p-1 cursor-pointer"><Trash2 size={13}/></button>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#34d399] rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}