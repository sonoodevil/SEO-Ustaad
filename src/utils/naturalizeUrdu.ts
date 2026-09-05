/**
 * Urdu to Natural English terms transliteration dictionary.
 * Pakistani SEO instructors speak sentences in Urdu, but pronounce technical terminology
 * (crawling, indexing, keywords, backlinks, title tag, robots.txt, schema, etc.) in clean English.
 */

const URDU_TO_EN_DICTIONARY: Array<[string, string]> = [
  // Plurals and compound terms first
  ["سرچ انجن آپٹیمائزیشن", "Search Engine Optimization"],
  ["سرچ انجن رزلٹ پیج", "Search Engine Results Page"],
  ["گوگل سرچ کنسول", "Google Search Console"],
  ["گوگل سرچ سینٹرل", "Google Search Central"],
  ["گوگل بزنس پروفائل", "Google Business Profile"],
  ["گوگل ڈیجیٹل گیراج", "Google Digital Garage"],
  ["گوگل اینالیٹکس", "Google Analytics"],
  ["گوگل ٹیگ مینیجر", "Google Tag Manager"],
  ["گوگل کی ورڈ پلانر", "Google Keyword Planner"],
  ["گوگل ٹرینڈز", "Google Trends"],
  ["گوگل میپس", "Google Maps"],
  ["گوگل بوٹ", "Googlebot"],
  ["کور ویب وائٹلز", "Core Web Vitals"],
  ["لارجسٹ کنٹینٹ فل پینٹ", "Largest Contentful Paint"],
  ["انٹریکشن ٹو نیکسٹ پینٹ", "Interaction to Next Paint"],
  ["کیوملیٹو لے آؤٹ شفٹ", "Cumulative Layout Shift"],
  ["ٹائم ٹو فرسٹ بائٹ", "Time to First Byte"],
  ["ریچ رزلٹس ٹیسٹ", "Rich Results Test"],
  ["پیج اسپیڈ انسائٹس", "PageSpeed Insights"],
  ["لوکل بزنس اسکیما", "LocalBusiness schema"],
  ["اسٹرکچرڈ ڈیٹا", "structured data"],
  ["اسکیما مارک اپ", "schema markup"],
  ["موضوعاتی گچھا", "topic cluster"],
  ["موضوعاتی گچھے", "topic clusters"],
  ["موضوعاتی گچھوں", "topic clusters"],
  ["کی ورڈ ریسرچ", "keyword research"],
  ["لانگ ٹیل کی ورڈز", "long-tail keywords"],
  ["لانگ ٹیل کی ورڈ", "long-tail keyword"],
  ["لانگ ٹیل", "long tail"],
  ["شارٹ ٹیل", "short tail"],
  ["کی ورڈ گیپ تجزیہ", "keyword gap analysis"],
  ["کی ورڈ گیپ", "keyword gap"],
  ["کی ورڈ اسٹفنگ", "keyword stuffing"],
  ["سرچ انٹینٹ", "search intent"],
  ["سرچ والیم", "search volume"],
  ["سرچ والیوم", "search volume"],
  ["سرچ کنسول", "Search Console"],
  ["سرچ انجن", "search engine"],
  ["ڈیجی اسکلز", "DigiSkills"],
  ["فری لانسنگ", "freelancing"],
  ["فری لانسرز", "freelancers"],
  ["فری لانسر", "freelancer"],

  // Search Engine & Tech
  ["کرالنگ", "crawling"],
  ["کرالرز", "crawlers"],
  ["کرالر", "crawler"],
  ["کرال", "crawl"],
  ["انڈیکسنگ", "indexing"],
  ["انڈیکسڈ", "indexed"],
  ["انڈیکس", "index"],
  ["رینکنگز", "rankings"],
  ["رینکنگ", "ranking"],
  ["رینک", "rank"],
  ["الگورتھمز", "algorithms"],
  ["الگورتھم", "algorithm"],
  ["کرال بجٹ", "crawl budget"],
  ["سرپ فیچرز", "SERP features"],
  ["سرپ", "SERP"],
  ["سنیپٹس", "snippets"],
  ["سنیپٹ", "snippet"],
  ["فیچرڈ سنیپٹ", "featured snippet"],
  ["نو انڈیکس", "noindex"],
  ["کینونیکل ٹیگ", "canonical tag"],
  ["کینونیکل ٹیگز", "canonical tags"],
  ["کینونیکل", "canonical"],
  ["سائٹ میپس", "sitemaps"],
  ["سائٹ میپ", "sitemap"],
  ["ری ڈائریکٹس", "redirects"],
  ["ری ڈائریکٹ", "redirect"],

  // On-page & Technical
  ["ٹائٹل ٹیگز", "title tags"],
  ["ٹائٹل ٹیگ", "title tag"],
  ["میٹا تفصیلات", "meta descriptions"],
  ["میٹا تفصیل", "meta description"],
  ["میٹا ڈسکرپشن", "meta description"],
  ["میٹا ٹیگز", "meta tags"],
  ["میٹا ٹیگ", "meta tag"],
  ["میٹا", "meta"],
  ["آلٹ ٹیکسٹ", "alt text"],
  ["آلٹ ٹیگز", "alt tags"],
  ["آلٹ ٹیگ", "alt tag"],
  ["پرمالنکس", "permalinks"],
  ["پرمالنک", "permalink"],
  ["یو آر ایلز", "URLs"],
  ["یو آر ایل", "URL"],
  ["سلگز", "slugs"],
  ["سلگ", "slug"],
  ["اینکر ٹیکسٹ", "anchor text"],
  ["اینکرز", "anchors"],
  ["اینکر", "anchor"],
  ["ہیڈنگز", "headings"],
  ["ہیڈنگ", "heading"],
  ["اندرونی لنکس", "internal links"],
  ["اندرونی لنک", "internal link"],
  ["بیرونی لنکس", "external links"],
  ["بیرونی لنک", "external link"],
  ["بروکن لنکس", "broken links"],
  ["بروکن لنک", "broken link"],
  ["بیک لنکس", "backlinks"],
  ["بیک لنک", "backlink"],
  ["لنک بلڈنگ", "link building"],
  ["لنکس", "links"],
  ["لنک", "link"],

  // Analytics & Local
  ["اینالیٹکس", "Analytics"],
  ["ایونٹس", "events"],
  ["ایونٹ", "event"],
  ["کنورژنز", "conversions"],
  ["کنورژن", "conversion"],
  ["امپریشنز", "impressions"],
  ["امپریشن", "impression"],
  ["کلکس", "clicks"],
  ["کلک کی شرح", "click-through rate"],
  ["کلک", "click"],
  ["ٹریفک", "traffic"],
  ["ڈیش بورڈز", "dashboards"],
  ["ڈیش بورڈ", "dashboard"],
  ["رپورٹس", "reports"],
  ["رپورٹ", "report"],
  ["ڈیٹا", "data"],
  ["سائٹیشنز", "citations"],
  ["سائٹیشن", "citation"],
  ["ریویوز", "reviews"],
  ["ریویو", "review"],
  ["کیٹیگریز", "categories"],
  ["کیٹیگری", "category"],
  ["نقشہ پیک", "map pack"],
  ["ڈوروے پیجز", "doorway pages"],
  ["ڈوروے پیج", "doorway page"],
  ["ڈائریکٹریز", "directories"],
  ["ڈائریکٹری", "directory"],

  // Freelancing & proposals
  ["فائیور گگز", "Fiverr gigs"],
  ["فائیور گگ", "Fiverr gig"],
  ["فائیور", "Fiverr"],
  ["اپ ورک پروپوزلز", "Upwork proposals"],
  ["اپ ورک پروپوزل", "Upwork proposal"],
  ["اپ ورک", "Upwork"],
  ["گگز", "gigs"],
  ["گگ", "gig"],
  ["پروپوزلز", "proposals"],
  ["پروپوزل", "proposal"],
  ["کلائنٹس", "clients"],
  ["کلائنٹ", "client"],
  ["گاہکوں", "clients"],
  ["گاہک", "client"],
  ["ریٹینرز", "retainers"],
  ["ریٹینر", "retainer"],
  ["مائل اسٹونز", "milestones"],
  ["مائل اسٹون", "milestone"],
  ["پورٹ فولیوز", "portfolios"],
  ["پورٹ فولیو", "portfolio"],
  ["آڈٹس", "audits"],
  ["آڈٹ", "audit"],
  ["پیکجز", "packages"],
  ["پیکج", "package"],
  ["ای میلز", "emails"],
  ["ای میل", "email"],
  ["واٹس ایپ", "WhatsApp"],

  // Tech items
  ["ویب سائٹس", "websites"],
  ["ویب سائٹ", "website"],
  ["ویب پیجز", "web pages"],
  ["ویب پیج", "web page"],
  ["صفحات", "pages"],
  ["صفحہ", "page"],
  ["پروڈکٹس", "products"],
  ["پروڈکٹ", "product"],
  ["سروسز", "services"],
  ["سروس", "service"],
  ["ٹیمپلیٹس", "templates"],
  ["ٹیمپلیٹ", "template"],
  ["چیک لسٹس", "checklists"],
  ["چیک لسٹ", "checklist"],
  ["اسکرین شاٹس", "screenshots"],
  ["اسکرین شاٹ", "screenshot"],
  ["فائلز", "files"],
  ["فائل", "file"],
  ["فولڈرز", "folders"],
  ["فولڈر", "folder"],
  ["ٹولز", "tools"],
  ["ٹول", "tool"],
  ["کوئزز", "quizzes"],
  ["کوئز", "quiz"],
  ["کی ورڈز", "keywords"],
  ["کی ورڈ", "keyword"],
  ["گوگل", "Google"],
  ["بنگ", "Bing"]
];

// Sort descending by length so longer phrases match first
const SORTED_DICTIONARY = [...URDU_TO_EN_DICTIONARY].sort(
  (a, b) => b[0].length - a[0].length
);

/**
 * Transforms Urdu text so that technical terms are English words,
 * and fixes Urdu attached plural suffixes (e.g. "linkس" -> "links", "tagز" -> "tags").
 */
export function naturalizeUrdu(text: string): string {
  if (!text) return "";
  let out = String(text);

  // 1. Replace multi-word and single-word phrases
  for (const [urduTerm, enTerm] of SORTED_DICTIONARY) {
    out = out.split(urduTerm).join(enTerm);
  }

  // 2. Fix Urdu plural suffixes stuck to English words:
  // e.g. "linkس" -> "links", "tagز" -> "tags", "keywordس" -> "keywords"
  out = out.replace(/([A-Za-z]+)(?:س|ز)(?![\u0600-\u06FF])/g, "$1s");

  // 3. Ensure appropriate spacing between English words and Urdu characters
  out = out.replace(/([A-Za-z0-9])([\u0600-\u06FF])/g, "$1 $2");
  out = out.replace(/([\u0600-\u06FF])([A-Za-z0-9])/g, "$1 $2");

  // 4. Normalize multiple spaces
  out = out.replace(/\s{2,}/g, " ");

  return out.trim();
}
