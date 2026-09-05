export interface ResourceItem {
  n: string;
  u: string;
  d: { en: string; ur: string };
}

export interface ResourceCategory {
  cat: { en: string; ur: string };
  items: ResourceItem[];
}

export const RESOURCES: ResourceCategory[] = [
  {
    cat: { en: "Free Certified Courses", ur: "مفت سرٹیفائیڈ کورسز" },
    items: [
      {
        n: "Google Digital Garage — Fundamentals of Digital Marketing",
        u: "https://grow.google/certificates/digital-marketing-ecommerce/",
        d: { en: "26 interactive modules, free verified certificate", ur: "26 انٹرایکٹو ماڈیول، مفت سرٹیفکیٹ" },
      },
      {
        n: "DigiSkills.pk — SEO & Freelancing (Pakistan)",
        u: "https://digiskills.pk/",
        d: { en: "Free Pakistani government training programme, Urdu medium", ur: "مفت پاکستانی سرکاری پروگرام، اردو زبان میں" },
      },
      {
        n: "Google Analytics Skillshop — GA4",
        u: "https://skillshop.withgoogle.com/",
        d: { en: "Official Google certification for Analytics 4", ur: "گوگل اینالیٹکس 4 کا آفیشل سرٹیفکیٹ" },
      },
      {
        n: "HubSpot Academy — SEO Certification",
        u: "https://academy.hubspot.com/",
        d: { en: "Industry-standard free inbound SEO credential", ur: "مفت جامع ایس ای او سرٹیفکیشن" },
      },
      {
        n: "Semrush Academy",
        u: "https://www.semrush.com/academy/",
        d: { en: "Professional SEO workflows, video courses and exams", ur: "پیشہ ورانہ ایس ای او کورسز اور امتحانات" },
      },
    ],
  },
  {
    cat: { en: "Official Documentation & Guidelines", ur: "سرکاری دستاویزات اور گائیڈ لائنز" },
    items: [
      {
        n: "Google Search Central — SEO Starter Guide",
        u: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
        d: { en: "The official primary source for ranking on Google", ur: "گوگل پر رینکنگ کا سرکاری بنیادی ماخذ" },
      },
      {
        n: "Google Search Essentials & Spam Policies",
        u: "https://developers.google.com/search/docs/essentials",
        d: { en: "The official rules and algorithm spam guardrails", ur: "گوگل کے آفیشل قواعد اور پالیسیاں" },
      },
      {
        n: "Search Quality Rater Guidelines (PDF)",
        u: "https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf",
        d: { en: "The definitive 170-page manual explaining how Google raters evaluate E-E-A-T", ur: "E-E-A-T کا اصل 170 صفحاتی معیار" },
      },
      {
        n: "web.dev — Core Web Vitals",
        u: "https://web.dev/articles/vitals",
        d: { en: "Performance metrics for LCP, INP, and CLS", ur: "ویب اسپیڈ اور کارکردگی کے پیمانے" },
      },
      {
        n: "Schema.org Documentation",
        u: "https://schema.org/docs/full.html",
        d: { en: "Comprehensive directory of every structured data entity", ur: "تمام اسکیما اقسام کی مکمل ڈائریکٹری" },
      },
    ],
  },
  {
    cat: { en: "Essential Free Tools", ur: "ضروری مفت اوزار" },
    items: [
      {
        n: "Google Search Console",
        u: "https://search.google.com/search-console/about",
        d: { en: "Organic search queries, impressions, and index status", ur: "سرچ کارکردگی اور انڈیکسنگ ٹریکر" },
      },
      {
        n: "Google Analytics 4",
        u: "https://analytics.google.com/",
        d: { en: "User events, visitor journeys, and lead conversions", ur: "سائٹ پر صارفین کا رویہ اور کنورژن" },
      },
      {
        n: "PageSpeed Insights",
        u: "https://pagespeed.web.dev/",
        d: { en: "Real-user field data and lab performance diagnostics", ur: "کور ویب وائٹلز لیب اور فیلڈ ڈیٹا" },
      },
      {
        n: "Google Rich Results Test",
        u: "https://search.google.com/test/rich-results",
        d: { en: "Validate JSON-LD schema with zero errors", ur: "اسٹرکچرڈ ڈیٹا کی لائیو جانچ" },
      },
      {
        n: "Google Trends",
        u: "https://trends.google.com/trends/",
        d: { en: "Compare search volume and seasonal city interest", ur: "موسمی رجحان اور شہری دلچسپی" },
      },
      {
        n: "Google Keyword Planner",
        u: "https://ads.google.com/home/tools/keyword-planner/",
        d: { en: "Official search volume estimates and CPC metrics", ur: "گوگل کا مفت کی ورڈ پلانر" },
      },
      {
        n: "Looker Studio",
        u: "https://lookerstudio.google.com/",
        d: { en: "Free automated monthly visual client reporting dashboards", ur: "کلائنٹ کے لیے خوبصورت مفت رپورٹس" },
      },
      {
        n: "Google Business Profile",
        u: "https://www.google.com/business/",
        d: { en: "Map pack listing, local citations and reviews", ur: "مقامی دکان اور میپس لسٹنگ مینیجر" },
      },
    ],
  },
  {
    cat: { en: "Pakistani Freelancing Ecosystem", ur: "پاکستانی فری لانسنگ وسائل" },
    items: [
      {
        n: "Fiverr Seller Help Centre",
        u: "https://help.fiverr.com/hc/en-us",
        d: { en: "Gig policies, ranking algorithms, and order best practices", ur: "فائیور گگ کے قواعد اور سیلر رہنمائی" },
      },
      {
        n: "Upwork Freelancer Resources",
        u: "https://www.upwork.com/resources/",
        d: { en: "Proposal frameworks, client contracts, and escrow safeguards", ur: "اپ ورک پروپوزلز اور معاہدے" },
      },
      {
        n: "PSEB — Pakistan Software Export Board",
        u: "https://www.pseb.org.pk/",
        d: { en: "Official freelancer registration, income tax exemptions, and banking facilitation", ur: "فری لانسر رجسٹریشن اور ٹیکس مراعات" },
      },
      {
        n: "Payoneer & Wise",
        u: "https://www.payoneer.com/",
        d: { en: "Direct USD/EUR client earnings into Pakistani bank accounts", ur: "بین الاقوامی ادائیگیاں پاکستانی بینک میں لائیں" },
      },
    ],
  },
];
