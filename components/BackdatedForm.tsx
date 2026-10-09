'use client';

import React, { useState } from 'react';
import { Calendar, Send, Clock } from 'lucide-react';

export default function BackdatedForm({ parseAndAddTransaction, cardBg, inputBg }) {
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim() || !amount.trim()) return;
    parseAndAddTransaction(`${note} ${amount}`, null, date);
    setNote('');
    setAmount('');
  };

  return (
    <div className={`border rounded-[2.5rem] p-6 space-y-4 ${cardBg}`}>
      <div className="flex items-center gap-2.5 pb-3 border-b opacity-90">
        <div className="w-8 h-8 rounded-xl bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]"><Clock size={16}/></div>
        <h3 className="text-xs font-extrabold uppercase tracking-wider">Ghi nhận chi tiêu bù ngày</h3>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
        <div className="sm:col-span-4">
          <input 
            type="text" 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
            placeholder="Nội dung..." 
            required 
            className={`w-full text-xs p-3.5 rounded-xl outline-none border focus:ring-1 focus:ring-[#34d399] ${inputBg}`} 
          />
        </div>
        <div className="sm:col-span-3">
          <input 
            type="text" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="Số tiền..." 
            required 
            className={`w-full text-xs p-3.5 rounded-xl outline-none border focus:ring-1 focus:ring-[#34d399] ${inputBg}`} 
          />
        </div>
        <div className="sm:col-span-3">
          <div className="flex items-center gap-2 px-3 py-3 border border-white/10 rounded-xl bg-black/30">
            <Calendar size={14} className="opacity-60"/>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="bg-transparent outline-none text-xs cursor-pointer font-medium w-full text-white"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-[#d4f900] to-[#34d399] text-black rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 cursor-pointer">
            <span>Lưu</span> <Send size={13}/>
          </button>
        </div>
      </form>
    </div>
  );
}