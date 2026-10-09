'use client';

import React, { useState, useEffect } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { User, ShieldAlert, CheckCircle2, RotateCcw, Edit3 } from 'lucide-react';

import Header from '@/components/Header';
import BudgetSummary from '@/components/BudgetSummary';
import TransactionForm from '@/components/TransactionForm';
import AnalyticsMatrix from '@/components/AnalyticsMatrix';
import SavingsGoals from '@/components/SavingsGoals';
import DebtManager from '@/components/DebtManager';
import TransactionHistory from '@/components/TransactionHistory';

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const getCategoryMeta = (category) => {
  switch (category) {
    case 'Di chuyển':
      return { icon: <span className="text-[#38bdf8]">🚗</span>, badgeBg: 'bg-[#38bdf8]/15 text-[#38bdf8]' };
    case 'Ăn uống':
      return { icon: <span className="text-[#f43f5e]">🍜</span>, badgeBg: 'bg-[#f43f5e]/15 text-[#f43f5e]' };
    case 'Mua sắm':
      return { icon: <span className="text-[#a855f7]">🛍️</span>, badgeBg: 'bg-[#a855f7]/15 text-[#a855f7]' };
    case 'Giải trí':
      return { icon: <span className="text-[#f59e0b]">🎮</span>, badgeBg: 'bg-[#f59e0b]/15 text-[#f59e0b]' };
    case 'Thu nhập':
      return { icon: <span className="text-[#34d399]">💰</span>, badgeBg: 'bg-[#34d399]/15 text-[#34d399]' };
    default:
      return { icon: <span className="text-[#94a3b8]">📁</span>, badgeBg: 'bg-[#1e293b] text-[#94a3b8]' };
  }
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

export default function ZestFinDashboard() {
  const [userName, setUserName] = useState('');
  const [tempNameInput, setTempNameInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [timeFilter, setTimeFilter] = useState('month');
  
  const [monthlyBudget, setMonthlyBudget] = useState(25000000);
  const [toastMessage, setToastMessage] = useState(null);
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [editingTx, setEditingTx] = useState(null);
  const [editNote, setEditNote] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [lastDeletedTx, setLastDeletedTx] = useState(null);

  const [debts, setDebts] = useState([]);
  const [debtPerson, setDebtPerson] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [debtType, setDebtType] = useState('lend');

  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState('');
  const [goalTarget, setGoalTarget] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('zest_fin_username');
    const savedTx = localStorage.getItem('zest_fin_transactions');
    const savedDebts = localStorage.getItem('zest_fin_debts');
    const savedGoals = localStorage.getItem('zest_fin_goals');
    const savedTheme = localStorage.getItem('zest_fin_dark_mode');

    if (savedUser) { 
      setUserName(savedUser); 
      setIsLoggedIn(true); 
      setIsDashboardVisible(true);
    }
    if (savedTx) {
      try { setTransactions(JSON.parse(savedTx).map(i => ({ ...i, date: new Date(i.date) }))); } catch (e) {}
    }
    if (savedDebts) {
      try { setDebts(JSON.parse(savedDebts)); } catch (e) {}
    }
    if (savedGoals) {
      try { setGoals(JSON.parse(savedGoals)); } catch (e) {}
    }
    if (savedTheme !== null) setIsDarkMode(savedTheme === 'true');
  }, []);

  useEffect(() => { if (userName) localStorage.setItem('zest_fin_username', userName); }, [userName]);
  useEffect(() => { localStorage.setItem('zest_fin_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('zest_fin_debts', JSON.stringify(debts)); }, [debts]);
  useEffect(() => { localStorage.setItem('zest_fin_goals', JSON.stringify(goals)); }, [goals]);
  useEffect(() => { localStorage.setItem('zest_fin_dark_mode', isDarkMode.toString()); }, [isDarkMode]);

  const showToast = (msg, canUndo = false) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), canUndo ? 6000 : 3000);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!tempNameInput.trim()) return;
    setIsLoggingIn(true);
    setTimeout(() => {
      setUserName(tempNameInput.trim());
      setIsLoggedIn(true);
      setTimeout(() => {
        setIsDashboardVisible(true);
        setIsLoggingIn(false);
        showToast(`Chào mừng trở lại, ${tempNameInput.trim()}!`);
      }, 50);
    }, 600);
  };

  const handleLogout = () => {
    setIsDashboardVisible(false);
    setTimeout(() => {
      localStorage.removeItem('zest_fin_username');
      setUserName('');
      setIsLoggedIn(false);
      setTempNameInput('');
    }, 400);
  };

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { showToast("Trình duyệt không hỗ trợ nhận diện giọng nói!"); return; }
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

  const parseAndAddTransaction = (rawText, explicitAmount = null) => {
    if (!rawText.trim()) return;
    const text = rawText.toLowerCase();
    const amount = explicitAmount !== null ? explicitAmount : parseAmountSmart(rawText);
    if (amount <= 0) { showToast("Vui lòng nhập kèm số tiền hợp lệ!"); return; }

    let category = 'Khác'; 
    let type = 'expense';
    
    if (text.includes('lương') || text.includes('tiền lương') || text.includes('thưởng') || text.includes('nhận') || text.includes('thu nhập')) { 
      type = 'income'; 
      category = 'Thu nhập'; 
    } else if (text.includes('xăng') || text.includes('grab') || text.includes('uber')) {
      category = 'Di chuyển';
    } else if (text.includes('ăn') || text.includes('phở') || text.includes('cơm') || text.includes('cafe')) {
      category = 'Ăn uống';
    } else if (text.includes('mua') || text.includes('sắm')) {
      category = 'Mua sắm';
    } else if (text.includes('game') || text.includes('phim')) {
      category = 'Giải trí';
    }

    const now = new Date();
    const newTx = {
      id: Date.now(), note: rawText, amount, category, type,
      date: now.toISOString(), dateStr: now.toLocaleDateString('vi-VN'), time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTransactions([newTx, ...transactions]);
    setInputText('');
    showToast(type === 'income' ? `Đã nhận: +${amount.toLocaleString('vi-VN')}đ` : `Đã chi: -${amount.toLocaleString('vi-VN')}đ`);
  };

  const handleAiSubmit = (e) => { e.preventDefault(); parseAndAddTransaction(inputText); };

  const deleteTransaction = (id) => {
    const target = transactions.find(tx => tx.id === id);
    if (target) { setLastDeletedTx(target); setTransactions(transactions.filter(tx => tx.id !== id)); showToast("Đã xóa giao dịch.", true); }
  };

  const undoDelete = () => { 
    if (lastDeletedTx) { setTransactions([lastDeletedTx, ...transactions]); setLastDeletedTx(null); showToast("Đã khôi phục giao dịch!"); } 
  };

  const saveEditedTransaction = (e) => {
    e.preventDefault();
    if (!editingTx) return;
    const updatedAmount = parseAmountSmart(editAmount);
    setTransactions(transactions.map(tx => tx.id === editingTx.id ? { ...tx, note: editNote, amount: updatedAmount } : tx));
    setEditingTx(null);
    showToast("Cập nhật thành công!");
  };

  const exportPdfReport = () => { window.print(); };

  const handleAddDebt = (e) => {
    e.preventDefault();
    const amt = parseAmountSmart(debtAmount);
    if (!debtPerson.trim() || amt <= 0) return;
    setDebts([{ id: Date.now(), person: debtPerson.trim(), amount: amt, type: debtType, status: 'unpaid' }, ...debts]);
    setDebtPerson(''); setDebtAmount('');
    showToast("Đã thêm khoản định kỳ/công nợ!");
  };

  const toggleDebtStatus = (id) => {
    setDebts(debts.map(d => d.id === id ? { ...d, status: d.status === 'unpaid' ? 'paid' : 'unpaid' } : d));
    showToast("Đã cập nhật trạng thái.");
  };

  const deleteDebt = (id) => {
    setDebts(debts.filter(d => d.id !== id));
    showToast("Đã xóa mục công nợ.");
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    const target = parseAmountSmart(goalTarget);
    if (!goalName.trim() || target <= 0) return;
    setGoals([{ id: Date.now(), name: goalName.trim(), target, current: 0 }, ...goals]);
    setGoalName(''); setGoalTarget('');
    showToast("Đã tạo mục tiêu tiết kiệm mới!");
  };

  const depositGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, current: Math.min(g.target, g.current + Math.round(g.target * 0.1)) } : g));
    showToast("Đã tích lũy thêm vào quỹ!");
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
    showToast("Đã xóa mục tiêu.");
  };

  const todayDate = new Date();
  const currentMonth = todayDate.getMonth();
  const currentYear = todayDate.getFullYear();
  
  const currentMonthTransactions = transactions.filter(tx => {
    const d = new Date(tx.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const filteredTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    if (timeFilter === 'today') return txDate.toDateString() === todayDate.toDateString();
    if (timeFilter === 'month') return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
    return true;
  }).filter(tx => tx.note.toLowerCase().includes(searchQuery.toLowerCase()) || tx.category.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalExpense = filteredTransactions.filter(tx => tx.type === 'expense' || !tx.type).reduce((s, tx) => s + tx.amount, 0);
  const totalIncome = filteredTransactions.filter(tx => tx.type === 'income').reduce((s, tx) => s + tx.amount, 0);
  const budgetPercentage = monthlyBudget > 0 ? Math.min(Math.round((totalExpense / monthlyBudget) * 100), 100) : 0;

  const monthlyExpense = currentMonthTransactions.filter(tx => tx.type === 'expense' || !tx.type).reduce((s, tx) => s + tx.amount, 0);
  const essentialSpend = currentMonthTransactions.filter(tx => (tx.category === 'Ăn uống' || tx.category === 'Di chuyển') && (tx.type === 'expense' || !tx.type)).reduce((s, tx) => s + tx.amount, 0);
  const lifestyleSpend = currentMonthTransactions.filter(tx => (tx.category === 'Mua sắm' || tx.category === 'Giải trí') && (tx.type === 'expense' || !tx.type)).reduce((s, tx) => s + tx.amount, 0);
  
  const targetEssential = monthlyBudget * 0.5;
  const targetLifestyle = monthlyBudget * 0.3;
  const targetSavings = monthlyBudget * 0.2;

  const formatMoney = (amt) => isPrivacyMode ? '******** đ' : `${amt.toLocaleString('vi-VN')} đ`;

  const bgMain = isDarkMode ? 'bg-[#0a0a0a] text-zinc-100' : 'bg-[#f8fafc] text-slate-800';
  const cardBg = isDarkMode ? 'bg-[#121212] border-white/5' : 'bg-white border-slate-200 shadow-sm';
  const inputBg = isDarkMode ? 'bg-[#1a1a1a] border-white/5 text-white placeholder-zinc-600' : 'bg-slate-100 border-slate-200 text-slate-800 placeholder-slate-400';

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#34d399]/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#38bdf8]/10 blur-[120px] rounded-full"></div>
        </div>

        <div className={`w-full max-w-sm transition-all duration-500 ease-out ${isLoggingIn ? 'opacity-0 scale-95 translate-y-3' : 'opacity-100 scale-100'}`}>
          <div className="bg-[#111111]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center">
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4f900] to-[#34d399] flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.3)] mb-6">
              <span className="text-[#0a0a0a] font-extrabold text-2xl tracking-tighter">ZF</span>
            </div>

            <h1 className="text-2xl font-bold text-white tracking-tight mb-1">ZestFin Finance</h1>
            <p className="text-xs text-zinc-400 mb-8 text-center font-medium">Hệ thống quản trị tài chính cá nhân cao cấp.</p>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text" 
                  value={tempNameInput} 
                  onChange={(e) => setTempNameInput(e.target.value)} 
                  placeholder="Nhập tên của bạn (VD: Trí)..." 
                  disabled={isLoggingIn}
                  required 
                  className="w-full bg-[#1a1a1a] border border-white/5 text-sm pl-11 pr-4 py-3.5 rounded-2xl outline-none focus:ring-1 focus:ring-[#34d399] text-white placeholder-zinc-600 font-medium transition-all" 
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoggingIn}
                className="w-full py-4 bg-gradient-to-r from-[#d4f900] to-[#34d399] text-[#0a0a0a] hover:opacity-90 rounded-2xl text-xs font-extrabold transition-all flex justify-center items-center gap-2 shadow-lg cursor-pointer"
              >
                {isLoggingIn ? (
                  <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span> Đang xác thực...</>
                ) : (
                  'Truy cập Hệ thống'
                )}
              </button>
            </form>
            <p className="text-[10px] text-zinc-600 mt-6 flex items-center gap-1.5"><ShieldAlert size={12}/> LocalStorage Encrypted Security</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgMain} ${plusJakarta.className} transition-opacity duration-500 ease-in-out ${isDashboardVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161616] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 animate-bounce">
          <CheckCircle2 size={16} className="text-[#34d399]" />
          <span className="text-xs font-bold">{toastMessage}</span>
          {lastDeletedTx && toastMessage.includes("xóa") && (
            <button onClick={undoDelete} className="ml-2 bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-xl text-[11px] font-bold cursor-pointer flex items-center gap-1"><RotateCcw size={12} /> Hoàn tác</button>
          )}
        </div>
      )}

      {editingTx && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 ${isDarkMode ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
            <h3 className="text-sm font-bold flex items-center gap-2"><Edit3 size={16} className="text-[#34d399]" /> Chỉnh sửa giao dịch</h3>
            <form onSubmit={saveEditedTransaction} className="space-y-3">
              <div>
                <label className="text-xs font-medium mb-1 block opacity-75">Nội dung</label>
                <input type="text" value={editNote} onChange={(e) => setEditNote(e.target.value)} required className={`w-full text-xs p-3.5 rounded-xl outline-none border focus:ring-1 focus:ring-[#34d399] ${isDarkMode ? 'bg-[#1c1c1c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block opacity-75">Số tiền</label>
                <input type="text" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} required className={`w-full text-xs p-3.5 rounded-xl outline-none border focus:ring-1 focus:ring-[#34d399] ${isDarkMode ? 'bg-[#1c1c1c] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'}`} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingTx(null)} className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-[#34d399] text-black rounded-xl text-xs font-extrabold hover:bg-[#2bc48a]">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        userName={userName} 
        handleLogout={handleLogout} 
      />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        
        {activeTab === 'dashboard' && (
          <>
            <BudgetSummary 
              totalExpense={totalExpense}
              totalIncome={totalIncome}
              monthlyBudget={monthlyBudget}
              budgetPercentage={budgetPercentage}
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
              isPrivacyMode={isPrivacyMode}
              setIsPrivacyMode={setIsPrivacyMode}
              formatMoney={formatMoney}
              isDarkMode={isDarkMode}
              cardBg={cardBg}
            />

            <TransactionForm 
              inputText={inputText}
              setInputText={setInputText}
              isListening={isListening}
              toggleSpeechRecognition={toggleSpeechRecognition}
              handleAiSubmit={handleAiSubmit}
              parseAndAddTransaction={parseAndAddTransaction}
              monthlyExpense={monthlyExpense}
              monthlyBudget={monthlyBudget}
              formatMoney={formatMoney}
              isDarkMode={isDarkMode}
              cardBg={cardBg}
              inputBg={inputBg}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">
                <AnalyticsMatrix 
                  targetEssential={targetEssential}
                  essentialSpend={essentialSpend}
                  targetLifestyle={targetLifestyle}
                  lifestyleSpend={lifestyleSpend}
                  targetSavings={targetSavings}
                  formatMoney={formatMoney}
                  cardBg={cardBg}
                />
              </div>
              <div className="lg:col-span-6">
                <SavingsGoals 
                  goals={goals}
                  goalName={goalName}
                  setGoalName={setGoalName}
                  goalTarget={goalTarget}
                  setGoalTarget={setGoalTarget}
                  handleAddGoal={handleAddGoal}
                  depositGoal={depositGoal}
                  deleteGoal={deleteGoal}
                  formatMoney={formatMoney}
                  isDarkMode={isDarkMode}
                  cardBg={cardBg}
                  inputBg={inputBg}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-12">
                <DebtManager 
                  debts={debts}
                  debtPerson={debtPerson}
                  setDebtPerson={setDebtPerson}
                  debtAmount={debtAmount}
                  setDebtAmount={setDebtAmount}
                  debtType={debtType}
                  setDebtType={setDebtType}
                  handleAddDebt={handleAddDebt}
                  toggleDebtStatus={toggleDebtStatus}
                  deleteDebt={deleteDebt}
                  formatMoney={formatMoney}
                  isDarkMode={isDarkMode}
                  cardBg={cardBg}
                  inputBg={inputBg}
                />
              </div>
            </div>

            <TransactionHistory 
              filteredTransactions={filteredTransactions}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              getCategoryMeta={getCategoryMeta}
              formatMoney={formatMoney}
              setEditingTx={setEditingTx}
              setEditNote={setEditNote}
              setEditAmount={setEditAmount}
              deleteTransaction={deleteTransaction}
              exportPdfReport={exportPdfReport}
              cardBg={cardBg}
              inputBg={inputBg}
              isDarkMode={isDarkMode}
            />
          </>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-6">
            <SavingsGoals 
              goals={goals}
              goalName={goalName}
              setGoalName={setGoalName}
              goalTarget={goalTarget}
              setGoalTarget={setGoalTarget}
              handleAddGoal={handleAddGoal}
              depositGoal={depositGoal}
              deleteGoal={deleteGoal}
              formatMoney={formatMoney}
              isDarkMode={isDarkMode}
              cardBg={cardBg}
              inputBg={inputBg}
            />
            <DebtManager 
              debts={debts}
              debtPerson={debtPerson}
              setDebtPerson={setDebtPerson}
              debtAmount={debtAmount}
              setDebtAmount={setDebtAmount}
              debtType={debtType}
              setDebtType={setDebtType}
              handleAddDebt={handleAddDebt}
              toggleDebtStatus={toggleDebtStatus}
              deleteDebt={deleteDebt}
              formatMoney={formatMoney}
              isDarkMode={isDarkMode}
              cardBg={cardBg}
              inputBg={inputBg}
            />
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-6">
            <BudgetSummary 
              totalExpense={totalExpense}
              totalIncome={totalIncome}
              monthlyBudget={monthlyBudget}
              budgetPercentage={budgetPercentage}
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
              isPrivacyMode={isPrivacyMode}
              setIsPrivacyMode={setIsPrivacyMode}
              formatMoney={formatMoney}
              isDarkMode={isDarkMode}
              cardBg={cardBg}
            />
            <AnalyticsMatrix 
              targetEssential={targetEssential}
              essentialSpend={essentialSpend}
              targetLifestyle={targetLifestyle}
              lifestyleSpend={lifestyleSpend}
              targetSavings={targetSavings}
              formatMoney={formatMoney}
              cardBg={cardBg}
            />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <TransactionHistory 
              filteredTransactions={filteredTransactions}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              getCategoryMeta={getCategoryMeta}
              formatMoney={formatMoney}
              setEditingTx={setEditingTx}
              setEditNote={setEditNote}
              setEditAmount={setEditAmount}
              deleteTransaction={deleteTransaction}
              exportPdfReport={exportPdfReport}
              cardBg={cardBg}
              inputBg={inputBg}
              isDarkMode={isDarkMode}
            />
          </div>
        )}

      </main>

      <footer className="max-w-7xl mx-auto px-6 mt-16 pt-6 border-t opacity-60 text-center text-xs font-medium pb-8">
        <p>© 2026 ZESTFIN Finance. All rights reserved.</p>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
            header, form, button, nav { display: none !important; }
            body { background: white !important; color: black !important; }
        }
        @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important; }
        }
      `}} />
    </div>
  );
}