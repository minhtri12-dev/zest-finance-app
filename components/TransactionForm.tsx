'use client';

import React from 'react';
import { Sparkles, Send, Mic } from 'lucide-react';

export default function TransactionForm({
  inputText,
  setInputText,
  isListening,
  toggleSpeechRecognition,
  handleAiSubmit,
  parseAndAddTransaction,
  isDarkMode
}) {
  return (
    <div className={`rounded-3xl p-6 border-2 shadow-lg space-y-4 transition-all duration-300 relative overflow-hidden ${isDarkMode ? 'bg-[#191A1C] border-[#D49A65]/40 shadow-black/60' : 'bg-white border-[#D49A65]/50 shadow-amber-900/10'}`}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D49A65]/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className={`flex flex-col md:flex-row md:items-center justify-between pb-3 border-b gap-3 relative z-10 ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#D49A65]/10 flex items-center justify-center text-[#D49A65] shrink-0">
            <Sparkles size={20} />
          </div>
          <h2 className={`font-extrabold text-sm uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>
            Nhập liệu thông minh (Thu / Chi & Giọng nói)
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => parseAndAddTransaction("nhận lương 10tr")} className={`text-[11px] px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${isDarkMode ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border-emerald-500/20' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
            + Nhận lương 10tr
          </button>
          <button onClick={() => parseAndAddTransaction("tiền nhà 3tr")} className={`text-[11px] px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${isDarkMode ? 'bg-[#D49A65]/10 hover:bg-[#D49A65]/20 text-[#D49A65] border-[#D49A65]/20' : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'}`}>
            - Tiền nhà 3tr
          </button>
          <button onClick={() => parseAndAddTransaction("ăn phở 40k")} className={`text-[11px] px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${isDarkMode ? 'bg-[#D49A65]/10 hover:bg-[#D49A65]/20 text-[#D49A65] border-[#D49A65]/20' : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'}`}>
            - Phở 40k
          </button>
        </div>
      </div>

      <form onSubmit={handleAiSubmit} className="flex items-center gap-3 pt-2 relative z-10">
        <div className="relative flex-1">
          <input 
            type="text" 
            value={inputText} 
            onChange={(e) => setInputText(e.target.value)} 
            placeholder={isListening ? "Đang lắng nghe..." : "Nhập hoặc bấm Micro nói (VD: Lương 15tr)..."} 
            className={`w-full placeholder-slate-500 font-medium text-sm md:text-base rounded-2xl focus:ring-2 focus:ring-[#D49A65] focus:border-transparent outline-none block p-4 pr-12 border transition-all ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] text-white' : 'bg-[#F4F5F7] border-[#D0D4DC] text-[#16181A]'}`} 
          />
          <button type="button" onClick={toggleSpeechRecognition} className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-colors cursor-pointer ${isListening ? 'text-red-400 bg-red-500/10 animate-pulse' : 'text-[#9EA0A5] hover:text-[#D49A65] hover:bg-white/10'}`} title="Bấm để nói">
            <Mic size={20} />
          </button>
        </div>
        <button type="submit" className="bg-[#D49A65] hover:bg-[#E2A368] text-[#16181A] px-6 py-4 md:px-8 rounded-2xl text-xs md:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-[#D49A65]/20 active:scale-95">
          <span>Ghi nhận</span> <Send size={16} />
        </button>
      </form>
    </div>
  );
}