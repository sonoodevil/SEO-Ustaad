import React from "react";
import {
  BookOpen,
  CalendarCheck,
  FileSpreadsheet,
  BookmarkCheck,
  Award,
  Search,
  Bot,
  Sun,
  Moon,
  Coffee,
  Languages,
  Bookmark,
  User,
} from "lucide-react";
import { ActiveTab, ReadingTheme, LanguageMode } from "../types";

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  completedWeeksCount: number;
  totalWeeks: number;
  theme: ReadingTheme;
  onThemeChange: (theme: ReadingTheme) => void;
  langMode: LanguageMode;
  onLangModeChange: (mode: LanguageMode) => void;
  onOpenSearch: () => void;
  onOpenTutor: () => void;
  studentName?: string;
  studentAvatar?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  completedWeeksCount,
  totalWeeks,
  theme,
  onThemeChange,
  langMode,
  onLangModeChange,
  onOpenSearch,
  onOpenTutor,
  studentName = "Waseem Ahmad",
  studentAvatar = "👨‍💻",
}) => {
  const percent = Math.round((completedWeeksCount / totalWeeks) * 100);

  const cycleTheme = () => {
    if (theme === "light") onThemeChange("sepia");
    else if (theme === "sepia") onThemeChange("dark");
    else onThemeChange("light");
  };

  const cycleLang = () => {
    if (langMode === "both") onLangModeChange("ur");
    else if (langMode === "ur") onLangModeChange("en");
    else onLangModeChange("both");
  };

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-30 bg-[#0F0F0F]/95 backdrop-blur-md border-b border-white/10 text-[#E0E0E0] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onTabChange("curriculum")}>
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              <span className="font-urdu-title text-lg -mt-1">استاد</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold tracking-tight text-white">
                  SEO <span className="text-blue-500">Ustaad</span>
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  v2.4 Pro
                </span>
              </div>
              <p className="text-[11px] text-white/40 -mt-0.5 font-urdu-title">
                گوگل ڈیجیٹل گیراج + ڈیجی اسکلز نصاب
              </p>
            </div>
          </div>

          {/* Engine Status Badge (from design) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">GEMINI ENGINE ACTIVE</span>
          </div>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              id="nav-tab-curriculum"
              onClick={() => onTabChange("curriculum")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "curriculum"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 border border-blue-400/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curriculum (نصاب)</span>
            </button>

            <button
              id="nav-tab-daily"
              onClick={() => onTabChange("daily")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "daily"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 border border-blue-400/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Daily Plan (84 Days)</span>
            </button>

            <button
              id="nav-tab-templates"
              onClick={() => onTabChange("templates")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "templates"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 border border-blue-400/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Templates & Audit</span>
            </button>

            <button
              id="nav-tab-knowledge"
              onClick={() => onTabChange("knowledge")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "knowledge"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 border border-blue-400/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Knowledge Base</span>
            </button>

            <button
              id="nav-tab-resources"
              onClick={() => onTabChange("resources")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "resources"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 border border-blue-400/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Resources</span>
            </button>

            <button
              id="nav-tab-certificate"
              onClick={() => onTabChange("certificate")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === "certificate"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 border border-blue-400/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certificate ({percent}%)</span>
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Global Search Button */}
            <button
              id="global-search-trigger"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition"
              title="Search curriculum & terms"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline text-[10px] bg-black/40 px-1.5 py-0.5 rounded border border-white/10 font-mono text-white/40">
                ⌘K
              </kbd>
            </button>

            {/* AI Tutor Button */}
            <button
              id="ai-tutor-trigger"
              onClick={onOpenTutor}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/30 rounded-lg shadow-md shadow-blue-500/20 transition"
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Ustaad</span>
            </button>

            {/* Language Switcher */}
            <button
              id="lang-mode-switch"
              onClick={cycleLang}
              className="p-2 text-xs font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 flex items-center gap-1 transition"
              title="Toggle Language: Both / Urdu / English"
            >
              <Languages className="w-4 h-4 text-blue-400" />
              <span className="uppercase text-[11px] font-bold">
                {langMode === "both" ? "Ur+En" : langMode}
              </span>
            </button>

            {/* Reading Theme Toggle */}
            <button
              id="reading-theme-switch"
              onClick={cycleTheme}
              className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition"
              title={`Theme: ${theme.toUpperCase()}`}
            >
              {theme === "light" && <Sun className="w-4 h-4 text-amber-400" />}
              {theme === "sepia" && <Coffee className="w-4 h-4 text-amber-600" />}
              {theme === "dark" && <Moon className="w-4 h-4 text-blue-400" />}
            </button>

            {/* User Profile & Skills Trigger */}
            <button
              id="nav-profile-trigger"
              onClick={() => onTabChange("profile")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition ${
                activeTab === "profile"
                  ? "bg-blue-600 text-white border-blue-400 shadow-sm shadow-blue-500/20"
                  : "bg-white/5 hover:bg-white/10 text-white border-white/10"
              }`}
              title="Student Profile & Progress Tracker"
            >
              <span className="text-sm">{studentAvatar}</span>
              <span className="hidden xl:inline text-xs font-semibold">
                {studentName.split(" ")[0]}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-around border-t border-white/10 py-2 overflow-x-auto gap-1">
          <button
            onClick={() => onTabChange("curriculum")}
            className={`px-2 py-1 text-xs rounded-md font-medium whitespace-nowrap ${
              activeTab === "curriculum"
                ? "bg-blue-600 text-white"
                : "text-white/60"
            }`}
          >
            نصاب
          </button>
          <button
            onClick={() => onTabChange("daily")}
            className={`px-2 py-1 text-xs rounded-md font-medium whitespace-nowrap ${
              activeTab === "daily"
                ? "bg-blue-600 text-white"
                : "text-white/60"
            }`}
          >
            پلان
          </button>
          <button
            onClick={() => onTabChange("knowledge")}
            className={`px-2 py-1 text-xs rounded-md font-medium whitespace-nowrap ${
              activeTab === "knowledge"
                ? "bg-blue-600 text-white"
                : "text-white/60"
            }`}
          >
            نالج بیس
          </button>
          <button
            onClick={() => onTabChange("templates")}
            className={`px-2 py-1 text-xs rounded-md font-medium whitespace-nowrap ${
              activeTab === "templates"
                ? "bg-blue-600 text-white"
                : "text-white/60"
            }`}
          >
            ٹیمپلیٹس
          </button>
          <button
            onClick={() => onTabChange("certificate")}
            className={`px-2 py-1 text-xs rounded-md font-medium whitespace-nowrap ${
              activeTab === "certificate"
                ? "bg-blue-600 text-white"
                : "text-white/60"
            }`}
          >
            سرٹیفکیٹ
          </button>
          <button
            onClick={() => onTabChange("profile")}
            className={`px-2 py-1 text-xs rounded-md font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === "profile"
                ? "bg-blue-600 text-white"
                : "text-white/60"
            }`}
          >
            <span>{studentAvatar}</span>
            <span>پروفائل</span>
          </button>
        </div>
      </div>
    </header>
  );
};
