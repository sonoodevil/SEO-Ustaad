import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Volume2,
  BookOpen,
  HelpCircle,
  Briefcase,
  Video,
  ListCheck,
  Search,
  ExternalLink,
  RotateCcw,
  Check,
} from "lucide-react";
import { CURRICULUM } from "../data/curriculum";
import { WATCH } from "../data/watchLinks";
import { WeekId, WeekDetailTab, LanguageMode, QuizState } from "../types";

interface CurriculumViewProps {
  activeWeekId: WeekId;
  activeDetailTab: WeekDetailTab;
  onSelectWeek: (weekId: WeekId) => void;
  onSelectDetailTab: (tab: WeekDetailTab) => void;
  completedWeeks: Record<WeekId, boolean>;
  onToggleCompleteWeek: (weekId: WeekId) => void;
  quizStates: Record<WeekId, QuizState>;
  onSaveQuizScore: (weekId: WeekId, score: number) => void;
  onPlayLessonAudio: (text: string, title: string) => void;
  langMode: LanguageMode;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  activeWeekId,
  activeDetailTab,
  onSelectWeek,
  onSelectDetailTab,
  completedWeeks,
  onToggleCompleteWeek,
  quizStates,
  onSaveQuizScore,
  onPlayLessonAudio,
  langMode,
}) => {
  const [termSearch, setTermSearch] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const currentWeekIndex = CURRICULUM.findIndex((w) => w.id === activeWeekId);
  const currentWeek = currentWeekIndex >= 0 ? CURRICULUM[currentWeekIndex] : CURRICULUM[0];
  const weekNum = currentWeekIndex >= 0 ? currentWeekIndex + 1 : 1;

  const watchItems = WATCH[activeWeekId] || [];
  const currentQuizState = quizStates[activeWeekId];

  // Helper to compile lesson text for audio narration
  const handlePlayFullWeek = () => {
    let narrationText = `${currentWeek.title.ur}۔ `;
    narrationText += `مقاصد: ${currentWeek.objectives.ur.join("، ")}۔ `;
    currentWeek.sections.forEach((s) => {
      const body = s.p?.ur || s.b?.ur || "";
      narrationText += `${s.h.ur}۔ ${body}۔ `;
    });
    onPlayLessonAudio(narrationText, `Week ${weekNum}: ${currentWeek.title.en}`);
  };

  // Handle quiz option selection
  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  // Submit quiz and calculate score
  const handleSubmitQuiz = () => {
    let correctCount = 0;
    currentWeek.quiz.forEach((q, i) => {
      const correctAns = q.a !== undefined ? q.a : (q.ans !== undefined ? q.ans : 0);
      if (selectedAnswers[i] === correctAns) {
        correctCount += 1;
      }
    });
    const scorePercent = Math.round((correctCount / currentWeek.quiz.length) * 100);
    onSaveQuizScore(activeWeekId, scorePercent);
    setSubmittedQuiz(true);
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
  };

  // Filter key terms
  const termsList = currentWeek.terms || [];
  const filteredTerms = termsList.filter((t) => {
    const termEn = typeof t.t === "string" ? t.t : t.t.en;
    const termUr = typeof t.t === "string" ? (t.u || "") : t.t.ur;
    const q = termSearch.toLowerCase();
    return (
      termEn.toLowerCase().includes(q) ||
      termUr.toLowerCase().includes(q) ||
      t.d.en.toLowerCase().includes(q) ||
      t.d.ur.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: 12-Week Track */}
        <div className="lg:col-span-4 bg-[#0F0F0F] rounded-2xl p-4 border border-white/10 shadow-sm sticky top-24">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div>
              <h3 className="font-semibold text-base text-white tracking-tight">
                12-Week Syllabus
              </h3>
              <p className="text-xs text-white/40 font-urdu-body">بارہ ہفتوں کا نصاب</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
              {Object.values(completedWeeks).filter(Boolean).length} / 12 Done
            </span>
          </div>

          <div className="space-y-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {CURRICULUM.map((w, idx) => {
              const num = idx + 1;
              const isActive = w.id === activeWeekId;
              const isDone = completedWeeks[w.id];
              const qState = quizStates[w.id];

              return (
                <button
                  key={w.id}
                  onClick={() => {
                    onSelectWeek(w.id);
                    setSubmittedQuiz(false);
                    setSelectedAnswers({});
                  }}
                  className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between group ${
                    isActive
                      ? "bg-blue-600/10 border border-blue-500/30 text-white"
                      : "hover:bg-white/5 text-white/70 hover:text-white border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                          : isDone
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "bg-white/5 text-white/40 border border-white/5"
                      }`}
                    >
                      {num}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold truncate text-white">{w.title.en}</span>
                      </div>
                      <div className="text-[11px] text-white/40 font-urdu-title truncate">
                        {w.title.ur}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {qState?.passed && (
                      <span className="text-[10px] font-semibold text-blue-400">
                        {qState.score}%
                      </span>
                    )}
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-white/20" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Content: Active Week Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Week Banner Header */}
          <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    Week {weekNum} of 12
                  </span>
                  <span className="text-xs text-white/40">
                    Level: {currentWeek.level.toUpperCase()}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {currentWeek.title.en}
                </h1>
                <h2 className="text-lg text-blue-400 font-urdu-title mt-0.5">
                  {currentWeek.title.ur}
                </h2>
              </div>

              {/* Audio Listen & Complete actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  id="listen-full-week-btn"
                  onClick={handlePlayFullWeek}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 Listen (اردو آواز)</span>
                </button>

                <button
                  id="toggle-week-complete-btn"
                  onClick={() => onToggleCompleteWeek(currentWeek.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                    completedWeeks[currentWeek.id]
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      : "bg-white/5 text-white/70 border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      completedWeeks[currentWeek.id] ? "text-blue-400" : "text-white/30"
                    }`}
                  />
                  <span>
                    {completedWeeks[currentWeek.id] ? "Completed (مکمل)" : "Mark Complete"}
                  </span>
                </button>
              </div>
            </div>

            {/* Inner Sub-Navigation Tabs */}
            <div className="flex items-center gap-1 border-b border-white/10 mt-6 pt-2 overflow-x-auto">
              <button
                id="tab-btn-lesson"
                onClick={() => onSelectDetailTab("lesson")}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
                  activeDetailTab === "lesson"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-white/40 hover:text-white"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Lesson & Notes (سبق)</span>
              </button>

              <button
                id="tab-btn-terms"
                onClick={() => onSelectDetailTab("terms")}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
                  activeDetailTab === "terms"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-white/40 hover:text-white"
                }`}
              >
                <ListCheck className="w-4 h-4" />
                <span>Key Terms ({termsList.length})</span>
              </button>

              <button
                id="tab-btn-task"
                onClick={() => onSelectDetailTab("task")}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
                  activeDetailTab === "task"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-white/40 hover:text-white"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Practice Task (عملی کام)</span>
              </button>

              <button
                id="tab-btn-quiz"
                onClick={() => onSelectDetailTab("quiz")}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
                  activeDetailTab === "quiz"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-white/40 hover:text-white"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Quiz ({currentWeek.quiz.length})</span>
              </button>

              <button
                id="tab-btn-watch"
                onClick={() => onSelectDetailTab("watch")}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
                  activeDetailTab === "watch"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-white/40 hover:text-white"
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Watch & Official Docs</span>
              </button>
            </div>
          </div>

          {/* TAB CONTENT: 1. Lesson */}
          {activeDetailTab === "lesson" && (
            <div className="space-y-6">
              {/* Summary */}
              {currentWeek.summary && (
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-sm">
                  {langMode !== "ur" && (
                    <p className="text-[#E0E0E0] mb-1 leading-relaxed">
                      {currentWeek.summary.en}
                    </p>
                  )}
                  {langMode !== "en" && (
                    <p className="font-urdu-body text-white text-right leading-loose">
                      {currentWeek.summary.ur}
                    </p>
                  )}
                </div>
              )}

              {/* Learning Objectives */}
              <div className="bg-blue-500/5 rounded-2xl p-5 border border-blue-500/20">
                <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Learning Objectives • اس سبق کے بنیادی مقاصد</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentWeek.objectives.en.map((objEn, i) => (
                    <div
                      key={i}
                      className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 text-xs shadow-xs"
                    >
                      {langMode !== "ur" && (
                        <p className="font-medium text-white mb-1">
                          • {objEn}
                        </p>
                      )}
                      {langMode !== "en" && currentWeek.objectives.ur[i] && (
                        <p className="font-urdu-body text-white/60 text-right leading-relaxed">
                          • {currentWeek.objectives.ur[i]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lesson Sections */}
              <div className="space-y-6">
                {currentWeek.sections.map((sec, idx) => {
                  const bodyEn = sec.p?.en || sec.b?.en || "";
                  const bodyUr = sec.p?.ur || sec.b?.ur || "";

                  return (
                    <div
                      key={idx}
                      className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 shadow-sm"
                    >
                      {/* Section Header */}
                      <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-white/10">
                        <div>
                          {langMode !== "ur" && (
                            <h3 className="text-base font-semibold text-white">
                              {sec.h.en}
                            </h3>
                          )}
                          {langMode !== "en" && (
                            <h4 className="text-sm font-semibold text-blue-400 font-urdu-title mt-0.5">
                              {sec.h.ur}
                            </h4>
                          )}
                        </div>

                        <button
                          onClick={() =>
                            onPlayLessonAudio(
                              `${sec.h.ur}۔ ${bodyUr}`,
                              sec.h.en
                            )
                          }
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition shrink-0"
                          title="Listen to this section"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Section Body */}
                      <div className="space-y-4">
                        {langMode !== "ur" && (
                          <p className="text-sm text-[#E0E0E0] leading-relaxed">
                            {bodyEn}
                          </p>
                        )}

                        {langMode !== "en" && (
                          <p className="text-sm text-white leading-loose font-urdu-body text-right">
                            {bodyUr}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB CONTENT: 2. Key Terms */}
          {activeDetailTab === "terms" && (
            <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Bilingual SEO Terms & Dictionary
                  </h3>
                  <p className="text-xs text-white/40 font-urdu-body">
                    اہم تکنیکی اصطلاحات اور وضاحت
                  </p>
                </div>

                {/* Filter Input */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-white/30 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={termSearch}
                    onChange={(e) => setTermSearch(e.target.value)}
                    placeholder="Filter terms..."
                    className="w-full bg-white/5 text-xs text-white placeholder:text-white/30 pl-9 pr-3 py-2 rounded-xl outline-none border border-white/10 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTerms.map((t, idx) => {
                  const termEn = typeof t.t === "string" ? t.t : t.t.en;
                  const termUr = typeof t.t === "string" ? (t.u || "") : t.t.ur;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-white/10 bg-[#0A0A0A] hover:border-blue-500/40 transition group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm text-white group-hover:text-blue-400 transition">
                          {termEn}
                        </h4>
                        <span className="text-xs font-semibold text-blue-400 font-urdu-title">
                          {termUr}
                        </span>
                      </div>

                      {langMode !== "ur" && (
                        <p className="text-xs text-[#E0E0E0] mb-1.5 leading-relaxed">
                          {t.d.en}
                        </p>
                      )}

                      {langMode !== "en" && (
                        <p className="text-xs text-white/80 font-urdu-body text-right leading-relaxed">
                          {t.d.ur}
                        </p>
                      )}

                      <div className="mt-3 pt-2 border-t border-white/10 flex justify-end">
                        <button
                          onClick={() =>
                            onPlayLessonAudio(`${termEn} یعنی ${termUr}۔ ${t.d.ur}`, termEn)
                          }
                          className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 hover:underline"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Listen pronunciation</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB CONTENT: 3. Practice Task */}
          {activeDetailTab === "task" && (
            <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 shadow-sm space-y-6">
              <div>
                <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  Practical Task
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  Week {weekNum} Actionable Assignment
                </h3>
              </div>

              {/* Task Description */}
              <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-3">
                <div className="text-xs font-semibold text-blue-400">
                  🎯 Task Instructions • مشقی کام:
                </div>
                {"en" in currentWeek.task && typeof currentWeek.task.en === "string" ? (
                  <>
                    {langMode !== "ur" && (
                      <p className="text-sm text-[#E0E0E0] leading-relaxed">
                        {currentWeek.task.en}
                      </p>
                    )}
                    {langMode !== "en" && (
                      <p className="text-sm text-white font-urdu-body text-right leading-loose">
                        {currentWeek.task.ur}
                      </p>
                    )}
                  </>
                ) : null}
              </div>

              {/* Helpful Resources */}
              {currentWeek.links && currentWeek.links.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-white/70">
                    Helpful Task Links:
                  </h4>
                  <div className="space-y-1.5">
                    {currentWeek.links.map((lnk, lIdx) => (
                      <a
                        key={lIdx}
                        href={lnk.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="p-3 bg-[#0A0A0A] rounded-xl border border-white/10 text-xs font-medium text-blue-400 hover:text-blue-300 hover:border-blue-500/40 hover:underline flex items-center justify-between"
                      >
                        <span>{lnk.label}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-white/30" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: 4. Quiz */}
          {activeDetailTab === "quiz" && (
            <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Week {weekNum} Quiz ({currentWeek.quiz.length} Questions)
                  </h3>
                  <p className="text-xs text-white/40 font-urdu-body">
                    امتحانی سوالات — پاسنگ اسکور 60 فیصد
                  </p>
                </div>

                {currentQuizState && (
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        currentQuizState.passed
                          ? "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                          : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                      }`}
                    >
                      {currentQuizState.passed ? "Passed" : "Retake Needed"}: {currentQuizState.score}%
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {currentWeek.quiz.map((q, qIdx) => {
                  const correctAns = q.a !== undefined ? q.a : (q.ans !== undefined ? q.ans : 0);
                  const userAns = selectedAnswers[qIdx];
                  const isCorrect = userAns === correctAns;

                  return (
                    <div
                      key={qIdx}
                      className="p-5 rounded-xl border border-white/10 bg-[#0A0A0A] space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-md bg-white/10 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          Q{qIdx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">
                            {q.q.en}
                          </p>
                          <p className="text-xs font-urdu-body text-blue-400 text-right mt-1 leading-relaxed">
                            {q.q.ur}
                          </p>
                        </div>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 pt-2">
                        {q.opts.en.map((optEn, optIdx) => {
                          const optUr = q.opts.ur[optIdx] || "";
                          const isSelected = userAns === optIdx;
                          let btnStyle =
                            "border-white/10 bg-[#0F0F0F] text-white hover:border-blue-500/40";

                          if (submittedQuiz) {
                            if (optIdx === correctAns) {
                              btnStyle =
                                "border-blue-500 bg-blue-500/10 text-blue-300 font-semibold";
                            } else if (isSelected && !isCorrect) {
                              btnStyle =
                                "border-rose-500 bg-rose-500/10 text-rose-300";
                            }
                          } else if (isSelected) {
                            btnStyle =
                              "border-blue-500 bg-blue-500/10 text-blue-300 font-semibold";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                              disabled={submittedQuiz}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${btnStyle}`}
                            >
                              <div className="min-w-0 flex-1 pr-2">
                                <div className="font-medium">{optEn}</div>
                                {optUr && (
                                  <div className="font-urdu-body text-[11px] text-white/50 text-right mt-0.5">
                                    {optUr}
                                  </div>
                                )}
                              </div>
                              <div className="shrink-0 ml-2">
                                {submittedQuiz && optIdx === correctAns && (
                                  <Check className="w-4 h-4 text-blue-400" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation if submitted */}
                      {submittedQuiz && (
                        <div
                          className={`p-3 rounded-xl text-xs ${
                            isCorrect
                              ? "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                              : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                          }`}
                        >
                          <p className="font-bold mb-0.5">
                            {isCorrect ? "✓ درست جواب!" : "✗ غلط جواب — صحیح وضاحت:"}
                          </p>
                          <p className="text-white/80">{q.exp.en}</p>
                          <p className="font-urdu-body text-white/80 text-right mt-1 leading-relaxed">
                            {q.exp.ur}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                {!submittedQuiz ? (
                  <button
                    id="submit-quiz-btn"
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < currentWeek.quiz.length}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20"
                  >
                    Submit Quiz & Check Answers
                  </button>
                ) : (
                  <button
                    id="retake-quiz-btn"
                    onClick={handleRetakeQuiz}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl text-xs font-semibold transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Quiz</span>
                  </button>
                )}

                <span className="text-xs text-white/40">
                  Answered {Object.keys(selectedAnswers).length} of {currentWeek.quiz.length}
                </span>
              </div>
            </div>
          )}

          {/* TAB CONTENT: 5. Watch & Official Docs */}
          {activeDetailTab === "watch" && (
            <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Curated Video Explainers & Official Docs
                </h3>
                <p className="text-xs text-white/40 font-urdu-body">
                  آفیشل گوگل دستاویزات، یوٹیوب لیکچرز، اور ڈیجی اسکلز وسائل
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {watchItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.u}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-4 rounded-xl border border-white/10 bg-[#0A0A0A] hover:border-blue-500/40 transition flex items-center justify-between group"
                  >
                    <div className="min-w-0 flex-1 pr-4">
                      <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition">
                        {item.t.en}
                      </h4>
                      <p className="text-xs font-urdu-title text-white/40 mt-0.5">
                        {item.t.ur}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-blue-400 transition shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
