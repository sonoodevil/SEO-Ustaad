import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  X,
  ArrowRight,
  PanelRight,
  Maximize2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Key,
  CheckSquare,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { CURRICULUM } from "../data/curriculum";
import { WeekId, WeekDetailTab } from "../types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (weekId: WeekId, tab: WeekDetailTab) => void;
  onOpenTutor?: (query?: string) => void;
}

interface SearchResult {
  id: string;
  weekId: WeekId;
  weekNum: number;
  tab: WeekDetailTab;
  titleEn: string;
  titleUr?: string;
  snippetEn: string;
  snippetUr?: string;
  fullContentEn?: string;
  fullContentUr?: string;
  type: "Lesson" | "Key Term" | "Practice Task" | "Quiz";
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  onOpenTutor,
}) => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "Lesson" | "Key Term" | "Practice Task">("all");
  const [expandedResultId, setExpandedResultId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Preference: Docked to right side (leaves lecture screen visible) vs centered modal
  const [viewMode, setViewMode] = useState<"docked" | "modal">(() => {
    try {
      return (localStorage.getItem("seo_ustaad_search_mode") as "docked" | "modal") || "docked";
    } catch {
      return "docked";
    }
  });

  const toggleViewMode = () => {
    const next = viewMode === "docked" ? "modal" : "docked";
    setViewMode(next);
    localStorage.setItem("seo_ustaad_search_mode", next);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const list: SearchResult[] = [];

    CURRICULUM.forEach((week, idx) => {
      const weekNum = idx + 1;

      // 1. Check Week title & summary
      if (
        week.title.en.toLowerCase().includes(q) ||
        week.title.ur.toLowerCase().includes(q) ||
        week.summary.en.toLowerCase().includes(q) ||
        week.summary.ur.toLowerCase().includes(q)
      ) {
        list.push({
          id: `week-${week.id}`,
          weekId: week.id,
          weekNum,
          tab: "lesson",
          titleEn: `Week ${weekNum}: ${week.title.en}`,
          titleUr: week.title.ur,
          snippetEn: week.summary.en,
          snippetUr: week.summary.ur,
          fullContentEn: week.summary.en,
          fullContentUr: week.summary.ur,
          type: "Lesson",
        });
      }

      // 2. Check sections
      week.sections.forEach((s, sIdx) => {
        const bodyEn = s.p?.en || s.b?.en || "";
        const bodyUr = s.p?.ur || s.b?.ur || "";

        if (
          s.h.en.toLowerCase().includes(q) ||
          s.h.ur.toLowerCase().includes(q) ||
          bodyEn.toLowerCase().includes(q) ||
          bodyUr.toLowerCase().includes(q)
        ) {
          list.push({
            id: `sec-${week.id}-${sIdx}`,
            weekId: week.id,
            weekNum,
            tab: "lesson",
            titleEn: `${s.h.en} (Week ${weekNum})`,
            titleUr: s.h.ur,
            snippetEn: bodyEn.slice(0, 110) + "...",
            snippetUr: bodyUr ? bodyUr.slice(0, 90) + "..." : undefined,
            fullContentEn: bodyEn,
            fullContentUr: bodyUr,
            type: "Lesson",
          });
        }
      });

      // 3. Check key terms
      const termsList = week.terms || [];
      termsList.forEach((kt, tIdx) => {
        const termEn = typeof kt.t === "string" ? kt.t : kt.t.en;
        const termUr = typeof kt.t === "string" ? kt.u || "" : kt.t.ur;

        if (
          termEn.toLowerCase().includes(q) ||
          termUr.toLowerCase().includes(q) ||
          kt.d.en.toLowerCase().includes(q) ||
          kt.d.ur.toLowerCase().includes(q)
        ) {
          list.push({
            id: `term-${week.id}-${tIdx}`,
            weekId: week.id,
            weekNum,
            tab: "terms",
            titleEn: `${termEn}`,
            titleUr: termUr,
            snippetEn: kt.d.en.slice(0, 110) + "...",
            snippetUr: kt.d.ur ? kt.d.ur.slice(0, 90) + "..." : undefined,
            fullContentEn: kt.d.en,
            fullContentUr: kt.d.ur,
            type: "Key Term",
          });
        }
      });

      // 4. Check practice task
      if ("en" in week.task && typeof week.task.en === "string") {
        if (
          week.task.en.toLowerCase().includes(q) ||
          week.task.ur.toLowerCase().includes(q)
        ) {
          list.push({
            id: `task-${week.id}`,
            weekId: week.id,
            weekNum,
            tab: "task",
            titleEn: `Week ${weekNum} Practical Audit Assignment`,
            titleUr: `ہفتہ ${weekNum} کی پریکٹیکل اسائنمنٹ`,
            snippetEn: week.task.en.slice(0, 110) + "...",
            snippetUr: week.task.ur.slice(0, 90) + "...",
            fullContentEn: week.task.en,
            fullContentUr: week.task.ur,
            type: "Practice Task",
          });
        }
      }
    });

    return list;
  }, [query]);

  const filteredResults = useMemo(() => {
    if (activeFilter === "all") return results.slice(0, 20);
    return results.filter((r) => r.type === activeFilter).slice(0, 20);
  }, [results, activeFilter]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  const isDocked = viewMode === "docked";

  return (
    <div
      id="search-modal-root"
      className={`fixed inset-0 z-50 transition-colors ${
        isDocked
          ? "bg-black/40 backdrop-blur-[2px] flex justify-end"
          : "bg-black/80 backdrop-blur-md flex items-start justify-center pt-14 p-4"
      }`}
      onClick={onClose}
    >
      <div
        id="search-panel-container"
        className={`bg-[#0F0F0F] text-[#E0E0E0] border border-white/10 shadow-2xl flex flex-col transition-all duration-200 ${
          isDocked
            ? "w-full max-w-lg h-full border-l border-y-0 border-r-0 animate-in slide-in-from-right duration-200"
            : "w-full max-w-2xl rounded-2xl max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="p-4 border-b border-white/10 bg-[#0A0A0A] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
              <Search className="w-4 h-4 text-blue-400" />
              <span>
                {isDocked ? "Side Companion Search • اسکرین کے ساتھ سرچ" : "Global Curriculum Search"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Toggle Docked vs Centered */}
              <button
                onClick={toggleViewMode}
                title={isDocked ? "Switch to Centered Modal" : "Dock to Side (Read Lecture Alongside)"}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition"
              >
                {isDocked ? (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Center</span>
                  </>
                ) : (
                  <>
                    <PanelRight className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden sm:inline">Dock Side</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Input Box */}
          <div className="flex items-center px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-blue-500 transition">
            <Search className="w-4 h-4 text-blue-400 shrink-0 mr-2.5" />
            <input
              id="docked-search-input"
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search concepts, terms, code, audits (e.g. LCP, canonical, schema, robots.txt)..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 outline-none font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 text-white/40 hover:text-white mr-1.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd className="text-[10px] bg-white/10 text-white/50 px-1.5 py-0.5 rounded font-mono border border-white/10">
              ESC
            </kbd>
          </div>

          {/* Type Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            {[
              { id: "all", label: "All Results", icon: BookOpen },
              { id: "Key Term", label: "Key Terms (اصطلاحات)", icon: Key },
              { id: "Lesson", label: "Lessons (اسباق)", icon: BookOpen },
              { id: "Practice Task", label: "Audits & Tasks (پریکٹس)", icon: CheckSquare },
            ].map((f) => {
              const Icon = f.icon;
              const isSelected = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 border transition ${
                    isSelected
                      ? "bg-blue-600/20 text-blue-300 border-blue-500/40"
                      : "bg-[#0F0F0F] text-white/60 border-white/10 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {query.trim().length >= 2 && filteredResults.length === 0 && (
            <div className="text-center py-12 px-4 space-y-3">
              <HelpCircle className="w-8 h-8 text-white/20 mx-auto" />
              <p className="text-sm text-white/50">
                No matching topics found for "<span className="text-white font-semibold">{query}</span>"
              </p>
              {onOpenTutor && (
                <button
                  onClick={() => {
                    onOpenTutor(`What is ${query} in SEO?`);
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-xl text-xs font-semibold transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI Ustaad about "{query}"</span>
                </button>
              )}
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="p-4 space-y-4 text-xs text-white/60">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <PanelRight className="w-3.5 h-3.5" />
                  <span>Side Companion Active:</span>
                </p>
                <p className="text-white/70 text-[11px] leading-relaxed">
                  You can search while reading your current lecture on the left without losing your reading position. Click any definition to preview it right here!
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-white/80">Quick Reference Keywords:</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Core Web Vitals",
                    "Robots.txt",
                    "JSON-LD Schema",
                    "Canonical Tag",
                    "Local SEO Map Pack",
                    "E-E-A-T",
                    "Search Intent",
                    "Screaming Frog",
                    "Disavow Tool",
                    "Fiverr SEO Gig",
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setQuery(chip)}
                      className="px-2.5 py-1 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 text-white/70 hover:text-blue-400 border border-white/10 rounded-lg text-xs transition"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {filteredResults.map((res) => {
            const isExpanded = expandedResultId === res.id;
            const fullContent = res.fullContentEn || res.snippetEn;

            return (
              <div
                key={res.id}
                className={`rounded-xl border transition-all ${
                  isExpanded
                    ? "bg-[#141414] border-blue-500/40 shadow-lg"
                    : "bg-[#0A0A0A] border-white/10 hover:border-white/20"
                }`}
              >
                {/* Result Item Header */}
                <div className="p-3 flex items-start justify-between gap-3">
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => setExpandedResultId(isExpanded ? null : res.id)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-white/10 text-white/70 border border-white/5 font-mono">
                        Week {res.weekNum}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        {res.type}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white hover:text-blue-400 transition">
                      {res.titleEn}
                    </h4>

                    {res.titleUr && (
                      <p className="text-xs font-urdu-title text-blue-400/90 mt-0.5">
                        {res.titleUr}
                      </p>
                    )}

                    {!isExpanded && (
                      <p className="text-xs text-white/50 truncate mt-1">
                        {res.snippetEn}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0 pt-1">
                    <button
                      onClick={() => setExpandedResultId(isExpanded ? null : res.id)}
                      title={isExpanded ? "Collapse" : "Preview definition right here"}
                      className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        onSelectResult(res.weekId, res.tab);
                        onClose();
                      }}
                      title="Jump to full lesson in curriculum"
                      className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded In-Place Peek Area */}
                {isExpanded && (
                  <div className="px-3 pb-3 pt-1 border-t border-white/10 space-y-3 animate-in fade-in duration-150">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs text-white/80 leading-relaxed font-sans">
                      <p>{fullContent}</p>

                      {res.fullContentUr && (
                        <div className="mt-2 pt-2 border-t border-white/5 text-blue-300 font-urdu-body text-[13px] leading-relaxed">
                          {res.fullContentUr}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(res.id, fullContent)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition"
                        >
                          {copiedId === res.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Definition</span>
                            </>
                          )}
                        </button>

                        {onOpenTutor && (
                          <button
                            onClick={() => {
                              onOpenTutor(`Can you explain '${res.titleEn}' in more detail with an example from Pakistan?`);
                              onClose();
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 transition"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Ask Ustaad</span>
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          onSelectResult(res.weekId, res.tab);
                          onClose();
                        }}
                        className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        <span>Open in Lesson</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
