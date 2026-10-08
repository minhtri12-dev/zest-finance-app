'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import financeLogo from '@/lib/finance.png';
// Import font Plus Jakarta Sans chuẩn Next.js
import { Plus_Jakarta_Sans } from 'next/font/google';
import { 
  Sparkles, Send, Mic, History, Trash2, Utensils, Car, ShoppingBag, 
  Wallet, MessageSquareText, PieChart, Settings, CheckCircle2, Search, 
  Users, Printer, Bot, X, Eye, EyeOff, Edit3, RotateCcw, Calendar, 
  Download, Sun, Moon, User, LogOut, ArrowUpRight, ArrowDownLeft, ShieldAlert,
  TrendingUp, TrendingDown, BarChart3, Minus
} from 'lucide-react';

// Khởi tạo font
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
  const [showAiModal, setShowAiModal] = useState(false);
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

  // Lời chào theo buổi
  const [greetingPhrase, setGreetingPhrase] = useState('Xin chào');
  const [greetingMessage, setGreetingMessage] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 13) { // 05:00 - 12:59 (Buổi sáng)
        setGreetingPhrase('Chào buổi sáng');
        setGreetingMessage('Quản lý tốt một đồng hôm nay là hạt giống cho tài sản vững chắc ngày mai.');
      } else if (hour >= 13 && hour < 18) { // 13:00 - 17:59 (Buổi chiều)
        setGreetingPhrase('Chào buổi chiều');
        setGreetingMessage('Đừng để những khoản chi nhỏ làm rò rỉ một túi tiền lớn. Hãy kiểm tra lại ngân sách nhé!');
      } else if (hour >= 18 && hour < 24) { // 18:00 - 23:59 (Buổi tối)
        setGreetingPhrase('Chào buổi tối');
        setGreetingMessage('Đã đến lúc tổng kết dòng tiền và để ngân sách nghỉ ngơi cùng bạn.');
      } else { // 00:00 - 04:59 (Buổi khuya)
        setGreetingPhrase('Chào buổi khuya');
        setGreetingMessage('Cú đêm chăm chỉ, nhưng đừng quên sức khỏe quý hơn vàng nhé. Nhập nhanh rồi đi ngủ nào!');
      }
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('zest_fin_username');
    const savedTx = localStorage.getItem('zest_fin_transactions');
    const savedBudget = localStorage.getItem('zest_fin_budget');
    const savedDebts = localStorage.getItem('zest_fin_debts');
    const savedTheme = localStorage.getItem('zest_fin_dark_mode');

    if (savedUser) {
      setUserName(savedUser);
      setIsLoggedIn(true);
    }
    if (savedTx) {
      try {
        const parsed = JSON.parse(savedTx).map(item => ({ ...item, date: new Date(item.date) }));
        setTransactions(parsed);
      } catch (e) { console.error(e); }
    }
    if (savedBudget) {
      setMonthlyBudget(Number(savedBudget));
      setTempBudget(savedBudget);
    }
    if (savedDebts) {
      try { setDebts(JSON.parse(savedDebts)); } catch (e) { console.error(e); }
    }
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'true');
    }
  }, []);

  useEffect(() => {
    if (userName) localStorage.setItem('zest_fin_username', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('zest_fin_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('zest_fin_budget', monthlyBudget.toString());
  }, [monthlyBudget]);

  useEffect(() => {
    localStorage.setItem('zest_fin_debts', JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    localStorage.setItem('zest_fin_dark_mode', isDarkMode.toString());
  }, [isDarkMode]);

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

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && isLoggedIn) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        showToast("Đã nhận diện giọng nói thành công!");
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      if (isListening) recognition.start();
      else recognition.stop();
    }
  }, [isListening, isLoggedIn]);

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
      if (numbers.length > 0) return parseInt(numbers.join(''), 10);
    }
    return 50000;
  };

  const parseAndAddTransaction = (rawText, explicitAmount = null) => {
    if (!rawText.trim()) return;
    const text = rawText.toLowerCase();
    const amount = explicitAmount !== null ? explicitAmount : parseAmountSmart(rawText);

    let category = 'Khác';
    let icon = <Wallet size={16} className="text-[#D49A65]" />;
    let badgeBg = 'bg-[#D49A65]/10 text-[#D49A65] border-[#D49A65]/20';

    if (text.includes('xăng') || text.includes('xe') || text.includes('grab') || text.includes('uber')) {
      category = 'Di chuyển';
      icon = <Car size={16} className="text-[#D49A65]" />;
      badgeBg = 'bg-[#D49A65]/10 text-[#D49A65] border-[#D49A65]/20';
    } else if (text.includes('ăn') || text.includes('phở') || text.includes('cơm') || text.includes('cafe') || text.includes('nước') || text.includes('lẩu')) {
      category = 'Ăn uống';
      icon = <Utensils size={16} className="text-[#E2A368]" />;
      badgeBg = 'bg-[#E2A368]/10 text-[#E2A368] border-[#E2A368]/20';
    } else if (text.includes('mua') || text.includes('sắm') || text.includes('quần áo') || text.includes('giày')) {
      category = 'Mua sắm';
      icon = <ShoppingBag size={16} className="text-[#D49A65]" />;
      badgeBg = 'bg-[#D49A65]/10 text-[#D49A65] border-[#D49A65]/20';
    } else if (text.includes('game') || text.includes('net') || text.includes('phim')) {
      category = 'Giải trí';
      icon = <Sparkles size={16} className="text-[#E2A368]" />;
      badgeBg = 'bg-[#E2A368]/10 text-[#E2A368] border-[#E2A368]/20';
    }

    const now = new Date();
    const newTx = {
      id: Date.now(),
      note: rawText,
      amount: amount,
      category: category,
      icon: icon,
      badgeBg: badgeBg,
      date: now,
      dateStr: now.toLocaleDateString('vi-VN'),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTransactions([newTx, ...transactions]);
    setInputText('');
    showToast(`Đã thêm giao dịch: -${amount.toLocaleString('vi-VN')}đ`);
  };

  const handleAiSubmit = (e) => {
    e.preventDefault();
    parseAndAddTransaction(inputText);
  };

  const deleteTransaction = (id) => {
    const target = transactions.find(tx => tx.id === id);
    if (target) {
      setLastDeletedTx(target);
      setTransactions(transactions.filter(tx => tx.id !== id));
      showToast("Đã xóa giao dịch. Bấm để Hoàn tác.", true);
    }
  };

  const undoDelete = () => {
    if (lastDeletedTx) {
      setTransactions([lastDeletedTx, ...transactions]);
      setLastDeletedTx(null);
      showToast("Đã khôi phục lại giao dịch thành công!");
    }
  };

  const clearAllTransactions = () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử giao dịch không?')) {
      setTransactions([]);
      showToast("Đã làm sạch lịch sử giao dịch.");
    }
  };

  const saveEditedTransaction = (e) => {
    e.preventDefault();
    if (!editingTx) return;
    const updatedAmount = parseAmountSmart(editAmount);
    setTransactions(transactions.map(tx => {
      if (tx.id === editingTx.id) {
        return { ...tx, note: editNote, amount: updatedAmount };
      }
      return tx;
    }));
    setEditingTx(null);
    showToast("Đã cập nhật giao dịch thành công!");
  };

  const exportPdfReport = () => {
    showToast("Đang chuẩn bị trang in biểu mẫu báo cáo...");
    window.print();
  };

  const exportCsvReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,ID,Ngay,ThoiGian,NoiDung,DanhMuc,SoTien\n";
    transactions.forEach(tx => {
      csvContent += `${tx.id},${tx.dateStr || ''},${tx.time},"${tx.note}",${tx.category},${tx.amount}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "zest_fin_report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast("Đã xuất file báo cáo CSV thành công!");
  };

  const handleSplitSubmit = (e) => {
    e.preventDefault();
    const total = parseAmountSmart(splitTotal);
    const people = parseInt(splitPeople) || 1;
    if (total <= 0 || people <= 0) return;
    const myShare = Math.round(total / people);
    const content = `Chia bill ${splitNote || 'ăn uống'}: tổng ${total.toLocaleString('vi-VN')}đ / ${people} người`;
    parseAndAddTransaction(content, myShare);
    setSplitTotal('');
    setSplitNote('');
    setSplitPeople('2');
  };

  const handleAddDebt = (e) => {
    e.preventDefault();
    const amt = parseAmountSmart(debtAmount);
    if (!debtPerson.trim() || amt <= 0) return;
    const newDebt = {
      id: Date.now(),
      person: debtPerson.trim(),
      amount: amt,
      type: debtType,
      status: 'unpaid'
    };
    setDebts([newDebt, ...debts]);
    setDebtPerson('');
    setDebtAmount('');
    showToast("Đã ghi nhận sổ cái công nợ thành công!");
  };

  const toggleDebtStatus = (id) => {
    setDebts(debts.map(d => d.id === id ? { ...d, status: d.status === 'unpaid' ? 'paid' : 'unpaid' } : d));
    showToast("Đã cập nhật trạng thái công nợ.");
  };

  const deleteDebt = (id) => {
    setDebts(debts.filter(d => d.id !== id));
    showToast("Đã xóa khoản công nợ.");
  };

  const filteredTransactions = transactions.filter(tx => {
    const today = new Date();
    let matchesTime = true;
    const txDate = new Date(tx.date);
    if (timeFilter === 'today') {
      matchesTime = txDate.toDateString() === today.toDateString();
    } else if (timeFilter === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      matchesTime = txDate >= weekAgo;
    }
    const matchesSearch = tx.note.toLowerCase().includes(searchQuery.toLowerCase()) || tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTime && matchesSearch;
  });

  const totalExpense = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const budgetPercentage = monthlyBudget > 0 ? Math.min(Math.round((totalExpense / monthlyBudget) * 100), 100) : 0;

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const currentDay = new Date().getDate();
  const remainingDays = Math.max(daysInMonth - currentDay + 1, 1);
  const remainingBudget = Math.max(monthlyBudget - totalExpense, 0);
  const dailyLimit = Math.round(remainingBudget / remainingDays);
  
  const burnRate = currentDay > 0 ? Math.round(totalExpense / currentDay) : 0;
  const estimatedDaysLeft = burnRate > 0 ? Math.round(remainingBudget / burnRate) : 99;

  const essentialSpend = getCategoryTotal('Ăn uống') + getCategoryTotal('Di chuyển');
  const lifestyleSpend = getCategoryTotal('Mua sắm') + getCategoryTotal('Giải trí');
  const targetEssential = monthlyBudget * 0.5;
  const targetLifestyle = monthlyBudget * 0.3;
  const targetSavings = monthlyBudget * 0.2;

  function getCategoryTotal(catName) {
    return filteredTransactions
      .filter(tx => tx.category === catName)
      .reduce((sum, tx) => sum + tx.amount, 0);
  }

  const categoriesList = ['Ăn uống', 'Di chuyển', 'Mua sắm', 'Giải trí', 'Khác'];

  const getTrendChartData = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let curr = 0;
    let prev = 0;
    let currLabel = '';
    let prevLabel = '';

    if (timeFilter === 'today') {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      curr = transactions.filter(tx => new Date(tx.date).setHours(0,0,0,0) === today.getTime()).reduce((sum, tx) => sum + tx.amount, 0);
      prev = transactions.filter(tx => new Date(tx.date).setHours(0,0,0,0) === yesterday.getTime()).reduce((sum, tx) => sum + tx.amount, 0);
      
      currLabel = 'Hôm nay';
      prevLabel = 'Hôm qua';
    } 
    else if (timeFilter === 'week') {
      const currWeekStart = new Date(today);
      currWeekStart.setDate(currWeekStart.getDate() - 6);
      
      const prevWeekEnd = new Date(currWeekStart);
      prevWeekEnd.setDate(prevWeekEnd.getDate() - 1);
      
      const prevWeekStart = new Date(prevWeekEnd);
      prevWeekStart.setDate(prevWeekStart.getDate() - 6);

      curr = transactions.filter(tx => {
          const d = new Date(tx.date).setHours(0,0,0,0);
          return d >= currWeekStart.getTime() && d <= today.getTime();
      }).reduce((sum, tx) => sum + tx.amount, 0);

      prev = transactions.filter(tx => {
          const d = new Date(tx.date).setHours(0,0,0,0);
          return d >= prevWeekStart.getTime() && d <= prevWeekEnd.getTime();
      }).reduce((sum, tx) => sum + tx.amount, 0);

      currLabel = 'Tuần này';
      prevLabel = 'Tuần trước';
    } 
    else {
      const currMonth = today.getMonth();
      const currYear = today.getFullYear();
      
      const prevMonth = currMonth === 0 ? 11 : currMonth - 1;
      const prevYear = currMonth === 0 ? currYear - 1 : currYear;

      curr = transactions.filter(tx => {
          const d = new Date(tx.date);
          return d.getMonth() === currMonth && d.getFullYear() === currYear;
      }).reduce((sum, tx) => sum + tx.amount, 0);

      prev = transactions.filter(tx => {
          const d = new Date(tx.date);
          return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
      }).reduce((sum, tx) => sum + tx.amount, 0);

      currLabel = 'Tháng này';
      prevLabel = 'Tháng trước';
    }

    let percent = 0;
    let isUp = false;
    let isNeutral = false;

    if (prev === 0 && curr === 0) {
      percent = 0;
      isNeutral = true;
    } else if (prev === 0) {
      percent = 100;
      isUp = true;
    } else {
      const diff = curr - prev;
      percent = Math.abs(Math.round((diff / prev) * 100));
      isUp = diff > 0;
      isNeutral = diff === 0;
    }

    return { curr, prev, currLabel, prevLabel, percent, isUp, isNeutral };
  };

  const chartData = getTrendChartData();
  const maxChartVal = Math.max(chartData.curr, chartData.prev) || 1;
  const currChartHeight = Math.max((chartData.curr / maxChartVal) * 100, 5); 
  const prevChartHeight = Math.max((chartData.prev / maxChartVal) * 100, 5);

  const getAiAdvice = () => {
    if (totalExpense === 0) return "Ví tài chính đang bảo toàn ở mức tốt, chưa phát sinh khoản chi tiêu nào.";
    if (totalExpense >= monthlyBudget) return "Cảnh báo vượt mức: Ngân sách tháng đã cạn kiệt, cần thắt chặt ngay lập tức.";
    if (burnRate > dailyLimit * 1.5) return `Cảnh báo tốc độ chi tiêu cao: Với mức tiêu hiện tại (${burnRate.toLocaleString('vi-VN')}đ/ngày), bạn có nguy cơ hụt ngân sách trước hạn!`;
    return `Dòng tiền đang ổn định. Hạn mức tiêu an toàn tối ưu cho mỗi ngày còn lại là ${dailyLimit.toLocaleString('vi-VN')} đ/ngày.`;
  };

  const formatMoney = (amount) => {
    if (isPrivacyMode) return '******** đ';
    return `${amount.toLocaleString('vi-VN')} đ`;
  };

  const formatShortMoney = (amount) => {
    if (isPrivacyMode) return '***';
    if (amount >= 1000000) return `${(amount/1000000).toFixed(1)}M`;
    if (amount >= 1000) return `${Math.round(amount/1000)}k`;
    return amount.toString();
  };

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen bg-[#16181A] text-white flex items-center justify-center p-4 ${plusJakarta.className}`}>
        <div className="max-w-md w-full bg-[#191A1C] border border-[#2A2D32] rounded-3xl p-8 shadow-2xl space-y-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#D49A65]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#D49A65]/20 flex items-center justify-center text-[#D49A65] mx-auto shadow-lg shadow-[#D49A65]/20 relative">
            <Image src={financeLogo} alt="Logo" width={56} height={56} className="object-cover w-full h-full" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">ZEST FIN Finance</h1>
            <p className="text-xs text-[#9EA0A5]">Hệ thống quản trị tài chính thế hệ mới. Vui lòng nhập tên để bắt đầu phiên làm việc bảo mật.</p>
          </div>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input 
              type="text" 
              value={tempNameInput} 
              onChange={(e) => setTempNameInput(e.target.value)} 
              placeholder="Nhập tên của bạn..." 
              required
              className="w-full bg-[#16181A] border border-[#2A2D32] text-sm px-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-[#D49A65] text-white placeholder-slate-500 font-medium"
            />
            <button 
              type="submit" 
              className="w-full py-4 bg-[#D49A65] hover:bg-[#E2A368] text-[#16181A] rounded-2xl text-xs font-extrabold transition-all shadow-lg shadow-[#D49A65]/20 cursor-pointer active:scale-95"
            >
              Truy cập Hệ thống
            </button>
          </form>
          <p className="text-[10px] text-[#9EA0A5]">Dữ liệu được lưu trữ an toàn qua LocalStorage bảo mật cục bộ.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-16 relative ${isDarkMode ? 'bg-[#16181A] text-[#FFFFFF]' : 'bg-[#F4F5F7] text-[#16181A]'} ${plusJakarta.className}`}>
      
      {/* Toast & Modals */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191A1C] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#2A2D32] animate-bounce">
          <CheckCircle2 size={18} className="text-[#D49A65]" />
          <span className="text-xs font-bold">{toastMessage}</span>
          {lastDeletedTx && toastMessage.includes("Hoàn tác") && (
            <button onClick={undoDelete} className="ml-2 bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1">
              <RotateCcw size={12} /> Hoàn tác
            </button>
          )}
        </div>
      )}

      {editingTx && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-3xl p-6 max-w-md w-full border shadow-2xl space-y-4 ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32] text-white' : 'bg-white border-[#D0D4DC] text-[#16181A]'}`}>
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <Edit3 size={18} className="text-[#D49A65]" /> Chỉnh sửa giao dịch tài chính
            </h3>
            <form onSubmit={saveEditedTransaction} className="space-y-3">
              <div>
                <label className={`text-xs font-bold mb-1 block ${isDarkMode ? 'text-[#9EA0A5]' : 'text-slate-500'}`}>Nội dung ghi chú</label>
                <input 
                  type="text" 
                  value={editNote} 
                  onChange={(e) => setEditNote(e.target.value)} 
                  required
                  className={`w-full text-xs p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#D49A65] border font-medium ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] text-white' : 'bg-[#F4F5F7] border-[#D0D4DC] text-[#16181A]'}`}
                />
              </div>
              <div>
                <label className={`text-xs font-bold mb-1 block ${isDarkMode ? 'text-[#9EA0A5]' : 'text-slate-500'}`}>Số tiền (VD: 150k hoặc 2tr7)</label>
                <input 
                  type="text" 
                  value={editAmount} 
                  onChange={(e) => setEditAmount(e.target.value)} 
                  required
                  className={`w-full text-xs p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#D49A65] border font-medium ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] text-white' : 'bg-[#F4F5F7] border-[#D0D4DC] text-[#16181A]'}`}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingTx(null)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}>Hủy</button>
                <button type="submit" className="px-5 py-2 bg-[#D49A65] hover:bg-[#E2A368] text-[#16181A] rounded-xl text-xs font-bold transition-all shadow-md">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`backdrop-blur-md border-b sticky top-0 z-40 transition-colors duration-300 ${isDarkMode ? 'bg-[#16181A]/90 border-[#2A2D32]' : 'bg-white/90 border-[#D0D4DC]'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-[#D49A65]/20 shadow-md relative">
              <Image src={financeLogo} alt="Logo" width={36} height={36} className="object-cover w-full h-full" />
            </div>
            <span className={`font-extrabold text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>ZEST FIN <span className="text-[#D49A65] font-light">Finance</span></span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${isDarkMode ? 'bg-[#191A1C] hover:bg-[#2A2D32] border-[#2A2D32] text-[#D49A65]' : 'bg-[#D0D4DC] hover:bg-[#C0C4CC] border-[#C0C4CC] text-amber-700'}`}
              title={isDarkMode ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối'}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button 
              onClick={handleLogout}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${isDarkMode ? 'bg-[#191A1C] hover:bg-[#2A2D32] border-[#2A2D32] text-[#9EA0A5]' : 'bg-[#D0D4DC] hover:bg-[#C0C4CC] border-[#C0C4CC] text-slate-700'}`}
              title="Đăng xuất / Đổi tài khoản"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section với Lời chào Động */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-8 text-center md:text-left">
        <div className="space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${isDarkMode ? 'bg-[#191A1C] text-[#D49A65] border-[#2A2D32]' : 'bg-[#D0D4DC] text-slate-800 border-[#C0C4CC]'}`}>
            <User size={13} /> {greetingPhrase}, {userName}!
          </div>
          <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>
            Tối ưu dòng tiền cá nhân <br /><span className="text-[#D49A65]">với chuẩn mực công nghệ cao.</span>
          </h1>
          <p className={`text-sm md:text-base font-medium leading-relaxed max-w-xl ${isDarkMode ? 'text-[#9EA0A5]' : 'text-slate-600'}`}>
            {greetingMessage}
          </p>
        </div>
      </section>

      {/* Main Dashboard - REORDERED LAYOUT */}
      <main className="max-w-6xl mx-auto px-6 space-y-6">
        
        {/* 1: ĐIỀU KHIỂN TOÀN CỤC (GLOBAL CONTROLS) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className={`md:col-span-7 border rounded-3xl p-3.5 flex items-center justify-between shadow-sm transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
            <span className="text-xs font-bold text-[#9EA0A5] uppercase tracking-wider px-2">Lọc dữ liệu theo:</span>
            <div className={`flex items-center gap-1 p-1 rounded-2xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
              <button 
                onClick={() => setTimeFilter('today')} 
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${timeFilter === 'today' ? 'bg-[#D49A65] text-[#16181A] shadow-md' : (isDarkMode ? 'text-[#9EA0A5] hover:text-white' : 'text-slate-600 hover:text-slate-900')}`}
              >
                Hôm nay
              </button>
              <button 
                onClick={() => setTimeFilter('week')} 
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${timeFilter === 'week' ? 'bg-[#D49A65] text-[#16181A] shadow-md' : (isDarkMode ? 'text-[#9EA0A5] hover:text-white' : 'text-slate-600 hover:text-slate-900')}`}
              >
                Tuần này
              </button>
              <button 
                onClick={() => setTimeFilter('all')} 
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${timeFilter === 'all' ? 'bg-[#D49A65] text-[#16181A] shadow-md' : (isDarkMode ? 'text-[#9EA0A5] hover:text-white' : 'text-slate-600 hover:text-slate-900')}`}
              >
                Tất cả
              </button>
            </div>
          </div>

          <div className={`md:col-span-5 border rounded-3xl p-5 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#9EA0A5] uppercase tracking-wider flex items-center gap-1">
                <Settings size={12} /> Ngân sách tháng thiết lập
              </span>
              <button 
                onClick={() => {
                  if (isEditingBudget) {
                    setMonthlyBudget(parseInt(tempBudget) || 0);
                    showToast("Đã cập nhật hạn mức ngân sách tháng!");
                  }
                  setIsEditingBudget(!isEditingBudget);
                }} 
                className="text-xs text-[#D49A65] font-bold hover:underline cursor-pointer"
              >
                {isEditingBudget ? 'Lưu lại' : 'Nhập / Đổi'}
              </button>
            </div>
            {isEditingBudget ? (
              <input 
                type="number" 
                value={tempBudget} 
                onChange={(e) => setTempBudget(e.target.value)} 
                placeholder="Nhập ngân sách tháng..."
                className={`w-full text-xs px-3.5 py-2 rounded-xl mt-2 outline-none font-bold border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] text-white' : 'bg-[#F4F5F7] border-[#D0D4DC] text-[#16181A]'}`}
              />
            ) : (
              <div className="mt-2">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className={isDarkMode ? 'text-white' : 'text-[#16181A]'}>{formatMoney(monthlyBudget)}</span>
                  <span className={budgetPercentage >= 80 ? 'text-red-400' : 'text-[#9EA0A5]'}>{budgetPercentage}%</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
                  <div className={`h-full rounded-full transition-all duration-500 ${budgetPercentage >= 80 ? 'bg-red-500' : 'bg-[#D49A65]'}`} style={{ width: `${budgetPercentage}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/*  2: HÀNH ĐỘNG CỐT LÕI (INPUT & QUICK ACTIONS) */}
        <div className={`rounded-3xl p-6 border-2 shadow-lg space-y-4 transition-all duration-300 relative overflow-hidden ${isDarkMode ? 'bg-[#191A1C] border-[#D49A65]/40 shadow-black/60' : 'bg-white border-[#D49A65]/50 shadow-amber-900/10'}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D49A65]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className={`flex flex-col md:flex-row md:items-center justify-between pb-3 border-b gap-3 relative z-10 ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#D49A65]/10 flex items-center justify-center text-[#D49A65] shrink-0">
                <Sparkles size={20} />
              </div>
              <h2 className={`font-extrabold text-sm uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>
                Nhập liệu thông minh (Văn bản / Giọng nói)
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => parseAndAddTransaction("tiền nhà 3tr")} className={`text-[11px] px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${isDarkMode ? 'bg-[#D49A65]/10 hover:bg-[#D49A65]/20 text-[#D49A65] border-[#D49A65]/20' : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'}`}>
                + Tiền nhà 3tr
              </button>
              <button onClick={() => parseAndAddTransaction("ăn phở 40k")} className={`text-[11px] px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${isDarkMode ? 'bg-[#D49A65]/10 hover:bg-[#D49A65]/20 text-[#D49A65] border-[#D49A65]/20' : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'}`}>
                + Phở 40k
              </button>
              <button onClick={() => parseAndAddTransaction("đổ xăng 50k")} className={`text-[11px] px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${isDarkMode ? 'bg-[#D49A65]/10 hover:bg-[#D49A65]/20 text-[#D49A65] border-[#D49A65]/20' : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'}`}>
                + Xăng 50k
              </button>
            </div>
          </div>

          <form onSubmit={handleAiSubmit} className="flex items-center gap-3 pt-2 relative z-10">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isListening ? "Đang lắng nghe..." : "Điền giao dịch..."}
                className={`w-full placeholder-slate-500 font-medium text-sm md:text-base rounded-2xl focus:ring-2 focus:ring-[#D49A65] focus:border-transparent outline-none block p-4 pr-12 border transition-all ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] text-white' : 'bg-[#F4F5F7] border-[#D0D4DC] text-[#16181A]'}`}
              />
              <button 
                type="button" 
                onClick={() => setIsListening(!isListening)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-colors cursor-pointer ${isListening ? 'text-red-400 bg-red-500/10 animate-pulse' : 'text-[#9EA0A5] hover:text-[#D49A65] hover:bg-white/10'}`}
                title="Bấm để nói"
              >
                <Mic size={20} />
              </button>
            </div>
            <button type="submit" className="bg-[#D49A65] hover:bg-[#E2A368] text-[#16181A] px-6 py-4 md:px-8 rounded-2xl text-xs md:text-sm font-extrabold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-[#D49A65]/20 active:scale-95">
              <span>Gửi</span> <Send size={16} />
            </button>
          </form>
        </div>

        {/*  3: TỔNG QUAN DASHBOARD (OVERVIEW) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className={`rounded-3xl shadow-sm border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32] hover:border-[#D49A65]/30' : 'bg-white border-[#D0D4DC] hover:border-[#16181A]/30'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#9EA0A5] text-[10px] font-bold uppercase tracking-wider">Tổng chi tiêu đã lọc</p>
                <p className={`font-extrabold text-2xl md:text-3xl mt-1 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>
                  {formatMoney(totalExpense)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#D49A65]/10 flex items-center justify-center text-[#D49A65]">
                <BarChart3 size={22} />
              </div>
            </div>

            {/* 📊 MINI BAR CHART (Biểu đồ cột) */}
            <div className="mt-6 pt-4 border-t border-dashed flex items-end gap-6 h-32 justify-center border-[#9EA0A5]/20">
               <div className="flex flex-col items-center gap-2 h-full justify-end w-16 group cursor-pointer">
                  <span className="text-[11px] font-bold text-[#9EA0A5] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{formatShortMoney(chartData.prev)}</span>
                  <div className={`w-10 rounded-t-md transition-all duration-700 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} style={{ height: `${prevChartHeight}%` }}></div>
                  <span className="text-[11px] font-bold text-[#9EA0A5] whitespace-nowrap">{chartData.prevLabel}</span>
               </div>
               
               <div className="flex flex-col items-center gap-2 h-full justify-end w-16 group cursor-pointer">
                  <span className={`text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{formatShortMoney(chartData.curr)}</span>
                  <div className={`w-10 rounded-t-md transition-all duration-700 ${chartData.isUp ? 'bg-red-400 shadow-[0_0_15px_rgba(248,113,113,0.3)]' : 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]'}`} style={{ height: `${currChartHeight}%` }}></div>
                  <span className={`text-[11px] font-bold whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{chartData.currLabel}</span>
               </div>
            </div>

            <div className="flex items-center justify-center mt-4 text-[11px] font-bold">
               {chartData.isNeutral ? (
                  <span className="text-slate-500 bg-slate-500/10 px-2.5 py-1.5 rounded-lg border border-slate-500/20">Không biến động (0%)</span>
               ) : (
                  <span className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 shadow-sm ${chartData.isUp ? 'text-red-500 bg-red-500/10 border-red-500/20' : 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'}`}>
                     {chartData.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                     <b>{chartData.percent}%</b> so với {chartData.prevLabel.toLowerCase()}
                  </span>
               )}
            </div>
            
            <div className={`mt-5 pt-3 border-t flex items-center justify-center ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
              <button 
                onClick={() => setIsPrivacyMode(!isPrivacyMode)}
                className={`px-3 py-1.5 border rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${isDarkMode ? 'bg-[#16181A] hover:bg-white/10 border-[#2A2D32] text-[#9EA0A5]' : 'bg-[#F4F5F7] hover:bg-[#D0D4DC] border-[#D0D4DC] text-slate-700'}`}
              >
                {isPrivacyMode ? <EyeOff size={13} className="text-[#D49A65]" /> : <Eye size={13} className="text-[#D49A65]" />}
                <span>{isPrivacyMode ? 'Đã ẩn số dư' : 'Ẩn số dư trên biểu đồ'}</span>
              </button>
            </div>
          </div>

          <div className={`md:col-span-2 border rounded-3xl p-6 flex flex-col justify-center gap-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32] hover:border-[#D49A65]/30' : 'bg-white border-[#D0D4DC] hover:border-[#16181A]/30'}`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#D49A65]/10 border border-[#D49A65]/20 flex items-center justify-center shrink-0 text-[#D49A65]">
                <Bot size={26} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#D49A65] uppercase tracking-wider">Trụ cột 1: Dự báo cạn kiệt & Trợ lý AI</p>
                <p className={`text-sm mt-1.5 font-medium leading-relaxed ${totalExpense >= monthlyBudget ? 'text-red-400 font-bold' : (isDarkMode ? 'text-slate-200' : 'text-slate-700')}`}>
                  {getAiAdvice()}
                </p>
              </div>
            </div>
            <div className={`grid grid-cols-2 gap-3 pt-5 border-t ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
               <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
                  <p className="text-[11px] font-bold text-[#9EA0A5] mb-1">Tốc độ chi tiêu hiện tại</p>
                  <p className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{burnRate.toLocaleString('vi-VN')} đ/ngày</p>
               </div>
               <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
                  <p className="text-[11px] font-bold text-[#9EA0A5] mb-1">Ngưỡng an toàn (còn lại)</p>
                  <p className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{dailyLimit.toLocaleString('vi-VN')} đ/ngày</p>
               </div>
            </div>
          </div>
        </div>

        {/* 4: PHÂN TÍCH CHUYÊN SÂU (DEEP ANALYSIS) */}
        <div className={`rounded-3xl p-6 shadow-sm border-2 border-[#D49A65]/20 transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-[#191A1C]' : 'bg-white'}`}>
          <div className={`flex items-center justify-between mb-4 pb-3 border-b ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#D49A65]/10 flex items-center justify-center text-[#D49A65]">
                <ShieldAlert size={18} />
              </div>
              <h2 className={`font-extrabold text-xs uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>Trụ cột 2: Ma trận phân bổ ngân sách chuẩn 50/30/20</h2>
            </div>
            <span className="text-[11px] text-[#9EA0A5] italic hidden sm:block">50% Nhu cầu • 30% Mong muốn • 20% Tiết kiệm</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-[#D49A65]">Thiết yếu (50%)</span>
                <span>{formatMoney(targetEssential)}</span>
              </div>
              <p className="text-xs font-extrabold text-[#9EA0A5] mb-2">Đã dùng: {formatMoney(essentialSpend)}</p>
              <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
                <div className={`h-full rounded-full ${essentialSpend > targetEssential ? 'bg-red-500' : 'bg-[#D49A65]'}`} style={{ width: `${Math.min(Math.round((essentialSpend / targetEssential) * 100), 100)}%` }}></div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-[#E2A368]">Mong muốn (30%)</span>
                <span>{formatMoney(targetLifestyle)}</span>
              </div>
              <p className="text-xs font-extrabold text-[#9EA0A5] mb-2">Đã dùng: {formatMoney(lifestyleSpend)}</p>
              <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
                <div className={`h-full rounded-full ${lifestyleSpend > targetLifestyle ? 'bg-red-500' : 'bg-[#E2A368]'}`} style={{ width: `${Math.min(Math.round((lifestyleSpend / targetLifestyle) * 100), 100)}%` }}></div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-[#D49A65]">Tiết kiệm / Đầu tư (20%)</span>
                <span>{formatMoney(targetSavings)}</span>
              </div>
              <p className="text-xs font-extrabold text-[#9EA0A5] mb-2">Quỹ dự phòng an toàn</p>
              <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
                <div className="h-full rounded-full bg-[#D49A65]" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-3xl p-6 shadow-sm border transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
          <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3 pb-3 border-b ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#D49A65]/10 flex items-center justify-center text-[#D49A65]">
                <PieChart size={18} />
              </div>
              <h2 className={`font-extrabold text-xs uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>Phân tích chi tiêu theo danh mục</h2>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button onClick={exportPdfReport} className={`px-3.5 py-2 border rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${isDarkMode ? 'bg-[#2A2D32] hover:bg-[#33373D] border-[#2A2D32] text-[#9EA0A5]' : 'bg-[#F4F5F7] hover:bg-[#D0D4DC] border-[#D0D4DC] text-slate-700'}`}>
                <Printer size={13} /> Xuất PDF
              </button>
              <button onClick={exportCsvReport} className={`px-3.5 py-2 border rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${isDarkMode ? 'bg-[#2A2D32] hover:bg-[#33373D] border-[#2A2D32] text-[#9EA0A5]' : 'bg-[#F4F5F7] hover:bg-[#D0D4DC] border-[#D0D4DC] text-slate-700'}`}>
                <Download size={13} /> Xuất CSV
              </button>
              <button onClick={clearAllTransactions} className="px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer">
                <Trash2 size={13} /> Xóa
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {categoriesList.map((cat) => {
              const amount = getCategoryTotal(cat);
              const percent = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;
              return (
                <div key={cat} className={`p-3.5 rounded-2xl border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-sm ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32]' : 'bg-[#F4F5F7] border-[#D0D4DC]'}`}>
                  <p className="text-[11px] font-bold text-[#9EA0A5]">{cat}</p>
                  <p className={`text-sm font-extrabold mt-1 ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{formatMoney(amount)}</p>
                  <div className={`w-full h-1.5 rounded-full mt-2.5 overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`}>
                    <div className="bg-[#D49A65] h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5: TIỆN ÍCH MỞ RỘNG (UTILITIES - SPLIT BILL & DEBT) */}
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
                 <button type="submit" className="px-3 bg-[#D49A65] hover:bg-[#E2A368] text-[#16181A] rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer">+</button>
              </div>
            </form>

            {debts.length > 0 && (
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
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

        {/*  6: LỊCH SỬ GIAO DỊCH (LOGS) */}
        <div className={`rounded-3xl p-6 shadow-sm border transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
          <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b gap-3 ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-500/10 flex items-center justify-center text-[#9EA0A5] shrink-0">
                <History size={18} />
              </div>
              <h2 className={`font-extrabold text-sm uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>Lịch sử giao dịch thông minh</h2>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9EA0A5]" />
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="Tìm kiếm giao dịch..." 
                  className={`text-xs pl-8 pr-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-[#D49A65] font-medium w-full sm:w-48 border ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] text-white placeholder-slate-500' : 'bg-[#F4F5F7] border-[#D0D4DC] text-[#16181A] placeholder-slate-400'}`}
                />
              </div>
              <span className={`text-xs px-3 py-2 rounded-xl font-bold border ${isDarkMode ? 'bg-[#16181A] text-[#9EA0A5] border-[#2A2D32]' : 'bg-[#F4F5F7] text-slate-700 border-[#D0D4DC]'}`}>
                {filteredTransactions.length} mục
              </span>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-[#9EA0A5] text-xs gap-2">
              <Wallet size={32} className="text-[#9EA0A5]" />
              <p>Không tìm thấy giao dịch nào phù hợp.</p>
            </div>
          ) : (
            <div className="space-y-3 mt-4">
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md group ${isDarkMode ? 'bg-[#16181A] border-[#2A2D32] hover:border-[#D49A65]/40' : 'bg-[#F4F5F7] border-[#D0D4DC] hover:border-[#16181A]/40'}`}>
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shadow-sm ${isDarkMode ? 'bg-[#191A1C] border-[#2A2D32]' : 'bg-white border-[#D0D4DC]'}`}>
                      {tx.icon}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>{tx.note}</p>
                      <div className="flex items-center gap-2.5 mt-1">
                        <span className={`text-[11px] border px-2.5 py-0.5 rounded-md font-bold ${tx.badgeBg}`}>{tx.category}</span>
                        <span className="text-[11px] text-[#9EA0A5] font-medium flex items-center gap-1">
                          <Calendar size={11} /> {tx.dateStr || 'Hôm nay'} - {tx.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-extrabold text-sm tracking-tight ${isDarkMode ? 'text-white' : 'text-[#16181A]'}`}>-{formatMoney(tx.amount)}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          setEditingTx(tx);
                          setEditNote(tx.note);
                          setEditAmount(tx.amount.toString());
                        }}
                        className={`p-2 rounded-xl transition-colors cursor-pointer ${isDarkMode ? 'text-[#9EA0A5] hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-[#16181A] hover:bg-[#D0D4DC]'}`}
                        title="Sửa giao dịch"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="text-[#9EA0A5] hover:text-red-400 p-2 rounded-xl hover:bg-red-500/20 transition-colors cursor-pointer"
                        title="Xóa giao dịch"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <footer className={`max-w-6xl mx-auto px-6 mt-16 pt-6 border-t text-center text-xs text-[#9EA0A5] font-medium flex justify-center items-center ${isDarkMode ? 'border-[#2A2D32]' : 'border-[#D0D4DC]'}`}>
        <p>© 2026 ZESTFIN Finance.</p>
      </footer>

    </div>
  );
}