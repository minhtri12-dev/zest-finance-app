'use client';

import React, { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, currentTheme, setCurrentTheme, userName, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
      currentTheme === 'midnight' ? 'bg-[#0a0f1d]/80 border-white/10 text-slate-100' :
      currentTheme === 'mono' ? 'bg-black/90 border-white/20 text-white' :
      'bg-[#060606]/80 border-white/5 text-zinc-100'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d4f900] to-[#34d399] flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            <span className="text-[#060606] font-extrabold text-sm tracking-tighter">ZF</span>
          </div>
          <span className="font-bold text-lg tracking-tight">ZEST FIN <span className="text-[#34d399] font-light">Finance</span></span>
        </div>

        <nav className={`hidden md:flex items-center border rounded-full p-1.5 gap-1 ${
          currentTheme === 'midnight' ? 'bg-[#111827] border-white/10 text-slate-300' :
          currentTheme === 'mono' ? 'bg-[#121212] border-white/20 text-zinc-300' :
          'bg-[#141414] border-white/5 text-zinc-400'
        }`}>
          <button onClick={() => setActiveTab('dashboard')} className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-[#34d399] to-[#38bdf8] text-[#060606] shadow-sm' : 'hover:opacity-100 opacity-70'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('assets')} className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeTab === 'assets' ? 'bg-gradient-to-r from-[#34d399] to-[#38bdf8] text-[#060606] shadow-sm' : 'hover:opacity-100 opacity-70'}`}>Tài sản</button>
          <button onClick={() => setActiveTab('budget')} className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeTab === 'budget' ? 'bg-gradient-to-r from-[#34d399] to-[#38bdf8] text-[#060606] shadow-sm' : 'hover:opacity-100 opacity-70'}`}>Ngân sách</button>
          <button onClick={() => setActiveTab('reports')} className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeTab === 'reports' ? 'bg-gradient-to-r from-[#34d399] to-[#38bdf8] text-[#060606] shadow-sm' : 'hover:opacity-100 opacity-70'}`}>Báo cáo</button>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex bg-black/40 border border-white/10 rounded-2xl p-1 gap-1">
            <button onClick={() => setCurrentTheme('neon')} className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${currentTheme === 'neon' ? 'bg-[#34d399] text-black' : 'text-zinc-400 hover:text-white'}`}>Neon</button>
            <button onClick={() => setCurrentTheme('midnight')} className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${currentTheme === 'midnight' ? 'bg-[#38bdf8] text-black' : 'text-zinc-400 hover:text-white'}`}>Midnight</button>
            <button onClick={() => setCurrentTheme('mono')} className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${currentTheme === 'mono' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}>Mono</button>
          </div>

          <div className="relative">
            <div 
              className={`flex items-center gap-2.5 border pl-3 pr-4 py-2 rounded-2xl cursor-pointer group select-none ${
                currentTheme === 'midnight' ? 'bg-[#111827] border-white/10' :
                currentTheme === 'mono' ? 'bg-[#121212] border-white/20' :
                'bg-[#141414] border-white/5'
              }`} 
              onClick={() => setIsOpen(!isOpen)} 
              title="Tài khoản"
            >
              <div className="w-7 h-7 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 flex-shrink-0"><User size={14}/></div>
              <span className="text-xs font-bold truncate max-w-[120px]">{userName}</span>
              <ChevronDown size={12} className={`opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-2xl border shadow-xl p-2 z-50 ${
                currentTheme === 'midnight' ? 'bg-[#111827] border-white/10 text-slate-200' :
                currentTheme === 'mono' ? 'bg-[#181818] border-white/20 text-white' :
                'bg-[#141414] border-white/10 text-zinc-200'
              }`}>
                <div className="px-3 py-2 border-b border-white/5 mb-1">
                  <p className="text-[10px] opacity-60">Đang đăng nhập với</p>
                  <p className="text-xs font-bold truncate">{userName}</p>
                </div>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}