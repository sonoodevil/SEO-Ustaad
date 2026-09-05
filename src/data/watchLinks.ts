export interface WatchItem {
  t: { en: string; ur: string };
  u: string;
}

const YT = (q: string) => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);

export const WATCH: Record<string, WatchItem[]> = {
  w1: [
    { t: { en: "How Google Search Works — Official Video Explainer", ur: "گوگل سرچ کیسے کام کرتا ہے — آفیشل ویڈیو" }, u: "https://www.google.com/search/howsearchworks/" },
    { t: { en: "Google Search Central YouTube Channel", ur: "گوگل سرچ سینٹرل یوٹیوب چینل" }, u: "https://www.youtube.com/@GoogleSearchCentral" },
    { t: { en: "Video Tutorial: Crawling, Indexing & Ranking (Urdu/Hindi)", ur: "ویڈیو سبق: کرالنگ، انڈیکسنگ، رینکنگ (اردو)" }, u: YT("crawling indexing ranking seo urdu hindi") },
  ],
  w2: [
    { t: { en: "Google Guidance: Creating Helpful People-First Content", ur: "گوگل رہنمائی: مفید اور انسان دوست مواد" }, u: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    { t: { en: "Video Tutorial: Search Intent Deep-Dive & Types", ur: "ویڈیو سبق: سرچ انٹینٹ کی اقسام اور تجزیہ" }, u: YT("search intent types seo tutorial urdu") },
  ],
  w3: [
    { t: { en: "Google Trends Official Guide", ur: "گوگل ٹرینڈز آفیشل گائیڈ" }, u: "https://support.google.com/trends/answer/4365533" },
    { t: { en: "Video Tutorial: Long-Tail Keyword Research with Free Tools", ur: "ویڈیو سبق: مفت ٹولز سے لانگ ٹیل کی ورڈز ریسرچ" }, u: YT("free keyword research tools 2026 urdu tutorial") },
    { t: { en: "DigiSkills Free SEO & Freelancing Training Portal", ur: "ڈیجی اسکلز مفت ایس ای او ٹریننگ پورٹل" }, u: "https://digiskills.pk/" },
  ],
  w4: [
    { t: { en: "Google Sitemaps Architecture Documentation", ur: "گوگل سائٹ میپ کی مکمل تفصیلات" }, u: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview" },
    { t: { en: "Video Tutorial: Competitor Keyword Gap Analysis", ur: "ویڈیو سبق: حریف کی ورڈ گیپ تجزیہ" }, u: YT("competitor keyword gap analysis free tutorial") },
  ],
  w5: [
    { t: { en: "Google Search Central: Title Links and Snippets Best Practices", ur: "ٹائٹل ٹیگز اور سنیپٹس کے سرکاری اصول" }, u: "https://developers.google.com/search/docs/appearance/title-link" },
    { t: { en: "Google Image SEO Best Practices", ur: "گوگل پر تصاویر کی بہترین ایس ای او" }, u: "https://developers.google.com/search/docs/appearance/google-images" },
    { t: { en: "Video Tutorial: Complete On-Page SEO Checklist (Urdu)", ur: "ویڈیو سبق: مکمل آن پیج ایس ای او چیک لسٹ (اردو)" }, u: YT("on page seo complete tutorial urdu hindi 2026") },
  ],
  w6: [
    { t: { en: "web.dev Official Core Web Vitals Documentation", ur: "سرکاری کور ویب وائٹلز دستاویزات" }, u: "https://web.dev/articles/vitals" },
    { t: { en: "PageSpeed Insights Real-time Tester", ur: "پیج اسپیڈ انسائٹس لائیو ٹیسٹر" }, u: "https://pagespeed.web.dev/" },
    { t: { en: "Video Tutorial: How to Fix LCP, INP, and CLS", ur: "ویڈیو سبق: LCP، INP، اور CLS کیسے ٹھیک کریں" }, u: YT("fix core web vitals LCP INP CLS tutorial") },
  ],
  w7: [
    { t: { en: "Google Rich Results Live Testing Suite", ur: "گوگل رچ رزلٹس لائیو ٹیسٹنگ سوٹ" }, u: "https://search.google.com/test/rich-results" },
    { t: { en: "Google Structured Data Search Gallery", ur: "گوگل اسٹرکچرڈ ڈیٹا سرچ گیلری" }, u: "https://developers.google.com/search/docs/appearance/structured-data/search-gallery" },
    { t: { en: "Video Tutorial: JSON-LD Schema Markup Masterclass", ur: "ویڈیو سبق: JSON-LD اسکیما ماسٹرکلاس" }, u: YT("json-ld schema markup tutorial seo") },
  ],
  w8: [
    { t: { en: "Google Business Profile Official Manager", ur: "گوگل بزنس پروفائل آفیشل مینیجر" }, u: "https://support.google.com/business/" },
    { t: { en: "Video Tutorial: How to Rank in Google Maps Pakistan", ur: "ویڈیو سبق: گوگل میپس پاکستان میں رینکنگ کیسے لیں" }, u: YT("google business profile ranking pakistan urdu tutorial") },
  ],
  w9: [
    { t: { en: "Google Search Blog: Guidance on AI-Generated Content", ur: "اے آئی مواد پر گوگل کا آفیشل بیان" }, u: "https://developers.google.com/search/blog/2023/02/google-search-and-ai-content" },
    { t: { en: "Search Quality Rater Guidelines (PDF)", ur: "سرچ کوالٹی ریٹر گائیڈ لائنز (پی ڈی ایف)" }, u: "https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf" },
    { t: { en: "Video Tutorial: E-E-A-T Implementation in Practice", ur: "ویڈیو سبق: عملی E-E-A-T کا طریقہ" }, u: YT("EEAT google seo practical tutorial 2026") },
  ],
  w10: [
    { t: { en: "Google Skillshop Free GA4 Certification Course", ur: "اسکل شاپ پر مفت GA4 سرٹیفکیٹ کورس" }, u: "https://skillshop.withgoogle.com/" },
    { t: { en: "Looker Studio Dashboard Builder", ur: "لُکر اسٹوڈیو ڈیش بورڈ بلڈر" }, u: "https://lookerstudio.google.com/" },
    { t: { en: "Video Tutorial: GA4 + Search Console Setup & Client Dashboard", ur: "ویڈیو سبق: GA4 اور سرچ کنسول سیٹ اپ اور رپورٹ" }, u: YT("GA4 search console setup tutorial urdu") },
  ],
  w11: [
    { t: { en: "Google Spam Policies: Link Spam Guidelines", ur: "گوگل لنک اسپام پالیسی گائیڈ لائنز" }, u: "https://developers.google.com/search/docs/essentials/spam-policies" },
    { t: { en: "Video Tutorial: White Hat Link Building Outreach (Urdu)", ur: "ویڈیو سبق: اخلاقی لنک بلڈنگ اور آؤٹ ریچ (اردو)" }, u: YT("white hat link building outreach tutorial 2026") },
  ],
  w12: [
    { t: { en: "Fiverr Seller Help Centre and Standards", ur: "فائیور سیلر ہیلپ سینٹر" }, u: "https://help.fiverr.com/hc/en-us" },
    { t: { en: "Upwork Resources for Top Freelancers", ur: "اپ ورک ریسورسز" }, u: "https://www.upwork.com/resources/" },
    { t: { en: "PSEB — Register as a Pakistani IT Freelancer", ur: "PSEB — فری لانسر رجسٹریشن فارم" }, u: "https://www.pseb.org.pk/" },
    { t: { en: "Video Tutorial: Winning Fiverr SEO Gig Setup (Pakistan)", ur: "ویڈیو سبق: فائیور ایس ای او گگ سیٹ اپ (پاکستان)" }, u: YT("fiverr seo gig setup pakistan urdu tutorial 2026") },
  ],
};
