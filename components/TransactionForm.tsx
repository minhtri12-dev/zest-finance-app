'use client';

import React from 'react';
import { Sparkles, Send, Mic, Bot } from 'lucide-react';

export default function TransactionForm({
  inputText,
  setInputText,
  isListening,
  toggleSpeechRecognition,
  parseAndAddTransaction,
  monthlyExpense,
  monthlyBudget,
  formatMoney,
  cardBg,
  inputBg
}) {
  const handleAiSubmit = (e) => {
    e.preventDefault();
    parseAndAddTransaction(inputText);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className={`lg:col-span-7 border rounded-[2.5rem] p-6 relative flex flex-col justify-between ${cardBg}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#34d399]/10 flex items-center justify-center text-[#34d399]"><Sparkles size={16}/></div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider">Nhập liệu & Giọng nói</h3>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => parseAndAddTransaction("nhận lương 10tr")} className="text-[10px] px-2.5 py-1 bg-[#34d399]/10 text-[#34d399] rounded-lg font-bold hover:bg-[#34d399]/20 transition-all cursor-pointer">+ Lương 10tr</button>
            <button onClick={() => parseAndAddTransaction("ăn phở 50k")} className="text-[10px] px-2.5 py-1 bg-slate-500/10 rounded-lg font-bold hover:bg-slate-500/20 transition-all cursor-pointer">- Phở 50k</button>
          </div>
        </div>

        <form onSubmit={handleAiSubmit} className="space-y-3">
          <div className="relative">
            <input 
              type="text"
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? "Đang lắng nghe giọng nói..." : "Nhập số tiền..."}
              className={`w-full rounded-2xl p-4 pr-12 text-xs md:text-sm outline-none focus:ring-1 focus:ring-[#34d399] transition-all font-medium border ${inputBg}`}
            />
            <button type="button" onClick={toggleSpeechRecognition} className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-colors cursor-pointer ${isListening ? 'text-red-400 bg-red-500/10 animate-pulse' : 'opacity-60 hover:opacity-100'}`} title="Bấm để nói">
              <Mic size={18}/>
            </button>
          </div>
          <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-[#d4f900] to-[#34d399] text-[#060606] rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-md cursor-pointer uppercase tracking-wider">
            <span>Ghi nhận giao dịch</span> <Send size={14}/>
          </button>
        </form>
      </div>

      <div className={`lg:col-span-5 border rounded-[2.5rem] p-6 flex flex-col justify-between ${cardBg}`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]"><Bot size={16}/></div>
          <h3 className="text-xs font-extrabold uppercase tracking-wider">Trợ lý tài chính AI</h3>
        </div>
        <div className="rounded-2xl p-4 border border-white/10 bg-black/20 mb-3">
          <p className="text-xs font-medium leading-relaxed opacity-90">
            {monthlyExpense >= monthlyBudget ? "⚠️ Cảnh báo: Ngân sách tháng đã cạn kiệt, cần thắt chặt chi tiêu!" : `Dòng tiền đang ở mức an toàn. Hạn mức chi tiêu tối ưu mỗi ngày còn lại là ${formatMoney(Math.round((monthlyBudget - monthlyExpense)/30))}.`}
          </p>
        </div>
        <div className="flex justify-between items-center text-[10px] opacity-60 font-bold px-1">
          <span>Trạng thái: Hoạt động</span>
          <span className="text-[#34d399]">Bảo mật tuyệt đối</span>
        </div>
      </div>
    </div>
  );
}