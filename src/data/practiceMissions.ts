import { PracticeDemoMission, PracticeEvaluationResult } from "../types";

export const PRACTICE_DEMO_MISSIONS: PracticeDemoMission[] = [
  {
    id: "mission-gsc-demo",
    titleEn: "Google Search Console Public Demo Audit",
    titleUr: "گوگل سرچ کنسول پبلک ڈیمو پریکٹس",
    toolName: "Google Search Console Demo Account",
    toolCategory: "Google Official",
    toolUrl: "https://search.google.com/search-console/about",
    badge: "100% Free Public Demo",
    durationMinutes: 30,
    objectiveEn: "Analyze search performance, uncover top 5 high-impression low-CTR queries, and identify index coverage errors on Google's official merchandise store demo.",
    objectiveUr: "گوگل کے آفیشل ڈیمو اکاؤنٹ پر سب سے زیادہ تاثرات (Impressions) والے لیکن کم CTR والے کی ورڈز تلاش کریں اور انڈیکسنگ کی غلطیاں پکڑیں۔",
    stepsEn: [
      "Open the official Google Search Console demo account (or test with your own verified domain).",
      "Navigate to the 'Performance' (کارکردگی) tab and select the last 28 days date filter.",
      "Filter queries where Impressions > 1,000 but CTR is under 2.0% (Opportunity keywords).",
      "Inspect the 'Pages' indexation report to spot 'Crawled - currently not indexed' URLs.",
      "Write down your 4-point recommendation on how to optimize title tags to lift CTR."
    ],
    stepsUr: [
      "گوگل سرچ کنسول کا پبلک ڈیمو کھولیں یا اپنی ویب سائٹ منتخب کریں۔",
      "پرفارمنس (Performance) ٹیب میں جا کر پچھلے 28 دن کا ڈیٹا منتخب کریں۔",
      "ایسے کی ورڈز تلاش کریں جن کے امپریشنز زیادہ ہوں مگر CTR دو فیصد سے کم ہو۔",
      "پیجز انڈیکسیشن رپورٹ میں دیکھیں کہ کون سے صفحات Crawled ہیں مگر Index نہیں ہوئے۔",
      "ان پیجز کے ٹائٹل ٹیگز اور میٹا ڈسکرپشن بہتر بنانے کے لیے 4 ٹھوس تجاویز تیار کریں۔"
    ],
    expectedDeliverableEn: "A 4-bullet audit report listing: 3 opportunity queries with low CTR, 2 indexing status observations, and rewritten high-CTR meta titles.",
    expectedDeliverableUr: "چار نکات پر مشتمل رپورٹ: کم CTR والے 3 کی ورڈز، انڈیکسیشن کی حالت، اور پرکشش کلک ایبل ٹائٹل ٹیگ کی تجویز۔",
    sampleInputPlaceholder: "Paste your GSC audit notes here:\n- Top Opportunity Query: 'buy organic honey lahore' (Impressions: 1,450, CTR: 1.1%)\n- Current Title: Honey Products - Best Store\n- Proposed High-CTR Title: 100% Pure Organic Honey in Lahore | Same Day Delivery (2026)\n- Indexing Observation: 14 product tag pages marked as 'noindex' which is correct.",
  },
  {
    id: "mission-screaming-frog",
    titleEn: "Technical Crawl & 404 Broken Link Hunting",
    titleUr: "اسکریمنگ فراگ سے ٹیکنیکل کرال اور ٹوٹی ہوئی لنکس کی درستگی",
    toolName: "Screaming Frog SEO Spider (Free 500 URLs)",
    toolCategory: "Free Demo",
    toolUrl: "https://www.screamingfrog.co.uk/seo-spider/",
    badge: "Free 500 URLs Crawl",
    durationMinutes: 40,
    objectiveEn: "Run a free 500-URL crawl on a test blog or Pakistani eCommerce store to uncover 404 broken links, missing H1 headings, and duplicate meta descriptions.",
    objectiveUr: "کسی بھی ویب سائٹ کو مفت 500 یو آر ایل تک کرال کریں اور 404 ایررز، غائب H1 ہیڈنگز اور ڈپلیکیٹ میٹا کا سراغ لگائیں۔",
    stepsEn: [
      "Download and install the free version of Screaming Frog (free for up to 500 URLs).",
      "Enter a target URL (e.g. your portfolio, a local store, or staging site) and click 'Start'.",
      "Filter by 'Response Codes' -> 'Client Error (4xx)' to extract all broken URLs.",
      "Click the 'Inlinks' tab at the bottom to see which pages are pointing to those broken links.",
      "Check 'H1' tab for 'Missing' and 'Page Titles' tab for 'Over 60 Characters' (truncated).",
      "Document the 3 worst issues and specify the exact 301 redirect or HTML fix."
    ],
    stepsUr: [
      "اسکریمنگ فراگ کا مفت ورژن انسٹال کریں (500 صفحات تک بالکل مفت ہے)۔",
      "ویب سائٹ کا یو آر ایل درج کریں اور کرالنگ شروع کریں۔",
      "رسپانس کوڈز میں جا کر 'Client Error (4xx)' فلٹر کریں تاکہ سب 404 لنکس سامنے آ جائیں۔",
      "نیچے 'Inlinks' پر کلک کر کے دیکھیں کہ کون سے صفحات ان ٹوٹی ہوئی لنکس کی طرف اشارہ کر رہے ہیں۔",
      "H1 ٹیب میں غائب ہیڈنگز اور پیج ٹائٹل ٹیب میں 60 حروف سے لمبے ٹائٹلز نوٹ کریں۔",
      "تین سب سے اہم غلطیوں کی نشاندہی کریں اور 301 ری ڈائریکٹ کا حل لکھیں۔"
    ],
    expectedDeliverableEn: "Technical audit summary listing: Total URLs crawled, number of 4xx broken links with source page, missing H1 count, and 301 redirect mapping table.",
    expectedDeliverableUr: "ٹیکنیکل رپورٹ: کل کرال شدہ صفحات، 404 لنکس مع ریفرنس پیج، غائب H1 ہیڈنگز کی تعداد، اور ری ڈائریکٹ کا نقشہ۔",
    sampleInputPlaceholder: "Technical Crawl Audit Report:\n1. Target Domain: https://myshop.pk\n2. Total URLs Crawled: 238\n3. Broken Links (404): https://myshop.pk/shoes/leather-boots (Inlink from /homepage banner)\n   Fix: Implement 301 Redirect to https://myshop.pk/collections/boots\n4. Missing H1: 12 product pages missing main H1\n5. Duplicate Meta: 18 category pages share the same meta description.",
  },
  {
    id: "mission-schema-validator",
    titleEn: "LocalBusiness & FAQ Schema JSON-LD Construction",
    titleUr: "لوکل بزنس اور FAQ اسکیما کوڈ تیار کرنا اور ٹیسٹ کرنا",
    toolName: "Google Rich Results Test & Schema.org Validator",
    toolCategory: "Open Sandbox",
    toolUrl: "https://search.google.com/test/rich-results",
    badge: "Instant Google Verification",
    durationMinutes: 30,
    objectiveEn: "Construct valid JSON-LD schema markup for a Pakistani local business (clinic, salon, or law firm) and test it live without errors in Google Rich Results validator.",
    objectiveUr: "کسی پاکستانی مقامی کاروبار کے لیے JSON-LD اسکیما کوڈ لکھیں اور گوگل رچ رزلٹس ٹیسٹ پر بغیر کسی غلطی کے تصدیق کریں۔",
    stepsEn: [
      "Select a local business archetype (e.g., Medical Clinic in Gulberg Lahore or Restaurant in Clifton Karachi).",
      "Draft a structured JSON-LD block with @context, @type: LocalBusiness / MedicalBusiness.",
      "Include: name, address (streetAddress, addressLocality: Lahore, addressCountry: PK), geo (latitude, longitude), openingHours, and telephone.",
      "Add an FAQPage schema section answering 2 common customer questions.",
      "Copy and paste the code into Google's Rich Results Test tool to ensure green 'Valid Item' checkmarks."
    ],
    stepsUr: [
      "کوئی مقامی کاروبار منتخب کریں (مثلاً لاہور کا کلینک یا کراچی کا ریسٹورنٹ)۔",
      "JSON-LD فارمیٹ میں @context اور @type (LocalBusiness) کے ساتھ کوڈ لکھیں۔",
      "بزنس کا نام، مکمل پاکستانی پتہ، جی پی ایس کوآرڈینیٹس، فون نمبر اور کھلنے کے اوقات شامل کریں۔",
      "ساتھ FAQPage کا اسکیما بلاک بھی شامل کریں جس میں 2 اہم سوالات و جوابات ہوں۔",
      "گوگل رچ رزلٹس ٹول میں کوڈ پیسٹ کریں اور سبز رنگ کی تصدیق حاصل کریں۔"
    ],
    expectedDeliverableEn: "A complete, error-free <script type='application/ld+json'> code block with address, telephone, geo, and FAQ items.",
    expectedDeliverableUr: "مکمل اور غلطیوں سے پاک JSON-LD اسکرپٹ کوڈ مع لوکل بزنس پتہ اور سوالات و جوابات۔",
    sampleInputPlaceholder: "<script type=\"application/ld+json\">\n{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"MedicalBusiness\",\n  \"name\": \"Al-Shifa Dental Clinic\",\n  \"image\": \"https://example.com/logo.jpg\",\n  \"telephone\": \"+92-42-35789000\",\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"streetAddress\": \"Main Boulevard, Gulberg III\",\n    \"addressLocality\": \"Lahore\",\n    \"addressCountry\": \"PK\"\n  },\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 31.5204,\n    \"longitude\": 74.3587\n  }\n}\n</script>",
  },
  {
    id: "mission-lighthouse-vitals",
    titleEn: "Core Web Vitals & Speed Diagnostics",
    titleUr: "کور ویب وائٹلز اور اسپیڈ آڈٹ (LCP, CLS, INP)",
    toolName: "Google PageSpeed Insights & Chrome DevTools",
    toolCategory: "Chrome DevTools",
    toolUrl: "https://pagespeed.web.dev/",
    badge: "Official Web Vitals Metric",
    durationMinutes: 25,
    objectiveEn: "Run PageSpeed Insights on a mobile URL, measure LCP, CLS, and INP scores, and identify the top 2 performance bottlenecks slowing down the mobile score.",
    objectiveUr: "موبائل پر پیج اسپیڈ اور کور ویب وائٹلز کی پیمائش کریں اور رفتار سست کرنے والی 2 بنیادی وجوہات کا حل تجویز کریں۔",
    stepsEn: [
      "Open PageSpeed Insights or open Chrome DevTools (Press F12 -> Lighthouse tab).",
      "Select 'Mobile' device mode and click 'Analyze'.",
      "Record the 3 Core Web Vitals: Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP).",
      "Identify the LCP element (e.g. uncompressed 3MB hero PNG or slow server response).",
      "Prescribe 3 actionable fixes: modern WebP/AVIF format, lazy loading below-fold images, and critical CSS inlining."
    ],
    stepsUr: [
      "پیج اسپیڈ انسائٹس کھولیں یا کروم میں F12 دبا کر Lighthouse ٹیب کھولیں۔",
      "موبائل ڈیوائس منتخب کر کے آڈٹ چلائیں۔",
      "تینوں اسپیڈ میٹرکس نوٹ کریں: LCP (ہدف < 2.5s)، CLS (ہدف < 0.1)، اور INP (ہدف < 200ms)۔",
      "دیکھیں کہ LCP ایلیمنٹ کون سا ہے (اکثر کوئی بڑی تصویر ہوتی ہے)۔",
      "تین تجاویز لکھیں: WebP فارمیٹ، لیزی لوڈنگ، اور رینڈر بلاکنگ جاوا اسکرپٹ کا خاتمہ۔"
    ],
    expectedDeliverableEn: "Performance audit breakdown: Mobile score, LCP/CLS measurements, identifying the slowest asset, and exact developer instructions for optimization.",
    expectedDeliverableUr: "اسپیڈ آڈٹ رپورٹ: موبائل اسکور، LCP/CLS ریڈنگز، سب سے سست امیج فائل، اور ڈویلپر کے لیے واضح حل۔",
    sampleInputPlaceholder: "Core Web Vitals Audit:\n- Target URL: https://example.com/blog/seo-guide\n- Mobile Performance Score: 52/100 (Poor)\n- LCP: 4.8 seconds (Failed, Target < 2.5s) caused by uncompressed 2.8MB hero.jpg\n- CLS: 0.28 (Failed, Target < 0.1) due to missing width/height attributes on banner\n- INP: 180ms (Good)\n- Recommended Fixes:\n  1. Convert hero.jpg to WebP (reduce to 95KB)\n  2. Add explicit width='1200' and height='630' on all banner images\n  3. Defer non-essential third-party analytics scripts",
  },
  {
    id: "mission-operators-sandbox",
    titleEn: "Google Advanced Search Operators Index Audit",
    titleUr: "گوگل سرچ آپریٹرز سے ہڈن انڈیکسنگ کی غلطیاں پکڑنا",
    toolName: "Google Search Engine Sandbox",
    toolCategory: "Open Sandbox",
    toolUrl: "https://www.google.com",
    badge: "100% Free Live Google",
    durationMinutes: 20,
    objectiveEn: "Use advanced Google search operators (site:, inurl:, intitle:, filetype:) to detect index leaks, duplicate staging domains, and non-secure HTTP pages.",
    objectiveUr: "گوگل سرچ آپریٹرز کے ذریعے ڈپلیکیٹ صفحات، ٹیسٹنگ سب ڈومینز اور سیکیورٹی لیکس کا سراغ لگائیں۔",
    stepsEn: [
      "Run `site:targetdomain.com` in Google to see total indexed pages vs sitemap count.",
      "Check for unsecured pages: `site:targetdomain.com -inurl:https`.",
      "Detect accidental staging or subdomains: `site:targetdomain.com -inurl:www`.",
      "Find unindexed file leaks: `site:targetdomain.com filetype:pdf` or `filetype:sql`.",
      "Find duplicate content or cannibalization: `site:targetdomain.com intitle:\"core keyword\"`."
    ],
    stepsUr: [
      "گوگل میں `site:yourdomain.com` لکھ کر کل انڈیکس شدہ صفحات کی تعداد چیک کریں۔",
      "غیر محفوظ صفحات ڈھونڈیں: `site:yourdomain.com -inurl:https`۔",
      "ڈپلیکیٹ سب ڈومینز کا پتہ لگائیں: `site:yourdomain.com -inurl:www`۔",
      "پی ڈی ایف یا رازدارانہ فائلز چیک کریں: `site:yourdomain.com filetype:pdf`۔",
      "کی ورڈ کینبلائزیشن پکڑیں: `site:yourdomain.com intitle:\"آپ کا کی ورڈ\"`۔"
    ],
    expectedDeliverableEn: "Operator search log with 5 test queries, number of results, and any security/indexing anomalies discovered.",
    expectedDeliverableUr: "سرچ آپریٹرز کا لاگ مع 5 تجرباتی کیوریز اور سامنے آنے والی خامیوں کی تفصیل۔",
    sampleInputPlaceholder: "Search Operators Audit for testclient.com:\n1. `site:testclient.com`: 145 pages indexed (Sitemap only has 90 -> 55 orphan/thin tag pages).\n2. `site:testclient.com -inurl:https`: 0 results (Good, 100% HTTPS enforced).\n3. `site:testclient.com inurl:staging`: Found staging.testclient.com indexed! Action: Add 'noindex' or password-protect.\n4. `site:testclient.com intitle:\"Best Leather Jackets\"`: 3 pages competing for the same title (Keyword Cannibalization).",
  },
  {
    id: "mission-intent-keywords",
    titleEn: "Intent-Based Keyword Cluster & Search Map",
    titleUr: "سرچ انٹینٹ کی بنیاد پر 10 کی ورڈز کا انتخاب اور کلسٹر",
    toolName: "Google Suggest & Free Keyword Generator",
    toolCategory: "Free Demo",
    toolUrl: "https://ahrefs.com/keyword-generator",
    badge: "Free Keyword Data",
    durationMinutes: 35,
    objectiveEn: "Build a structured 10-keyword map for a local service or niche eCommerce store, categorizing by Search Intent (Informational, Commercial, Transactional, Navigational).",
    objectiveUr: "دس اہم کی ورڈز کی تلاش اور ان کو سرچ انٹینٹ (معلوماتی، کمرشل، اور خریداری) کے لحاظ سے تقسیم کرنا۔",
    stepsEn: [
      "Choose a niche (e.g. Solar Panel Installation Pakistan, Organic Skincare, or Accounting Software).",
      "Use free Google Autocomplete ('solar panel cost in...'), 'People Also Ask', and Ahrefs free keyword generator.",
      "List 10 long-tail keywords (3+ words) with low competition.",
      "Assign exact Search Intent to each: Informational (Blog), Commercial (Comparison), or Transactional (Product/Service landing page).",
      "Specify which page type on the client website should target each keyword."
    ],
    stepsUr: [
      "ایک شعبہ منتخب کریں (مثلاً سولر پینل، آرگینک صابن، یا سی اے اکیڈمی)۔",
      "گوگل کے مفت آٹو سجسٹ اور مفت ٹولز سے 10 لانگ ٹیل کی ورڈز حاصل کریں۔",
      "ہر کی ورڈ کا سرچ ارادہ (Intent) واضح کریں: بلاگ کے لیے، پروڈکٹ کے لیے یا سروس کے لیے۔",
      "ویب سائٹ کا متعلقہ صفحہ تجویز کریں جو اس کی ورڈ پر رینک کرے۔"
    ],
    expectedDeliverableEn: "A 10-row keyword table with columns: Keyword, Search Intent, Target Page Type, and Primary Value Proposition.",
    expectedDeliverableUr: "10 کی ورڈز کا جدول مع کالمز: کی ورڈ، ارادہ (Intent)، ویب سائٹ پیج کی قسم اور مقصد۔",
    sampleInputPlaceholder: "Keyword Intent Research Table:\n1. 'how to calculate solar panel for 1.5 ton ac' | Intent: Informational | Target: Blog Guide\n2. '5kw solar system price in pakistan 2026' | Intent: Commercial Investigation | Target: Pricing Comparison Page\n3. 'buy canadian solar 550w panels online lahore' | Intent: Transactional | Target: Product Ecommerce Page\n4. 'net metering application process wapda' | Intent: Informational | Target: Step-by-Step Tutorial\n5. 'best solar inverter tier 1 brands pakistan' | Intent: Commercial | Target: Review Article",
  },
];

/**
 * Intelligent Rule-based & Rubric Practice Evaluator
 * Evaluates the submitted document, assigns score, marks specific errors,
 * provides Urdu and English corrections, and highlights strengths.
 */
export function evaluateStudentPracticeSubmission(
  content: string,
  topicTitle: string,
  missionId?: string
): PracticeEvaluationResult {
  const trimmed = content.trim();
  const lower = trimmed.toLowerCase();
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;

  const ghaltiyan: PracticeEvaluationResult["ghaltiyan"] = [];
  const strengths: PracticeEvaluationResult["strengths"] = [];

  let technicalScore = 2.0; // out of 3.0
  let depthScore = 2.0; // out of 3.0
  let readinessScore = 1.2; // out of 2.0
  let actionableScore = 1.2; // out of 2.0

  // 1. Length & Substance check
  if (wordCount < 20) {
    technicalScore = 1.0;
    depthScore = 0.8;
    readinessScore = 0.5;
    actionableScore = 0.5;

    ghaltiyan.push({
      id: "err-too-short",
      severity: "critical",
      mistakeEn: "Submission is too brief (Under 20 words)",
      mistakeUr: "پریکٹس کا کام بہت مختصر ہے (20 الفاظ سے کم)",
      explanationEn: "A client deliverable or practical audit requires specific metrics, URLs, and concrete observations.",
      explanationUr: "کلائنٹ کو پیش کرنے کے لیے رپورٹ میں مناسب یو آر ایل، اعداد و شمار اور واضح نتائج ہونا لازمی ہیں۔",
      theekKarnaEn: "Include target URLs, measured metrics (e.g. 404 count, LCP in seconds, or search volume), and full recommendations.",
      theekKarnaUr: "رپورٹ میں کم از کم ٹارگٹ ویب سائٹ کا نام، پیمائش شدہ میٹرکس اور 3 سے 4 ٹھوس تجاویز شامل کریں۔",
    });
  } else {
    strengths.push({
      id: "str-effort",
      titleEn: "Good Document Substance & Length",
      titleUr: "پریکٹس رپورٹ کا مناسب حجم اور تفصیل",
      detailEn: `Comprehensive submission with ${wordCount} words showing genuine practical effort.`,
    });
    technicalScore += 0.3;
    depthScore += 0.3;
  }

  // 2. Specific Topic Inspections
  // Check for URLs or Domains
  const hasUrl = /https?:\/\/|[a-z0-9-]+\.(com|pk|org|net|edu|gov|co|shop|store)/i.test(trimmed);
  if (!hasUrl && (topicTitle.includes("Audit") || topicTitle.includes("Crawl") || topicTitle.includes("GSC") || topicTitle.includes("Vitals"))) {
    ghaltiyan.push({
      id: "err-no-url",
      severity: "warning",
      mistakeEn: "Missing Target Website URL or Domain Reference",
      mistakeUr: "ٹارگٹ ویب سائٹ کا ڈومین یا یو آر ایل غائب ہے",
      explanationEn: "In professional agency audits, always begin by stating the exact domain audited and protocol (https://).",
      explanationUr: "ایس ای او آڈٹ میں ہمیشہ سب سے پہلے کلائنٹ کی ویب سائٹ کا مکمل ایڈریس درج کرنا ضروری ہوتا ہے۔",
      theekKarnaEn: "Add: 'Target Domain: https://clientwebsite.com' at the top of your deliverable.",
      theekKarnaUr: "رپورٹ کے اوپر واضح طور پر لکھیں: 'Target Domain: https://yourdomain.com'",
    });
    readinessScore = Math.max(0.6, readinessScore - 0.4);
  } else if (hasUrl) {
    strengths.push({
      id: "str-domain",
      titleEn: "Clear Domain Attribution",
      titleUr: "واضح ویب سائٹ ریفرنس",
      detailEn: "Target website or staging URL was properly identified.",
    });
    readinessScore += 0.3;
  }

  // Check for Numbers & Quantitative Data (Metrics)
  const hasNumbers = /\d+%|\d+\s*(seconds|s|ms|urls|pages|impressions|clicks|ctr)/i.test(trimmed) || /\b\d{2,}\b/.test(trimmed);
  if (!hasNumbers) {
    ghaltiyan.push({
      id: "err-no-metrics",
      severity: "warning",
      mistakeEn: "Lacks Quantitative SEO Metrics or Numbers",
      mistakeUr: "اعداد و شمار (Metrics) کی کمی ہے",
      explanationEn: "Clients need measurable data (e.g., '14 broken links', 'LCP: 3.8s', 'CTR: 1.4%') rather than general remarks like 'site is slow'.",
      explanationUr: "صرف یہ کہنا کافی نہیں کہ 'ویب سائٹ سست ہے'؛ کلائنٹ کو بتائیں کہ 'LCP 4.2 سیکنڈ ہے اور 12 لنکس ٹوٹی ہوئی ہیں'۔",
      theekKarnaEn: "Specify exact numerical metrics: 'Current Mobile Speed: 42/100', 'LCP: 4.1s', 'CTR: 1.2%'.",
      theekKarnaUr: "ٹھوس اعداد و شمار درج کریں جیسے: 'موبائل اسپیڈ: 48/100'، '404 لنکس: 7 عدد'۔",
    });
    depthScore = Math.max(0.8, depthScore - 0.4);
  } else {
    strengths.push({
      id: "str-metrics",
      titleEn: "Data-Driven & Quantified Observations",
      titleUr: "اعداد و شمار پر مبنی تجزیہ",
      detailEn: "Used solid numerical benchmarks and metrics to substantiate SEO findings.",
    });
    depthScore += 0.4;
    technicalScore += 0.3;
  }

  // 3. Schema Markup Specific Validation
  if (lower.includes("schema") || lower.includes("json-ld") || lower.includes("<script") || lower.includes("@context")) {
    if (!lower.includes("@context") || !lower.includes("@type")) {
      ghaltiyan.push({
        id: "err-schema-syntax",
        severity: "critical",
        mistakeEn: "Invalid JSON-LD Syntax: Missing @context or @type",
        mistakeUr: "اسکیما کوڈ میں @context یا @type غائب ہے",
        explanationEn: "Google cannot parse structured data without `@context: https://schema.org` and `@type` specified.",
        explanationUr: "گوگل اسکیما کوڈ کو اس وقت تک نہیں پہچانتا جب تک اس میں `@context: https://schema.org` موجود نہ ہو۔",
        theekKarnaEn: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"LocalBusiness\"\n}",
        theekKarnaUr: "کوڈ کے آغاز میں یہ سطر لازمی لگائیں: {\"@context\": \"https://schema.org\", \"@type\": \"LocalBusiness\"}",
      });
      technicalScore = Math.max(0.5, technicalScore - 0.7);
    } else {
      strengths.push({
        id: "str-schema",
        titleEn: "Valid JSON-LD Structure",
        titleUr: "درست اسکیما ساخت",
        detailEn: "Implemented compliant Schema.org JSON-LD tags with proper context and type.",
      });
      technicalScore += 0.4;
    }

    if (lower.includes("localbusiness") && !lower.includes("geo") && !lower.includes("telephone")) {
      ghaltiyan.push({
        id: "err-local-geo",
        severity: "warning",
        mistakeEn: "LocalBusiness Schema Missing GeoCoordinates or Telephone",
        mistakeUr: "لوکل اسکیما میں ٹیلی فون یا GPS کوآرڈینیٹس غائب ہیں",
        explanationEn: "To qualify for Google Maps and Local 3-Pack rich results, telephone and GeoCoordinates (latitude, longitude) are strongly recommended.",
        explanationUr: "گوگل میپس میں رینکنگ کے لیے فون نمبر اور لوکیشن کے کوآرڈینیٹس دینا لازمی ہوتا ہے۔",
        theekKarnaEn: "\"geo\": {\n  \"@type\": \"GeoCoordinates\",\n  \"latitude\": 31.5204,\n  \"longitude\": 74.3587\n}",
        theekKarnaUr: "اسکیما میں 'telephone': '+92-...' اور 'geo' آبجیکٹ شامل کریں۔",
      });
    }
  }

  // 4. Keyword Intent Specific Validation
  if (lower.includes("keyword") || lower.includes("intent") || topicTitle.includes("Keyword")) {
    const hasIntentTags = lower.includes("informational") || lower.includes("commercial") || lower.includes("transactional") || lower.includes("navigational") || lower.includes("انٹینٹ");
    if (!hasIntentTags) {
      ghaltiyan.push({
        id: "err-intent-missing",
        severity: "warning",
        mistakeEn: "Keywords Missing Explicit Search Intent Classification",
        mistakeUr: "کی ورڈز کے ساتھ سرچ ارادہ (Search Intent) واضح نہیں کیا گیا",
        explanationEn: "Listing keywords without labeling whether they are Informational (Blog) or Transactional (Product) leads to wrong content targeting.",
        explanationUr: "اگر کی ورڈ کے ساتھ یہ نہ لکھا جائے کہ یوزر معلومات چاہتا ہے یا خریداری، تو غلط پیج رینک ہونے کا خطرہ ہوتا ہے۔",
        theekKarnaEn: "Add intent labels: [Informational] for guides, [Commercial] for reviews/comparison, and [Transactional] for buy/hire queries.",
        theekKarnaUr: "ہر کی ورڈ کے ساتھ کیٹیگری لکھیں: معلوماتی (Informational) یا خریداری (Transactional)۔",
      });
      technicalScore = Math.max(1.0, technicalScore - 0.4);
    } else {
      strengths.push({
        id: "str-intent",
        titleEn: "Flawless Search Intent Segmentation",
        titleUr: "سرچ انٹینٹ کی درست تقسیم",
        detailEn: "Correctly mapped keywords to their corresponding user search intent.",
      });
      technicalScore += 0.3;
    }
  }

  // 5. Actionable Recommendations Check
  const hasActionWords = /fix|recommend|redirect|301|rewrite|update|compress|defer|canonical|noindex|optimize|ہل|تجو|درست/i.test(trimmed);
  if (!hasActionWords && wordCount >= 20) {
    ghaltiyan.push({
      id: "err-no-solution",
      severity: "warning",
      mistakeEn: "Identified Problems Without Actionable Solutions",
      mistakeUr: "مسائل کی نشاندہی تو ہے لیکن ان کا عملی حل تجویز نہیں کیا گیا",
      explanationEn: "A top-tier SEO specialist does not just report bugs; they provide the exact code or steps to fix them.",
      explanationUr: "ایک بہترین ایس ای او ایکسپرٹ صرف خامیاں نہیں گنواتا بلکہ کلائنٹ کو ان کا درست حل بھی فراہم کرتا ہے۔",
      theekKarnaEn: "For each error, add an 'Actionable Fix' section specifying 301 redirects, alt tags, or script deferrals.",
      theekKarnaUr: "ہر مسئلے کے ساتھ لکھیں: 'حل (Fix): 301 ری ڈائریکٹ لگائیں یا تصویر کو WebP میں تبدیل کریں'۔",
    });
    actionableScore = Math.max(0.6, actionableScore - 0.4);
  } else if (hasActionWords) {
    strengths.push({
      id: "str-solutions",
      titleEn: "Practical Action-Oriented Solutions",
      titleUr: "عملی اور ٹھوس حل کی فراہمی",
      detailEn: "Provided actionable remediation steps and technical fixes.",
    });
    actionableScore += 0.4;
  }

  // Normalize scores
  const finalTech = Math.min(3.0, Math.max(0.5, Number(technicalScore.toFixed(1))));
  const finalDepth = Math.min(3.0, Math.max(0.5, Number(depthScore.toFixed(1))));
  const finalReadiness = Math.min(2.0, Math.max(0.4, Number(readinessScore.toFixed(1))));
  const finalActionable = Math.min(2.0, Math.max(0.4, Number(actionableScore.toFixed(1))));

  const totalRaw = finalTech + finalDepth + finalReadiness + finalActionable;
  const overallOutOf10 = Number(totalRaw.toFixed(1));
  const overallPercentage = Math.min(100, Math.round(overallOutOf10 * 10));

  let status: PracticeEvaluationResult["status"] = "Pass";
  if (overallOutOf10 >= 8.5) {
    status = "Excellent";
  } else if (overallOutOf10 < 6.0) {
    status = "Needs Revision";
  }

  return {
    id: `eval-${Date.now()}`,
    timestamp: new Date().toISOString(),
    missionId,
    topicTitle,
    submittedContent: trimmed,
    overallScore: overallOutOf10,
    status,
    rubricScores: {
      technicalAccuracy: {
        score: finalTech,
        max: 3.0,
        note: finalTech >= 2.5 ? "Solid technical comprehension." : "Review technical syntax and terminology.",
      },
      depthAndAnalysis: {
        score: finalDepth,
        max: 3.0,
        note: finalDepth >= 2.5 ? "Thorough analysis with good quantitative metrics." : "Add more specific numerical evidence.",
      },
      clientReadiness: {
        score: finalReadiness,
        max: 2.0,
        note: finalReadiness >= 1.6 ? "Professional and client-ready format." : "Improve formatting with clear headings.",
      },
      actionableFixes: {
        score: finalActionable,
        max: 2.0,
        note: finalActionable >= 1.6 ? "Prescribed concrete solutions." : "Ensure every issue has a paired developer fix.",
      },
    },
    ghaltiyan,
    strengths,
    ustaadAdvice: {
      en:
        status === "Excellent"
          ? "Outstanding practical execution! Your audit demonstrates agency-grade rigor. You are ready to present findings like this directly to international clients."
          : status === "Pass"
          ? "Good, solid effort! You grasped the core concept. Address the highlighted mistakes above to make your deliverable 100% airtight."
          : "Needs revision: Practical SEO requires precision. Review the suggested fixes above and resubmit your refined document for a higher mark.",
      ur:
        status === "Excellent"
          ? "ماشاءاللہ! بہترین اور پیشہ ورانہ کوشش۔ آپ کی رپورٹ ایک انٹرنیشنل ایجنسی کے معیار کے مطابق ہے۔ یہ کام آپ کلائنٹ کو فخر سے بھیج سکتے ہیں۔"
          : status === "Pass"
          ? "شاباش! اچھی کوشش ہے۔ بنیادی مفہوم آپ کی سمجھ میں آ گیا ہے۔ اوپر دی گئی غلطیوں کی اصلاح کریں تاکہ آپ کا کام 100 فیصد مکمل ہو جائے۔"
          : "محنت کی مزید ضرورت ہے: ایس ای او میں درستگی اور اعداد و شمار ضروری ہیں۔ اوپر دی گئی اصلاحات کے مطابق رپورٹ درست کر کے دوبارہ مارکنگ کروائیں۔",
    },
  };
}
