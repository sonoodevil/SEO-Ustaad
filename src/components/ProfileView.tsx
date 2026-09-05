import React, { useState } from "react";
import {
  User,
  Award,
  CheckCircle2,
  Clock,
  Flame,
  Target,
  Settings,
  Sparkles,
  BookOpen,
  Bookmark,
  Share2,
  ExternalLink,
  Edit2,
  Save,
  X,
  Volume2,
  Languages,
  RotateCcw,
  Check,
  Calendar,
  Layers,
  BarChart3,
  TrendingUp,
  FileCheck,
  Zap,
} from "lucide-react";
import {
  UserProfile,
  UserAchievement,
  SkillProficiency,
  UserTaskProgress,
  WeekId,
  QuizState,
  LanguageMode,
  VoiceOption,
  ActiveTab,
} from "../types";
import { CURRICULUM } from "../data/curriculum";
import { INITIAL_SKILLS } from "../data/userProfile";

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  completedWeeks: Record<WeekId, boolean>;
  onToggleCompleteWeek: (weekId: WeekId) => void;
  quizStates: Record<WeekId, QuizState>;
  taskProgress: Record<WeekId, UserTaskProgress>;
  onUpdateTaskProgress: (weekId: WeekId, updates: Partial<UserTaskProgress>) => void;
  achievements: UserAchievement[];
  knowledgeCount: number;
  langMode: LanguageMode;
  onLangModeChange: (mode: LanguageMode) => void;
  selectedVoice: VoiceOption;
  onVoiceChange: (voice: VoiceOption) => void;
  playbackRate: number;
  onRateChange: (rate: number) => void;
  onResetAllData: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

const AVATAR_PRESETS = ["👨‍💻", "👩‍💻", "🚀", "🎓", "👑", "💼", "⚡", "🌟", "🦁", "🎯", "💡", "🌐"];

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  completedWeeks,
  onToggleCompleteWeek,
  quizStates,
  taskProgress,
  onUpdateTaskProgress,
  achievements,
  knowledgeCount,
  langMode,
  onLangModeChange,
  selectedVoice,
  onVoiceChange,
  playbackRate,
  onRateChange,
  onResetAllData,
  onNavigateTab,
}) => {
  const [profileTab, setProfileTab] = useState<"overview" | "tasks" | "achievements" | "preferences">("overview");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Profile Edit State
  const [editName, setEditName] = useState(userProfile.name);
  const [editTitle, setEditTitle] = useState(userProfile.title);
  const [editBio, setEditBio] = useState(userProfile.bio);
  const [editAvatar, setEditAvatar] = useState(userProfile.avatar);
  const [editTargetGoal, setEditTargetGoal] = useState(userProfile.targetGoal);
  const [editTargetDate, setEditTargetDate] = useState(userProfile.targetDate);
  const [editDailyMinutes, setEditDailyMinutes] = useState(userProfile.dailyStudyMinutes);
  const [editReminderTime, setEditReminderTime] = useState(userProfile.studyReminderTime);

  // Active Task editing state
  const [editingTaskWeek, setEditingTaskWeek] = useState<WeekId | null>(null);
  const [taskNotesInput, setTaskNotesInput] = useState("");
  const [taskUrlInput, setTaskUrlInput] = useState("");

  // Calculations
  const completedWeeksCount = Object.values(completedWeeks).filter(Boolean).length;
  const curriculumPercentage = Math.round((completedWeeksCount / CURRICULUM.length) * 100);

  const completedTasksCount = Object.values(taskProgress).filter((t) => t.completed).length;
  const taskPercentage = Math.round((completedTasksCount / CURRICULUM.length) * 100);

  const quizScores = (Object.values(quizStates) as QuizState[]).map((q) => q.score);
  const avgQuizScore =
    quizScores.length > 0 ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 85;

  const unlockedAchievementsCount = achievements.filter((a) => a.unlocked).length;

  // Calculate dynamic skill proficiencies based on completed weeks
  const dynamicSkills: SkillProficiency[] = INITIAL_SKILLS.map((skill) => {
    const totalAssociated = skill.associatedWeeks.length;
    const finishedAssociated = skill.associatedWeeks.filter((wId) => completedWeeks[wId]).length;
    const baseProgress = totalAssociated > 0 ? Math.round((finishedAssociated / totalAssociated) * 50) : 0;
    // Add quiz bonus
    const quizBonus = skill.associatedWeeks.some((wId) => quizStates[wId]?.passed) ? 40 : 15;
    const totalLevel = Math.min(100, Math.max(30, baseProgress + quizBonus));

    let badge = "Beginner";
    if (totalLevel >= 85) badge = "Master";
    else if (totalLevel >= 70) badge = "Advanced";
    else if (totalLevel >= 50) badge = "Proficient";

    return {
      ...skill,
      level: totalLevel,
      badge,
    };
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editName.trim(),
      title: editTitle.trim(),
      bio: editBio.trim(),
      avatar: editAvatar,
      targetGoal: editTargetGoal.trim(),
      targetDate: editTargetDate,
      dailyStudyMinutes: Number(editDailyMinutes),
      studyReminderTime: editReminderTime,
    });
    setIsEditProfileOpen(false);
  };

  const handleOpenEditTask = (weekId: WeekId) => {
    setEditingTaskWeek(weekId);
    setTaskNotesInput(taskProgress[weekId]?.notes || "");
    setTaskUrlInput(taskProgress[weekId]?.deliverableUrl || "");
  };

  const handleSaveTaskDeliverable = (weekId: WeekId) => {
    onUpdateTaskProgress(weekId, {
      notes: taskNotesInput.trim(),
      deliverableUrl: taskUrlInput.trim(),
    });
    setEditingTaskWeek(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Banner */}
      <div className="bg-[#0F0F0F] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/30 to-blue-500/10 border-2 border-blue-500/30 flex items-center justify-center text-4xl shadow-inner">
                {userProfile.avatar}
              </div>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-md border border-blue-400/30 transition"
                title="Change Avatar"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {userProfile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                  SEO Specialist Candidate
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium flex items-center gap-1">
                  <Flame className="w-3 h-3" /> 7-Day Streak
                </span>
              </div>

              <p className="text-xs text-blue-400 font-medium">{userProfile.title}</p>
              <p className="text-xs text-[#E0E0E0] max-w-2xl leading-relaxed pt-0.5">
                {userProfile.bio}
              </p>

              {/* Goal Tracker */}
              <div className="pt-2 flex items-center gap-2 text-xs text-white/70">
                <Target className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-semibold text-white">Target Goal:</span>
                <span className="text-white/80">{userProfile.targetGoal}</span>
                <span className="text-[11px] text-white/40">
                  (Target: {userProfile.targetDate})
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl text-xs font-semibold transition"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile & Goals</span>
            </button>
          </div>
        </div>

        {/* Global Progress Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 pt-6 border-t border-white/10 text-xs">
          <div className="bg-[#0A0A0A] p-3.5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-white/40 text-[11px] mb-1">
              <span>Curriculum</span>
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <p className="text-white font-bold text-lg">{curriculumPercentage}%</p>
            <p className="text-white/40 text-[10px]">{completedWeeksCount} of {CURRICULUM.length} weeks</p>
          </div>

          <div className="bg-[#0A0A0A] p-3.5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-white/40 text-[11px] mb-1">
              <span>Tasks Done</span>
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-white font-bold text-lg">{completedTasksCount}/{CURRICULUM.length}</p>
            <p className="text-white/40 text-[10px]">{taskPercentage}% tasks audited</p>
          </div>

          <div className="bg-[#0A0A0A] p-3.5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-white/40 text-[11px] mb-1">
              <span>Quiz Average</span>
              <Award className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <p className="text-white font-bold text-lg">{avgQuizScore}%</p>
            <p className="text-white/40 text-[10px]">{quizScores.length} quizzes completed</p>
          </div>

          <div className="bg-[#0A0A0A] p-3.5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-white/40 text-[11px] mb-1">
              <span>Knowledge Vault</span>
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-white font-bold text-lg">{knowledgeCount}</p>
            <p className="text-white/40 text-[10px]">Saved notes & code</p>
          </div>

          <div className="bg-[#0A0A0A] p-3.5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-white/40 text-[11px] mb-1">
              <span>Daily Goal</span>
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <p className="text-white font-bold text-lg">{userProfile.dailyStudyMinutes}m</p>
            <p className="text-white/40 text-[10px]">At {userProfile.studyReminderTime} PKT</p>
          </div>

          <div className="bg-[#0A0A0A] p-3.5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-white/40 text-[11px] mb-1">
              <span>Achievements</span>
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <p className="text-white font-bold text-lg">{unlockedAchievementsCount}/{achievements.length}</p>
            <p className="text-white/40 text-[10px]">Badges unlocked</p>
          </div>
        </div>

        {/* Profile Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 mt-6 pt-2 overflow-x-auto">
          <button
            onClick={() => setProfileTab("overview")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              profileTab === "overview"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Learning Overview & Skills</span>
          </button>

          <button
            onClick={() => setProfileTab("tasks")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              profileTab === "tasks"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Practical Tasks & Deliverables ({completedTasksCount}/{CURRICULUM.length})</span>
          </button>

          <button
            onClick={() => setProfileTab("achievements")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              profileTab === "achievements"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Achievements & Badges ({unlockedAchievementsCount})</span>
          </button>

          <button
            onClick={() => setProfileTab("preferences")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
              profileTab === "preferences"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Preferences & Settings</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. OVERVIEW & ACQUIRED SKILLS TAB */}
      {/* ========================================================================= */}
      {profileTab === "overview" && (
        <div className="space-y-8">
          {/* Acquired Skills Grid */}
          <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <h3 className="font-semibold text-base text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span>Acquired SEO Competencies & Skill Matrix</span>
                </h3>
                <p className="text-xs text-white/50 font-urdu-body mt-0.5">
                  تکمیل شدہ اسباق اور کوئز نتائج کی بنیاد پر حاصل کردہ مہارتیں
                </p>
              </div>
              <span className="text-xs text-blue-400 font-semibold px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                8 Core Competencies Evaluated
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dynamicSkills.map((skill) => {
                const getBadgeColor = (badge: string) => {
                  if (badge === "Master") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
                  if (badge === "Advanced") return "bg-blue-500/10 text-blue-400 border-blue-500/20";
                  if (badge === "Proficient") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
                  return "bg-white/5 text-white/50 border-white/10";
                };

                return (
                  <div
                    key={skill.id}
                    className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10 space-y-3 hover:border-white/20 transition"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-semibold text-white">{skill.name}</h4>
                        <p className="text-[11px] font-urdu-body text-blue-400 mt-0.5">
                          {skill.nameUrdu}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getBadgeColor(
                          skill.badge
                        )}`}
                      >
                        {skill.badge}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-white/40">Proficiency</span>
                        <span className="text-white font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>

                    {/* Associated Curriculum Links */}
                    <div className="flex items-center gap-1.5 pt-1 text-[10px] text-white/40">
                      <span>Curriculum modules:</span>
                      {skill.associatedWeeks.map((wId) => {
                        const isDone = completedWeeks[wId];
                        return (
                          <span
                            key={wId}
                            className={`px-1.5 py-0.5 rounded font-mono uppercase ${
                              isDone
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold"
                                : "bg-white/5 text-white/40 border border-white/5"
                            }`}
                          >
                            {wId} {isDone ? "✓" : ""}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Curriculum Phases Breakdown */}
          <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="font-semibold text-base text-white">4-Phase Learning Journey Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Phase 1: Foundations", weeks: ["w1", "w2", "w3"], desc: "Crawling, Intent, On-Page" },
                { title: "Phase 2: Technical SEO", weeks: ["w4", "w5", "w6"], desc: "Architecture, Schema, Backlinks" },
                { title: "Phase 3: Authority & Local", weeks: ["w7", "w8", "w9"], desc: "E-E-A-T, Google Maps, GA4" },
                { title: "Phase 4: Monetization", weeks: ["w10", "w11", "w12"], desc: "Audits, Pitching, Retainers" },
              ].map((phase, pIdx) => {
                const doneInPhase = phase.weeks.filter((wId) => completedWeeks[wId]).length;
                const pctPhase = Math.round((doneInPhase / phase.weeks.length) * 100);

                return (
                  <div key={pIdx} className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">{phase.title}</span>
                      <span className="text-[11px] font-mono text-blue-400 font-bold">{pctPhase}%</span>
                    </div>
                    <p className="text-[11px] text-white/40">{phase.desc}</p>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${pctPhase}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-white/30 text-right">
                      {doneInPhase} of {phase.weeks.length} weeks done
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TASKS & PRACTICAL DELIVERABLES TRACKER TAB */}
      {/* ========================================================================= */}
      {profileTab === "tasks" && (
        <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <h3 className="font-semibold text-base text-white">
                Practical Weekly Tasks & Client Deliverables Portfolio
              </h3>
              <p className="text-xs text-white/50 font-urdu-body mt-0.5">
                ہر ہفتے کے عملی اسائنمنٹس کا ریکارڈ، کلائنٹ لنکس، اور پورٹ فولیو نوٹس
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                {completedTasksCount} / {CURRICULUM.length} Completed
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {CURRICULUM.map((week, idx) => {
              const tState: UserTaskProgress = taskProgress[week.id] || {
                weekId: week.id,
                completed: false,
              };
              const isEditing = editingTaskWeek === week.id;

              // Task text resolution
              const taskTextEn =
                typeof week.task === "object" && "en" in week.task
                  ? week.task.en
                  : typeof week.task === "object" && "title" in week.task
                  ? week.task.title.en
                  : "Complete practical assignment";

              const taskTextUr =
                typeof week.task === "object" && "ur" in week.task
                  ? week.task.ur
                  : typeof week.task === "object" && "title" in week.task
                  ? week.task.title.ur
                  : "عملی کام مکمل کریں";

              return (
                <div
                  key={week.id}
                  className={`p-4 rounded-xl border transition space-y-3 ${
                    tState.completed
                      ? "bg-blue-500/5 border-blue-500/30"
                      : "bg-[#0A0A0A] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() =>
                          onUpdateTaskProgress(week.id, {
                            completed: !tState.completed,
                            completedAt: !tState.completed ? new Date().toISOString() : undefined,
                          })
                        }
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition shrink-0 mt-0.5 ${
                          tState.completed
                            ? "bg-blue-600 text-white"
                            : "border border-white/20 hover:border-blue-400"
                        }`}
                      >
                        {tState.completed && <Check className="w-3.5 h-3.5" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-white/40 uppercase font-mono">
                            Week {week.month ? `0${idx + 1}`.slice(-2) : idx + 1}
                          </span>
                          <h4 className="text-xs font-semibold text-white">
                            {week.title.en}
                          </h4>
                        </div>

                        {langMode !== "ur" && (
                          <p className="text-xs text-[#E0E0E0] mt-1.5 leading-relaxed">
                            {taskTextEn}
                          </p>
                        )}

                        {langMode !== "en" && (
                          <p className="text-xs font-urdu-body text-blue-400/90 mt-1 leading-relaxed text-right">
                            {taskTextUr}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenEditTask(week.id)}
                        className="p-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition flex items-center gap-1"
                        title="Add Deliverable Note or Link"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Deliverable</span>
                      </button>
                    </div>
                  </div>

                  {/* Saved Deliverable notes / URLs display */}
                  {(tState.notes || tState.deliverableUrl) && !isEditing && (
                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs space-y-1">
                      {tState.notes && (
                        <p className="text-white/80 leading-relaxed">
                          <span className="font-semibold text-white/40">Portfolio Note: </span>
                          {tState.notes}
                        </p>
                      )}
                      {tState.deliverableUrl && (
                        <div className="flex items-center gap-2">
                          <span className="text-white/40 font-semibold">Live Deliverable: </span>
                          <a
                            href={tState.deliverableUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1 truncate"
                          >
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <span className="truncate">{tState.deliverableUrl}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Inline Deliverable Editor */}
                  {isEditing && (
                    <div className="p-3.5 rounded-xl bg-black/60 border border-blue-500/40 space-y-3">
                      <p className="text-xs font-semibold text-white">Record Practical Deliverable</p>
                      <input
                        type="url"
                        value={taskUrlInput}
                        onChange={(e) => setTaskUrlInput(e.target.value)}
                        placeholder="Live Google Sheets / Drive / Screaming Frog export URL"
                        className="w-full px-3 py-1.5 bg-[#0A0A0A] border border-white/10 rounded-lg text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500"
                      />
                      <textarea
                        rows={2}
                        value={taskNotesInput}
                        onChange={(e) => setTaskNotesInput(e.target.value)}
                        placeholder="Client findings, key issues identified, rank improvements..."
                        className="w-full px-3 py-1.5 bg-[#0A0A0A] border border-white/10 rounded-lg text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingTaskWeek(null)}
                          className="px-3 py-1 text-xs text-white/50 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveTaskDeliverable(week.id)}
                          className="px-3.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
                        >
                          Save Deliverable
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ACHIEVEMENTS & BADGES TAB */}
      {/* ========================================================================= */}
      {profileTab === "achievements" && (
        <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <h3 className="font-semibold text-base text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Achievements, Badges & Milestones Shelf</span>
              </h3>
              <p className="text-xs text-white/50 font-urdu-body mt-0.5">
                تعلیمی اور عملی سنگ میل، انعامی تمغے اور حاصل شدہ اسناد
              </p>
            </div>
            <span className="text-xs text-amber-400 font-semibold px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
              {unlockedAchievementsCount} / {achievements.length} Badges Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => {
              return (
                <div
                  key={ach.id}
                  className={`p-5 rounded-xl border flex flex-col justify-between transition ${
                    ach.unlocked
                      ? "bg-gradient-to-b from-[#141414] to-[#0A0A0A] border-amber-500/30 shadow-lg shadow-amber-500/5"
                      : "bg-[#0A0A0A] border-white/10 opacity-70"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-inner">
                        {ach.icon}
                      </div>
                      {ach.unlocked ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                          Locked
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white">{ach.title}</h4>
                      <p className="text-xs font-urdu-title text-blue-400 mt-0.5">
                        {ach.titleUrdu}
                      </p>
                      <p className="text-xs text-[#E0E0E0] mt-1.5 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress / Criteria */}
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-white/40">
                      <span>Requirement:</span>
                      <span className="font-mono text-white/60">{ach.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          ach.unlocked ? "bg-amber-400" : "bg-blue-500/60"
                        }`}
                        style={{ width: `${ach.progress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-white/40 leading-tight pt-1">
                      {ach.criteria}
                    </p>
                    {ach.unlockedAt && (
                      <p className="text-[10px] text-amber-400/80 font-mono">
                        Unlocked on: {ach.unlockedAt}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PREFERENCES & SETTINGS TAB */}
      {/* ========================================================================= */}
      {profileTab === "preferences" && (
        <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 space-y-6">
          <div className="pb-4 border-b border-white/10">
            <h3 className="font-semibold text-base text-white">Student Learning Preferences & Audio Engine</h3>
            <p className="text-xs text-white/50 font-urdu-body mt-0.5">
              ترجیحات: زبان، صوتی استاد، روزانہ پڑھائی کا وقت اور ڈیٹا مینجمنٹ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language Preference */}
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <Languages className="w-4 h-4 text-blue-400" />
                <span>Display Language Mode</span>
              </div>
              <p className="text-xs text-white/50">
                Choose how curriculum notes, terms, and templates are displayed.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "both", label: "Urdu + English" },
                  { id: "ur", label: "Urdu Only" },
                  { id: "en", label: "English Only" },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => onLangModeChange(l.id as LanguageMode)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition ${
                      langMode === l.id
                        ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                        : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Engine Selection */}
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <Volume2 className="w-4 h-4 text-blue-400" />
                <span>Preferred Gemini AI Audio Voice</span>
              </div>
              <p className="text-xs text-white/50">
                Natural studio narrator for bilingual curriculum audio playback.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(["Puck", "Zephyr", "Aoede", "Fenrir", "Kore", "Charon"] as VoiceOption[]).map((voice) => (
                  <button
                    key={voice}
                    onClick={() => onVoiceChange(voice)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition ${
                      selectedVoice === voice
                        ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                        : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {voice}
                  </button>
                ))}
              </div>
            </div>

            {/* Playback Rate */}
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Default Narration Speed</span>
              </div>
              <p className="text-xs text-white/50">
                Adjust playback speed for lectures and voice tutorials.
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[0.75, 1.0, 1.25, 1.5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => onRateChange(rate)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition ${
                      playbackRate === rate
                        ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                        : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Study Target */}
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Daily Study Goal</span>
              </div>
              <p className="text-xs text-white/50">
                Configured daily study duration: <span className="text-white font-bold">{userProfile.dailyStudyMinutes} minutes</span> at <span className="text-white font-bold">{userProfile.studyReminderTime} PKT</span>.
              </p>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold border border-white/10 transition"
              >
                Change Daily Goal & Reminder
              </button>
            </div>
 
            {/* Custom Gemini API Key for Voice/Tutor Quota */}
            <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Personal Gemini API Key (Optional)</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed font-urdu-body">
                آپ اپنی ذاتی API کی یہاں لکھ سکتے ہیں تاکہ **Unlimited Voice** اور **Tutor Chat** میسر ہو۔ یہ صرف آپ کے براؤزر میں محفوظ رہے گی۔
                <br />
                <span className="text-[10px] text-emerald-400/70 font-sans">Pro Tip: Personal keys avoid shared platform quota limits.</span>
              </p>
              <div className="relative">
                <input
                  type="password"
                  value={userProfile.customGeminiKey || ""}
                  onChange={(e) => onUpdateProfile({ customGeminiKey: e.target.value })}
                  placeholder="AI Studio se li gayi Key yahan paste karein..."
                  className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20 outline-none transition"
                />
                {userProfile.customGeminiKey && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
                  </div>
                )}
              </div>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
              >
                <ExternalLink className="w-2.5 h-2.5" />
                <span>Get your free key from Google AI Studio</span>
              </a>
            </div>
          </div>

          {/* Danger Zone: Reset Progress */}
          <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-semibold text-rose-400">Reset Learning Progress</h4>
              <p className="text-[11px] text-white/50 mt-0.5">
                Clear all completed weeks, quiz scores, and reset your student portfolio back to initial state.
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to reset all learning progress? This cannot be undone.")) {
                  onResetAllData();
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold transition shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Progress</span>
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0F0F0F] rounded-2xl border border-white/15 w-full max-w-lg p-6 shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">Edit Student Profile & Target</h2>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="p-1 text-white/40 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">
                  Select Student Avatar
                </label>
                <div className="flex items-center gap-2 overflow-x-auto p-2 bg-[#0A0A0A] border border-white/10 rounded-xl">
                  {AVATAR_PRESETS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setEditAvatar(emoji)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl shrink-0 transition ${
                        editAvatar === emoji
                          ? "bg-blue-600 border border-blue-400 shadow-md scale-110"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Student Name */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Professional Title */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Professional Title / Ambition
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Short Bio & Learning Mission
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              {/* Target Goal & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Target Milestone Goal
                  </label>
                  <input
                    type="text"
                    value={editTargetGoal}
                    onChange={(e) => setEditTargetGoal(e.target.value)}
                    placeholder="e.g., $1,000/mo on Upwork"
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Target Completion Date
                  </label>
                  <input
                    type="date"
                    value={editTargetDate}
                    onChange={(e) => setEditTargetDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Study Minutes & Reminder Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Daily Study Target (Minutes)
                  </label>
                  <input
                    type="number"
                    min={15}
                    max={240}
                    value={editDailyMinutes}
                    onChange={(e) => setEditDailyMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Study Reminder Time
                  </label>
                  <input
                    type="time"
                    value={editReminderTime}
                    onChange={(e) => setEditReminderTime(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-white/60 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
