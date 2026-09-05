import { PracticalTemplate } from "../types";

export const TEMPLATES: PracticalTemplate[] = [
  {
    id: "audit",
    name: { en: "Technical SEO Audit Checklist", ur: "ٹیکنیکل ایس ای او آڈٹ چیک لسٹ" },
    desc: {
      en: "38-point client audit checklist. Tick items as you inspect, then copy the formatted report to send to your client.",
      ur: "38 نکاتی چیک لسٹ۔ معائنے کے دوران نشان لگائیں، پھر بھری ہوئی رپورٹ کاپی کر کے کلائنٹ کو بھیجیں۔",
    },
    kind: "checklist",
    groups: [
      {
        g: { en: "Crawling & Indexing", ur: "کرالنگ اور انڈیکسنگ" },
        items: [
          { en: "robots.txt exists and does not Disallow important folders", ur: "robots.txt موجود ہے اور اہم فولڈرز بلاک نہیں کرتا" },
          { en: "XML sitemap submitted in Search Console and listed in robots.txt", ur: "سائٹ میپ سرچ کنسول میں جمع اور robots.txt میں درج ہے" },
          { en: "Sitemap contains only canonical 200-status URLs", ur: "سائٹ میپ میں صرف کینونیکل 200 والے یو آر ایل ہیں" },
          { en: "site: count roughly matches the expected page count", ur: "site: کی گنتی متوقع صفحات کے قریب ہے" },
          { en: "No accidental noindex on live templates", ur: "لائیو ٹیمپلیٹس پر غلطی سے noindex نہیں لگا" },
          { en: "No orphan pages (every page has an internal link)", ur: "کوئی صفحہ لنک کے بغیر لاوارث نہیں" },
          { en: "Pagination and faceted URLs handled (canonical / robots)", ur: "پیجینیشن اور فلٹر یو آر ایل سنبھالے گئے ہیں" },
          { en: "404s return 404, soft-404s fixed", ur: "404 صفحات درست 404 دیتے ہیں، سافٹ 404 ٹھیک ہیں" },
        ],
      },
      {
        g: { en: "Site Architecture & URLs", ur: "ساخت اور یو آر ایل" },
        items: [
          { en: "Clean lowercase hyphenated slugs, no parameters in main URLs", ur: "صاف، چھوٹے حروف، ہائفن والے سلگ، پیرامیٹر نہیں" },
          { en: "Every important page within 3 clicks of the homepage", ur: "ہر اہم صفحہ ہوم پیج سے تین کلک کے اندر ہے" },
          { en: "Breadcrumbs present and marked up with BreadcrumbList schema", ur: "بریڈکرمب موجود اور مارک اپ شدہ ہیں" },
          { en: "One canonical domain (www vs non-www) with 301s", ur: "ایک کینونیکل ڈومین اور 301 ری ڈائریکٹ لگا ہوا ہے" },
          { en: "Redirect chains and loops completely removed", ur: "ری ڈائریکٹ کی زنجیریں اور لوپس ختم کر دیے گئے" },
          { en: "Internal links use descriptive keyword-rich anchors", ur: "اندرونی لنک وضاحتی اینکر استعمال کرتے ہیں" },
        ],
      },
      {
        g: { en: "On-Page Optimization", ur: "آن پیج آپٹیمائزیشن" },
        items: [
          { en: "Unique title tag on every page, 50-60 characters", ur: "ہر صفحے پر منفرد عنوان، 50 تا 60 حروف" },
          { en: "Unique meta description, 140-160 characters", ur: "منفرد میٹا تفصیل، 140 تا 160 حروف" },
          { en: "Exactly one H1 per page, matching the title's promise", ur: "ہر صفحے پر ایک H1 جو عنوان سے میل کھائے" },
          { en: "Logical H2/H3 hierarchy, no skipped levels", ur: "منطقی H2/H3 ترتیب، کوئی درجہ چھوٹا نہیں" },
          { en: "All content images have meaningful alt text", ur: "تمام مواد کی تصاویر میں بامعنی آلٹ ٹیکسٹ موجود ہے" },
          { en: "No keyword stuffing or hidden text", ur: "کی ورڈ ٹھونسنا یا چھپا متن موجود نہیں" },
          { en: "Thin and duplicate pages consolidated or pruned", ur: "پتلے اور نقل صفحات یکجا کر دیے گئے" },
        ],
      },
      {
        g: { en: "Performance & Core Web Vitals", ur: "کارکردگی اور کور ویب وائٹلز" },
        items: [
          { en: "LCP ≤ 2.5s on mobile field data", ur: "موبائل فیلڈ ڈیٹا میں LCP 2.5 سیکنڈ یا کم ہے" },
          { en: "INP ≤ 200ms responsiveness", ur: "INP 200 ملی سیکنڈ یا کم ہے" },
          { en: "CLS ≤ 0.1 visual stability", ur: "CLS 0.1 یا کم ہے" },
          { en: "Images compressed, WebP/AVIF, lazy-loaded below the fold", ur: "تصاویر دبی ہوئی، WebP/AVIF، لیزی لوڈڈ" },
          { en: "Width and height set on all images to reserve layout space", ur: "تمام تصاویر پر width اور height لگی ہے" },
          { en: "Render-blocking CSS/JS minimised, unused code removed", ur: "رینڈر روکنے والی CSS/JS کم سے کم ہے" },
          { en: "Caching and compression (gzip/brotli) enabled on server", ur: "کیشنگ اور کمپریشن فعال ہے" },
        ],
      },
      {
        g: { en: "Mobile, Security & Structured Data", ur: "موبائل، سیکیورٹی اور اسٹرکچرڈ ڈیٹا" },
        items: [
          { en: "Fully responsive; no content hidden only on mobile", ur: "مکمل ریسپانسو؛ کوئی مواد موبائل پر غائب نہیں" },
          { en: "Tap targets and font sizes comfortable on mobile screens", ur: "بٹن اور فونٹ فون پر آرام دہ ہیں" },
          { en: "HTTPS everywhere, no mixed content warnings", ur: "ہر جگہ HTTPS، مکسڈ کنٹینٹ وارننگ نہیں" },
          { en: "Valid JSON-LD for the page's primary type", ur: "صفحے کی بنیادی قسم کا درست JSON-LD موجود ہے" },
          { en: "Organization + LocalBusiness schema on appropriate pages", ur: "درست صفحات پر Organization اور LocalBusiness اسکیما" },
          { en: "Rich Results Test passes with zero critical errors", ur: "Rich Results Test بغیر کسی ایرر کے پاس ہوتا ہے" },
          { en: "Search Console Enhancements report clean", ur: "سرچ کنسول Enhancements رپورٹ صاف ہے" },
        ],
      },
      {
        g: { en: "Analytics & Local SEO", ur: "اینالیٹکس اور لوکل ایس ای او" },
        items: [
          { en: "GA4 installed with key events for every lead path", ur: "GA4 لگا ہوا ہے، ہر لیڈ کے لیے key event موجود ہے" },
          { en: "Search Console verified and linked to GA4 property", ur: "سرچ کنسول تصدیق شدہ اور GA4 سے منسلک ہے" },
          { en: "Internal traffic filtered out by IP", ur: "اندرونی ٹریفک فلٹر شدہ ہے" },
          { en: "Google Business Profile complete with correct primary category", ur: "گوگل بزنس پروفائل مکمل، درست بنیادی کیٹیگری" },
          { en: "NAP identical on site footer, GBP and Pakistani directories", ur: "سائٹ، GBP اور بڑی ڈائریکٹریز پر NAP یکساں ہے" },
        ],
      },
    ],
  },
  {
    id: "intent",
    name: { en: "Search Intent Mapping Sheet", ur: "سرچ انٹینٹ میپنگ شیٹ" },
    desc: {
      en: "Map each keyword to intent, page type and target URL before writing anything.",
      ur: "کچھ لکھنے سے پہلے ہر کی ورڈ کو انٹینٹ، صفحے کی قسم اور ہدف یو آر ایل سے جوڑیں۔",
    },
    kind: "table",
    columns: [
      { en: "Keyword", ur: "کی ورڈ" },
      { en: "Intent (I/N/C/T)", ur: "انٹینٹ" },
      { en: "SERP format seen", ur: "نتائج کی شکل" },
      { en: "Page type to build", ur: "بنانے والا صفحہ" },
      { en: "Target URL", ur: "ہدف یو آر ایل" },
      { en: "Priority 1-5", ur: "ترجیح 1-5" },
    ],
    seed: [
      ["what is local seo", "Informational", "Guides + PAA", "Blog guide", "/blog/what-is-local-seo/", "3"],
      ["how to add business on google maps", "Informational", "How-to + video", "Step-by-step tutorial", "/blog/add-business-google-maps/", "3"],
      ["why is my website not showing on google", "Informational", "Guides + forums", "Troubleshooting guide", "/blog/site-not-showing-google/", "4"],
      ["core web vitals kaise theek karein", "Informational", "Guides + video", "Bilingual how-to", "/blog/core-web-vitals-urdu/", "3"],
      ["best seo agency lahore", "Commercial", "Listicles + map pack", "Comparison page", "/best-seo-agency-lahore/", "5"],
      ["seo agency vs freelancer", "Commercial", "Comparison posts", "Comparison table", "/blog/agency-vs-freelancer/", "4"],
      ["top 10 digital marketing companies pakistan", "Commercial", "Listicles", "Listicle + our entry", "/blog/top-digital-marketing-pakistan/", "4"],
      ["seo services pricing pakistan", "Transactional", "Service pages", "Pricing page", "/pricing/", "5"],
      ["hire seo expert lahore", "Transactional", "Service + ads", "Service landing page", "/services/seo-lahore/", "5"],
      ["google business profile optimization service", "Transactional", "Service pages", "Service page", "/services/gbp-optimization/", "5"],
      ["technical seo audit cost", "Transactional", "Pricing + guides", "Pricing page + calculator", "/pricing/audit/", "5"],
      ["nexus home login", "Navigational", "Brand result", "Homepage", "/", "1"],
      ["digiskills seo course", "Navigational", "Official site", "Resource page linking out", "/resources/free-courses/", "2"],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
    ],
  },
  {
    id: "keywords",
    name: { en: "Keyword Research Planner", ur: "کی ورڈ ریسرچ پلانر" },
    desc: {
      en: "Collect, score and cluster keywords. Priority = (Value × Intent × Achievability) ÷ Effort.",
      ur: "کی ورڈ جمع کریں، نمبر دیں اور گچھے بنائیں۔ ترجیح = (قدر × ارادہ × گنجائش) ÷ محنت۔",
    },
    kind: "table",
    columns: [
      { en: "Keyword", ur: "کی ورڈ" },
      { en: "Cluster", ur: "گچھا" },
      { en: "Volume (est.)", ur: "تخمینی والیوم" },
      { en: "Difficulty E/M/H", ur: "مشکل آ/د/م" },
      { en: "Business value 1-5", ur: "کاروباری قدر 1-5" },
      { en: "Assigned page", ur: "مقررہ صفحہ" },
      { en: "Status", ur: "حالت" },
    ],
    seed: [
      ["local seo services lahore", "Local SEO", "320", "M", "5", "/services/local-seo-lahore/", "Planned"],
      ["google business profile optimization", "Local SEO", "210", "E", "5", "/services/gbp-optimization/", "Draft"],
      ["how to add business on google maps", "Local SEO", "1400", "E", "3", "/blog/add-business-google-maps/", "Live"],
      ["google maps par business kaise laayein", "Local SEO", "480", "E", "3", "/blog/google-maps-business-urdu/", "Planned"],
      ["citation building services pakistan", "Local SEO", "90", "E", "4", "/services/citations/", "Planned"],
      ["technical seo audit checklist", "Technical SEO", "2900", "H", "4", "/blog/technical-seo-audit-checklist/", "Draft"],
      ["how to fix core web vitals", "Technical SEO", "1100", "M", "4", "/blog/fix-core-web-vitals/", "Planned"],
      ["what is robots txt file", "Technical SEO", "3600", "M", "2", "/blog/robots-txt-explained/", "Live"],
      ["schema markup generator free", "Technical SEO", "1900", "H", "3", "/tools/schema-generator/", "Planned"],
      ["xml sitemap best practices", "Technical SEO", "720", "M", "3", "/blog/xml-sitemap-guide/", "Planned"],
      ["long tail keyword research free tools", "Keywords", "880", "M", "4", "/blog/free-keyword-research/", "Draft"],
      ["competitor keyword gap analysis", "Keywords", "590", "M", "4", "/blog/keyword-gap-analysis/", "Planned"],
      ["search intent types seo", "Keywords", "1300", "M", "3", "/blog/search-intent-guide/", "Live"],
      ["fiverr seo gig ideas", "Freelancing", "1600", "E", "5", "/blog/fiverr-seo-gig-setup/", "Draft"],
      ["upwork proposal sample seo", "Freelancing", "720", "E", "5", "/blog/upwork-seo-proposal/", "Planned"],
      ["seo freelancing in pakistan", "Freelancing", "2400", "M", "5", "/blog/seo-freelancing-pakistan/", "Planned"],
      ["freelancer registration pseb", "Freelancing", "1100", "E", "2", "/blog/pseb-registration-guide/", "Planned"],
      ["ga4 setup for beginners", "Analytics", "2100", "H", "3", "/blog/ga4-setup-guide/", "Planned"],
      ["search console positions 8 to 20", "Analytics", "70", "E", "5", "/blog/striking-distance-keywords/", "Draft"],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ],
  },
  {
    id: "proposal",
    name: { en: "Upwork / Fiverr Client Proposal Pitches", ur: "اپ ورک / فائیور کلائنٹ پروپوزل" },
    desc: {
      en: "Four ready-to-use proven proposal pitches in English and Urdu. Replace bracketed placeholders and send.",
      ur: "انگریزی اور اردو میں چار تیار پیغامات۔ بریکٹ میں دیے گئے الفاظ بدلیں اور کلائنٹ کو بھیجیں۔",
    },
    kind: "pitches",
    pitches: [
      {
        title: { en: "Upwork — Technical SEO Audit & Speed Fixes", ur: "اپ ورک — ٹیکنیکل ایس ای او اور اسپیڈ فکسز" },
        body: {
          en: `Hi [Name],

I opened [website.com] before writing: your product pages are missing canonical tags, so [340] near-duplicate URLs are currently indexed, and your mobile LCP is [4.2s] against Google's 2.5s threshold. Those two issues alone explain most of the traffic plateau you described.

First 14 days I would:
• Fix canonicals and consolidate duplicate URLs, then re-submit a clean XML sitemap
• Cut LCP under 2.5s (image compression, WebP, lazy-loading, render-blocking scripts)
• Ship Product + Organization JSON-LD and clear all Search Console errors

On a similar [Shopify] store I took indexed duplicates from 512 to 46 and organic clicks from [1,900] to [4,300] a month in 90 days.

One question: is your development team available for template changes, or should I deliver code-ready patches?

I have attached a free 2-page audit of your top 5 pages so you can judge the work before hiring.

[Your Name] — [Portfolio Link]`,
          ur: `السلام علیکم [نام] صاحب،

لکھنے سے پہلے میں نے [website.com] کھول کر دیکھی: آپ کے پروڈکٹ صفحات پر کینونیکل ٹیگ نہیں، اس لیے اس وقت [340] تقریباً ایک جیسے یو آر ایل انڈیکس ہیں، اور موبائل LCP [4.2 سیکنڈ] ہے جبکہ گوگل کی حد 2.5 سیکنڈ ہے۔ آپ نے جس ٹریفک کے رک جانے کا ذکر کیا، اس کی بڑی وجہ یہی دو مسئلے ہیں۔

پہلے 14 دن میں:
• کینونیکل درست کروں گا، نقل یو آر ایل یکجا کروں گا اور صاف سائٹ میپ دوبارہ جمع کراؤں گا
• LCP کو 2.5 سیکنڈ سے نیچے لاؤں گا (تصاویر، WebP، لیزی لوڈ، رینڈر روکنے والی اسکرپٹ)
• Product اور Organization کا JSON-LD لگا کر سرچ کنسول کی تمام غلطیاں ختم کروں گا

اسی طرح کے ایک [شاپیفائی] اسٹور پر میں نے نقل انڈیکس 512 سے 46 اور آرگینک کلک [1,900] سے [4,300] ماہانہ تک 90 دن میں پہنچائے۔

ایک سوال: ٹیمپلیٹ کی تبدیلی کے لیے آپ کی ڈویلپمنٹ ٹیم دستیاب ہے یا میں کوڈ تیار کر کے دوں؟

آپ کے پانچ بڑے صفحات کا دو صفحاتی مفت آڈٹ منسلک ہے تاکہ ہائر کرنے سے پہلے کام دیکھ لیں۔

[آپ کا نام] — [پورٹ فولیو لنک]`,
        },
      },
      {
        title: { en: "Upwork — Local SEO / Google Business Profile", ur: "اپ ورک — لوکل ایس ای او / گوگل بزنس پروفائل" },
        body: {
          en: `Hi [Name],

I searched "[service] in [city]" from a [city] IP: you rank [#7] in the map pack while the top three each have 100+ reviews and a primary category of "[correct category]" — yours is set to "[wrong category]", which is the single biggest reason you are below them.

My 30-day plan:
• Correct the primary and secondary categories, complete services, products, attributes and hours
• Add 20+ geo-tagged photos and start weekly GBP posts
• Launch a same-day WhatsApp review request flow (target: [25] new reviews in month one)
• Fix NAP across [8] local directories and add LocalBusiness schema to your site

For a [Gulberg clinic] this moved them from position 8 to the top 3 in 6 weeks and calls from the profile rose [140%].

Would you like the first-week audit before we agree scope? It is free.

[Your Name]`,
          ur: `السلام علیکم [نام] صاحب،

میں نے [شہر] کی IP سے "[خدمت] in [شہر]" تلاش کیا: آپ نقشے میں [ساتویں] نمبر پر ہیں جبکہ پہلے تین کے پاس سو سے زیادہ ریویو ہیں اور بنیادی کیٹیگری "[درست کیٹیگری]" ہے — آپ کی "[غلط کیٹیگری]" لگی ہے، اور نیچے ہونے کی سب سے بڑی وجہ یہی ہے۔

تیس دن کا منصوبہ:
• بنیادی و ثانوی کیٹیگری درست، خدمات، پروڈکٹ، خصوصیات اور اوقات مکمل
• بیس سے زیادہ جیو ٹیگ تصاویر اور ہفتہ وار GBP پوسٹ
• اسی دن واٹس ایپ پر ریویو کی درخواست کا نظام (ہدف: پہلے مہینے [25] نئے ریویو)
• [8] پاکستانی ڈائریکٹریز پر NAP درست اور سائٹ پر LocalBusiness اسکیما

[گلبرگ کے ایک کلینک] کے لیے یہی کام چھ ہفتوں میں آٹھویں سے پہلے تین میں لے آیا اور پروفائل سے کالیں [140%] بڑھیں۔

دائرہ کار طے کرنے سے پہلے پہلے ہفتے کا آڈٹ چاہیں گے؟ وہ مفت ہے۔

[آپ کا نام]`,
        },
      },
      {
        title: { en: "Fiverr — Inbound Buyer Message Reply", ur: "فائیور — کلائنٹ میسج کا جواب" },
        body: {
          en: `Thank you for reaching out!

Before quoting, I checked [website.com]. Two quick observations: your title tags repeat on [12] pages, and your Google Business Profile has no primary category set — both are fixable this week.

Here is what fits your goal of [more calls from Lahore]:
• BASIC ($[35]) — full audit report + 5 high-priority quick wins
• STANDARD ($[85]) — full audit + on-page fixes on 10 pages + GBP optimisation, delivered in 5 days
• PREMIUM ($[220]/month) — complete SEO: content, citations, review flow and monthly reporting

What I need from you: website admin access, GBP manager access, and your top 3 competitors.

I do not promise position #1 — nobody honestly can. I promise the technical foundation, weekly progress, and a report you can verify in your own Search Console.

Shall I start with the free mini-audit today?`,
          ur: `رابطے کا شکریہ!

قیمت بتانے سے پہلے میں نے [website.com] دیکھی۔ دو باتیں: [12] صفحات پر عنوان دہرائے گئے ہیں، اور آپ کے گوگل بزنس پروفائل میں بنیادی کیٹیگری ہی مقرر نہیں — دونوں اسی ہفتے ٹھیک ہو سکتے ہیں۔

آپ کے مقصد [لاہور سے زیادہ کالیں] کے لیے مناسب:
• بنیادی ([35] ڈالر) — مکمل آڈٹ رپورٹ + 5 فوری ترجیحی فکسز
• اسٹینڈرڈ ([85] ڈالر) — مکمل آڈٹ + دس صفحات کی آن پیج درستی + GBP بہتری، پانچ دن میں
• پریمیم ([220] ڈالر ماہانہ) — مندرجہ بالا کے ساتھ مواد، سائٹیشن، ریویو نظام اور ماہانہ رپورٹ

مجھے آپ سے چاہیے: ویب سائٹ ایڈمن رسائی، GBP مینیجر رسائی، اور آپ کے تین بڑے حریف۔

میں پہلی پوزیشن کا وعدہ نہیں کرتا — کوئی ایمانداری سے نہیں کر سکتا۔ میں تکنیکی بنیاد، ہفتہ وار پیش رفت اور ایسی رپورٹ کا وعدہ کرتا ہوں جسے آپ اپنے سرچ کنسول میں خود جانچ سکیں۔

کیا آج مفت مختصر آڈٹ سے آغاز کروں؟`,
        },
      },
      {
        title: { en: "Direct Client — Monthly Retainer Proposal", ur: "ڈائریکٹ کلائنٹ — ماہانہ ریٹینر تجویز" },
        body: {
          en: `SEO RETAINER PROPOSAL — [Client Name]
Prepared by [Your Name], [Date]

1. WHERE YOU ARE TODAY
• Organic clicks last 28 days: [1,240] (position 8-20 for [46] commercial queries)
• Indexed pages: [212] of [340]  •  Mobile LCP: [4.1s]  •  Reviews: [23], last one [4 months] ago

2. WHAT WE WILL DO EACH MONTH (PKR [60,000] / $[220])
• 4 optimised articles targeting striking-distance keywords
• On-page fixes on 8 existing pages
• Technical maintenance: Core Web Vitals, schema, index coverage
• Local: GBP posts, review requests, citation fixes
• 5 relevant link prospects contacted
• One-page report tying work to leads, delivered on the 3rd of each month

3. WHAT WE EXPECT
Months 1-2: technical foundation, indexing and speed corrected.
Month 3: first ranking movement on striking-distance terms.
Months 4-6: compounding growth in organic leads.
No honest agency can guarantee positions; we guarantee the work, transparency and verifiable reporting.

4. TERMS
50% advance, 50% on the 25th. Three-month minimum, then month-to-month. All accounts and content remain your 100% property.

Accepted: ____________________  Date: __________`,
          ur: `ایس ای او ریٹینر تجویز — [گاہک کا نام]
تیار کردہ [آپ کا نام]، [تاریخ]

1۔ آج آپ کہاں ہیں
• پچھلے 28 دن کے آرگینک کلک: [1,240] ([46] تجارتی سوالات پر پوزیشن 8 تا 20)
• انڈیکس صفحات: [340] میں سے [212]  •  موبائل LCP: [4.1 سیکنڈ]  •  ریویو: [23]، آخری [چار ماہ] پہلے

2۔ ہر ماہ کیا ہوگا (60,000 روپے / 220 ڈالر)
• قریب کی پوزیشن والے کی ورڈ پر 4 بہتر مضامین
• 8 موجودہ صفحات کی آن پیج درستی
• تکنیکی دیکھ بھال: کور ویب وائٹلز، اسکیما، انڈیکس کوریج
• لوکل: GBP پوسٹ، ریویو کی درخواستیں، سائٹیشن درستی
• 5 متعلقہ لنک امیدواروں سے رابطہ
• ایک صفحے کی رپورٹ جو کام کو لیڈ سے جوڑے، ہر مہینے کی 3 تاریخ کو

3۔ متوقع نتائج
پہلے دو ماہ: تکنیکی بنیاد، انڈیکسنگ اور رفتار درست۔
تیسرا ماہ: قریب کی پوزیشن والے الفاظ پر پہلی حرکت۔
چوتھے تا چھٹے ماہ: آرگینک لیڈ میں مسلسل اضافہ۔
کوئی ادارہ پوزیشن کی ضمانت نہیں دے سکتا؛ ہم کام، شفافیت اور رپورٹنگ کی ضمانت دیتے ہیں۔

4۔ شرائط
50 فیصد پیشگی، 50 فیصد 25 تاریخ کو۔ کم از کم تین ماہ، پھر ماہانہ۔ تمام اکاؤنٹس اور مواد آپ کی ملکیت رہیں گے۔

منظور: ____________________  تاریخ: __________`,
        },
      },
    ],
  },
];
