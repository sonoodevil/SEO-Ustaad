export type Language = "en" | "ur";
export type LanguageMode = "both" | "en" | "ur";
export type ReadingTheme = "dark" | "light" | "sepia";
export type TextSize = "sm" | "md" | "lg" | "xl";
export type VoiceEngine = "gemini" | "browser" | "eleven";
export type UrduStyle = "mix" | "pure";

export type ActiveTab =
  | "curriculum"
  | "daily"
  | "knowledge"
  | "templates"
  | "resources"
  | "certificate"
  | "profile"
  | "workspace";
export type WeekDetailTab = "lesson" | "terms" | "task" | "quiz" | "watch";
export type WeekId =
  | "w1"
  | "w2"
  | "w3"
  | "w4"
  | "w5"
  | "w6"
  | "w7"
  | "w8"
  | "w9"
  | "w10"
  | "w11"
  | "w12"
  | string;

export type VoiceOption = "Puck" | "Zephyr" | "Aoede" | "Fenrir" | "Kore" | "Charon";

export interface BilingualText {
  en: string;
  ur: string;
}

export interface CurriculumSection {
  h: BilingualText;
  p: BilingualText;
  b?: BilingualText;
  tip?: BilingualText;
}

export interface KeyTerm {
  t: BilingualText | string;
  u?: string;
  d: BilingualText;
}

export interface QuizQuestion {
  q: BilingualText;
  opts: {
    en: string[];
    ur: string[];
  };
  a: number; // 0-3 index
  ans?: number;
  exp: BilingualText;
}

export interface CurriculumWeek {
  id: WeekId;
  num?: number;
  month: number;
  level: "basic" | "intermediate" | "expert";
  duration?: string;
  title: BilingualText;
  summary: BilingualText;
  objectives: {
    en: string[];
    ur: string[];
  };
  sections: CurriculumSection[];
  terms: KeyTerm[];
  keyTerms?: Array<{
    t: string;
    u: string;
    d: BilingualText;
  }>;
  task: BilingualText | {
    title: BilingualText;
    goal: BilingualText;
    steps: Array<BilingualText>;
    deliverable: BilingualText;
  };
  links: Array<{ label: string; url: string }>;
  quiz: QuizQuestion[];
}

export interface QuizResult {
  score: number;
  total: number;
  pct: number;
}

export interface QuizState {
  score: number;
  passed: boolean;
  attempts: number;
}

export interface AppState {
  name: string;
  lang: Language;
  lessons: Record<string, boolean>;
  quizzes: Record<string, QuizResult>;
  lastWeek: string;
  rate: number;
  theme: ReadingTheme;
  fs: TextSize;
  urVoice: VoiceEngine;
  gemVoice: string;
  urStyle: UrduStyle;
}

export interface ApiKeys {
  gemini?: string;
  groq?: string;
  eleven1?: string;
  eleven2?: string;
  voiceId?: string;
}

export interface ChatMessage {
  role: "user" | "ai";
  text: string;
  provider?: string;
}

export interface ChecklistGroup {
  g: BilingualText;
  items: BilingualText[];
}

export interface TemplateChecklist {
  id: string;
  name: BilingualText;
  desc: BilingualText;
  kind: "checklist";
  groups: ChecklistGroup[];
  seed?: string[][];
  columns?: BilingualText[];
  pitches?: Array<{
    title: BilingualText;
    body: BilingualText;
  }>;
}

export interface TemplateTable {
  id: string;
  name: BilingualText;
  desc: BilingualText;
  kind: "table";
  columns: BilingualText[];
  seed: string[][];
  groups?: ChecklistGroup[];
  pitches?: Array<{
    title: BilingualText;
    body: BilingualText;
  }>;
}

export interface TemplateProposal {
  id: string;
  name: BilingualText;
  desc: BilingualText;
  kind: "pitches";
  pitches: Array<{
    title: BilingualText;
    body: BilingualText;
  }>;
  groups?: ChecklistGroup[];
  seed?: string[][];
  columns?: BilingualText[];
}

export type PracticalTemplate = TemplateChecklist | TemplateTable | TemplateProposal;

// ==========================================
// Knowledge Base Types
// ==========================================
export type KnowledgeItemType = "note" | "code" | "link";

export type KnowledgeCategory =
  | "all"
  | "on-page"
  | "technical"
  | "schema"
  | "backlinks"
  | "local-seo"
  | "freelancing"
  | "analytics"
  | "general";

export interface KnowledgeItem {
  id: string;
  type: KnowledgeItemType;
  title: string;
  titleUrdu?: string;
  category: KnowledgeCategory | string;
  tags: string[];
  content: string; // Text note body, Code snippet, or Link notes
  codeLanguage?: "json" | "html" | "javascript" | "plaintext" | "htaccess" | "xml" | "css" | string;
  url?: string;
  isFavorite?: boolean;
  createdAt: string;
  updatedAt?: string;
}

// ==========================================
// User Profile & Progress Tracking Types
// ==========================================
export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  avatar: string; // Emoji avatar or preset identifier
  targetGoal: string;
  targetDate: string;
  dailyStudyMinutes: number;
  studyReminderTime: string;
  joinedDate: string;
  customGeminiKey?: string;
}

export interface UserAchievement {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0-100
  criteria: string;
}

export interface SkillProficiency {
  id: string;
  name: string;
  nameUrdu: string;
  category: string;
  level: number; // 0 to 100 percentage
  badge: string;
  associatedWeeks: WeekId[];
}

export interface UserTaskProgress {
  weekId: WeekId;
  completed: boolean;
  completedAt?: string;
  notes?: string;
  deliverableUrl?: string;
}

// ==========================================
// Daily Checklist & Study Stay Timer Types
// ==========================================
export interface DailyChecklistItem {
  id: string;
  titleEn: string;
  titleUr: string;
  category: "theory" | "practice" | "audit" | "quiz" | "custom";
  estimatedMinutes: number;
  completed: boolean;
  dayOfWeek?: number; // 1 to 7
}

export interface DayStudyRecord {
  date: string; // YYYY-MM-DD
  secondsStudied: number;
  targetMinutes: number;
  completedTasksCount: number;
}

// ==========================================
// Daily Practice Sandbox & AI Grading Types
// ==========================================
export interface PracticeDemoMission {
  id: string;
  titleEn: string;
  titleUr: string;
  toolName: string;
  toolCategory: "Free Demo" | "Google Official" | "Chrome DevTools" | "Open Sandbox";
  toolUrl: string;
  badge: string;
  durationMinutes: number;
  objectiveEn: string;
  objectiveUr: string;
  stepsEn: string[];
  stepsUr: string[];
  expectedDeliverableEn: string;
  expectedDeliverableUr: string;
  sampleInputPlaceholder: string;
}

export interface PracticeMistakeItem {
  id: string;
  severity: "critical" | "warning" | "suggestion";
  mistakeEn: string;
  mistakeUr: string;
  explanationEn: string;
  explanationUr: string;
  theekKarnaEn: string;
  theekKarnaUr: string;
}

export interface PracticeStrengthItem {
  id: string;
  titleEn: string;
  titleUr: string;
  detailEn: string;
}

export interface PracticeEvaluationResult {
  id: string;
  timestamp: string;
  missionId?: string;
  topicTitle: string;
  submittedContent: string;
  overallScore: number; // 0-100 or out of 10
  status: "Excellent" | "Pass" | "Needs Revision";
  rubricScores: {
    technicalAccuracy: { score: number; max: number; note: string };
    clientReadiness: { score: number; max: number; note: string };
    depthAndAnalysis: { score: number; max: number; note: string };
    actionableFixes: { score: number; max: number; note: string };
  };
  ghaltiyan: PracticeMistakeItem[];
  strengths: PracticeStrengthItem[];
  ustaadAdvice: {
    en: string;
    ur: string;
  };
}

