'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import financeLogo from '@/lib/finance.png';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { 
  Sun, Moon, LogOut, User, CheckCircle2, Edit3, RotateCcw, Settings, ArrowDownLeft
} from 'lucide-react';

import TransactionForm from '@/components/TransactionForm';
import BudgetSummary from '@/components/BudgetSummary';
import AnalyticsMatrix from '@/components/AnalyticsMatrix';
import DebtManager from '@/components/DebtManager';
import TransactionHistory from '@/components/TransactionHistory';

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function ZestFinDashboard() {
  const [userName, setUserName] = useState('');
  const [tempNameInput, setTempNameInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');
  
  const [monthlyBudget, setMonthlyBudget] = useState(5000000);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState('5000000');

  const [toastMessage, setToastMessage] = useState(null);
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [lastDeletedTx, setLastDeletedTx] = useState(null);
  const [editingTx, setEditingTx] = useState(null);
  const [editNote, setEditNote] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const [splitTotal, setSplitTotal] = useState('');
  const [splitPeople, setSplitPeople] = useState('2');
  const [splitNote, setSplitNote] = useState('');

  const [debts, setDebts] = useState([]);
  const [debtPerson, setDebtPerson] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [debtType, setDebtType] = useState('lend');

  const [greetingPhrase, setGreetingPhrase] = useState('Xin chào');
  const [greetingMessage, setGreetingMessage] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 13) {
        setGreetingPhrase('Chào buổi sáng');
        setGreetingMessage('Quản lý tốt một đồng hôm nay là hạt giống cho tài sản vững chắc ngày mai.');
      } else if (hour >= 13 && hour < 18) {
        setGreetingPhrase('Chào buổi chiều');
        setGreetingMessage('Đừng để những khoản chi nhỏ làm rò rỉ một túi tiền lớn.');
      } else if (hour >= 18 && hour < 24) {
        setGreetingPhrase('Chào buổi tối');
        setGreetingMessage('Đã đến lúc tổng kết dòng tiền và để ngân sách nghỉ ngơi.');
      } else {
        setGreetingPhrase('Chào buổi khuya');
        setGreetingMessage('Cú đêm chăm chỉ, nhớ giữ gìn sức khỏe nhé.');
      }
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryMeta = (category) => {
    switch (category) {
      case 'Di chuyển':
        return { icon: <Car size={16} className="text-[#D49A65]" />, badgeBg: 'bg-[#D49A65]/10 text-[#D49A65] border-[#D49A65]/20' };
      case 'Ăn uống':
        return { icon: <Utensils size={16} className="text-[#E2A368]" />, badgeBg: 'bg-[#E2A368]/10 text-[#E2A368] border-[#E2A368]/20' };
      case 'Mua sắm':
        return { icon: <ShoppingBag size={16} className="text-[#D49A65]" />, badgeBg: 'bg-[#D49A65]/10 text-[#D49A65] border-[#D49A65]/20' };
      case 'Giải trí':
        return { icon: <Sparkles size={16} className="text-[#E2A368]" />, badgeBg: 'bg-[#E2A368]/10 text-[#E2A368] border-[#E2A368]/20' };
      case 'Thu nhập':
        return { icon: <ArrowDownLeft size={16} className="text-emerald-500" />, badgeBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' };
      default:
        return { icon: <Wallet size={16} className="text-[#D49A65]" />, badgeBg: 'bg-[#D49A65]/10 text-[#D49A65] border-[#D49A65]/20' };
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('zest_fin_username');
    const savedTx = localStorage.getItem('zest_fin_transactions');
    const savedBudget = localStorage.getItem('zest_fin_budget');
    const savedDebts = localStorage.getItem('zest_fin_debts');
    const savedTheme = localStorage.getItem('zest_fin_dark_mode');

    if (savedUser) { setUserName(savedUser); setIsLoggedIn(true); }
    if (savedTx) {
      try { setTransactions(JSON.parse(savedTx).map(i => ({ ...i, date: new Date(i.date) }))); } catch (e) { console.error(e); }
    }
    if (savedBudget) { setMonthlyBudget(Number(savedBudget)); setTempBudget(savedBudget); }
    if (savedDebts) { try { setDebts(JSON.parse(savedDebts)); } catch (e) { console.error(e); } }
    if (savedTheme !== null) setIsDarkMode(savedTheme === 'true');
  }, []);

  useEffect(() => { if (userName) localStorage.setItem('zest_fin_username', userName); }, [userName]);
  useEffect(() => { localStorage.setItem('zest_fin_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('zest_fin_budget', monthlyBudget.toString()); }, [monthlyBudget]);
  useEffect(() => { localStorage.setItem('zest_fin_debts', JSON.stringify(debts)); }, [debts]);
  useEffect(() => { localStorage.setItem('zest_fin_dark_mode', isDarkMode.toString()); }, [isDarkMode]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!tempNameInput.trim()) return;
    setUserName(tempNameInput.trim());
    setIsLoggedIn(true);
    showToast(`Chào mừng trở lại, ${tempNameInput.trim()}!`);
  };

  const handleLogout = () => {
    localStorage.removeItem('zest_fin_username');
    setUserName('');
    setIsLoggedIn(false);
    setTempNameInput('');
  };

  const showToast = (msg, canUndo = false) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), canUndo ? 6000 : 3000);
  };

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { showToast("Trình duyệt không hỗ trợ giọng nói!"); return; }
    if (isListening) { setIsListening(false); return; }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => { setInputText(event.results[0][0].transcript); setIsListening(false); };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (e) { setIsListening(false); }
  };

  const parseAmountSmart = (text) => {
    const cleanText = text.toLowerCase().replace(/[,]/g, '.');
    const matchTrFull = cleanText.match(/(\d+)\s*(tr|triệu|m)\s*(\d+)?/);
    if (matchTrFull) {
      const millions = parseInt(matchTrFull[1], 10);
      let decimals = matchTrFull[3] ? parseInt(matchTrFull[3], 10) : 0;
      if (decimals > 0 && decimals < 10) decimals *= 100000;
      else if (decimals >= 10 && decimals < 100) decimals *= 10000;
      return millions * 1000000 + decimals;
    }
    const matchTrDec = cleanText.match(/(\d+\.\d+)\s*(tr|triệu|m)/);
    if (matchTrDec) return Math.round(parseFloat(matchTrDec[1]) * 1000000);
    const matchK = cleanText.match(/(\d+(?:\.\d+)?)\s*k/);
    if (matchK) return Math.round(parseFloat(matchK[1]) * 1000);
    const numbers = cleanText.match(/\d+/g);
    if (numbers) {
      const joined = cleanText.replace(/[^0-9]/g, '');
      if (joined.length >= 4) return parseInt(joined, 10);
    }
    return 0;
  };

  const parseAndAddTransaction = (rawText, explicitAmount = null) => {
    if (!rawText.trim()) return;
    const text = rawText.toLowerCase();
    const amount = explicitAmount !== null ? explicitAmount : parseAmountSmart(rawText);

    if (amount <= 0) { showToast("Vui lòng nhập kèm số tiền hợp lệ!"); return; }

    let category = 'Khác';
    let type = 'expense';

    if (text.includes('lương') || text.includes('tiền lương') || text.includes('thưởng') || text.includes('nhận') || text.includes('thu nhập') || text.includes('chuyển khoản')) {
      type = 'income'; category = 'Thu nhập';
    } else if (text.includes('xăng') || text.includes('grab') || text.includes('uber') || text.includes('xe bus')) {
      category = 'Di chuyển';
    } else if (text.includes('ăn') || text.includes('phở') || text.includes('cơm') || text.includes('cafe') || text.includes('nước') || text.includes('lẩu') || text.includes('trà sữa')) {
      category = 'Ăn uống';
    } else if (text.includes('mua') || text.includes('sắm') || text.includes('quần áo') || text.includes('giày')) {
      category = 'Mua sắm';
    } else if (text.includes('game') || text.includes('net') || text.includes('phim')) {
      category = 'Giải trí';
    }

    const now = new Date();
    const newTx = {
      id: Date.now(), note: rawText, amount: amount, category: category, type: type,
      date: now.toISOString(), dateStr: now.toLocaleDateString('vi-VN'),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTransactions([newTx, ...transactions]);
    setInputText('');
    showToast(type === 'income' ? `Đã nhận: +${amount.toLocaleString('vi-VN')}đ` : `Đã chi: -${amount.toLocaleString('vi-VN')}đ`);
  };

  const handleAiSubmit = (e) => { e.preventDefault(); parseAndAddTransaction(inputText); };
  const deleteTransaction = (id) => {
    const target = transactions.find(tx => tx.id === id);
    if (target) { setLastDeletedTx(target); setTransactions(transactions.filter(tx => tx.id !== id)); showToast("Đã xóa. Bấm hoàn tác.", true); }
  };
  const undoDelete = () => { if (lastDeletedTx) { setTransactions([lastDeletedTx, ...transactions]); setLastDeletedTx(null); } };
  const clearAllTransactions = () => { if (confirm('Xóa sạch lịch sử?')) setTransactions([]); };

  const saveEditedTransaction = (e) => {
    e.preventDefault();
    if (!editingTx) return;
    const updatedAmount = parseAmountSmart(editAmount);
    setTransactions(transactions.map(tx => tx.id === editingTx.id ? { ...tx, note: editNote, amount: updatedAmount } : tx));
    setEditingTx(null);
  };

  const exportPdfReport = () => window.print();
  const exportCsvReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,ID,Ngay,ThoiGian,NoiDung,Loai,DanhMuc,SoTien\n";
    transactions.forEach(tx => {
      csvContent += `${tx.id},${tx.dateStr},${tx.time},"${(tx.note||'').replace(/"/g, '""')}",${tx.type},${tx.category},${tx.amount}\n`;
    });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "zest_fin_report.csv");
    document.body.appendChild(link); link.click(); link.remove();
  };

  const handleSplitSubmit = (e) => {
    e.preventDefault();
    const total = parseAmountSmart(splitTotal);
    const people = parseInt(splitPeople) || 1;
    if (total <= 0 || people <= 0) return;
    parseAndAddTransaction(`Chia bill ${splitNote || 'ăn uống'}: ${total}đ / ${people} người`, Math.round(total / people));
    setSplitTotal(''); setSplitNote('');
  };

  const handleAddDebt = (e) => {
    e.preventDefault();
    const amt = parseAmountSmart(debtAmount);
    if (!debtPerson.trim() || amt <= 0) return;
    setDebts([{ id: Date.now(), person: debtPerson.trim(), amount: amt, type: debtType, status: 'unpaid' }, ...debts]);
    setDebtPerson(''); setDebtAmount('');
  };

  const toggleDebtStatus = (id) => setDebts(debts.map(d => d.id === id ? { ...d, status: d.status === 'unpaid' ? 'paid' : 'unpaid' } : d));
  const deleteDebt = (id) => setDebts(debts.filter(d => d.id !== id));

  const todayDate = new Date();
  const currentMonth = todayDate.getMonth();
  const currentYear = todayDate.getFullYear();
  
  const currentMonthTransactions = transactions.filter(tx => {
    const d = new Date(tx.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const monthlyExpense = currentMonthTransactions.filter(tx => tx.type === 'expense' || !tx.type).reduce((s, tx) => s + tx.amount, 0);

  const filteredTransactions = transactions.filter(tx => {
    let matchesTime = true;
    const txDate = new Date(tx.date);
    if (timeFilter === 'today') matchesTime = txDate.toDateString() === todayDate.toDateString();
    else if (timeFilter === 'week') {
      const weekAgo = new Date(todayDate); weekAgo.setDate(todayDate.getDate() - 7);
      matchesTime = txDate >= weekAgo;
    }
    const matchesSearch = tx.note.toLowerCase().includes(searchQuery.toLowerCase()) || tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTime && matchesSearch;
  });

  const totalFilteredExpense = filteredTransactions.filter(tx => tx.type === 'expense' || !tx.type).reduce((s, tx) => s + tx.amount, 0);
  const totalFilteredIncome = filteredTransactions.filter(tx => tx.type === 'income').reduce((s, tx) => s + tx.amount, 0);

  const budgetPercentage = monthlyBudget > 0 ? Math.min(Math.round((monthlyExpense / monthlyBudget) * 100), 100) : 0;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const currentDay = todayDate.getDate();
  const remainingDays = Math.max(daysInMonth - currentDay + 1, 1);
  const remainingBudget = Math.max(monthlyBudget - monthlyExpense, 0);
  const dailyLimit = Math.round(remainingBudget / remainingDays);
  const burnRate = currentDay > 0 ? Math.round(monthlyExpense / currentDay) : 0;

  function getCategoryMonthlyTotal(catName) {
    return currentMonthTransactions.filter(tx => tx.category === catName && (tx.type === 'expense' || !tx.type)).reduce((s, tx) => s + tx.amount, 0);
  }

  const essentialSpend = getCategoryMonthlyTotal('Ăn uống') + getCategoryMonthlyTotal('Di chuyển');
  const lifestyleSpend = getCategoryMonthlyTotal('Mua sắm') + getCategoryMonthlyTotal('Giải trí');
  const targetEssential = monthlyBudget * 0.5;
  const targetLifestyle = monthlyBudget * 0.3;
  const targetSavings = monthlyBudget * 0.2;
  const categoriesList = ['Ăn uống', 'Di chuyển', 'Mua sắm', 'Giải trí', 'Khác'];

  const getTrendChartData = () => {
    const t = new Date(); t.setHours(0, 0, 0, 0);
    let curr = 0, prev = 0, currLabel = '', prevLabel = '';
    if (timeFilter === 'today') {
      const yest = new Date(t); yest.setDate(yest.getDate() - 1);
      curr = transactions.filter(tx => new Date(tx.date).setHours(0,0,0,0) === t.getTime() && (tx.type === 'expense' || !tx.type)).reduce((s, tx) => s + tx.amount, 0);
      prev = transactions.filter(tx => new Date(tx.date).setHours(0,0,0,0) === yest.getTime() && (tx.type === 'expense' || !tx.type)).reduce((s, tx) => s + tx.amount, 0);
      currLabel = 'Hôm nay'; prevLabel = 'Hôm qua';
    } else if (timeFilter === 'week') {
      const start = new Date(t); start.setDate(start.getDate() - 6);
      curr = transactions.filter(tx => new Date(tx.date).setHours(0,0,0,0) >= start.getTime() && (tx.type === 'expense' || !tx.type)).reduce((s, tx) => s + tx.amount, 0);
      currLabel = 'Tuần này'; prevLabel = 'Tuần trước';
    } else {
      curr = monthlyExpense;
      currLabel = 'Tháng này'; prevLabel = 'Tháng trước';
    }
    return { curr, prev, currLabel, prevLabel, percent: 0, isUp: false, isNeutral: true };
  };

  const chartData = getTrendChartData();
  const maxChartVal = Math.max(chartData.curr, chartData.prev) || 1;
  const currChartHeight = Math.max((chartData.curr / maxChartVal) * 100, 5); 
  const prevChartHeight = Math.max((chartData.prev / maxChartVal) * 100, 5);

  const getAiAdvice = () => {
    if (monthlyExpense === 0) return "Ví tài chính tháng này đang bảo toàn hoàn hảo.";
    if (monthlyExpense >= monthlyBudget) return "Cảnh báo vượt mức ngân sách tháng!";
    return `Dòng tiền ổn định. Hạn mức tiêu an toàn: ${dailyLimit.toLocaleString('vi-VN')} đ/ngày.`;
  };

  const formatMoney = (amt) => isPrivacyMode ? '******** đ' : `${amt.toLocaleString('vi-VN')} đ`;
  const formatShortMoney = (amt) => isPrivacyMode ? '***' : (amt >= 1000000 ? `${(amt/1000000).toFixed(1)}M` : `${Math.round(amt/1000)}k`);

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen bg-[#16181A] text-white flex items-center justify-center p-4 ${plusJakarta.className}`}>
        <div className="max-w-md w-full bg-[#191A1C] border border-[#2A2D32] rounded-3xl p-8 shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#D49A65]/20 flex items-center justify-center text-[#D49A65] mx-auto">
            <Image src={financeLogo} alt="Logo" width={56} height={56} className="object-cover" />
          </div>
          <h1 className="text-2xl font-extrabold">ZEST FIN Finance</h1>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input type="text" value={tempNameInput} onChange={(e) => setTempNameInput(e.target.value)} placeholder="Nhập tên của bạn..." required className="w-full bg-[#16181A] border border-[#2A2D32] text-sm px-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-[#D49A65]" />
            <button type="submit" className="w-full py-4 bg-[#D49A65] hover:bg-[#E2A368] text-[#16181A] rounded-2xl text-xs font-extrabold cursor-pointer">Truy cập</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-16 relative ${isDarkMode ? 'bg-[#16181A] text-white' : 'bg-[#F4F5F7] text-[#16181A]'} ${plusJakarta.className}`}>
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191A1C] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#2A2D32] animate-bounce">
          <CheckCircle2 size={18} className="text-[#D49A65]" />
          <span className="text-xs font-bold">{toastMessage}</span>
          {lastDeletedTx && <button onClick={undoDelete} className="ml-2 bg-white/20 px-2.5 py-1 rounded-xl text-[11px] font-bold"><RotateCcw size={12} /> Hoàn tác</button>}
        </div>
      )}

      {editingTx && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-3xl p-6 max-w-md w-full border ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
            <h3 className="text-base font-extrabold mb-3">Chỉnh sửa giao dịch</h3>
            <form onSubmit={saveEditedTransaction} className="space-y-3">
              <input type="text" value={editNote} onChange={(e) => setEditNote(e.target.value)} required className={`w-full text-xs p-3.5 rounded-xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`} />
              <input type="text" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} required className={`w-full text-xs p-3.5 rounded-xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`} />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingTx(null)} className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-[#D49A65] text-[#16181A] rounded-xl text-xs font-bold">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <header className={`backdrop-blur-md border-b sticky top-0 z-40 ${isDarkMode ? 'bg-[#16181A]/90 border-[#2A2D32]' : 'bg-white/90 border-[#D0D4DC]'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#D49A65]/20 flex items-center justify-center">
              <Image src={financeLogo} alt="Logo" width={36} height={36} className="object-cover" />
            </div>
            <span className="font-extrabold text-lg">ZEST FIN <span className="text-[#D49A65] font-light">Finance</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-xl border border-[#2A2D32] text-[#D49A65] cursor-pointer">{isDarkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
            <button onClick={handleLogout} className="p-2.5 rounded-xl border border-[#2A2D32] text-[#9EA0A5] cursor-pointer"><LogOut size={16} /></button>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-10 pb-8">
        <div className="space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase border ${isDarkMode ? 'bg-[#191A1C] text-[#D49A65] border-[#2A2D32]' : 'bg-[#D0D4DC] text-slate-800'}`}>
            <User size={13} /> {greetingPhrase}, {userName}!
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Tối ưu dòng tiền cá nhân <br /><span className="text-[#D49A65]">với chuẩn mực công nghệ cao.</span></h1>
          <p className="text-sm md:text-base font-medium text-[#9EA0A5] max-w-xl">{greetingMessage}</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className={`md:col-span-7 border rounded-3xl p-3.5 flex items-center justify-between ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
            <span className="text-xs font-bold text-[#9EA0A5] uppercase px-2">Lọc dữ liệu:</span>
            <div className={`flex items-center gap-1 p-1 rounded-2xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
              <button onClick={() => setTimeFilter('today')} className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${timeFilter === 'today' ? 'bg-[#D49A65] text-[#16181A]' : 'text-[#9EA0A5]'}`}>Hôm nay</button>
              <button onClick={() => setTimeFilter('week')} className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${timeFilter === 'week' ? 'bg-[#D49A65] text-[#16181A]' : 'text-[#9EA0A5]'}`}>Tuần này</button>
              <button onClick={() => setTimeFilter('all')} className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${timeFilter === 'all' ? 'bg-[#D49A65] text-[#16181A]' : 'text-[#9EA0A5]'}`}>Tất cả</button>
            </div>
          </div>

          <div className={`md:col-span-5 border rounded-3xl p-5 flex flex-col justify-between ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#9EA0A5] uppercase flex items-center gap-1"><Settings size={12} /> Ngân sách tháng</span>
              <button onClick={() => { if (isEditingBudget) setMonthlyBudget(parseInt(tempBudget) || 0); setIsEditingBudget(!isEditingBudget); }} className="text-xs text-[#D49A65] font-bold cursor-pointer">{isEditingBudget ? 'Lưu' : 'Đổi'}</button>
            </div>
            {isEditingBudget ? (
              <input type="number" value={tempBudget} onChange={(e) => setTempBudget(e.target.value)} className={`w-full text-xs px-3.5 py-2 rounded-xl mt-2 border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`} />
            ) : (
              <div className="mt-2">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span>{formatMoney(monthlyBudget)}</span>
                  <span className={budgetPercentage >= 80 ? 'text-red-400' : 'text-[#9EA0A5]'}>{budgetPercentage}%</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
                  <div className={`h-full rounded-full ${budgetPercentage >= 80 ? 'bg-red-500' : 'bg-[#D49A65]'}`} style={{ width: `${budgetPercentage}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <TransactionForm 
          inputText={inputText} setInputText={setInputText} isListening={isListening} 
          toggleSpeechRecognition={toggleSpeechRecognition} handleAiSubmit={handleAiSubmit} 
          parseAndAddTransaction={parseAndAddTransaction} isDarkMode={isDarkMode} 
        />

        <BudgetSummary 
          totalFilteredExpense={totalFilteredExpense} totalFilteredIncome={totalFilteredIncome}
          chartData={chartData} maxChartVal={maxChartVal} currChartHeight={currChartHeight} prevChartHeight={prevChartHeight}
          formatMoney={formatMoney} formatShortMoney={formatShortMoney} isPrivacyMode={isPrivacyMode} setIsPrivacyMode={setIsPrivacyMode}
          monthlyExpense={monthlyExpense} monthlyBudget={monthlyBudget} burnRate={burnRate} dailyLimit={dailyLimit}
          getAiAdvice={getAiAdvice} isDarkMode={isDarkMode}
        />

        <AnalyticsMatrix 
          targetEssential={targetEssential} essentialSpend={essentialSpend}
          targetLifestyle={targetLifestyle} lifestyleSpend={lifestyleSpend} targetSavings={targetSavings}
          categoriesList={categoriesList} getCategoryMonthlyTotal={getCategoryMonthlyTotal} monthlyExpense={monthlyExpense}
          formatMoney={formatMoney} exportPdfReport={exportPdfReport} exportCsvReport={exportCsvReport}
          clearAllTransactions={clearAllTransactions} isDarkMode={isDarkMode}
        />

        <DebtManager 
          splitNote={splitNote} setSplitNote={setSplitNote} splitTotal={splitTotal} setSplitTotal={splitTotal}
          splitPeople={splitPeople} setSplitPeople={setSplitPeople} handleSplitSubmit={handleSplitSubmit}
          debtPerson={debtPerson} setDebtPerson={setDebtPerson} debtAmount={debtAmount} setDebtAmount={setDebtAmount}
          debtType={debtType} setDebtType={setDebtType} handleAddDebt={handleAddDebt} debts={debts}
          toggleDebtStatus={toggleDebtStatus} deleteDebt={deleteDebt} formatMoney={formatMoney} isDarkMode={isDarkMode}
        />

        <TransactionHistory 
          filteredTransactions={filteredTransactions} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          getCategoryMeta={getCategoryMeta} formatMoney={formatMoney} setEditingTx={setEditingTx}
          setEditNote={setEditNote} setEditAmount={setEditAmount} deleteTransaction={deleteTransaction} isDarkMode={isDarkMode}
        />

      </main>

      <footer className={`max-w-6xl mx-auto px-6 mt-16 pt-6 border-t text-center text-xs text-[#9EA0A5] flex flex-col sm:flex-row justify-between items-center gap-2 ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
        <p>© 2026 ZESTFIN Finance.</p>
        <p className="text-[11px]">🛡️ Client-side LocalStorage Architecture</p>
      </footer>
    </div>
  );
}