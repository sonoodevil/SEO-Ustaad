import React, { useState, useEffect, useRef } from "react";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Hourglass,
  Volume2,
  VolumeX,
  Flame,
  Award,
  Calendar,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Plus,
  Minimize2,
  Maximize2,
  CheckCircle2,
} from "lucide-react";
import { auth, db, handleFirestoreError, OperationType } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { LanguageMode } from "../types";

interface DailyStayTimerProps {
  todaySeconds: number;
  setTodaySeconds: React.Dispatch<React.SetStateAction<number>>;
  isTimerRunning: boolean;
  setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  timerTargetMinutes: number;
  setTimerTargetMinutes: React.Dispatch<React.SetStateAction<number>>;
  todayKey: string;
  timerHistory: Record<string, number>;
  langMode?: LanguageMode;
  activeTaskName?: string;
  onSelectTask?: (taskName: string) => void;
}

export const DailyStayTimer: React.FC<DailyStayTimerProps> = ({
  todaySeconds,
  setTodaySeconds,
  isTimerRunning,
  setIsTimerRunning,
  timerTargetMinutes,
  setTimerTargetMinutes,
  todayKey,
  timerHistory,
  langMode = "both",
  activeTaskName = "90-Minute Daily Study Routine",
  onSelectTask,
}) => {
  // Mode: "countdown" (الٹی گنتی) vs "counter" (بڑھتا کاؤنٹر)
  const [timerMode, setTimerMode] = useState<"countdown" | "counter">(() => {
    return (localStorage.getItem("seo_ustaad_timer_mode") as any) || "countdown";
  });

  // Sound chime toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem("seo_ustaad_timer_sound") !== "false";
  });

  // Floating mini-dock visibility on page scroll
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMiniDockDismissed, setIsMiniDockDismissed] = useState(false);

  // Selected task category being timed
  const [currentTimingTask, setCurrentTimingTask] = useState<string>(
    activeTaskName || "Core Course Learning & Tasks"
  );

  // Milestone chime trigger tracker to prevent multiple plays in a row
  const hasChimedGoalRef = useRef(false);

  // Play audio chime
  const playMilestoneChime = (type: "tick" | "goal" = "goal") => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === "goal") {
        // Joyful dual-tone chime
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24); // G5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.7);
      } else {
        // Soft button click tone
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  // Check goal completion for celebration chime
  useEffect(() => {
    const targetSeconds = timerTargetMinutes * 60;
    if (todaySeconds >= targetSeconds && targetSeconds > 0 && !hasChimedGoalRef.current) {
      hasChimedGoalRef.current = true;
      playMilestoneChime("goal");
    } else if (todaySeconds < targetSeconds) {
      hasChimedGoalRef.current = false;
    }
  }, [todaySeconds, timerTargetMinutes]);

  // Handle scroll for floating dock
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 420) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync to Firestore & Cloud SQL on milestone intervals (e.g., every 60s of active timing)
  const syncToFirestore = async (seconds: number) => {
    if (!auth.currentUser) return;
    try {
      const sessionRef = doc(db, "users", auth.currentUser.uid, "sessions", todayKey);
      await setDoc(
        sessionRef,
        {
          userId: auth.currentUser.uid,
          dayKey: todayKey,
          durationSeconds: seconds,
          date: todayKey,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (e) {
      console.warn("Firestore stay timer session sync note:", e);
    }
  };

  // Trigger sync on pause or 60-second milestones
  useEffect(() => {
    if (todaySeconds > 0 && todaySeconds % 60 === 0) {
      syncToFirestore(todaySeconds);
    }
  }, [todaySeconds]);

  // Time calculations
  const targetSeconds = timerTargetMinutes * 60;
  const remainingSeconds = Math.max(0, targetSeconds - todaySeconds);
  const overtimeSeconds = Math.max(0, todaySeconds - targetSeconds);
  const isGoalReached = todaySeconds >= targetSeconds && targetSeconds > 0;
  const progressPercent = Math.min(100, Math.round((todaySeconds / targetSeconds) * 100));

  // Monospace time formatters
  const formatDigital = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return {
      hours: h.toString().padStart(2, "0"),
      minutes: m.toString().padStart(2, "0"),
      seconds: s.toString().padStart(2, "0"),
    };
  };

  const elapsedDigits = formatDigital(todaySeconds);
  const countdownDigits = formatDigital(remainingSeconds);
  const overtimeDigits = formatDigital(overtimeSeconds);

  // SVG Radial Progress Calculation (Radius 58)
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Presets
  const PRESET_TARGETS = [
    { mins: 25, label: "25m", desc: "Pomodoro Sprint" },
    { mins: 45, label: "45m", desc: "Power Block" },
    { mins: 60, label: "60m", desc: "1 Hour Focus" },
    { mins: 90, label: "90m", desc: "Master Plan (Recommended)" },
    { mins: 120, label: "120m", desc: "Weekend Immersion" },
  ];

  // Past 7 Days History
  const getPast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      const sec = timerHistory[key] || (key === todayKey ? todaySeconds : 0);
      const label = i === 0 ? "Today" : d.toLocaleDateString("en-US", { weekday: "short" });
      days.push({ key, label, minutes: Math.round(sec / 60) });
    }
    return days;
  };

  const past7Days = getPast7Days();
  const maxDayMins = Math.max(90, ...past7Days.map((d) => d.minutes));

  return (
    <>
      {/* ======================================================== */}
      {/* MAIN STAY TIMER HERO CARD                                */}
      {/* ======================================================== */}
      <div
        id="daily-stay-timer-card"
        className="bg-[#0F0F0F] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden space-y-6"
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
            isTimerRunning
              ? "bg-blue-600/15"
              : isGoalReached
              ? "bg-emerald-600/20"
              : "bg-white/5"
          }`}
        />

        {/* Top Header Bar: Title, Mode Switcher & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10 relative z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Timer className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <span>Daily Stay Timer & Real-Time Focus Clock</span>
                  {isTimerRunning && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>LIVE</span>
                    </span>
                  )}
                </h3>
                <p className="text-xs text-white/50 font-urdu-title mt-0.5">
                  روزانہ کا لائیو اسٹڈی ٹائمر — ریئل ٹائم کاؤنٹ ڈاؤن اور مطالعہ کا ریکارڈ ({todayKey})
                </p>
              </div>
            </div>
          </div>

          {/* Mode Switcher & Sound Toggle */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Mode Switcher Buttons */}
            <div className="bg-[#0A0A0A] p-1 rounded-xl border border-white/10 flex items-center">
              <button
                id="btn-timer-mode-countdown"
                onClick={() => {
                  setTimerMode("countdown");
                  localStorage.setItem("seo_ustaad_timer_mode", "countdown");
                  playMilestoneChime("tick");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  timerMode === "countdown"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                    : "text-white/60 hover:text-white"
                }`}
                title="Countdown Mode: Counts down remaining time to daily goal"
              >
                <Hourglass className="w-3.5 h-3.5" />
                <span>Countdown (الٹی گنتی)</span>
              </button>

              <button
                id="btn-timer-mode-counter"
                onClick={() => {
                  setTimerMode("counter");
                  localStorage.setItem("seo_ustaad_timer_mode", "counter");
                  playMilestoneChime("tick");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  timerMode === "counter"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                    : "text-white/60 hover:text-white"
                }`}
                title="Counter Mode: Counts up elapsed time logged today"
              >
                <Timer className="w-3.5 h-3.5" />
                <span>Counter (کاؤنٹر)</span>
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                localStorage.setItem("seo_ustaad_timer_sound", String(next));
                if (next) playMilestoneChime("tick");
              }}
              title={soundEnabled ? "Mute Milestone Chimes" : "Enable Milestone Chimes"}
              className={`p-2 rounded-xl border transition ${
                soundEnabled
                  ? "bg-white/5 border-white/10 text-blue-400 hover:text-blue-300"
                  : "bg-white/5 border-white/10 text-white/30 hover:text-white/60"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Middle Section: Circular Visual Clock Dial + Digits + Primary Action Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Main Visual Display (Col 7) */}
          <div className="lg:col-span-7 bg-[#0A0A0A] p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-6">
            {/* SVG Circular Progress Dial */}
            <div className="relative flex-shrink-0">
              <svg className="w-36 h-36 transform -rotate-90">
                {/* Track Background */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-white/10"
                  fill="transparent"
                />
                {/* Animated Progress Arc */}
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className={`transition-all duration-700 ease-out ${
                    isGoalReached
                      ? "text-emerald-400"
                      : isTimerRunning
                      ? "text-blue-500"
                      : "text-blue-600/70"
                  }`}
                  fill="transparent"
                />
              </svg>

              {/* Center Content in Dial */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-white font-mono">
                  {progressPercent}%
                </span>
                <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                  {isGoalReached ? "Complete" : "Goal Done"}
                </span>
              </div>
            </div>

            {/* Monospace Digits & Mode Description */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isTimerRunning ? "bg-emerald-400 animate-pulse" : "bg-white/30"
                  }`}
                />
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                  {timerMode === "countdown"
                    ? isGoalReached
                      ? "Goal Reached • Overtime Sprint"
                      : "Countdown to Daily Goal"
                    : "Total Active Study Time Today"}
                </span>
              </div>

              {/* Big Digital Readout */}
              <div className="flex items-baseline justify-center sm:justify-start gap-1 font-mono text-4xl sm:text-5xl font-black text-white tracking-tight">
                {timerMode === "countdown" ? (
                  isGoalReached ? (
                    <span className="text-emerald-400 flex items-baseline">
                      <span className="text-2xl sm:text-3xl mr-1">+</span>
                      <span>{overtimeDigits.hours}</span>
                      <span className="animate-pulse text-emerald-400/60">:</span>
                      <span>{overtimeDigits.minutes}</span>
                      <span className="animate-pulse text-emerald-400/60">:</span>
                      <span>{overtimeDigits.seconds}</span>
                    </span>
                  ) : (
                    <span>
                      <span>{countdownDigits.hours}</span>
                      <span className={`${isTimerRunning ? "animate-pulse text-blue-400" : "text-white/40"}`}>:</span>
                      <span>{countdownDigits.minutes}</span>
                      <span className={`${isTimerRunning ? "animate-pulse text-blue-400" : "text-white/40"}`}>:</span>
                      <span>{countdownDigits.seconds}</span>
                    </span>
                  )
                ) : (
                  <span>
                    <span>{elapsedDigits.hours}</span>
                    <span className={`${isTimerRunning ? "animate-pulse text-blue-400" : "text-white/40"}`}>:</span>
                    <span>{elapsedDigits.minutes}</span>
                    <span className={`${isTimerRunning ? "animate-pulse text-blue-400" : "text-white/40"}`}>:</span>
                    <span>{elapsedDigits.seconds}</span>
                  </span>
                )}
              </div>

              {/* Subtitle / Urdu status */}
              <div className="text-xs text-white/50 flex flex-wrap items-center justify-center sm:justify-start gap-2 font-urdu-title">
                {timerMode === "countdown" ? (
                  <span>
                    باقی وقت: {Math.floor(remainingSeconds / 60)} منٹ • ہدف: {timerTargetMinutes} منٹ
                  </span>
                ) : (
                  <span>
                    مکمل مطالعہ: {Math.floor(todaySeconds / 60)} منٹ • روزانہ ہدف: {timerTargetMinutes} منٹ
                  </span>
                )}
              </div>

              {/* Active Task Tag */}
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/70">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span className="truncate max-w-[200px] sm:max-w-[260px]">
                    Timing: {currentTimingTask}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons & Quick Presets (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Play/Pause Main Trigger Button */}
            <div className="flex items-center gap-3">
              <button
                id="btn-toggle-stay-timer"
                onClick={() => {
                  const next = !isTimerRunning;
                  setIsTimerRunning(next);
                  playMilestoneChime("tick");
                  if (!next) {
                    syncToFirestore(todaySeconds);
                  }
                }}
                className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition shadow-xl ${
                  isTimerRunning
                    ? "bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
                }`}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    <span>Pause Session (وقفہ لیں)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>Start Learning (شروع کریں)</span>
                  </>
                )}
              </button>

              {/* Quick Time Additions */}
              <button
                id="btn-timer-add-15m"
                onClick={() => {
                  setTodaySeconds((prev) => prev + 15 * 60);
                  playMilestoneChime("tick");
                }}
                title="Log +15 minutes of off-platform study"
                className="px-3.5 py-3.5 rounded-2xl bg-[#0A0A0A] hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-xs font-bold transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 text-blue-400" />
                <span>15m</span>
              </button>

              {/* Reset Button */}
              <button
                id="btn-timer-reset"
                onClick={() => {
                  if (confirm("Reset today's logged study timer to 0?")) {
                    setTodaySeconds(0);
                    setIsTimerRunning(false);
                    syncToFirestore(0);
                  }
                }}
                title="Reset today's timer"
                className="p-3.5 rounded-2xl bg-[#0A0A0A] hover:bg-rose-500/10 text-white/40 hover:text-rose-400 border border-white/10 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Target Preset Selectors */}
            <div className="bg-[#0A0A0A] p-3 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-semibold text-white/70">Set Daily Target Goal:</span>
                <span className="text-blue-400 font-mono font-bold">{timerTargetMinutes} Minutes</span>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {PRESET_TARGETS.map((preset) => (
                  <button
                    key={preset.mins}
                    onClick={() => {
                      setTimerTargetMinutes(preset.mins);
                      playMilestoneChime("tick");
                    }}
                    className={`py-1.5 px-1 rounded-xl text-xs font-bold transition text-center border ${
                      timerTargetMinutes === preset.mins
                        ? "bg-blue-600 text-white border-blue-400 shadow-sm shadow-blue-500/30"
                        : "bg-white/5 text-white/60 border-white/5 hover:border-white/20 hover:text-white"
                    }`}
                    title={preset.desc}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Achieved Banner */}
            {isGoalReached && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Daily Goal Smashed! آج کا ہدف مکمل ہوا</span>
                </div>
                <span className="font-mono text-emerald-300">+{Math.floor(overtimeSeconds / 60)}m Extra</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Past 7-Day Consistency Bars */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white/70 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              <span>Past 7 Days Stay Streak (پچھلے 7 دن کا مطالعہ)</span>
            </span>
            <span className="text-white/40 text-[11px]">
              Total 7 Days: {past7Days.reduce((acc, d) => acc + d.minutes, 0)} Mins
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {past7Days.map((day) => {
              const isToday = day.key === todayKey;
              const heightPercent = Math.min(100, Math.round((day.minutes / maxDayMins) * 100));
              return (
                <div
                  key={day.key}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-between text-center transition ${
                    isToday
                      ? "bg-blue-600/10 border-blue-500/30 text-white"
                      : "bg-[#0A0A0A] border-white/5 text-white/50"
                  }`}
                >
                  <span className="text-[10px] font-mono text-white/40 mb-1">
                    {day.label}
                  </span>

                  {/* Vertical mini bar */}
                  <div className="w-3 h-12 bg-white/5 rounded-full overflow-hidden flex flex-col justify-end my-1">
                    <div
                      className={`w-full rounded-full transition-all duration-500 ${
                        isToday
                          ? "bg-gradient-to-t from-blue-600 to-blue-400"
                          : day.minutes >= 60
                          ? "bg-emerald-500/70"
                          : day.minutes > 0
                          ? "bg-white/40"
                          : "bg-transparent"
                      }`}
                      style={{ height: `${Math.max(8, heightPercent)}%` }}
                    />
                  </div>

                  <span className="text-[11px] font-mono font-bold text-white">
                    {day.minutes}m
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FLOATING MINI STAY TIMER DOCK (STICKY ON SCROLL)          */}
      {/* ======================================================== */}
      {isScrolled && !isMiniDockDismissed && (
        <div
          id="floating-stay-timer-dock"
          className="fixed bottom-5 right-5 z-40 bg-[#0F0F0F]/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300"
        >
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isTimerRunning ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/40">
                {timerMode === "countdown" ? "Countdown" : "Stay Counter"}
              </span>
              <span className="font-mono font-extrabold text-sm text-white">
                {timerMode === "countdown"
                  ? `${countdownDigits.hours}:${countdownDigits.minutes}:${countdownDigits.seconds}`
                  : `${elapsedDigits.hours}:${elapsedDigits.minutes}:${elapsedDigits.seconds}`}
              </span>
            </div>
          </div>

          {/* Quick Play/Pause */}
          <button
            onClick={() => {
              setIsTimerRunning(!isTimerRunning);
              playMilestoneChime("tick");
            }}
            className={`p-2 rounded-xl text-white transition ${
              isTimerRunning ? "bg-amber-600 hover:bg-amber-500" : "bg-blue-600 hover:bg-blue-500"
            }`}
            title={isTimerRunning ? "Pause" : "Start"}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          {/* Jump to top timer */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            title="Expand Full Timer"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Dismiss mini-dock */}
          <button
            onClick={() => setIsMiniDockDismissed(true)}
            title="Hide Floating Dock"
            className="text-white/30 hover:text-white text-xs p-1"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};
