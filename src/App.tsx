import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { CurriculumView } from "./components/CurriculumView";
import { DailyPlanView } from "./components/DailyPlanView";
import { TemplatesView } from "./components/TemplatesView";
import { ResourcesView } from "./components/ResourcesView";
import { CertificateView } from "./components/CertificateView";
import { KnowledgeBaseView } from "./components/KnowledgeBaseView";
import { ProfileView } from "./components/ProfileView";
import { ListenBar } from "./components/ListenBar";
import { SearchModal } from "./components/SearchModal";
import { AITutorModal } from "./components/AITutorModal";
import { CURRICULUM } from "./data/curriculum";
import { INITIAL_KNOWLEDGE_ITEMS } from "./data/knowledgeBase";
import {
  DEFAULT_USER_PROFILE,
  INITIAL_ACHIEVEMENTS,
  INITIAL_TASK_PROGRESS,
} from "./data/userProfile";
import { User } from "firebase/auth";
import { initAuth, googleSignIn, logout, testFirestoreConnection } from "./lib/firebase";
import { WorkspaceHub } from "./components/WorkspaceHub";
import {
  ActiveTab,
  WeekId,
  WeekDetailTab,
  ReadingTheme,
  LanguageMode,
  QuizState,
  VoiceOption,
  KnowledgeItem,
  UserProfile,
  UserAchievement,
  UserTaskProgress,
} from "./types";

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<ActiveTab>("curriculum");
  const [activeWeekId, setActiveWeekId] = useState<WeekId>("w1");
  const [activeDetailTab, setActiveDetailTab] = useState<WeekDetailTab>("lesson");

  // Firebase Auth & Cloud SQL User State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    testFirestoreConnection();
    const unsubscribe = initAuth(
      async (user, token) => {
        setCurrentUser(user);
        if (token) setAccessToken(token);
        if (user) {
          try {
            const idToken = await user.getIdToken();
            await fetch("/api/auth/sync-user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
              },
              body: JSON.stringify({ displayName: user.displayName }),
            });
          } catch (e) {
            console.warn("Cloud SQL user sync:", e);
          }
        }
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setAccessToken(res.accessToken);
        const idToken = await res.user.getIdToken();
        await fetch("/api/auth/sync-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({ displayName: res.user.displayName }),
        });
      }
    } catch (e) {
      console.error("Sign in failed:", e);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setCurrentUser(null);
    setAccessToken(null);
  };

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorInitialPrompt, setTutorInitialPrompt] = useState<string>("");

  const handleOpenTutorWithPrompt = (prompt?: string) => {
    if (prompt) {
      setTutorInitialPrompt(prompt);
    }
    setIsTutorOpen(true);
  };

  // User Settings & Persistence
  const [theme, setTheme] = useState<ReadingTheme>(() => {
    return (localStorage.getItem("seo_ustaad_theme") as ReadingTheme) || "dark";
  });
  const [langMode, setLangMode] = useState<LanguageMode>(() => {
    return (localStorage.getItem("seo_ustaad_lang") as LanguageMode) || "both";
  });
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem("seo_ustaad_student_name") || "Waseem Ahmad";
  });

  // User Profile & Learning Tracker Persistence
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem("seo_ustaad_user_profile");
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  const [taskProgress, setTaskProgress] = useState<Record<WeekId, UserTaskProgress>>(() => {
    try {
      const saved = localStorage.getItem("seo_ustaad_task_progress");
      return saved ? JSON.parse(saved) : INITIAL_TASK_PROGRESS;
    } catch {
      return INITIAL_TASK_PROGRESS;
    }
  });

  const [achievements, setAchievements] = useState<UserAchievement[]>(() => {
    try {
      const saved = localStorage.getItem("seo_ustaad_achievements");
      return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  // Knowledge Base Items Persistence
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(() => {
    try {
      const saved = localStorage.getItem("seo_ustaad_knowledge_items");
      return saved ? JSON.parse(saved) : INITIAL_KNOWLEDGE_ITEMS;
    } catch {
      return INITIAL_KNOWLEDGE_ITEMS;
    }
  });

  // Curriculum Progress Persistence
  const [completedWeeks, setCompletedWeeks] = useState<Record<WeekId, boolean>>(() => {
    try {
      const saved = localStorage.getItem("seo_ustaad_completed_weeks");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [quizStates, setQuizStates] = useState<Record<WeekId, QuizState>>(() => {
    try {
      const saved = localStorage.getItem("seo_ustaad_quiz_states");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Audio Playback & TTS State
  const [currentNarrationText, setCurrentNarrationText] = useState<string | null>(null);
  const [currentNarrationTitle, setCurrentNarrationTitle] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>("Puck");
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioBlobUrlRef = useRef<string | null>(null);
  const audioCacheRef = useRef<Map<string, string>>(new Map());

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("seo_ustaad_theme", theme);
    const root = document.documentElement;
    root.classList.remove("dark", "sepia", "light");
    root.setAttribute("data-theme", theme);
    if (theme === "dark") root.classList.add("dark");
    if (theme === "sepia") root.classList.add("sepia");
    if (theme === "light") root.classList.add("light");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("seo_ustaad_lang", langMode);
  }, [langMode]);

  useEffect(() => {
    localStorage.setItem("seo_ustaad_student_name", studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem("seo_ustaad_completed_weeks", JSON.stringify(completedWeeks));
  }, [completedWeeks]);

  useEffect(() => {
    localStorage.setItem("seo_ustaad_quiz_states", JSON.stringify(quizStates));
  }, [quizStates]);

  useEffect(() => {
    localStorage.setItem("seo_ustaad_user_profile", JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem("seo_ustaad_task_progress", JSON.stringify(taskProgress));
  }, [taskProgress]);

  useEffect(() => {
    localStorage.setItem("seo_ustaad_achievements", JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem("seo_ustaad_knowledge_items", JSON.stringify(knowledgeItems));
  }, [knowledgeItems]);

  // Audio Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (audioBlobUrlRef.current) {
        URL.revokeObjectURL(audioBlobUrlRef.current);
      }
    };
  }, []);

  // Update audio playback rate when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Audio playback handler
  const handlePlayAudio = async (rawText: string, title: string) => {
    // If the same audio is paused, resume it
    if (currentNarrationText === rawText && audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    setCurrentNarrationText(rawText);
    setCurrentNarrationTitle(title);
    setIsLoadingAudio(true);
    setIsPlaying(false);
    setAudioCurrentTime(0);

    const cacheKey = `${selectedVoice}_${rawText.slice(0, 120)}_${rawText.length}`;

    try {
      let audioUrl = audioCacheRef.current.get(cacheKey);

      if (!audioUrl) {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: rawText,
            voiceName: selectedVoice,
            playbackRate,
          }),
        });

        if (!res.ok) {
          throw new Error("TTS generation failed");
        }

        const blob = await res.blob();
        audioUrl = URL.createObjectURL(blob);
        audioCacheRef.current.set(cacheKey, audioUrl);
      }

      if (audioBlobUrlRef.current && audioBlobUrlRef.current !== audioUrl) {
        // We don't revoke cached URLs immediately
      }
      audioBlobUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audio.playbackRate = playbackRate;
      audioRef.current = audio;

      audio.onloadedmetadata = () => {
        setAudioDuration(audio.duration || 0);
      };

      audio.ontimeupdate = () => {
        setAudioCurrentTime(audio.currentTime || 0);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setAudioCurrentTime(0);
      };

      audio.onerror = () => {
        setIsLoadingAudio(false);
        setIsPlaying(false);
      };

      await audio.play();
      setIsLoadingAudio(false);
      setIsPlaying(true);
    } catch (err) {
      console.error("Audio playback error:", err);
      setIsLoadingAudio(false);
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentNarrationText(null);
    setCurrentNarrationTitle(null);
    setAudioCurrentTime(0);
  };

  const handleSeekAudio = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setAudioCurrentTime(time);
    }
  };

  const handleVoiceChange = (voice: VoiceOption) => {
    setSelectedVoice(voice);
    // If audio is active, regenerate with new voice
    if (currentNarrationText && currentNarrationTitle) {
      handlePlayAudio(currentNarrationText, currentNarrationTitle);
    }
  };

  // Toggle week complete
  const handleToggleCompleteWeek = (weekId: WeekId) => {
    setCompletedWeeks((prev) => ({
      ...prev,
      [weekId]: !prev[weekId],
    }));
  };

  // Save quiz score
  const handleSaveQuizScore = (weekId: WeekId, score: number) => {
    setQuizStates((prev) => ({
      ...prev,
      [weekId]: {
        score,
        passed: score >= 60,
        attempts: (prev[weekId]?.attempts || 0) + 1,
      },
    }));
  };

  // Select search result
  const handleSelectSearchResult = (weekId: WeekId, tab: WeekDetailTab) => {
    setActiveTab("curriculum");
    setActiveWeekId(weekId);
    setActiveDetailTab(tab);
  };

  // Compute stats
  const completedWeeksCount = Object.values(completedWeeks).filter(Boolean).length;
  const quizScores = (Object.values(quizStates) as QuizState[]).map((q) => q.score);
  const avgQuizScore =
    quizScores.length > 0
      ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
      : 85;

  // Check and dynamically unlock achievements when milestones are reached
  useEffect(() => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === "ach-first-step" && !ach.unlocked && completedWeeks["w1"]) {
          return {
            ...ach,
            unlocked: true,
            unlockedAt: new Date().toISOString().split("T")[0],
            progress: 100,
          };
        }
        if (ach.id === "ach-knowledge-keeper") {
          const count = knowledgeItems.length;
          const prog = Math.min(100, Math.round((count / 5) * 100));
          const unlocked = count >= 5;
          return {
            ...ach,
            progress: prog,
            unlocked: ach.unlocked || unlocked,
            unlockedAt: ach.unlocked
              ? ach.unlockedAt
              : unlocked
              ? new Date().toISOString().split("T")[0]
              : undefined,
          };
        }
        if (ach.id === "ach-full-certified") {
          const compCount = Object.values(completedWeeks).filter(Boolean).length;
          const prog = Math.min(100, Math.round((compCount / 12) * 100));
          const unlocked = compCount === 12 && avgQuizScore >= 80;
          return {
            ...ach,
            progress: prog,
            unlocked: ach.unlocked || unlocked,
            unlockedAt: ach.unlocked
              ? ach.unlockedAt
              : unlocked
              ? new Date().toISOString().split("T")[0]
              : undefined,
          };
        }
        return ach;
      })
    );
  }, [completedWeeks, knowledgeItems.length, avgQuizScore]);

  // Knowledge Base Item CRUD Handlers
  const handleAddKnowledgeItem = (
    newItem: Omit<KnowledgeItem, "id" | "createdAt" | "updatedAt">
  ) => {
    const item: KnowledgeItem = {
      ...newItem,
      id: `kb-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setKnowledgeItems((prev) => [item, ...prev]);
  };

  const handleUpdateKnowledgeItem = (id: string, updates: Partial<KnowledgeItem>) => {
    setKnowledgeItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const handleDeleteKnowledgeItem = (id: string) => {
    setKnowledgeItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleKnowledgeFavorite = (id: string) => {
    setKnowledgeItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  // User Profile & Task Progress Handlers
  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...updates };
      if (updates.name) {
        setStudentName(updates.name);
      }
      return updated;
    });
  };

  const handleUpdateTaskProgress = (
    weekId: WeekId,
    updates: Partial<UserTaskProgress>
  ) => {
    setTaskProgress((prev) => ({
      ...prev,
      [weekId]: {
        ...(prev[weekId] || { weekId, completed: false }),
        ...updates,
      },
    }));
  };

  const handleResetAllData = () => {
    setCompletedWeeks({});
    setQuizStates({});
    setUserProfile(DEFAULT_USER_PROFILE);
    setTaskProgress(INITIAL_TASK_PROGRESS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setKnowledgeItems(INITIAL_KNOWLEDGE_ITEMS);
    localStorage.removeItem("seo_ustaad_completed_weeks");
    localStorage.removeItem("seo_ustaad_quiz_states");
    localStorage.removeItem("seo_ustaad_user_profile");
    localStorage.removeItem("seo_ustaad_task_progress");
    localStorage.removeItem("seo_ustaad_achievements");
    localStorage.removeItem("seo_ustaad_knowledge_items");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] flex flex-col font-sans transition-colors duration-200 selection:bg-blue-500/30">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        completedWeeksCount={completedWeeksCount}
        totalWeeks={CURRICULUM.length}
        theme={theme}
        onThemeChange={setTheme}
        langMode={langMode}
        onLangModeChange={setLangMode}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTutor={() => setIsTutorOpen(true)}
        studentName={currentUser?.displayName || userProfile.name}
        studentAvatar={userProfile.avatar}
        user={currentUser}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-24">
        {activeTab === "curriculum" && (
          <CurriculumView
            activeWeekId={activeWeekId}
            activeDetailTab={activeDetailTab}
            onSelectWeek={setActiveWeekId}
            onSelectDetailTab={setActiveDetailTab}
            completedWeeks={completedWeeks}
            onToggleCompleteWeek={handleToggleCompleteWeek}
            quizStates={quizStates}
            onSaveQuizScore={handleSaveQuizScore}
            onPlayLessonAudio={handlePlayAudio}
            langMode={langMode}
          />
        )}

        {activeTab === "workspace" && (
          <WorkspaceHub
            user={currentUser}
            accessToken={accessToken}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
            studentName={currentUser?.displayName || userProfile.name}
            activeWeekTitle={CURRICULUM.find((w) => w.id === activeWeekId)?.title.en}
          />
        )}

        {activeTab === "daily" && (
          <DailyPlanView
            langMode={langMode}
            onOpenTutor={handleOpenTutorWithPrompt}
          />
        )}

        {activeTab === "knowledge" && (
          <KnowledgeBaseView
            items={knowledgeItems}
            onAddItem={handleAddKnowledgeItem}
            onUpdateItem={handleUpdateKnowledgeItem}
            onDeleteItem={handleDeleteKnowledgeItem}
            onToggleFavorite={handleToggleKnowledgeFavorite}
            langMode={langMode}
          />
        )}

        {activeTab === "profile" && (
          <ProfileView
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            completedWeeks={completedWeeks}
            onToggleCompleteWeek={handleToggleCompleteWeek}
            quizStates={quizStates}
            taskProgress={taskProgress}
            onUpdateTaskProgress={handleUpdateTaskProgress}
            achievements={achievements}
            knowledgeCount={knowledgeItems.length}
            langMode={langMode}
            onLangModeChange={setLangMode}
            selectedVoice={selectedVoice}
            onVoiceChange={handleVoiceChange}
            playbackRate={playbackRate}
            onRateChange={setPlaybackRate}
            onResetAllData={handleResetAllData}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === "templates" && <TemplatesView langMode={langMode} />}

        {activeTab === "resources" && <ResourcesView langMode={langMode} />}

        {activeTab === "certificate" && (
          <CertificateView
            studentName={studentName}
            onStudentNameChange={setStudentName}
            completedWeeksCount={completedWeeksCount}
            totalWeeks={CURRICULUM.length}
            avgQuizScore={avgQuizScore}
            langMode={langMode}
          />
        )}
      </main>

      {/* Persistent Audio Narration Bar */}
      <ListenBar
        currentText={currentNarrationText}
        currentTitle={currentNarrationTitle}
        isPlaying={isPlaying}
        isLoading={isLoadingAudio}
        currentTime={audioCurrentTime}
        duration={audioDuration}
        selectedVoice={selectedVoice}
        playbackRate={playbackRate}
        onPlayPause={handlePlayPause}
        onStop={handleStopAudio}
        onVoiceChange={handleVoiceChange}
        onRateChange={setPlaybackRate}
        onSeek={handleSeekAudio}
      />

      {/* Global Quick Search Modal (Supports Side-Docked Companion & Center Modal) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
        onOpenTutor={handleOpenTutorWithPrompt}
      />

      {/* AI SEO Ustaad Interactive Modal */}
      <AITutorModal
        isOpen={isTutorOpen}
        onClose={() => {
          setIsTutorOpen(false);
          setTutorInitialPrompt("");
        }}
        onPlayAudio={handlePlayAudio}
        initialPrompt={tutorInitialPrompt}
      />
    </div>
  );
}
