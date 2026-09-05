export interface DailyStep {
  num: number;
  title: { en: string; ur: string };
  time: string;
  location: { en: string; ur: string };
  desc: { en: string; ur: string };
}

export interface WeeklyPatternDay {
  day: number;
  name: { en: string; ur: string };
  action: { en: string; ur: string };
  result: { en: string; ur: string };
}

export interface CheckpointItem {
  day: number;
  title: { en: string; ur: string };
  criteria: { en: string; ur: string };
}

export const DAILY_STEPS: DailyStep[] = [
  {
    num: 1,
    title: { en: "Revise", ur: "دہرائیں (Revise)" },
    time: "10 min",
    location: { en: "Previous Lesson → Key Terms", ur: "پچھلا سبق → اہم اصطلاحات" },
    desc: {
      en: "Review previous errors and recall key vocabulary before learning new concepts.",
      ur: "کل کی غلطیاں اور اہم اصطلاحات یاد کریں تاکہ نیا سبق ذہن نشین ہو سکے۔",
    },
  },
  {
    num: 2,
    title: { en: "Learn & Listen", ur: "سیکھیں اور سنیں (Listen)" },
    time: "30 min",
    location: { en: "Lesson → 🔊 Listen Bar", ur: "سبق → 🔊 Listen بار" },
    desc: {
      en: "Read along while listening to the lesson with Pakistani teacher voice narration.",
      ur: "اردو آواز کے ساتھ نیا حصہ پڑھیں اور سمجھیں۔",
    },
  },
  {
    num: 3,
    title: { en: "Test", ur: "جانچیں (Quiz)" },
    time: "15 min",
    location: { en: "Lesson → Quiz Tab", ur: "سبق → کوئز ٹیب" },
    desc: {
      en: "Take the 5-question quiz. Read explanations for any mistake until 60%+ score is reached.",
      ur: "کوئز دیں اور غلط جوابات کی وجوہات غور سے پڑھیں۔",
    },
  },
  {
    num: 4,
    title: { en: "Practice on Real Site", ur: "عمل کریں (Practice Task)" },
    time: "30 min",
    location: { en: "Practice Task + Templates", ur: "مشقی کام + ٹیمپلیٹس" },
    desc: {
      en: "The single most important step. Audit or optimize a real live Pakistani business website.",
      ur: "سب سے اہم قدم! کسی بھی اصل ویب سائٹ پر جا کر پریکٹس آڈٹ یا کام کریں۔",
    },
  },
  {
    num: 5,
    title: { en: "Log & Plan Ahead", ur: "روزانہ کا لاگ (Log)" },
    time: "5 min",
    location: { en: "Daily Log / Notebook", ur: "نوٹ بک / لاگ شیٹ" },
    desc: {
      en: "Write 1 line of what you learned, which URL you audited, and your question for AI Tutor.",
      ur: "ایک سطر لکھیں کہ آج کیا سیکھا اور کل اے آئی استاد سے کیا پوچھنا ہے۔",
    },
  },
];

export const WEEKLY_PATTERN: WeeklyPatternDay[] = [
  {
    day: 1,
    name: { en: "Day 1: Understand (Samjho)", ur: "دن 1: سمجھیں" },
    action: { en: "Open Lesson → Objectives + Sections 1-2 → Listen", ur: "سبق کھولیں → مقاصد اور پہلے 2 حصے سنیں" },
    result: { en: "Foundation established", ur: "بنیاد بن گئی" },
  },
  {
    day: 2,
    name: { en: "Day 2: Complete (Poora Karo)", ur: "دن 2: مکمل کریں" },
    action: { en: "Sections 3-4 + Key Terms + Video Deep-links", ur: "حصے 3-4 اور اہم اصطلاحات و ویڈیو لنکس" },
    result: { en: "Topic fully covered", ur: "موضوع مکمل" },
  },
  {
    day: 3,
    name: { en: "Day 3: Validate (Jaancho)", ur: "دن 3: جانچیں" },
    action: { en: "Take Quiz → Read explanations → Retake to 60%+", ur: "کوئز دیں → وجوہات پڑھیں → پاس کریں" },
    result: { en: "Concept certified", ur: "تصدیق ہو گئی" },
  },
  {
    day: 4,
    name: { en: "Day 4: Practice Part A", ur: "دن 4: مشق حصہ اول" },
    action: { en: "Start Practice Task on a live website", ur: "اصل سائٹ پر مشقی کام شروع کریں" },
    result: { en: "Halfway through task", ur: "آدھا کام مکمل" },
  },
  {
    day: 5,
    name: { en: "Day 5: Practice Part B", ur: "دن 5: مشق حصہ دوم" },
    action: { en: "Complete Task + Fill out associated Template sheet", ur: "کام مکمل + متعلقہ ٹیمپلیٹ شیٹ بھریں" },
    result: { en: "Deliverable completed", ur: "پورا کام مکمل" },
  },
  {
    day: 6,
    name: { en: "Day 6: Deep Dive (Gehrai)", ur: "دن 6: گہرائی" },
    action: { en: "Ask AI Tutor 3-5 questions on unclear nuances", ur: "اے آئی استاد سے 3-5 سوالات پوچھیں" },
    result: { en: "Doubts resolved", ur: "شکوک ختم" },
  },
  {
    day: 7,
    name: { en: "Day 7: Wrap Up (Sameto)", ur: "دن 7: سمیٹیں" },
    action: { en: "Save portfolio screenshot + Click 'Mark Complete'", ur: "پورٹ فولیو محفوظ کریں + سبق مکمل کریں" },
    result: { en: "Portfolio proof ready", ur: "ثبوت تیار" },
  },
];

export const CHECKPOINTS: CheckpointItem[] = [
  {
    day: 28,
    title: { en: "Month 1: Foundation Checkpoint", ur: "مہینہ 1: بنیادی چیک پوائنٹ" },
    criteria: { en: "All 4 quizzes passed (60%+) + 50 keywords research sheet completed.", ur: "تمام 4 کوئز پاس + 50 کی ورڈز والی شیٹ تیار۔" },
  },
  {
    day: 56,
    title: { en: "Month 2: Implementation Checkpoint", ur: "مہینہ 2: عملی چیک پوائنٹ" },
    criteria: { en: "All 8 quizzes passed + 1 full Technical & Local SEO audit document prepared.", ur: "تمام 8 کوئز پاس + 1 مکمل ٹیکنیکل اور لوکل ایس ای او آڈٹ تیار۔" },
  },
  {
    day: 70,
    title: { en: "Portfolio Milestone", ur: "پورٹ فولیو سنگِ میل" },
    criteria: { en: "3 completed client case studies with before/after screenshots.", ur: "تین مکمل کیس اسٹڈیز اور اسکرین شاٹس تیار۔" },
  },
  {
    day: 84,
    title: { en: "Market Launch Checkpoint", ur: "مارکیٹ لانچ چیک پوائنٹ" },
    criteria: { en: "Fiverr gig live + 3 Upwork proposals sent + Certificate generated.", ur: "فائیور گگ لائیو + 3 اپ ورک پروپوزلز روانہ + سرٹیفکیٹ ڈاؤن لوڈ۔" },
  },
];
