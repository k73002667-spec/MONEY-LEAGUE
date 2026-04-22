/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  Gamepad2, 
  Newspaper, 
  Settings, 
  ChevronRight, 
  Youtube, 
  Instagram, 
  Plus, 
  Trash2, 
  CheckCircle2,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { THEME, SITE_CONFIG, INITIAL_NEWS, INITIAL_LEAGUE_INFO, type NewsItem, type LeagueInfo } from "./constants";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [leagueInfo, setLeagueInfo] = useState<LeagueInfo>(INITIAL_LEAGUE_INFO);

  // Load from LocalStorage
  useEffect(() => {
    const savedNews = localStorage.getItem("money_league_news");
    const savedInfo = localStorage.getItem("money_league_info");
    
    if (savedNews) {
      setNews(JSON.parse(savedNews));
    } else {
      setNews(INITIAL_NEWS);
    }
    
    if (savedInfo) {
      setLeagueInfo(JSON.parse(savedInfo));
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (news.length > 0) {
      localStorage.setItem("money_league_news", JSON.stringify(news));
    }
    localStorage.setItem("money_league_info", JSON.stringify(leagueInfo));
  }, [news, leagueInfo]);

  const addNewsItem = (item: Omit<NewsItem, "id" | "date">) => {
    const newItem: NewsItem = {
      ...item,
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
    };
    setNews([newItem, ...news]);
  };

  const deleteNewsItem = (id: string) => {
    setNews(news.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab("home")}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Trophy className="text-primary size-6" />
            </div>
            <span className="font-bold text-xl tracking-tight uppercase">
              {SITE_CONFIG.name}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { id: "home", label: "HOME" },
              { id: "league", label: "APPLY" },
              { id: "match", label: "MATCH" },
              { id: "history", label: "HISTORY" },
              { id: "news", label: "NEWS" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTab === tab.id ? "text-white border-b-2 border-white pb-1" : "text-white/50 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab("admin")}
              className={`p-2 rounded-full transition-colors ${
                activeTab === "admin" ? "bg-white text-primary" : "text-white/50 hover:bg-white/10"
              }`}
            >
              <Settings className="size-5" />
            </button>
            <div className="h-6 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-3">
              <a href={SITE_CONFIG.youtubeUrl} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors">
                <Youtube className="size-5" />
              </a>
              <a href={SITE_CONFIG.instagramUrl} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors">
                <Instagram className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <Home key="home" setActiveTab={setActiveTab} recentNews={news.slice(0, 3)} />
          )}
          {activeTab === "league" && (
            <LeagueInformation key="league" info={leagueInfo} />
          )}
          {activeTab === "match" && (
            <MatchSection key="match" />
          )}
          {activeTab === "history" && (
            <HistorySection key="history" />
          )}
          {activeTab === "news" && (
            <NewsSection key="news" news={news} />
          )}
          {activeTab === "admin" && (
            <AdminPanel 
              key="admin" 
              news={news} 
              onAddNews={addNewsItem} 
              onDeleteNews={deleteNewsItem}
              leagueInfo={leagueInfo}
              setLeagueInfo={setLeagueInfo}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 opacity-50">
              <Trophy className="size-4" />
              <span className="font-bold uppercase tracking-tighter text-sm">MONEY LEAGUE</span>
            </div>
            <p className="text-xs text-white/40">© 2026 MONEY LEAGUE. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-8 text-xs font-medium text-white/40 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">문의하기</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --------------------------------------------------------------------------------
// PAGE: HOME
// --------------------------------------------------------------------------------
function Home({ setActiveTab, recentNews }: { key?: string; setActiveTab: (t: string) => void; recentNews: NewsItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/80 to-primary z-10" />
          <img 
            src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=2070&auto=format&fit=crop" 
            alt="FC Mobile Match" 
            className="w-full h-full object-cover scale-110 blur-[2px]"
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
              FC MOBILE 공식 리그 전용 플랫폼
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase"
          >
            Money <span className="text-white/20">League</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            FC MOBILE 최고의 실력자들이 모여 보상을 쟁취하는 공간. <br/>
            당신의 전술과 컨트롤로 무대를 정복하세요!
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <a 
              href={SITE_CONFIG.kakaoUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-10 py-5 bg-white text-primary font-bold uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              참가 신청하기 <ChevronRight className="size-4" />
            </a>
            <button 
              onClick={() => setActiveTab("news")}
              className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all"
            >
              최신 소식 보기
            </button>
          </motion.div>

          {/* Sponsors Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="pt-10 border-t border-white/5 w-full"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 block mb-8">Official Sponsors</span>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-40 hover:opacity-100 transition-opacity">
              {[
                { name: "NEXON", icon: Gamepad2 },
                { name: "영미터", icon: Trophy },
                { name: "이원상", icon: Settings },
                { name: "SODA", icon: CheckCircle2 },
                { name: "청춘갈비", icon: Trophy },
              ].map((sponsor, i) => (
                <div key={i} className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <sponsor.icon className="size-4 text-white" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-tighter whitespace-nowrap">{sponsor.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Decorative corner element */}
        <div className="absolute bottom-10 right-10 hidden xl:block opacity-20">
          <div className="flex flex-col gap-2 items-end">
            <span className="text-[120px] font-black leading-none opacity-50">01</span>
            <span className="text-sm font-mono tracking-widest uppercase">The Beginning</span>
          </div>
        </div>
      </section>

      {/* Highlights / Recent News */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4 tracking-tight uppercase">Recent Highlights</h2>
            <p className="text-white/50 leading-relaxed">
              머니 리그에서 일어나는 가장 뜨거운 소식들을 확인하세요. 공지사항 및 커뮤니티 업데이트가 이곳에 표시됩니다.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab("news")}
            className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 group"
          >
            전체 보기 <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentNews.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="glass p-8 h-full flex flex-col hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-white/10 rounded">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-white/30 font-mono italic">{item.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/40 line-clamp-3 mb-8 leading-relaxed">
                  {item.content}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">
                  READ MORE <ChevronRight className="size-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

// --------------------------------------------------------------------------------
// PAGE: MATCH
// --------------------------------------------------------------------------------
function MatchSection({ key }: { key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto py-24 px-6"
    >
      <div className="mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">Upcoming <br/><span className="text-white/20">Matches</span></h1>
        <div className="w-20 h-1.5 bg-white mx-auto mb-6" />
        <p className="text-lg text-white/50 max-w-2xl mx-auto font-light">
          예정된 경기 일정과 실시간 대진표를 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass p-8 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 truncate">MONEY LEAGUE S1</span>
              <span className="text-[10px] font-bold uppercase px-2 py-1 bg-white/10 rounded">LIVE</span>
            </div>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center">
                   <Trophy className="size-8 opacity-20" />
                </div>
                <span className="text-sm font-bold">CLAN A</span>
              </div>
              <div className="text-2xl font-black italic text-white/20">VS</div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center">
                   <Trophy className="size-8 opacity-20" />
                </div>
                <span className="text-sm font-bold">CLAN B</span>
              </div>
            </div>
            <button className="w-full py-3 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all">
              상세 정보 보기
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// --------------------------------------------------------------------------------
// PAGE: HISTORY
// --------------------------------------------------------------------------------
function HistorySection({ key }: { key?: string }) {
  const SEASONS = [
    {
      title: "4th MONEY LEAGUE",
      winner: "현질팸",
      members: "취미는레알단일, 취미는레알인뎅, 취미는쿵쿵따, Scholes, 흑토마"
    },
    {
      title: "3th MONEY LEAGUE",
      winner: "톰과제리",
      members: "우서장, 호수, 다닝뇨, 호검, 호우"
    },
    {
      title: "2th MONEY LEAGUE",
      winner: "Maestro",
      members: "Beelzunu, Beelzebul, 둥글게둥글게, 가을, Ahina"
    },
    {
      title: "1th MONEY LEAGUE",
      winner: "뚝배기원상대",
      members: "범자, 이원상, bosque, 그냥만들었다"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="max-w-5xl mx-auto py-24 px-6"
    >
      <div className="mb-20">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">League <br/><span className="text-white/20">History</span></h1>
        <div className="w-20 h-1.5 bg-white mb-6" />
        <p className="text-lg text-white/50 max-w-2xl font-light">
          지난 대회의 영광스런 우승자들과 기록들을 만나보세요.
        </p>
      </div>

      <div className="space-y-16">
        {SEASONS.map((season, i) => (
          <div key={i} className="relative pl-12 border-l border-white/10">
            <div className="absolute top-0 left-[-5px] w-2 h-2 bg-white rounded-full" />
            <h3 className="text-2xl font-black mb-6 italic text-white/20 uppercase tracking-widest">{season.title}</h3>
            <div className="glass p-10 flex flex-col md:flex-row items-center gap-10 hover:bg-white/[0.02] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <Trophy size={120} />
              </div>
              
              <div className="flex flex-col items-center md:items-start gap-4">
                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                   <Trophy className="size-10 text-yellow-500" />
                </div>
              </div>

              <div className="flex-grow text-center md:text-left">
                <div className="mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 block mb-1">Champion</span>
                  <h4 className="text-4xl md:text-5xl font-black text-white tracking-tight">{season.winner}</h4>
                </div>
                <div className="pt-4 border-t border-white/5">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 block mb-2">Team Members</span>
                   <p className="text-lg text-white font-medium leading-relaxed max-w-2xl">
                     {season.members}
                   </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// --------------------------------------------------------------------------------
// PAGE: LEAGUE INFORMATION
// --------------------------------------------------------------------------------
function LeagueInformation({ info }: { key?: string; info: LeagueInfo }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl mx-auto py-24 px-6"
    >
      <div className="mb-20">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">League <br/><span className="text-white/20">Info</span></h1>
        <div className="w-20 h-1.5 bg-white mb-6" />
        <p className="text-lg text-white/50 max-w-2xl font-light">
          머니 리그는 FC MOBILE 유저들을 위한 공정하고 박진감 넘치는 경쟁의 장입니다. 
          아래 규칙과 참가를 위한 상세 정보를 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-12">
          <section>
            <h3 className="flex items-center gap-3 text-xl font-bold mb-8 uppercase tracking-widest">
              <CheckCircle2 className="size-6 text-white" />
              대회 규칙
            </h3>
            <div className="space-y-4">
              {info.rules.map((rule, i) => (
                <div key={i} className="flex gap-4 p-4 glass hover:bg-white/5 transition-colors group">
                  <span className="font-mono text-xs opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                  <p className="text-sm text-white/70 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-12">
          <section className="glass p-10 relative overflow-hidden">
             {/* Decorative element */}
            <div className="absolute -top-10 -right-10 opacity-5 rotate-12">
              <Trophy size={200} strokeWidth={1} />
            </div>
            
            <h3 className="flex items-center gap-3 text-xl font-bold mb-8 uppercase tracking-widest">
              <Trophy className="size-6" />
              상금 규모
            </h3>
            <p className="text-2xl font-black text-white mb-4 leading-tight">
              {info.prizeMoney}
            </p>
          </section>

          <section className="border-l-4 border-white/20 pl-8 py-4">
            <h3 className="flex items-center gap-3 text-xl font-bold mb-8 uppercase tracking-widest">
              <Gamepad2 className="size-6" />
              참가 방법
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {info.joinMethod}
            </p>
            <div className="flex gap-3">
              <a 
                href={SITE_CONFIG.kakaoUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex-grow py-4 bg-white text-primary font-bold uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-transform text-center inline-block"
              >
                카카오톡 공식 오픈톡 입장하기
              </a>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

// --------------------------------------------------------------------------------
// PAGE: NEWS / COMMUNITY
// --------------------------------------------------------------------------------
function NewsSection({ news }: { key?: string; news: NewsItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto py-24 px-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div>
          <h1 className="text-5xl font-black mb-4 tracking-tighter uppercase">Board <span className="text-white/20">News</span></h1>
          <p className="text-white/50">공지사항 및 최신 소통 창구입니다.</p>
        </div>
        <div className="flex gap-2">
          {["전체", "공지", "뉴스", "가이드"].map(cat => (
            <button key={cat} className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-white/10 hover:bg-white hover:text-black transition-colors rounded-sm">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 md:p-10 glass hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div className="flex flex-col items-start sm:items-center gap-1 min-w-[100px]">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{item.date}</span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-white/10 rounded">{item.category}</span>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold group-hover:text-white mb-2 transition-colors">{item.title}</h3>
              <p className="text-sm text-white/40 line-clamp-1">{item.content}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="size-5" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// --------------------------------------------------------------------------------
// PAGE: ADMIN PANEL
// --------------------------------------------------------------------------------
function AdminPanel({ 
  news, 
  onAddNews, 
  onDeleteNews,
  leagueInfo,
  setLeagueInfo
}: { 
  key?: string;
  news: NewsItem[]; 
  onAddNews: (item: Omit<NewsItem, "id" | "date">) => void;
  onDeleteNews: (id: string) => void;
  leagueInfo: LeagueInfo;
  setLeagueInfo: (info: LeagueInfo) => void;
}) {
  const [activeSubTab, setActiveSubTab] = useState("posts");
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "뉴스" as const });
  
  // Rule edit local state
  const [editRules, setEditRules] = useState(leagueInfo.rules.join("\n"));
  const [editPrize, setEditPrize] = useState(leagueInfo.prizeMoney);
  const [editJoin, setEditJoin] = useState(leagueInfo.joinMethod);

  const handleSaveInfo = () => {
    setLeagueInfo({
      rules: editRules.split("\n").filter(r => r.trim() !== ""),
      prizeMoney: editPrize,
      joinMethod: editJoin,
    });
    alert("정보가 저장되었습니다!");
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    onAddNews(newPost);
    setNewPost({ title: "", content: "", category: "뉴스" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="max-w-7xl mx-auto py-24 px-6 flex flex-col md:flex-row gap-12"
    >
      {/* Admin Sidebar */}
      <div className="w-full md:w-64 space-y-2">
        <h2 className="text-2xl font-black mb-8 tracking-tight uppercase px-4 flex items-center gap-2">
          <Settings className="size-6" /> Admin
        </h2>
        {[
          { id: "posts", icon: Newspaper, label: "게시물 관리" },
          { id: "league", icon: Trophy, label: "리그 정보 관리" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-4 text-xs font-bold uppercase tracking-widest transition-all rounded-lg ${
              activeSubTab === tab.id ? "bg-white text-primary shadow-lg shadow-white/10" : "text-white/40 hover:bg-white/5"
            }`}
          >
            <tab.icon className="size-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Admin Content */}
      <div className="flex-grow">
        {activeSubTab === "posts" && (
          <div className="space-y-12">
            <section className="glass p-8">
              <h3 className="text-lg font-bold mb-6 uppercase tracking-widest flex items-center gap-2">
                <Plus className="size-5" /> 새 게시물 작성
              </h3>
              <form onSubmit={handleAddPost} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="제목을 입력하세요"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                  <select 
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value as any})}
                    className="bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-white transition-colors appearance-none"
                  >
                    <option value="공지" className="bg-primary">공지</option>
                    <option value="뉴스" className="bg-primary">뉴스</option>
                    <option value="가이드" className="bg-primary">가이드</option>
                  </select>
                </div>
                <textarea 
                  placeholder="내용을 입력하세요"
                  rows={4}
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-white transition-colors resize-none"
                />
                <button type="submit" className="px-8 py-3 bg-white text-primary font-bold uppercase text-[10px] tracking-[0.2em] hover:scale-105 transition-transform">
                  게시하기
                </button>
              </form>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-bold mb-6 uppercase tracking-widest">게시글 목록 ({news.length})</h3>
              <div className="divide-y divide-white/5 border border-white/5">
                {news.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-6 hover:bg-white/5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-white/10 rounded">{item.category}</span>
                        <h4 className="text-sm font-bold">{item.title}</h4>
                      </div>
                      <span className="text-[10px] text-white/30 font-mono">{item.date}</span>
                    </div>
                    <button 
                      onClick={() => onDeleteNews(item.id)}
                      className="p-2 text-white/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSubTab === "league" && (
          <div className="space-y-8 glass p-8">
            <h3 className="text-lg font-bold mb-6 uppercase tracking-widest">리그 설정 변경</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">상금 규모</label>
                <input 
                  type="text" 
                  value={editPrize}
                  onChange={(e) => setEditPrize(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">참가 방법 안내</label>
                <textarea 
                  value={editJoin}
                  onChange={(e) => setEditJoin(e.target.value)}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-white resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">대회 규칙 (한 줄씩 입력)</label>
                <textarea 
                  value={editRules}
                  onChange={(e) => setEditRules(e.target.value)}
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm font-mono focus:outline-none focus:border-white"
                  placeholder="규칙 1&#10;규칙 2&#10;..."
                />
              </div>

              <button 
                onClick={handleSaveInfo}
                className="w-full py-4 bg-white text-primary font-bold uppercase text-[10px] tracking-[0.2em] hover:scale-[1.01] transition-transform"
              >
                변경 사항 저장
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
