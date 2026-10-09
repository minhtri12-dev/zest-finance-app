'use client';

import React from 'react';
import { Sun, Moon, User } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, isDarkMode, setIsDarkMode, userName, handleLogout }) {
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${isDarkMode ? 'bg-[#0a0a0a]/80 border-white/5' : 'bg-white/80 border-slate-200 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d4f900] to-[#34d399] flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            <span className="text-[#0a0a0a] font-extrabold text-sm tracking-tighter">ZF</span>
          </div>
          <span className="font-bold text-lg tracking-tight">ZEST FIN <span className="text-[#34d399] font-light">Finance</span></span>
        </div>

        <nav className={`hidden md:flex items-center border rounded-full p-1.5 gap-1 ${isDarkMode ? 'bg-[#141414] border-white/5 text-zinc-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
          <button onClick={() => setActiveTab('dashboard')} className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-[#34d399] to-[#38bdf8] text-[#0a0a0a] shadow-sm' : 'hover:opacity-100 opacity-70'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('assets')} className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeTab === 'assets' ? 'bg-gradient-to-r from-[#34d399] to-[#38bdf8] text-[#0a0a0a] shadow-sm' : 'hover:opacity-100 opacity-70'}`}>Tài sản</button>
          <button onClick={() => setActiveTab('budget')} className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeTab === 'budget' ? 'bg-gradient-to-r from-[#34d399] to-[#38bdf8] text-[#0a0a0a] shadow-sm' : 'hover:opacity-100 opacity-70'}`}>Ngân sách</button>
          <button onClick={() => setActiveTab('reports')} className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeTab === 'reports' ? 'bg-gradient-to-r from-[#34d399] to-[#38bdf8] text-[#0a0a0a] shadow-sm' : 'hover:opacity-100 opacity-70'}`}>Báo cáo</button>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-10 h-10 flex items-center justify-center rounded-2xl border transition-colors cursor-pointer ${isDarkMode ? 'bg-[#141414] border-white/5 text-[#34d399]' : 'bg-slate-100 border-slate-200 text-amber-600'}`} title="Chuyển chế độ sáng/tối">
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className={`flex items-center gap-2.5 border pl-2.5 pr-4 py-2 rounded-2xl cursor-pointer group ${isDarkMode ? 'bg-[#141414] border-white/5' : 'bg-slate-100 border-slate-200'}`} onClick={handleLogout} title="Đăng xuất">
            <div className="w-7 h-7 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300"><User size={14}/></div>
            <span className="text-xs font-bold group-hover:text-red-400 transition-colors">{userName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}