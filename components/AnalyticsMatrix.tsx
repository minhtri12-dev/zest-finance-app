'use client';

import React, { useState } from 'react';
import { PieChart, Edit2, Check } from 'lucide-react';

export default function AnalyticsMatrix({
  targetEssential,
  setTargetEssential,
  targetLifestyle,
  setTargetLifestyle,
  targetSavings,
  setTargetSavings,
  essentialSpend = 0,
  lifestyleSpend = 0,
  formatMoney = (v) => v,
  cardBg = '',
  inputBg = ''
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [estInput, setEstInput] = useState(targetEssential.toString());
  const [lifeInput, setLifeInput] = useState(targetLifestyle.toString());
  const [savInput, setSavInput] = useState(targetSavings.toString());

  const handleSave = (e) => {
    e.preventDefault();
    const eVal = parseInt(estInput.replace(/[^0-9]/g, ''), 10);
    const lVal = parseInt(lifeInput.replace(/[^0-9]/g, ''), 10);
    const sVal = parseInt(savInput.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(eVal)) setTargetEssential(eVal);
    if (!isNaN(lVal)) setTargetLifestyle(lVal);
    if (!isNaN(sVal)) setTargetSavings(sVal);
    setIsEditing(false);
  };

  return (
    <div className={`border rounded-[2.5rem] p-6 space-y-4 ${cardBg}`}>
      <div className="flex items-center justify-between pb-3 border-b opacity-90">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7]"><PieChart size={16}/></div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider">Ngân sách cá nhân</h3>
        </div>
        <button 
          onClick={() => {
            if (!isEditing) {
              setEstInput(targetEssential.toString());
              setLifeInput(targetLifestyle.toString());
              setSavInput(targetSavings.toString());
            }
            setIsEditing(!isEditing);
          }} 
          className="text-xs flex items-center gap-1 opacity-70 hover:opacity-100 cursor-pointer text-[#34d399]"
        >
          <Edit2 size={13}/> {isEditing ? 'Hủy' : 'Tùy chỉnh'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-3 pt-2">
          <div>
            <label className="text-[11px] opacity-70 block mb-1">Thiết yếu</label>
            <input type="text" value={estInput} onChange={(e) => setEstInput(e.target.value)} className={`w-full text-xs p-2.5 rounded-xl outline-none border ${inputBg}`} />
          </div>
          <div>
            <label className="text-[11px] opacity-70 block mb-1">Mong muốn</label>
            <input type="text" value={lifeInput} onChange={(e) => setLifeInput(e.target.value)} className={`w-full text-xs p-2.5 rounded-xl outline-none border ${inputBg}`} />
          </div>
          <div>
            <label className="text-[11px] opacity-70 block mb-1">Tiết kiệm</label>
            <input type="text" value={savInput} onChange={(e) => setSavInput(e.target.value)} className={`w-full text-xs p-2.5 rounded-xl outline-none border ${inputBg}`} />
          </div>
          <button type="submit" className="w-full py-2.5 bg-[#34d399] text-black font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer">
            <Check size={14}/> Lưu
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-[#38bdf8]">Thiết yếu: {formatMoney(targetEssential)}</span>
              <span className="opacity-70">Dùng: {formatMoney(essentialSpend)}</span>
            </div>
            <div className="w-full h-2 bg-slate-500/20 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${essentialSpend > targetEssential ? 'bg-red-500' : 'bg-[#38bdf8]'}`} style={{ width: `${Math.min(Math.round((essentialSpend / (targetEssential || 1)) * 100), 100)}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-[#a855f7]">Mong muốn: {formatMoney(targetLifestyle)}</span>
              <span className="opacity-70">Dùng: {formatMoney(lifestyleSpend)}</span>
            </div>
            <div className="w-full h-2 bg-slate-500/20 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${lifestyleSpend > targetLifestyle ? 'bg-red-500' : 'bg-[#a855f7]'}`} style={{ width: `${Math.min(Math.round((lifestyleSpend / (targetLifestyle || 1)) * 100), 100)}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-[#34d399]">Tiết kiệm: {formatMoney(targetSavings)}</span>
              <span className="opacity-70">Quỹ dự phòng an toàn</span>
            </div>
            <div className="w-full h-2 bg-slate-500/20 rounded-full overflow-hidden">
              <div className="h-full bg-[#34d399] rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}