import { CurriculumWeek } from "../types";

export const CURRICULUM: CurriculumWeek[] = [
  /* ---------------- MONTH 1 — BASIC ---------------- */
  {
    id: "w1",
    month: 1,
    level: "basic",
    title: {
      en: "Crawling, Indexing, Ranking & Search Engine Mechanics",
      ur: "کرالنگ، انڈیکسنگ، رینکنگ اور سرچ انجن کی مشینری",
    },
    summary: {
      en: "How a search engine discovers a page, stores it, and decides where it appears. Everything else in SEO sits on top of these three steps.",
      ur: "سرچ انجن کسی صفحے کو کیسے ڈھونڈتا ہے، محفوظ کرتا ہے اور فیصلہ کرتا ہے کہ وہ کہاں دکھے۔ ایس ای او کی ہر چیز انہی تین مرحلوں پر کھڑی ہے۔",
    },
    objectives: {
      en: [
        "Explain the crawl → index → rank pipeline in your own words",
        "Read a robots.txt file and predict what a crawler will do",
        "Check whether your page is indexed using the site: operator",
        "Name the three families of ranking signals",
      ],
      ur: [
        "کرال → انڈیکس → رینک کے عمل کو اپنے الفاظ میں بیان کریں",
        "robots.txt پڑھ کر بتائیں کہ کرالر کیا کرے گا",
        "site: آپریٹر سے چیک کریں کہ صفحہ انڈیکس ہوا یا نہیں",
        "رینکنگ سگنلز کے تین بڑے خاندان بتائیں",
      ],
    },
    sections: [
      {
        h: { en: "1. Crawling — the discovery step", ur: "1۔ کرالنگ — دریافت کا مرحلہ" },
        p: {
          en: "Googlebot is a program that follows links. It starts from pages it already knows, reads the HTML, extracts every <a href> it finds, and adds those URLs to a queue called the crawl frontier. If no page links to your page and it is not in a sitemap, Googlebot has no path to it — your page effectively does not exist. Crawl budget is the number of URLs Google is willing to fetch from your site in a period; small sites never hit the limit, large sites with thousands of filter URLs do.",
          ur: "Googlebot ایک پروگرام ہے جو links کے پیچھے چلتا ہے۔ یہ ان صفحات سے شروع کرتا ہے جو اسے پہلے سے معلوم ہیں، HTML پڑھتا ہے، ہر <a href> نکالتا ہے اور ان URLs کو ایک قطار میں ڈال دیتا ہے۔ اگر آپ کے صفحے تک کوئی link نہیں جاتا اور وہ sitemap میں بھی نہیں، تو Googlebot کے پاس وہاں پہنچنے کا کوئی راستہ نہیں — عملاً آپ کا صفحہ موجود ہی نہیں۔ crawl budget وہ تعداد ہے جتنے URLs Google ایک عرصے میں آپ کی site سے لینے کو تیار ہے؛ چھوٹی sites کو یہ حد کبھی نہیں لگتی، بڑی sites کو لگتی ہے۔",
        },
      },
      {
        h: { en: "2. Indexing — the storage step", ur: "2۔ انڈیکسنگ — محفوظ کرنے کا مرحلہ" },
        p: {
          en: "After fetching, Google renders the page (it does run JavaScript, but in a second, slower wave), understands the main content, and stores it in a giant inverted index — a dictionary that maps every word to the list of pages containing it. Crawled is not indexed: a page can be fetched and then dropped for being thin, duplicate, or blocked by a noindex tag. In Google Search Console the Pages report tells you exactly which bucket each URL landed in.",
          ur: "صفحہ لانے کے بعد Google اسے render کرتا ہے (JavaScript بھی چلاتا ہے مگر دوسری، سست لہر میں)، بنیادی content سمجھتا ہے اور ایک بہت بڑے inverted index میں محفوظ کرتا ہے — یعنی ایسی لغت جو ہر لفظ کو ان صفحات کی فہرست سے جوڑتی ہے جن میں وہ لفظ ہے۔ Crawled is not indexed: صفحہ لیا جا سکتا ہے اور پھر thin content، duplicate یا noindex tag کی وجہ سے چھوڑ دیا جا سکتا ہے۔ Search Console کی Pages report بتاتی ہے کہ ہر URL کس خانے میں گیا۔",
        },
      },
      {
        h: { en: "3. Ranking — the ordering step", ur: "3۔ رینکنگ — ترتیب کا مرحلہ" },
        p: {
          en: "When a query arrives, Google pulls candidate pages from the index and orders them with hundreds of signals. Group them into three families: (a) Relevance — does the content answer this query, including semantic matches, not just exact words; (b) Authority — do other trusted sites link here, and does the site show real experience and expertise; (c) Experience — is the page fast, mobile-friendly, secure (HTTPS) and free of intrusive interstitials. No single signal wins; they combine per query.",
          ur: "جب کوئی search query آتی ہے تو Google index سے امیدوار صفحات نکالتا ہے اور سینکڑوں signals سے انہیں ترتیب دیتا ہے۔ انہیں تین خاندانوں میں رکھیں: (الف) Relevance — کیا content اس سوال کا جواب دیتا ہے، صرف الفاظ نہیں بلکہ semantic مطابقت سے بھی؛ (ب) Authority — کیا دوسری قابلِ اعتماد sites یہاں link کرتی ہیں، اور کیا site حقیقی experience اور expertise دکھاتی ہے؛ (ج) Experience — کیا page تیز، mobile-friendly، محفوظ (HTTPS) اور تنگ کرنے والے interstitials سے پاک ہے۔ کوئی ایک signal فیصلہ کن نہیں؛ سب مل کر کام کرتے ہیں۔",
        },
      },
      {
        h: { en: "4. The SERP is not ten blue links", ur: "4۔ سرچ نتائج صرف دس نیلے لنک نہیں" },
        p: {
          en: "A modern results page mixes AI overviews, featured snippets, People Also Ask, local map packs, images, video carousels, and shopping units. Ranking #1 in the classic list can still mean low clicks if a snippet answers the query above you. Always look at the actual SERP for your keyword before writing — the format of the page tells you the format Google wants.",
          ur: "آج کے SERP میں AI Overviews، featured snippets، People Also Ask، local map pack، images، video اور shopping units سب شامل ہوتے ہیں۔ روایتی فہرست میں ranking #1 پر آنا بھی کم clicks دے سکتا ہے اگر آپ سے اوپر featured snippet جواب دے رہا ہو۔ لکھنے سے پہلے ہمیشہ اپنے keyword کا اصل SERP دیکھیں — format of the page بتاتا ہے کہ Google کس قسم کا content چاہتا ہے۔",
        },
      },
    ],
    terms: [
      {
        t: { en: "Crawl budget", ur: "کرال بجٹ" },
        d: {
          en: "How many URLs a search engine will fetch from your site in a given period.",
          ur: "ایک عرصے میں سرچ انجن آپ کی سائٹ سے کتنے URLs لے گا۔",
        },
      },
      {
        t: { en: "Inverted index", ur: "اُلٹا انڈیکس" },
        d: {
          en: "The word → pages lookup table that makes instant search possible.",
          ur: "لفظ سے صفحات کی فہرست بنانے والا نظام جو فوری سرچ ممکن بناتا ہے۔",
        },
      },
      {
        t: { en: "noindex", ur: "نو انڈیکس" },
        d: {
          en: "A meta tag telling engines to crawl but not store the page in results.",
          ur: "میٹا ٹیگ جو کہتا ہے کہ صفحہ پڑھو مگر نتائج میں محفوظ نہ کرو۔",
        },
      },
      {
        t: { en: "SERP", ur: "سرپ" },
        d: {
          en: "Search Engine Results Page — everything shown for a query.",
          ur: "سرچ انجن رزلٹ پیج — ایک سوال پر دکھایا جانے والا سب کچھ۔",
        },
      },
    ],
    task: {
      en: "Open Google and search: site:yourdomain.com — count how many pages are indexed. Then open yourdomain.com/robots.txt and write down every Disallow rule. If the count looks wrong, you already have your first SEO problem to solve.",
      ur: "Google کھولیں اور تلاش کریں: site:yourdomain.com — گنیں کتنے صفحات indexed ہیں۔ پھر yourdomain.com/robots.txt کھول کر ہر Disallow رول نوٹ کریں۔ اگر تعداد غلط لگے تو آپ کا پہلا SEO مسئلہ حل کرنے کے لیے مل گیا۔",
    },
    links: [
      { label: "Google Search Central — How Search Works", url: "https://developers.google.com/search/docs/fundamentals/how-search-works" },
      { label: "Google Digital Garage — Fundamentals of Digital Marketing", url: "https://grow.google/certificates/digital-marketing-ecommerce/" },
      { label: "DigiSkills.pk — Free SEO & Freelancing (Pakistan)", url: "https://digiskills.pk/" },
    ],
    quiz: [
      {
        q: {
          en: "A page is fetched by Googlebot but never appears in search. What most likely happened?",
          ur: "Googlebot نے صفحہ fetch کر لیا مگر وہ سرچ میں نہیں آتا۔ زیادہ امکان کیا ہے؟",
        },
        opts: {
          en: ["It was crawled but not indexed", "The domain was banned", "Google ran out of crawl budget forever", "Robots.txt deleted the page"],
          ur: ["کرال ہوا مگر انڈیکس نہیں ہوا", "ڈومین پر پابندی لگ گئی", "کرال بجٹ ہمیشہ کے لیے ختم ہو گیا", "robots.txt نے صفحہ مٹا دیا"],
        },
        a: 0,
        exp: {
          en: "Crawling and indexing are separate steps. Thin, duplicate or noindexed pages get fetched and then dropped before indexing.",
          ur: "Crawling اور indexing الگ الگ مرحلے ہیں۔ پتلے، duplicate یا noindex والے صفحات fetch تو ہو جاتے ہیں مگر indexing سے پہلے drop ہو جاتے ہیں۔",
        },
      },
      {
        q: {
          en: "What does robots.txt actually control?",
          ur: "robots.txt اصل میں کس چیز کو کنٹرول کرتا ہے؟",
        },
        opts: {
          en: ["Whether a URL appears in results", "Whether a crawler may fetch a URL", "The page's ranking position", "The page title in the SERP"],
          ur: ["یو آر ایل نتائج میں آئے گا یا نہیں", "کرالر یو آر ایل لے سکتا ہے یا نہیں", "صفحے کی رینکنگ پوزیشن", "نتائج میں صفحے کا عنوان"],
        },
        a: 1,
        exp: {
          en: "Robots.txt manages crawling, not indexing. To keep a URL out of results use a noindex meta tag — and the crawler must be allowed to fetch the page to see it.",
          ur: "robots.txt crawling سنبھالتا ہے، indexing نہیں۔ نتائج سے باہر رکھنے کے لیے noindex ٹیگ چاہیے — اور اسے دیکھنے کے لیے کرالر کو صفحہ لینے کی اجازت ہونی چاہیے۔",
        },
      },
      {
        q: {
          en: "Which of these is an authority signal rather than a relevance signal?",
          ur: "ان میں سے کون سا اختیار کا سگنل ہے، مطابقت کا نہیں؟",
        },
        opts: {
          en: ["Keyword in the H1", "An editorial link from a trusted industry site", "Content answering the search intent", "Synonyms used naturally in the body"],
          ur: ["H1 میں کی ورڈ", "قابلِ اعتماد صنعتی سائٹ سے ادارتی لنک", "مواد جو سرچ کے مقصد کا جواب دے", "متن میں قدرتی مترادفات"],
        },
        a: 1,
        exp: {
          en: "Links from trusted third-party sites are the classic authority signal. The other three describe how well the page matches the query.",
          ur: "قابلِ اعتماد بیرونی sites کے backlinks اختیار (Authority) کا بنیادی سگنل ہیں۔ باقی تینوں مطابقت بتاتے ہیں۔",
        },
      },
      {
        q: {
          en: "Your new blog post has no internal links pointing to it and is not in the sitemap. What is the consequence?",
          ur: "آپ کی نئی پوسٹ تک کوئی اندرونی لنک نہیں جاتا اور وہ سائٹ میپ میں بھی نہیں۔ نتیجہ؟",
        },
        opts: {
          en: ["It ranks slower but is found normally", "Google has no discovery path to it", "It is automatically noindexed", "It loses HTTPS"],
          ur: ["رینک دیر سے ہوگی مگر مل جائے گی", "گوگل کے پاس اسے دریافت کرنے کا راستہ نہیں", "خودکار طور پر noindex ہو جائے گی", "HTTPS ختم ہو جائے گا"],
        },
        a: 1,
        exp: {
          en: "Discovery happens through links and sitemaps. An orphan page with neither is invisible until you give the crawler a path.",
          ur: "دریافت links اور sitemap سے ہوتی ہے۔ Orphan page جس کے پاس دونوں نہ ہوں وہ کرالر کے لیے غائب رہتا ہے۔",
        },
      },
      {
        q: {
          en: "Why can ranking #1 still produce few clicks?",
          ur: "پہلے نمبر پر آ کر بھی کلک کم کیوں ہو سکتے ہیں؟",
        },
        opts: {
          en: ["Google hides organic results from mobiles", "AI overviews, snippets and PAA boxes can answer above you", "Position 1 is reserved for ads only", "Clicks are counted only on desktop"],
          ur: ["گوگل موبائل پر آرگینک نتائج چھپا دیتا ہے", "اے آئی خلاصے، سنیپٹ اور PAA آپ سے اوپر جواب دے دیتے ہیں", "پہلی پوزیشن صرف اشتہارات کی ہے", "کلک صرف ڈیسک ٹاپ پر گنے جاتے ہیں"],
        },
        a: 1,
        exp: {
          en: "SERP features sit above the classic list and often satisfy the query, producing zero-click searches.",
          ur: "AI Overviews اور featured snippets روایتی نتائج سے اوپر سوال کا جواب دے دیتے ہیں جس سے zero-click searches بنتی ہیں۔",
        },
      },
    ],
  },
  {
    id: "w2",
    month: 1,
    level: "basic",
    title: {
      en: "Search Intent — Informational, Navigational, Transactional",
      ur: "سرچ انٹینٹ — معلوماتی، رہنمائی، خریداری",
    },
    summary: {
      en: "Matching the job behind the query. Intent decides page type, format, length and call-to-action — get it wrong and no amount of optimisation saves the page.",
      ur: "سوال کے پیچھے چھپے مقصد سے مطابقت۔ انٹینٹ طے کرتا ہے کہ صفحہ کس قسم کا ہو، کتنا لمبا ہو اور کیا عمل کروائے — یہ غلط ہو تو کوئی آپٹیمائزیشن نہیں بچا سکتی۔",
    },
    objectives: {
      en: [
        "Classify any keyword into one of four intent types",
        "Read the SERP to confirm intent instead of guessing",
        "Pick the correct page type for each intent",
        "Spot mixed-intent keywords and handle them",
      ],
      ur: [
        "کسی بھی کی ورڈ کو چار انٹینٹ اقسام میں رکھیں",
        "اندازے کے بجائے سرچ نتائج دیکھ کر انٹینٹ کی تصدیق کریں",
        "ہر انٹینٹ کے لیے درست قسم کا صفحہ چنیں",
        "ملے جلے انٹینٹ والے کی ورڈ پہچانیں اور سنبھالیں",
      ],
    },
    sections: [
      {
        h: { en: "1. The four intent types", ur: "1۔ انٹینٹ کی چار اقسام" },
        p: {
          en: "Informational — the user wants to know ('what is schema markup'). Navigational — the user wants to go somewhere specific ('daraz login'). Commercial investigation — the user is comparing before buying ('best geyser in Pakistan 2026'). Transactional — the user is ready to act ('buy Rheem geyser 30 litre price'). Google Digital Garage groups the middle two as the consideration stage of the customer journey; DigiSkills teaches the same split as 'research vs buy' keywords.",
          ur: "معلوماتی (Informational) — صارف جاننا چاہتا ہے ('schema markup کیا ہے')۔ رہنمائی (Navigational) — مخصوص جگہ جانا چاہتا ہے ('daraz login')۔ تجارتی تحقیق (Commercial) — خریدنے سے پہلے موازنہ کر رہا ہے ('best geyser in Pakistan 2026')۔ خریداری (Transactional) — عمل کے لیے تیار ہے ('buy Rheem geyser 30 litre price')۔ DigiSkills اسے 'research vs buy' keywords کہتا ہے۔",
        },
      },
      {
        h: { en: "2. The SERP is the answer key", ur: "2۔ سرچ نتائج ہی جواب کی کنجی ہیں" },
        p: {
          en: "Never argue with the results page. Search your keyword and look at what ranks: if the top ten are all how-to guides, Google has judged the intent informational and your product page will not rank there no matter how good it is. If you see shopping ads and category pages, it is transactional. If you see a map pack, it is local. Mirror the dominant format — same page type, similar depth, similar structure.",
          ur: "SERP سے کبھی بحث نہ کریں۔ اپنا keyword تلاش کر کے دیکھیں: اگر پہلے دس سب tutorials اور guides ہیں، تو Google نے intent کو informational مانا ہے، وہاں آپ کا product page کبھی rank نہیں کرے گا۔ اگر shopping اور category pages ہیں تو transactional ہے۔ جو format گوگل پسند کر رہا ہے وہی بنائیں۔",
        },
      },
      {
        h: { en: "3. Intent → page type mapping", ur: "3۔ انٹینٹ سے صفحے کی قسم کا جوڑ" },
        p: {
          en: "Informational → blog post, guide, FAQ, glossary, video. Commercial → comparison table, 'best X' listicle, review, alternatives page. Transactional → product page, pricing page, service page with a clear CTA. Navigational → your homepage or a branded landing page. One page, one intent. Trying to sell inside a definition article kills both jobs.",
          ur: "Informational کے لیے blog post، guide، FAQ۔ Commercial کے لیے comparison table، listicle ('best X')۔ Transactional کے لیے product page، pricing page، واضح CTA والا service page۔ ایک صفحہ، ایک intent۔ معلوماتی مضمون کے بیچ زبردستی بیچنے کی کوشش دونوں کام خراب کرتی ہے۔",
        },
      },
      {
        h: { en: "4. Mixed and shifting intent", ur: "4۔ ملا جلا اور بدلتا انٹینٹ" },
        p: {
          en: "Some queries split — 'geyser' shows both guides and shops. Then either build a hub page that serves both with clear sections, or target the longer-tail variant where intent is clean. Intent also shifts with seasons and news: 'gas price' becomes transactional during a policy change. Re-check the SERP every few months for your money keywords.",
          ur: "کچھ queries بٹی ہوئی ہوتی ہیں — جیسے صرف 'geyser' پر guides بھی نظر آتی ہیں اور shops بھی۔ ایسے میں hub page بنائیں یا long-tail variant منتخب کریں جہاں intent بالکل صاف ہو۔ اپنے بنیادی money keywords کا SERP وقتاً فوقتاً دیکھتے رہیں۔",
        },
      },
    ],
    terms: [
      {
        t: { en: "Commercial investigation", ur: "تجارتی تحقیق" },
        d: { en: "Comparing options before a purchase decision.", ur: "خریداری کے فیصلے سے پہلے اختیارات کا موازنہ۔" },
      },
      {
        t: { en: "Zero-click search", ur: "زیرو کلک سرچ" },
        d: { en: "The query is answered on the SERP itself, so nobody clicks through.", ur: "سوال کا جواب نتائج کے صفحے پر ہی مل جائے، کوئی کلک نہ کرے۔" },
      },
      {
        t: { en: "Hub page", ur: "ہب صفحہ" },
        d: { en: "A parent page that serves several related intents and links to deeper pages.", ur: "بنیادی صفحہ جو کئی متعلقہ مقاصد پورے کرے اور گہرے صفحات سے جوڑے۔" },
      },
    ],
    task: {
      en: "Take 10 keywords from your niche. In a sheet, write the keyword, your guessed intent, the top-3 ranking page types you actually see, and the corrected intent. Count how many guesses were wrong — that number is why we check the SERP.",
      ur: "اپنے شعبے سے 10 keywords لیں۔ شیٹ میں لکھیں: keyword، آپ کا اندازہ، اصل میں نظر آنے والے پہلے تین pages کی قسم، اور تصدیق شدہ intent۔ گنیں کتنے اندازے غلط تھے — یہی وجہ ہے کہ ہم SERP چیک کرتے ہیں۔",
    },
    links: [
      { label: "Google — Creating helpful, people-first content", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
      { label: "Google Digital Garage — Digital Marketing Fundamentals", url: "https://grow.google/certificates/digital-marketing-ecommerce/" },
    ],
    quiz: [
      {
        q: {
          en: "'best budget laptop for students in Pakistan' — what intent is this?",
          ur: "'پاکستان میں طلبہ کے لیے بہترین سستا لیپ ٹاپ' — یہ کون سا انٹینٹ ہے؟",
        },
        opts: {
          en: ["Navigational", "Commercial investigation", "Transactional", "Informational only"],
          ur: ["رہنمائی", "تجارتی تحقیق", "خریداری", "صرف معلوماتی"],
        },
        a: 1,
        exp: {
          en: "'Best' plus a qualifier means the user is comparing options before buying — a comparison or listicle page wins here, not a single product page.",
          ur: "'Best' کا مطلب ہے صارف خریدنے سے پہلے موازنہ کر رہا ہے — یہاں comparison table یا listicle صفحہ جیتے گا۔",
        },
      },
      {
        q: {
          en: "The top 10 results for your keyword are all tutorials, but you published a pricing page. What should you do?",
          ur: "آپ کے کی ورڈ کے پہلے دس نتائج سب ٹیوٹوریل ہیں مگر آپ نے قیمت والا صفحہ شائع کیا۔ کیا کریں؟",
        },
        opts: {
          en: ["Add more keywords to the pricing page", "Build backlinks to force it up", "Create a tutorial for that keyword and target buying keywords separately", "Block the tutorials in robots.txt"],
          ur: ["قیمت والے صفحے میں مزید کی ورڈ ڈالیں", "بیک لنکس بنا کر زبردستی اوپر لائیں", "اس کی ورڈ کے لیے ٹیوٹوریل بنائیں اور خریداری کے کی ورڈ الگ رکھیں", "robots.txt میں ٹیوٹوریل بلاک کریں"],
        },
        a: 2,
        exp: {
          en: "You cannot out-optimise the wrong page type. Match the format Google is already rewarding, and keep transactional keywords for the pricing page.",
          ur: "غلط page type کو آپٹیمائزیشن سے نہیں جتوایا جا سکتا۔ مطلوبہ format بنائیں اور buying keywords کے لیے الگ pricing page رکھیں۔",
        },
      },
      {
        q: {
          en: "Which query is navigational?",
          ur: "کون سا سوال رہنمائی والا ہے؟",
        },
        opts: {
          en: ["how to do keyword research", "jazz cash login", "cheap web hosting price", "what is core web vitals"],
          ur: ["کی ورڈ ریسرچ کیسے کریں", "jazz cash login", "سستی ویب ہوسٹنگ قیمت", "core web vitals کیا ہے"],
        },
        a: 1,
        exp: {
          en: "A brand name plus an action word like login means the user already knows where they want to go.",
          ur: "Brand name اور login جیسا لفظ بتاتا ہے کہ صارف کو پہلے سے معلوم ہے اسے کہاں جانا ہے۔",
        },
      },
      {
        q: {
          en: "Why should one page serve one intent?",
          ur: "ایک صفحہ ایک ہی انٹینٹ کیوں پورا کرے؟",
        },
        opts: {
          en: ["Google limits pages to one keyword", "Mixing jobs weakens both the answer and the conversion path", "It makes the URL shorter", "Hosting costs less"],
          ur: ["گوگل ایک صفحے کو ایک کی ورڈ تک محدود کرتا ہے", "کام ملانے سے جواب اور خریداری کا راستہ دونوں کمزور ہوتے ہیں", "یو آر ایل چھوٹا ہو جاتا ہے", "ہوسٹنگ سستی پڑتی ہے"],
        },
        a: 1,
        exp: {
          en: "A page that half-explains and half-sells satisfies neither the reader nor the ranking system.",
          ur: "جو صفحہ آدھا سمجھائے اور آدھا بیچے وہ نہ قاری کو مطمئن کرتا ہے نہ ranking system کو۔",
        },
      },
      {
        q: {
          en: "How often should you re-check intent for your main money keywords?",
          ur: "اپنے اہم کمائی والے کی ورڈ کا انٹینٹ کتنی بار دوبارہ دیکھنا چاہیے؟",
        },
        opts: {
          en: ["Never — intent is fixed", "Every few months, and after major news or seasonal shifts", "Only when traffic hits zero", "Once at launch"],
          ur: ["کبھی نہیں — انٹینٹ مستقل ہے", "ہر چند ماہ بعد، اور بڑی خبر یا موسمی تبدیلی کے بعد", "صرف جب ٹریفک صفر ہو جائے", "صرف لانچ کے وقت"],
        },
        a: 1,
        exp: {
          en: "SERPs are re-tuned constantly; intent drifts with seasons, news and product cycles.",
          ur: "SERPs مسلسل تبدیل ہوتے ہیں؛ موسمی رجحانات اور مارکیٹ کے مطابق دوبارہ جائزہ لینا ضروری ہے۔",
        },
      },
    ],
  },
  {
    id: "w3",
    month: 1,
    level: "basic",
    title: {
      en: "Long-Tail Keyword Research Using Free Tools",
      ur: "مفت ٹولز سے لانگ ٹیل کی ورڈ ریسرچ",
    },
    summary: {
      en: "Finding specific, low-competition phrases that real buyers type — using only free tools available in Pakistan.",
      ur: "مخصوص، کم مقابلے والے جملے تلاش کرنا جو اصل خریدار لکھتے ہیں — صرف ان مفت ٹولز سے جو پاکستان میں دستیاب ہیں۔",
    },
    objectives: {
      en: [
        "Build a seed list from your business, not your imagination",
        "Expand seeds with Autocomplete, PAA, Search Console and free tools",
        "Read volume, difficulty and CPC without paying for a tool",
        "Group keywords into topic clusters ready for content",
      ],
      ur: [
        "اپنے کاروبار سے بیج کی ورڈ کی فہرست بنائیں، تصور سے نہیں",
        "Autocomplete، PAA، سرچ کنسول اور مفت ٹولز سے فہرست بڑھائیں",
        "بغیر پیسے خرچ کیے والیوم، مشکل اور CPC پڑھیں",
        "کی ورڈ کو موضوعاتی گچھوں میں تقسیم کریں",
      ],
    },
    sections: [
      {
        h: { en: "1. Why long-tail wins for beginners", ur: "1۔ نئے لوگوں کے لیے لانگ ٹیل کیوں جیتتا ہے" },
        p: {
          en: "A head term like 'SEO' has enormous volume and impossible competition. A long-tail phrase like 'local SEO services for restaurants in Lahore' has maybe 40 searches a month — but the searcher is specific, ready to act, and you can realistically rank in weeks instead of years. Thirty long-tail pages each earning 40 visits beat one head page earning nothing. This is exactly the strategy DigiSkills teaches freelancers who start with zero domain authority.",
          ur: "'SEO' جیسا head term بہت زیادہ competition رکھتا ہے۔ 'local SEO services for restaurants in Lahore' جیسا long-tail phrase شاید 40 searches لائے مگر سرچ کرنے والا تیار گاہک ہے اور آپ چند ہفتوں میں rank کر سکتے ہیں۔ 40، 40 visits لانے والے تیس pages ایک بڑے بیکار page سے بدرجہا بہتر ہیں۔",
        },
      },
      {
        h: { en: "2. The free research stack", ur: "2۔ مفت ریسرچ کا سیٹ" },
        p: {
          en: "Google Autocomplete (type your seed and read dropdown), People Also Ask (expand questions into H2s), Google Trends (compare city-level interest for Lahore, Karachi, Islamabad), Google Search Console Performance report (queries ranking 8-20 — striking distance quick wins), Google Keyword Planner, and Bing Webmaster Tools. Real community forums like Reddit, Quora and local Facebook groups reveal exact customer phrases.",
          ur: "Google Autocomplete (seed لکھیں اور لسٹ پڑھیں)، People Also Ask (سوالات کھولیں اور H2s بنائیں)، Google Trends (لاہور، کراچی، اسلام آباد کی دلچسپی کا تقابل)، Search Console Performance report (پوزیشن 8 تا 20 والے striking distance سوالات)، اور Keyword Planner۔ کمیونٹی گروپس سے اصل کسٹمر کے الفاظ ملتے ہیں۔",
        },
      },
      {
        h: { en: "3. Judging a keyword without a paid tool", ur: "3۔ بغیر مہنگے ٹول کے کی ورڈ پرکھنا" },
        p: {
          en: "Search the phrase and read the first page like an auditor. Are ranking sites small blogs or national brands? Do titles match the phrase exactly, or is Google stretching? Is there a forum or Quora thread in the top 10 (a strong sign of weak competition)? Are results older than three years? A page-one full of thin, outdated pages from unknown domains is your direct opportunity.",
          ur: "Keyword تلاش کر کے پہلا صفحہ ایک auditor کی طرح پڑھیں۔ کیا ٹاپ 10 میں forums یا Quora کے دھاگے ہیں؟ (یہ کمزور مقابلے کی علامت ہے)۔ کیا نتائج تین سال پرانے ہیں؟ اگر ہاں تو یہ آپ کا یقینی موقع ہے۔",
        },
      },
    ],
    terms: [
      { t: { en: "Seed keyword", ur: "بیج کی ورڈ" }, d: { en: "The short starting phrase you expand from.", ur: "مختصر ابتدائی جملہ جس سے فہرست بڑھائی جاتی ہے۔" } },
      { t: { en: "Long-tail", ur: "لانگ ٹیل" }, d: { en: "A specific multi-word query with lower volume and higher intent.", ur: "کئی الفاظ کا مخصوص سوال، کم سرچ مگر زیادہ ارادہ۔" } },
      { t: { en: "Striking distance", ur: "قریب کی پوزیشن" }, d: { en: "Queries already ranking 8-20 — cheapest traffic to win.", ur: "وہ سوالات جو پہلے سے 8 تا 20 پر ہیں — سب سے سستی ٹریفک۔" } },
      { t: { en: "Topic cluster", ur: "موضوعاتی گچھا" }, d: { en: "One pillar page plus supporting pages, all internally linked.", ur: "ایک بنیادی صفحہ اور معاون صفحات، سب آپس میں لنکڈ۔" } },
    ],
    task: {
      en: "Pick one seed keyword. Collect 50 long-tail variants using Autocomplete + PAA + Trends only. Put them in a sheet with columns: keyword, intent, rough volume, manual difficulty, target page. Then group them into 5 clusters.",
      ur: "ایک seed keyword چنیں۔ صرف Autocomplete + PAA + Trends سے 50 long-tail فقرے جمع کریں۔ کالم بنائیں: keyword، intent، volume، difficulty، target page۔ پھر 5 clusters میں تقسیم کریں۔",
    },
    links: [
      { label: "Google Trends", url: "https://trends.google.com/trends/" },
      { label: "Google Keyword Planner", url: "https://ads.google.com/home/tools/keyword-planner/" },
      { label: "Google Search Console", url: "https://search.google.com/search-console/about" },
    ],
    quiz: [
      {
        q: { en: "Which report shows keywords you already rank 8-20 for?", ur: "کون سی رپورٹ وہ کی ورڈ دکھاتی ہے جن پر آپ پہلے سے 8 تا 20 پر ہیں؟" },
        opts: {
          en: ["GA4 Acquisition", "Search Console Performance", "Keyword Planner forecast", "Google Trends"],
          ur: ["GA4 Acquisition", "سرچ کنسول Performance", "کی ورڈ پلانر پیش گوئی", "گوگل ٹرینڈز"],
        },
        a: 1,
        exp: {
          en: "The Performance report lists real queries with average position — filter for positions 8-20 to find the cheapest wins.",
          ur: "Performance رپورٹ اصل سوالات average position کے ساتھ دکھاتی ہے؛ 8 تا 20 پر فلٹر لگائیں اور آسان ٹریفک جیتیں۔",
        },
      },
      {
        q: { en: "A forum thread ranking in the top 10 usually signals what?", ur: "پہلے دس میں فورم دھاگے کا ہونا عام طور پر کیا بتاتا ہے؟" },
        opts: {
          en: ["The keyword is spam", "Weak competition — an opening for a good page", "Google is broken", "The keyword has no volume"],
          ur: ["کی ورڈ اسپیم ہے", "کمزور مقابلہ — اچھے صفحے کا موقع", "گوگل خراب ہے", "کی ورڈ کی کوئی سرچ نہیں"],
        },
        a: 1,
        exp: {
          en: "If Google has to reach for user-generated content, no strong dedicated page exists yet.",
          ur: "اگر گوگل کو فورم دکھانا پڑ رہا ہے تو کوئی مضبوط مخصوص صفحہ ابھی موجود نہیں ہے۔",
        },
      },
      {
        q: { en: "Why do 30 long-tail pages often beat 1 head-term page for a new site?", ur: "نئی سائٹ کے لیے 30 لانگ ٹیل صفحات ایک بڑے کی ورڈ کے صفحے سے بہتر کیوں ہوتے ہیں؟" },
        opts: {
          en: ["Google counts pages, not quality", "They are rankable now and their intent is sharper", "Long-tail pages need no content", "Head terms are banned in Pakistan"],
          ur: ["گوگل صفحات گنتا ہے، معیار نہیں", "وہ ابھی رینک ہو سکتے ہیں اور ان کا ارادہ واضح ہے", "لانگ ٹیل صفحات کو مواد کی ضرورت نہیں", "بڑے کی ورڈ پاکستان میں ممنوع ہیں"],
        },
        a: 1,
        exp: {
          en: "Achievable rankings plus higher intent produce revenue while authority is still being built.",
          ur: "فوری رینکنگ اور واضح ارادہ اس وقت آمدنی اور لیڈز دیتے ہیں جب سائٹ نئی ہو۔",
        },
      },
      {
        q: { en: "Which free source best reveals the exact wording customers use?", ur: "گاہکوں کے اصل الفاظ جاننے کے لیے بہترین مفت ذریعہ کون سا ہے؟" },
        opts: {
          en: ["Your own product descriptions", "Reddit, Quora and Facebook group threads", "The dictionary", "Competitor meta tags"],
          ur: ["آپ کی اپنی پروڈکٹ تفصیل", "Reddit، Quora اور فیس بک گروپ", "لغت", "حریف کے میٹا ٹیگ"],
        },
        a: 1,
        exp: {
          en: "Community threads are unfiltered customer language — the best raw material for long-tail phrasing.",
          ur: "کمیونٹی گروپس اور فورمز پر گاہکوں کے قدرتی الفاظ سامنے آتے ہیں۔",
        },
      },
      {
        q: { en: "What is a topic cluster?", ur: "موضوعاتی گچھا کیا ہے؟" },
        opts: {
          en: ["A page stuffed with all your keywords", "A pillar page plus supporting pages, internally linked", "A list of backlinks", "A paid ad group"],
          ur: ["ایک صفحہ جس میں سارے کی ورڈ ٹھونس دیے جائیں", "بنیادی صفحہ اور معاون صفحات جو آپس میں لنکڈ ہوں", "بیک لنکس کی فہرست", "اشتہاری گروپ"],
        },
        a: 1,
        exp: {
          en: "Clusters concentrate topical authority and pass internal link equity to the pillar.",
          ur: "Topic clusters ایک بنیادی pillar page اور متعلقہ معاون صفحات کو آپس میں جوڑ کر topical authority بناتے ہیں۔",
        },
      },
    ],
  },
  {
    id: "w4",
    month: 1,
    level: "basic",
    title: {
      en: "Competitor Keyword Gap Analysis",
      ur: "حریف کی ورڈ گیپ تجزیہ",
    },
    summary: {
      en: "Systematically finding the keywords your competitors rank for and you do not — and deciding which gaps are worth closing.",
      ur: "منظم طریقے سے وہ کی ورڈ ڈھونڈنا جن پر حریف رینک کرتے ہیں اور آپ نہیں — اور فیصلہ کرنا کہ کون سا خلا پُر کرنا فائدہ مند ہے۔",
    },
    objectives: {
      en: [
        "Identify true SERP competitors, not just business rivals",
        "Extract competitor topics with free methods",
        "Build a gap sheet and prioritise by opportunity",
        "Turn gaps into a 90-day content plan",
      ],
      ur: [
        "اصل سرچ حریف پہچانیں، صرف کاروباری مدِمقابل نہیں",
        "مفت طریقوں سے حریف کے موضوعات نکالیں",
        "گیپ شیٹ بنائیں اور موقع کے حساب سے ترجیح دیں",
        "خلا کو 90 دن کے مواد منصوبے میں بدلیں",
      ],
    },
    sections: [
      {
        h: { en: "1. SERP competitors ≠ business competitors", ur: "1۔ سرچ حریف اور کاروباری حریف الگ ہیں" },
        p: {
          en: "The shop across the road may never appear in search, while a blog you have never heard of takes all your traffic. Find real SERP competitors by searching your top 10 keywords and recording which domains appear repeatedly. Three to five domains that show up again and again are your true competitive set — study those, ignore the rest.",
          ur: "سامنے والی دکان شاید سرچ میں کبھی نہ آئے، مگر ایک بلاگ آپ کی ساری ٹریفک لے جا رہا ہو سکتا ہے۔ اپنے دس اہم keywords سرچ کریں اور دیکھیں کون سے domains بار بار نتائج میں آ رہے ہیں — وہی آپ کے حقیقی SERP حریف ہیں۔",
        },
      },
      {
        h: { en: "2. Free extraction methods", ur: "2۔ مفت طریقے" },
        p: {
          en: "Open competitor.com/sitemap.xml and read every URL slug — that is their whole content plan in one file. Use site:competitor.com 'keyword' to see how deeply they cover a topic. Read their blog category pages and internal link anchors. Their meta titles tell you exactly which phrase each page targets.",
          ur: "competitor.com/sitemap.xml کھولیں اور ہر slug پڑھیں — ان کا پورا editorial calendar ایک فائل میں ہے۔ site:competitor.com 'keyword' سے ان کی کوریج جانچیں۔ ان کے title tags ہدف keywords کھول کر رکھ دیتے ہیں۔",
        },
      },
      {
        h: { en: "3. Scoring and prioritising the gap", ur: "3۔ خلا کو نمبر دینا اور ترجیح" },
        p: {
          en: "For every gap keyword score four things 1-5: business value (does it bring money?), intent match, achievability (how weak is page one?), and effort. Priority = (value × intent × achievability) ÷ effort. Attack the top 20 first. Ignore high-volume vanity keywords with low business value — a freelancer's time is the scarcest resource.",
          ur: "ہر gap keyword کو چار پیمانوں پر 1 تا 5 نمبر دیں: Business value (کیا آمدنی آئے گی؟)، Intent، Achievability، اور Effort۔ ترجیحی فارمولا: (Value × Intent × Achievability) ÷ Effort۔ پہلے 20 پر کام کریں۔",
        },
      },
    ],
    terms: [
      { t: { en: "Keyword gap", ur: "کی ورڈ گیپ" }, d: { en: "A query competitors rank for and you do not.", ur: "وہ سوال جس پر حریف رینک کرتے ہیں اور آپ نہیں۔" } },
      { t: { en: "Content gap", ur: "مواد کا خلا" }, d: { en: "A subtopic competitors cover that your page omits.", ur: "ذیلی موضوع جو حریف ڈھانپتے ہیں اور آپ کا صفحہ چھوڑ دیتا ہے۔" } },
      { t: { en: "Share of voice", ur: "آواز کا حصہ" }, d: { en: "Your visibility across a keyword set versus competitors.", ur: "کی ورڈ کے مجموعے میں آپ کی نمائش بمقابلہ حریف۔" } },
    ],
    task: {
      en: "Pick 3 SERP competitors. Download each sitemap.xml, paste the slugs into a sheet, and mark every topic you do NOT have. Score the top 20 gaps with the priority formula and write your next 8 article titles.",
      ur: "تین SERP حریف منتخب کریں۔ ان کے sitemaps سے URLs نکال کر شیٹ میں ڈالیں، اور وہ موضوعات نشان زد کریں جو آپ کے پاس نہیں ہیں۔ ٹاپ 20 کی ترجیح نکالیں اور 8 نئے مضامین کی فہرست بنائیں۔",
    },
    links: [
      { label: "Google Search Central — Sitemaps", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview" },
      { label: "Ubersuggest (Free Tier)", url: "https://neilpatel.com/ubersuggest/" },
    ],
    quiz: [
      {
        q: { en: "How do you identify a true SERP competitor?", ur: "اصل سرچ حریف کیسے پہچانیں؟" },
        opts: {
          en: ["It is the biggest company in your industry", "It is the shop nearest to you", "Its domain appears repeatedly across your target keywords", "It spends most on ads"],
          ur: ["جو صنعت کی سب سے بڑی کمپنی ہو", "جو دکان سب سے قریب ہو", "جس کا ڈومین آپ کے ہدف کی ورڈ پر بار بار آئے", "جو اشتہار پر سب سے زیادہ خرچ کرے"],
        },
        a: 2,
        exp: {
          en: "Repeated appearance across your keyword set is the only definition that matters for SEO.",
          ur: "آپ کے target keywords پر جو ڈومینز بار بار نتائج میں سامنے آئیں، وہی اصل SERP حریف ہیں۔",
        },
      },
      {
        q: { en: "Which single free file reveals a competitor's entire content plan?", ur: "کون سی ایک مفت فائل حریف کا پورا مواد منصوبہ ظاہر کرتی ہے؟" },
        opts: {
          en: ["robots.txt", "sitemap.xml", "favicon.ico", "style.css"],
          ur: ["robots.txt", "sitemap.xml", "favicon.ico", "style.css"],
        },
        a: 1,
        exp: {
          en: "The XML sitemap lists every URL they want indexed — read the slugs and you have their editorial calendar.",
          ur: "sitemap.xml فائل میں ان کے تمام indexed URLs کی فہرست ہوتی ہے۔",
        },
      },
      {
        q: { en: "A gap keyword has 20,000 monthly searches but no connection to what you sell. What do you do?", ur: "ایک گیپ کی ورڈ پر 20,000 ماہانہ سرچ ہیں مگر اس کا آپ کی فروخت سے تعلق نہیں۔ کیا کریں؟" },
        opts: {
          en: ["Write it first — volume is king", "Deprioritise it; business value is the first multiplier", "Buy links for it", "Redirect your homepage to it"],
          ur: ["پہلے یہی لکھیں — والیوم بادشاہ ہے", "اسے پیچھے رکھیں؛ کاروباری قدر پہلا عنصر ہے", "اس کے لیے لنک خریدیں", "ہوم پیج اسی پر ری ڈائریکٹ کریں"],
        },
        a: 1,
        exp: {
          en: "Traffic that cannot convert costs time and earns nothing. Value × intent × achievability comes before raw volume.",
          ur: "جو ٹریفک خریدار نہ بنے وہ بیکار ہے۔ کاروباری قدر خام والیوم سے زیادہ اہم ہے۔",
        },
      },
      {
        q: { en: "What is a content gap (as opposed to a keyword gap)?", ur: "مواد کا خلا کیا ہے (کی ورڈ گیپ سے مختلف)؟" },
        opts: {
          en: ["A missing image", "A subtopic competitors cover that your existing page omits", "A broken link", "A slow server"],
          ur: ["غائب تصویر", "ذیلی موضوع جو حریف ڈھانپتے ہیں اور آپ کا موجودہ صفحہ چھوڑ دیتا ہے", "ٹوٹا لنک", "سست سرور"],
        },
        a: 1,
        exp: {
          en: "Closing content gaps often lifts an existing page faster than publishing a brand-new one.",
          ur: "کسی صفحے کے اندر حریف کے چھوڑے ہوئے ذیلی موضوعات کو کور کرنا مواد کا خلا کہلاتا ہے۔",
        },
      },
      {
        q: { en: "Where do competitor meta titles help you most?", ur: "حریف کے میٹا عنوان کہاں سب سے زیادہ کام آتے ہیں؟" },
        opts: {
          en: ["They show the exact phrase each page targets", "They contain hidden backlinks", "They set your page speed", "They control their robots.txt"],
          ur: ["وہ بتاتے ہیں ہر صفحہ کس جملے کو نشانہ بنا رہا ہے", "ان میں چھپے بیک لنک ہوتے ہیں", "وہ آپ کی رفتار طے کرتے ہیں", "وہ ان کا robots.txt کنٹرول کرتے ہیں"],
        },
        a: 0,
        exp: {
          en: "A title tag is a public declaration of the target keyword — free competitive intelligence.",
          ur: "Title tag واضح بتاتا ہے کہ حریف کس keyword کو ٹارگٹ کر رہا ہے۔",
        },
      },
    ],
  },

  /* ---------------- MONTH 2 — INTERMEDIATE ---------------- */
  {
    id: "w5",
    month: 2,
    level: "intermediate",
    title: {
      en: "On-Page Optimization — Titles, Permalinks, Meta Descriptions, Alt Tags",
      ur: "آن پیج آپٹیمائزیشن — عنوان، یو آر ایل، میٹا تفصیل، آلٹ ٹیگ",
    },
    summary: {
      en: "The elements you fully control on every page, and the exact rules for writing each one.",
      ur: "وہ عناصر جو ہر صفحے پر مکمل آپ کے قابو میں ہیں، اور ہر ایک کو لکھنے کے واضح اصول۔",
    },
    objectives: {
      en: [
        "Write a title tag that ranks and earns the click",
        "Design clean permalink structures",
        "Write meta descriptions that improve CTR",
        "Use headings and alt text correctly for humans and machines",
      ],
      ur: [
        "ایسا ٹائٹل ٹیگ لکھیں جو رینک بھی کرے اور کلک بھی لائے",
        "صاف یو آر ایل ساخت بنائیں",
        "ایسی میٹا تفصیل لکھیں جو کلک بڑھائے",
        "ہیڈنگ اور آلٹ ٹیکسٹ انسان اور مشین دونوں کے لیے درست استعمال کریں",
      ],
    },
    sections: [
      {
        h: { en: "1. Title tag — the highest-leverage 60 characters", ur: "1۔ ٹائٹل ٹیگ — سب سے زیادہ اثر رکھنے والے 60 حروف" },
        p: {
          en: "Keep it roughly 50-60 characters so it does not truncate. Put the primary keyword near the front, add one differentiator (year, city, price, guarantee) and end with the brand: 'Local SEO Services in Lahore — 2026 Pricing | Nexus'. One title per page, never duplicated across the site. Google may rewrite your title; a clear, non-clickbait title matching the H1 is rewritten far less often. Avoid stuffing — 'SEO Lahore SEO Company Lahore Best SEO' loses both the ranking and the click.",
          ur: "ٹائٹل ٹیگ 50 تا 60 حروف رکھیں تاکہ کٹے نہیں۔ پرائمری کی ورڈ شروع میں لائیں، ایک امتیازی خصوصیت شامل کریں (مثلاً سال یا شہر) اور آخر میں برانڈ کا نام لکھیں۔ ہر صفحے کا ایک منفرد عنوان ہو، اور keyword stuffing سے بچیں۔",
        },
      },
      {
        h: { en: "2. Permalinks (URL slugs)", ur: "2۔ پرمالنک (یو آر ایل سلگ)" },
        p: {
          en: "Short, lowercase, hyphen-separated, no dates, no stop words, no IDs: /local-seo-lahore/ beats /index.php?p=8827&cat=12. Keep folder depth shallow and logical: /services/local-seo/. Once published, do not change a URL casually; if you must, add a 301 redirect from the old URL, or you lose every link and ranking pointing at it.",
          ur: "مختصر، چھوٹے حروف، ہائفن سے الگ، بغیر تاریخ اور فالتو الفاظ کے: جیسے /local-seo-lahore/۔ شائع ہونے کے بعد یو آر ایل تبدیل نہ کریں؛ اگر ضروری ہو تو 301 redirect لازمی لگائیں تاکہ بیک لنکس ضائع نہ ہوں۔",
        },
      },
      {
        h: { en: "3. Meta description — the ad copy of organic search", ur: "3۔ میٹا تفصیل — آرگینک سرچ کی اشتہاری کاپی" },
        p: {
          en: "About 140-160 characters. It is not a direct ranking factor, but it drives click-through rate, and CTR feeds back into performance. Write it as a benefit-led sentence with the keyword (Google bolds matching words), a concrete detail, and an action: 'Rank your Lahore business on Google Maps. Local SEO audits, citations and GBP optimisation — free 20-minute consultation.' Unique on every page.",
          ur: "140 تا 160 حروف۔ یہ براہ راست ranking factor نہیں مگر CTR بڑھاتی ہے۔ اسے فائدے پر مبنی جملے کی شکل میں لکھیں جس میں کی ورڈ، ٹھوس تفصیل اور کال ٹو ایکشن موجود ہو۔",
        },
      },
      {
        h: { en: "4. Headings and image alt text", ur: "4۔ ہیڈنگ اور تصویر کا آلٹ ٹیکسٹ" },
        p: {
          en: "Exactly one H1 per page, matching the title's promise. H2s carry the sub-questions (often lifted straight from People Also Ask), H3s the details — never skip levels for styling. Alt text describes the image for a blind user in plain words: alt='technician installing a 30-litre gas geyser' not alt='geyser geyser price Lahore geyser'. Decorative images take alt=''. Also compress images and use descriptive filenames.",
          ur: "ہر صفحے پر بالکل ایک H1 جو عنوان سے میل کھائے۔ H2s ذیلی سوالات کے لیے اور H3s تفصیلات کے لیے۔ Alt text تصویر کی سچی وضاحت کرے نابینا افراد اور کرالرز کے لیے، نہ کہ صرف کی ورڈز کی تکرار۔",
        },
      },
    ],
    terms: [
      { t: { en: "Title tag", ur: "ٹائٹل ٹیگ" }, d: { en: "The clickable headline shown in the SERP and browser tab.", ur: "نتائج اور براؤزر ٹیب میں دکھنے والا کلک کے قابل عنوان۔" } },
      { t: { en: "301 redirect", ur: "301 ری ڈائریکٹ" }, d: { en: "A permanent forward that passes link value to the new URL.", ur: "مستقل منتقلی جو لنک کی قدر نئے یو آر ایل تک پہنچاتی ہے۔" } },
      { t: { en: "CTR", ur: "کلک کی شرح" }, d: { en: "Clicks ÷ impressions — how compelling your listing is.", ur: "کلک تقسیم امپریشن — آپ کی لسٹنگ کتنی پرکشش ہے۔" } },
      { t: { en: "Keyword stuffing", ur: "کی ورڈ ٹھونسنا" }, d: { en: "Unnatural repetition that harms rankings and readability.", ur: "غیر فطری تکرار جو رینکنگ اور پڑھنے کی صلاحیت دونوں خراب کرتی ہے۔" } },
    ],
    task: {
      en: "Audit 10 pages of any site. For each, record: title length, whether the keyword is in the first 5 words, duplicate titles, meta description length, H1 count, and images missing alt text. Fix the three worst pages.",
      ur: "کسی بھی ویب سائٹ کے 10 صفحات کا آڈٹ کریں۔ عنوان کی لمبائی، H1 کی تعداد، میٹا تفصیل اور بغیر alt text والی تصاویر نوٹ کریں۔ سب سے خراب تین صفحات کو درست کریں۔",
    },
    links: [
      { label: "Google — Title links and snippets", url: "https://developers.google.com/search/docs/appearance/title-link" },
      { label: "Google — Image SEO best practices", url: "https://developers.google.com/search/docs/appearance/google-images" },
    ],
    quiz: [
      {
        q: { en: "Ideal title tag length before truncation?", ur: "عنوان کٹنے سے پہلے مناسب لمبائی؟" },
        opts: { en: ["20-30 characters", "50-60 characters", "90-120 characters", "No limit"], ur: ["20 تا 30 حروف", "50 تا 60 حروف", "90 تا 120 حروف", "کوئی حد نہیں"] },
        a: 1,
        exp: { en: "Around 50-60 characters fits most SERP pixel widths.", ur: "50 تا 60 حروف کے درمیان عنوان نتائج میں بغیر کٹے پورا نظر آتا ہے۔" },
      },
      {
        q: { en: "Is the meta description a direct ranking factor?", ur: "کیا میٹا تفصیل براہِ راست رینکنگ عنصر ہے؟" },
        opts: {
          en: ["Yes, the strongest one", "No — but it drives CTR, which affects performance", "Yes for images only", "Only on mobile"],
          ur: ["ہاں، سب سے مضبوط", "نہیں — مگر یہ کلک بڑھاتی ہے جو کارکردگی پر اثر ڈالتا ہے", "صرف تصاویر کے لیے", "صرف موبائل پر"],
        },
        a: 1,
        exp: { en: "Google confirmed it is not a direct ranking factor, but high CTR brings more real traffic.", ur: "یہ براہ راست رینکنگ عنصر نہیں مگر زیادہ CTR زیادہ ٹریفک لاتی ہے۔" },
      },
      {
        q: { en: "You must change a published URL. What is mandatory?", ur: "آپ کو شائع شدہ یو آر ایل بدلنا ہے۔ کیا لازمی ہے؟" },
        opts: { en: ["A 301 redirect from the old URL", "A 404 page", "Deleting the old page", "Nothing"], ur: ["پرانے یو آر ایل سے 301 ری ڈائریکٹ", "404 صفحہ", "پرانا صفحہ مٹا دینا", "کچھ نہیں"] },
        a: 0,
        exp: { en: "Without a 301 you lose accumulated backlinks and rankings.", ur: "301 redirect کے بغیر پرانے صفحے کی تمام رینکنگ ضائع ہو جائے گی۔" },
      },
      {
        q: { en: "Which alt text is correct?", ur: "کون سا آلٹ ٹیکسٹ درست ہے؟" },
        opts: {
          en: ["alt='seo lahore seo company seo best'", "alt='technician installing a 30-litre gas geyser'", "alt='image1.jpg'", "alt='click here'"],
          ur: ["alt='seo lahore seo company seo best'", "alt='تیس لیٹر گیس گیزر لگاتا ہوا ٹیکنیشن'", "alt='image1.jpg'", "alt='یہاں کلک کریں'"],
        },
        a: 1,
        exp: { en: "Alt text describes the image specifically and honestly for those who cannot see it.", ur: "Alt text تصویر کو سادگی اور سچائی سے بیان کرتا ہے۔" },
      },
      {
        q: { en: "How many H1 tags should a page have?", ur: "ایک صفحے پر کتنے H1 ہونے چاہئیں؟" },
        opts: { en: ["As many as you like", "Exactly one, matching the title's promise", "At least three", "Zero — H2 is enough"], ur: ["جتنے چاہیں", "بالکل ایک، جو عنوان کے وعدے سے میل کھائے", "کم از کم تین", "صفر — H2 کافی ہے"] },
        a: 1,
        exp: { en: "One single H1 defines the core topic clearly for both readers and search engines.", ur: "بالکل ایک H1 صفحے کے واحد موضوع کو واضح طور پر قائم کرتا ہے۔" },
      },
    ],
  },
  {
    id: "w6",
    month: 2,
    level: "intermediate",
    title: {
      en: "Technical SEO — Sitemaps, Robots.txt, Core Web Vitals",
      ur: "ٹیکنیکل ایس ای او — سائٹ میپ، روبوٹس، کور ویب وائٹلز",
    },
    summary: {
      en: "The plumbing: making sure engines can reach, render and enjoy your pages on a slow Pakistani mobile connection.",
      ur: "بنیادی ڈھانچہ: یقینی بنانا کہ سرچ انجن آپ کے صفحات تک پہنچ سکے، رینڈر کر سکے اور سست پاکستانی موبائل کنکشن پر بھی صفحہ اچھا چلے۔",
    },
    objectives: {
      en: [
        "Write and submit a correct XML sitemap",
        "Write robots.txt rules without blocking yourself",
        "Interpret LCP, INP and CLS and know the thresholds",
        "Diagnose the top causes of each Core Web Vital failure",
      ],
      ur: [
        "درست ایکس ایم ایل سائٹ میپ بنائیں اور جمع کروائیں",
        "robots.txt کے قواعد لکھیں بغیر خود کو بلاک کیے",
        "LCP، INP اور CLS سمجھیں اور ان کی حدیں یاد رکھیں",
        "ہر کور ویب وائٹل کی ناکامی کی بڑی وجوہات پہچانیں",
      ],
    },
    sections: [
      {
        h: { en: "1. XML sitemaps", ur: "1۔ ایکس ایم ایل سائٹ میپ" },
        p: {
          en: "A sitemap is a list of canonical, indexable URLs you want found — nothing else. Never include redirected, 404, noindexed or parameter URLs; a dirty sitemap teaches Google to distrust it. Keep under 50,000 URLs / 50 MB per file and use a sitemap index for larger sites. Include an accurate <lastmod>. Submit it in Search Console and reference it in the last line of robots.txt: Sitemap: https://example.com/sitemap.xml",
          ur: "سائٹ میپ صرف ان canonical اور 200-OK صفحات کی فہرست ہے جو آپ انڈیکس کروانا چاہتے ہیں۔ اس میں 404، ری ڈائریکٹس یا noindex صفحات کبھی شامل نہ کریں۔ سرچ کنسول میں جمع کروائیں اور robots.txt کے آخر میں اس کا لنک دیں۔",
        },
      },
      {
        h: { en: "2. Robots.txt — powerful and dangerous", ur: "2۔ robots.txt — طاقتور اور خطرناک" },
        p: {
          en: "Lives only at the root: example.com/robots.txt. Syntax: User-agent: * then Disallow: /cart/ or Allow: /. The classic disaster is shipping 'Disallow: /' from a staging site to production, which removes an entire site from search. Remember: Disallow stops crawling, not indexing — a blocked URL with external links can still appear as a bare link. To remove a page from results, allow crawling and add noindex.",
          ur: "یہ روٹ پر ہوتا ہے: example.com/robots.txt۔ سب سے عام تباہی یہ ہے کہ اسٹیجنگ کا 'Disallow: /' لائیو پر چلا جائے اور پوری سائٹ سرچ سے اڑ جائے۔ یاد رکھیں Disallow کرالنگ روکتا ہے، انڈیکسنگ نہیں۔ صفحہ ہٹانے کے لیے noindex لگائیں۔",
        },
      },
      {
        h: { en: "3. Core Web Vitals", ur: "3۔ کور ویب وائٹلز" },
        p: {
          en: "LCP (Largest Contentful Paint) — main content visible: good ≤ 2.5s. INP (Interaction to Next Paint, which replaced FID) — responsiveness to taps: good ≤ 200ms. CLS (Cumulative Layout Shift) — visual stability: good ≤ 0.1. Typical fixes: compress and lazy-load images and serve WebP/AVIF (LCP); break up long JavaScript tasks and remove heavy third-party scripts (INP); set width and height on images and reserve space for ads and embeds (CLS). Measure field data in Search Console's Core Web Vitals report, and lab data in PageSpeed Insights.",
          ur: "LCP: بڑا مواد لوڈ ہونے کا وقت (2.5 سیکنڈ یا کم)۔ INP: کلک یا ٹچ کا جواب (200 ملی سیکنڈ یا کم)۔ CLS: صفحے کا ہلنا (0.1 یا کم)۔ عام حل: تصاویر کمپریس کریں اور WebP دیں، بغیر سائز تصاویر پر width اور height لگائیں، اور غیر ضروری جاوا اسکرپٹ کم کریں۔",
        },
      },
      {
        h: { en: "4. Canonicals, HTTPS and mobile", ur: "4۔ کینونیکل، HTTPS اور موبائل" },
        p: {
          en: "Use rel=canonical to name the preferred version when the same content sits on several URLs (tracking parameters, print versions, http vs https, www vs non-www). Google indexes the mobile version of your site, so anything hidden on mobile is effectively missing. HTTPS is a baseline requirement — a mixed-content warning costs trust and clicks.",
          ur: "جب مواد مختلف URLs پر تقسیم ہو تو rel=canonical سے اصل ورژن بتائیں۔ موبائل ورژن ہی بنیادی انڈیکس ہے، اور HTTPS سیکیورٹی اعتماد کے لیے لازمی ہے۔",
        },
      },
    ],
    terms: [
      { t: { en: "LCP", ur: "ایل سی پی" }, d: { en: "Largest Contentful Paint — target ≤2.5s.", ur: "بڑے مواد کے ظاہر ہونے کا وقت، ہدف 2.5 سیکنڈ یا کم۔" } },
      { t: { en: "INP", ur: "آئی این پی" }, d: { en: "Interaction to Next Paint — responsiveness, target ≤200ms.", ur: "تعامل کے جواب کا وقت، ہدف 200 ملی سیکنڈ یا کم۔" } },
      { t: { en: "CLS", ur: "سی ایل ایس" }, d: { en: "Cumulative Layout Shift — visual stability, target ≤0.1.", ur: "صفحے کے ہلنے کا پیمانہ، ہدف 0.1 یا کم۔" } },
      { t: { en: "Canonical", ur: "کینونیکل" }, d: { en: "The preferred URL among duplicates.", ur: "نقل صفحات میں سے پسندیدہ یو آر ایل۔" } },
    ],
    task: {
      en: "Run PageSpeed Insights on your homepage on Mobile. Record LCP, INP and CLS, then list the top 3 opportunities it reports. Open your robots.txt and sitemap.xml and confirm the sitemap line exists and no important folder is disallowed.",
      ur: "PageSpeed Insights پر اپنی سائٹ کا موبائل ٹیسٹ کریں۔ LCP، INP اور CLS نوٹ کریں، اور تین بڑی تجاویز لکھیں۔ تصدیق کریں کہ robots.txt میں sitemap کا لنک موجود ہے۔",
    },
    links: [
      { label: "PageSpeed Insights", url: "https://pagespeed.web.dev/" },
      { label: "web.dev — Core Web Vitals", url: "https://web.dev/articles/vitals" },
      { label: "Google — Robots.txt introduction", url: "https://developers.google.com/search/docs/crawling-indexing/robots/intro" },
    ],
    quiz: [
      {
        q: { en: "Which metric replaced FID as a Core Web Vital?", ur: "کور ویب وائٹلز میں FID کی جگہ کس نے لی؟" },
        opts: { en: ["LCP", "CLS", "INP", "TTFB"], ur: ["LCP", "CLS", "INP", "TTFB"] },
        a: 2,
        exp: { en: "Interaction to Next Paint measures responsiveness across the full session duration.", ur: "INP نے FID کی جگہ لی اور پورے وزٹ کی انٹرایکشن کو جانچتا ہے۔" },
      },
      {
        q: { en: "Good LCP threshold?", ur: "اچھے LCP کی حد؟" },
        opts: { en: ["≤ 0.1s", "≤ 2.5s", "≤ 6s", "≤ 200ms"], ur: ["0.1 سیکنڈ یا کم", "2.5 سیکنڈ یا کم", "6 سیکنڈ یا کم", "200 ملی سیکنڈ یا کم"] },
        a: 1,
        exp: { en: "2.5 seconds or less is officially scored 'good'.", ur: "2.5 سیکنڈ یا اس سے کم کو 'اچھا' سمجھا جاتا ہے۔" },
      },
      {
        q: { en: "Images without width and height attributes most often damage which metric?", ur: "width اور height کے بغیر تصاویر عام طور پر کس پیمانے کو نقصان دیتی ہیں؟" },
        opts: { en: ["CLS", "INP", "TTFB", "HTTPS"], ur: ["CLS", "INP", "TTFB", "HTTPS"] },
        a: 0,
        exp: { en: "Without dimensions reserved, the page layout jumps when the image finally downloads.", ur: "جگہ محفوظ نہ ہونے پر تصویر آنے سے صفحہ اچانک ہلتا ہے (Layout Shift)۔" },
      },
      {
        q: { en: "Which URL must never be in your XML sitemap?", ur: "کون سا یو آر ایل سائٹ میپ میں کبھی نہیں ہونا چاہیے؟" },
        opts: {
          en: ["A canonical blog post", "A 301-redirected URL", "Your homepage", "A new service page"],
          ur: ["کینونیکل بلاگ پوسٹ", "301 ری ڈائریکٹ والا یو آر ایل", "آپ کا ہوم پیج", "نیا سروس صفحہ"],
        },
        a: 1,
        exp: { en: "Sitemaps must list only final, clean 200-OK canonical destinations.", ur: "سائٹ میپ میں صرف 200-OK کینونیکل یو آر ایل ہونے چاہئیں۔" },
      },
      {
        q: { en: "You want a page gone from Google results. What is correct?", ur: "آپ چاہتے ہیں صفحہ گوگل کے نتائج سے ہٹے۔ درست کیا ہے؟" },
        opts: {
          en: ["Disallow it in robots.txt", "Allow crawling and add a noindex meta tag", "Delete the sitemap", "Change the title"],
          ur: ["robots.txt میں Disallow کریں", "کرالنگ کی اجازت دیں اور noindex میٹا ٹیگ لگائیں", "سائٹ میپ مٹا دیں", "عنوان بدل دیں"],
        },
        a: 1,
        exp: { en: "Google must be able to crawl the page to see the noindex instruction.", ur: "noindex دیکھنے کے لیے گوگل کا صفحہ کرال کرنا ضروری ہے۔" },
      },
    ],
  },
  {
    id: "w7",
    month: 2,
    level: "intermediate",
    title: {
      en: "Structured Data & Schema Markup (JSON-LD)",
      ur: "اسٹرکچرڈ ڈیٹا اور اسکیما مارک اپ (JSON-LD)",
    },
    summary: {
      en: "Telling search engines what your content means, in a machine-readable format that unlocks rich results.",
      ur: "سرچ انجن کو مشین کی سمجھنے والی زبان میں بتانا کہ آپ کے مواد کا مطلب کیا ہے، جس سے رچ رزلٹ کھلتے ہیں۔",
    },
    objectives: {
      en: [
        "Write valid JSON-LD by hand",
        "Choose the right schema type for each page",
        "Validate with the Rich Results Test",
        "Avoid the policy violations that get markup ignored",
      ],
      ur: [
        "ہاتھ سے درست JSON-LD لکھیں",
        "ہر صفحے کے لیے مناسب اسکیما قسم چنیں",
        "Rich Results Test سے تصدیق کریں",
        "ان خلاف ورزیوں سے بچیں جن پر مارک اپ نظرانداز ہو جاتا ہے",
      ],
    },
    sections: [
      {
        h: { en: "1. Why structured data matters", ur: "1۔ اسٹرکچرڈ ڈیٹا کیوں اہم ہے" },
        p: {
          en: "Plain HTML tells a machine 'here is some text'. Schema tells it 'this text is a price, this is a rating of 4.6 from 218 reviews, this business closes at 8pm'. That understanding powers rich results — star ratings, FAQ dropdowns, recipe cards, breadcrumb trails, product prices and availability — which visually dominate the SERP and lift click-through even at the same rank position. It also feeds knowledge panels and AI answer surfaces.",
          ur: "سادہ HTML صرف متن دیتا ہے؛ اسکیما بتاتا ہے کہ یہ قیمت ہے، یہ ریٹنگ ہے، یہ اوقات ہیں۔ اسی سے رچ رزلٹس (ستارے، FAQ dropdowns، قیمت) ملتے ہیں جو پوزیشن بدلے بغیر کلکس دگنا کر دیتے ہیں۔",
        },
      },
      {
        h: { en: "2. JSON-LD is the recommended format", ur: "2۔ JSON-LD ہی تجویز کردہ شکل ہے" },
        p: {
          en: "Google recommends JSON-LD in a <script type='application/ld+json'> block, usually in the <head>. It sits separate from your visible HTML, so designers cannot break it by editing layout. Microdata and RDFa still work but are harder to maintain. Example: LocalBusiness schema with name, phone, address, and geo coordinates.",
          ur: "گوگل JSON-LD تجویز کرتا ہے جو <script type='application/ld+json'> بلاک میں ہوتا ہے۔ یہ نظر آنے والے ڈیزائن سے الگ رہتا ہے اس لیے لے آؤٹ بدلنے پر خراب نہیں ہوتا۔",
        },
      },
      {
        h: { en: "3. Which type for which page", ur: "3۔ کس صفحے کے لیے کون سی قسم" },
        p: {
          en: "Article / BlogPosting for content, Product with Offer and AggregateRating for shop pages, LocalBusiness for a physical location, FAQPage for genuine question-answer blocks visible on the page, HowTo for step guides, BreadcrumbList for navigation trails, Organization plus sameAs links on the homepage, Person for author bios.",
          ur: "بلاگ کے لیے Article، دکان کے لیے Product، فزیکل مقام کے لیے LocalBusiness، سوال جواب کے لیے FAQPage، اور مصنف کے لیے Person۔ صحیح صفحے پر صحیح اسکیما لگائیں۔",
        },
      },
      {
        h: { en: "4. Rules that keep markup from being ignored", ur: "4۔ وہ اصول جو مارک اپ کو نظرانداز ہونے سے بچاتے ہیں" },
        p: {
          en: "Markup must describe content that is actually visible on the page. Do not mark up FAQs the user cannot see, do not invent ratings you never collected (a manual action risk), do not mark a category page as a single Product. Always validate with Google's Rich Results Test and the Schema.org validator.",
          ur: "مارک اپ صرف اس مواد کا ہو جو صفحے پر صارف کو نظر آتا ہو۔ چھپے ہوئے سوالات یا جعلی ریٹنگز سے مینوئل ایکشن لگ سکتا ہے۔",
        },
      },
    ],
    terms: [
      { t: { en: "JSON-LD", ur: "جے سن ایل ڈی" }, d: { en: "Google's preferred schema format.", ur: "گوگل کی پسندیدہ اسکیما شکل۔" } },
      { t: { en: "Rich result", ur: "رچ رزلٹ" }, d: { en: "An enhanced SERP listing with stars, prices, FAQs or images.", ur: "بہتر لسٹنگ جس میں ستارے، قیمتیں، سوال جواب یا تصاویر ہوں۔" } },
      { t: { en: "AggregateRating", ur: "مجموعی ریٹنگ" }, d: { en: "Average score plus review count — must reflect real reviews.", ur: "اوسط اسکور اور ریویو کی تعداد — اصل ریویو پر مبنی ہونا لازم۔" } },
      { t: { en: "@id", ur: "@id" }, d: { en: "A unique identifier used to connect schema entities together.", ur: "منفرد شناخت جو اسکیما اجزا کو آپس میں جوڑتی ہے۔" } },
    ],
    task: {
      en: "Write LocalBusiness JSON-LD for a Lahore business (name, address, phone, hours, geo, url, sameAs) and Article JSON-LD for one blog post. Paste both into the Rich Results Test until zero errors remain.",
      ur: "لاہور کے کسی کاروبار کے لیے LocalBusiness اسکیما لکھیں اور بلاگ کے لیے Article اسکیما۔ Rich Results Test میں ڈال کر تمام غلطیاں ختم کریں۔",
    },
    links: [
      { label: "Google Rich Results Test", url: "https://search.google.com/test/rich-results" },
      { label: "Google — Structured data guidelines", url: "https://developers.google.com/search/docs/appearance/structured-data/sd-policies" },
    ],
    quiz: [
      {
        q: { en: "Which format does Google recommend for structured data?", ur: "گوگل اسٹرکچرڈ ڈیٹا کے لیے کون سی شکل تجویز کرتا ہے؟" },
        opts: { en: ["Microdata", "RDFa", "JSON-LD", "XML"], ur: ["Microdata", "RDFa", "JSON-LD", "XML"] },
        a: 2,
        exp: { en: "JSON-LD is Google's strongly recommended structured data standard.", ur: "گوگل کا پسندیدہ معیار JSON-LD ہے۔" },
      },
      {
        q: { en: "You add FAQ schema for questions that are hidden from users. What happens?", ur: "آپ ایسے سوالات کا FAQ اسکیما لگاتے ہیں جو صارف کو نظر نہیں آتے۔ کیا ہوگا؟" },
        opts: {
          en: ["Better rankings", "It violates guidelines and can trigger a manual action", "Nothing changes ever", "Faster indexing"],
          ur: ["بہتر رینکنگ", "یہ ہدایات کی خلاف ورزی ہے اور مینوئل ایکشن لگ سکتا ہے", "کچھ نہیں ہوگا", "تیز انڈیکسنگ"],
        },
        a: 1,
        exp: { en: "Structured data must represent visible content; hidden markup is a spam penalty violation.", ur: "اسکیما کو صفحے پر دکھائی دینے والے مواد کا عکس ہونا چاہیے۔" },
      },
      {
        q: { en: "Best schema type for a physical shop's location page?", ur: "دکان کے مقام والے صفحے کے لیے بہترین اسکیما قسم؟" },
        opts: { en: ["LocalBusiness", "BlogPosting", "VideoObject", "HowTo"], ur: ["LocalBusiness", "BlogPosting", "VideoObject", "HowTo"] },
        a: 0,
        exp: { en: "LocalBusiness communicates phone, address, and operating hours directly to Google Maps.", ur: "LocalBusiness میں پتہ، فون اور اوقات ہوتے ہیں۔" },
      },
      {
        q: { en: "Where should JSON-LD normally be placed?", ur: "JSON-LD عام طور پر کہاں رکھا جائے؟" },
        opts: {
          en: ["Inside CSS file", "In a <script type='application/ld+json'> block", "In robots.txt", "In image alt"],
          ur: ["CSS فائل میں", "<script type='application/ld+json'> بلاک میں", "robots.txt میں", "تصویر کے آلٹ میں"],
        },
        a: 1,
        exp: { en: "It resides in a script tag with type application/ld+json.", ur: "یہ اسکرپٹ ٹیگ میں application/ld+json کی شکل میں ہوتا ہے۔" },
      },
      {
        q: { en: "After deploying schema, where do you monitor errors?", ur: "اسکیما لگانے کے بعد غلطیاں کہاں دیکھیں؟" },
        opts: {
          en: ["GA4 Realtime", "Search Console Enhancements reports", "Google Trends", "cPanel"],
          ur: ["GA4 Realtime", "سرچ کنسول کی Enhancements رپورٹس", "گوگل ٹرینڈز", "cPanel"],
        },
        a: 1,
        exp: { en: "Search Console Enhancements report shows valid and invalid rich result items.", ur: "سرچ کنسول کی Enhancements رپورٹ درست اور خراب اسکیما دکھاتی ہے۔" },
      },
    ],
  },
  {
    id: "w8",
    month: 2,
    level: "intermediate",
    title: {
      en: "Local SEO & Google Business Profile (Lahore, Karachi, Islamabad)",
      ur: "لوکل ایس ای او اور گوگل بزنس پروفائل (لاہور، کراچی، اسلام آباد)",
    },
    summary: {
      en: "Winning the map pack for Pakistani cities — profile, citations, reviews and location pages.",
      ur: "پاکستانی شہروں میں نقشے والا حصہ جیتنا — پروفائل، سائٹیشن، ریویو اور مقامی صفحات۔",
    },
    objectives: {
      en: [
        "Set up and fully optimise a Google Business Profile",
        "Keep NAP consistent across Pakistani directories",
        "Build a review engine that does not violate policy",
        "Write city landing pages that are not doorway pages",
      ],
      ur: [
        "گوگل بزنس پروفائل بنائیں اور مکمل بہتر کریں",
        "پاکستانی ڈائریکٹریز میں NAP یکساں رکھیں",
        "ایسا ریویو نظام بنائیں جو پالیسی کی خلاف ورزی نہ کرے",
        "شہر کے صفحات لکھیں جو ڈوروے پیج نہ ہوں",
      ],
    },
    sections: [
      {
        h: { en: "1. Google Business Profile is the local homepage", ur: "1۔ گوگل بزنس پروفائل ہی مقامی ہوم پیج ہے" },
        p: {
          en: "For 'near me' and city queries the map pack sits above the organic list, so the profile often matters more than the website. Fill everything: exact primary category (this is the single biggest lever — 'Plumber' vs 'Plumbing Supply Store' changes which queries you appear for), secondary categories, service areas, hours including Ramadan and public holidays, services with prices, products, attributes, a description with natural keywords, and 20+ real photos. Post weekly updates and answer Q&A yourself before someone else answers wrong.",
          ur: "مقامی تلاش کے لیے map pack عام نتائج سے اوپر ہوتا ہے۔ سب سے اہم لیور Primary Category ہے (مثلاً Plumber بمقابلہ Plumbing Supply Store)۔ اوقات، رمضان اور عید کے شیڈول، اصل تصاویر اور ہفتہ وار پوسٹس شامل کریں۔",
        },
      },
      {
        h: { en: "2. NAP consistency and Pakistani citations", ur: "2۔ NAP کی یکسانیت اور پاکستانی سائٹیشن" },
        p: {
          en: "Name, Address, Phone must be byte-identical everywhere: your website footer, GBP, Facebook page, Instagram bio, and local directories. Decide one format for the phone (+92 42 ...) and one address spelling (Block, Phase, Road abbreviations) and never deviate. Useful Pakistani citation sources include Zameen, OLX business listings, PakBiz, Yellow Pages Pakistan, and Chamber of Commerce listings.",
          ur: "نام، پتہ، فون (NAP) حرف بہ حرف ہر جگہ ایک جیسا ہو: ویب سائٹ، فیس بک، گوگل بزنس، اور پاکستانی ڈائریکٹریز (Zameen، OLX، PakBiz)۔ متضاد ایڈریس گوگل کے الگورتھم کو الجھا دیتا ہے۔",
        },
      },
      {
        h: { en: "3. Reviews — the local ranking engine", ur: "3۔ ریویو — مقامی رینکنگ کا انجن" },
        p: {
          en: "Volume, recency, rating and keyword-rich review text all count. Ask every satisfied customer with a short link (g.page/r/...) sent by WhatsApp the same day. Reply to every review within 48 hours, including the negative ones — a calm, specific reply to a 1-star review converts more readers than ten 5-star reviews. Never buy reviews; sudden bursts trigger review filter suspensions.",
          ur: "ریویوز کی تعداد، نیا پن، اور ان کے الفاظ رینکنگ میں شمار ہوتے ہیں۔ ہر اچھے گاہک کو واٹس ایپ پر مختصر لنک بھیجیں۔ ہر منفی ریویو کا 48 گھنٹے میں ٹھنڈے دل سے شائستہ جواب دیں۔ کبھی ریویوز نہ خریدیں۔",
        },
      },
      {
        h: { en: "4. City pages without doorway spam", ur: "4۔ شہر کے صفحات بغیر ڈوروے اسپیم کے" },
        p: {
          en: "A city page is legitimate when it carries unique substance: local projects and photos, area names you actually serve (DHA, Gulberg, Bahria Town, Clifton, F-11), local pricing, delivery times, a map embed, testimonials from that city and local FAQs. A city page is a doorway page — and a guidelines violation — when it is the same paragraph with the city name swapped.",
          ur: "شہر کا لینڈنگ پیج تب جائز ہے جب اس میں حقیقی مقامی مواد ہو: کیے گئے پروجیکٹس، تصاویر، علاقے (DHA، Gulberg، Bahria Town، Clifton) اور مقامی ریویوز۔ صرف شہر کا نام بدل کر وہی صفحہ چھاپنا doorway spam ہے۔",
        },
      },
    ],
    terms: [
      { t: { en: "Map pack", ur: "نقشہ پیک" }, d: { en: "The three local business results shown with a map.", ur: "نقشے کے ساتھ دکھائے جانے والے تین مقامی نتائج۔" } },
      { t: { en: "NAP", ur: "این اے پی" }, d: { en: "Name, Address, Phone — must match everywhere.", ur: "نام، پتہ، فون — ہر جگہ یکساں ہونا لازم۔" } },
      { t: { en: "Citation", ur: "سائٹیشن" }, d: { en: "A mention of your NAP on another site or directory.", ur: "کسی اور سائٹ یا ڈائریکٹری پر آپ کے NAP کا ذکر۔" } },
      { t: { en: "Doorway page", ur: "ڈوروے پیج" }, d: { en: "Near-duplicate pages made only to capture city keywords.", ur: "تقریباً ایک جیسے صفحات جو صرف شہری کی ورڈ پکڑنے کو بنائے جائیں۔" } },
    ],
    task: {
      en: "Audit a real Lahore business on Google Maps: score its primary category, photo count, review count and average, reply rate, hours accuracy and description. Then write the exact improvements you would make in week one, and check its NAP on three directories.",
      ur: "گوگل میپس پر لاہور کے کسی کاروبار کا آڈٹ کریں: کیٹیگری، تصاویر، ریویو اوسط اور اوقات جانچیں۔ پہلے ہفتے میں کیا بہتری کریں گے لکھیں۔",
    },
    links: [
      { label: "Google Business Profile", url: "https://www.google.com/business/" },
      { label: "Google — Business representation guidelines", url: "https://support.google.com/business/answer/3038177" },
    ],
    quiz: [
      {
        q: { en: "Which GBP field most changes which queries you appear for?", ur: "GBP کا کون سا خانہ سب سے زیادہ بدلتا ہے کہ آپ کن سوالات پر دکھیں؟" },
        opts: { en: ["Cover photo", "Primary category", "Business description length", "Number of posts"], ur: ["کور تصویر", "بنیادی کیٹیگری", "تفصیل کی لمبائی", "پوسٹس کی تعداد"] },
        a: 1,
        exp: { en: "Primary category is the single strongest local search relevancy factor.", ur: "بنیادی کیٹیگری لوکل سرچ میں رینکنگ کا سب سے اہم عنصر ہے۔" },
      },
      {
        q: { en: "Your phone appears as 042-111-... on the site and +92 42 111... on GBP. Why is that a problem?", ur: "سائٹ پر فون 042-111-... اور GBP پر +92 42 111... ہے۔ مسئلہ کیا ہے؟" },
        opts: {
          en: ["It is not a problem", "Inconsistent NAP splits trust across duplicate entities", "It blocks crawling", "It breaks HTTPS"],
          ur: ["کوئی مسئلہ نہیں", "مختلف NAP اعتماد کو نقلی شناختوں میں بانٹ دیتا ہے", "کرالنگ رک جاتی ہے", "HTTPS ٹوٹ جاتا ہے"],
        },
        a: 1,
        exp: { en: "Search engines tie local entities by character-exact NAP matching.", ur: "مختلف فارمیٹس سے سرچ انجن کی تصدیق متاثر ہوتی ہے۔" },
      },
      {
        q: { en: "Best response to a 1-star review?", ur: "ایک ستارے کے ریویو کا بہترین جواب؟" },
        opts: {
          en: ["Ignore it", "Report it as fake immediately", "Reply calmly within 48 hours with specifics and a fix", "Ask friends to bury it with 5-star reviews"],
          ur: ["نظرانداز کریں", "فوراً جعلی رپورٹ کریں", "48 گھنٹے میں پرسکون، مخصوص جواب اور حل دیں", "دوستوں سے پانچ ستارے ڈلوا کر دبا دیں"],
        },
        a: 2,
        exp: { en: "Prospective customers read how you handle problems; a calm, helpful reply builds strong trust.", ur: "آنے والے گاہک دیکھتے ہیں کہ آپ مسئلے کو کیسے حل کرتے ہیں۔" },
      },
      {
        q: { en: "What makes a city landing page legitimate rather than a doorway page?", ur: "شہری صفحہ ڈوروے پیج کے بجائے جائز کب بنتا ہے؟" },
        opts: {
          en: ["Swapping city name in same text", "Unique local projects, areas, pricing, photos and testimonials", "Adding city 30 times", "Hiding it from menu"],
          ur: ["اسی متن میں شہر کا نام بدل دینا", "منفرد مقامی کام، علاقے، قیمتیں، تصاویر اور آراء", "شہر کا نام تیس بار لکھنا", "اسے مینو سے چھپا دینا"],
        },
        a: 1,
        exp: { en: "Genuine, non-replicated local substance prevents doorway page classification.", ur: "حقیقی مقامی تفصیلات ہی معیاری پیج کی علامت ہیں۔" },
      },
      {
        q: { en: "Where does the map pack usually appear?", ur: "نقشہ پیک عام طور پر کہاں آتا ہے؟" },
        opts: {
          en: ["Below all organic results", "Above the organic list for local queries", "Only in Google Images", "Only on desktop"],
          ur: ["تمام آرگینک نتائج کے نیچے", "مقامی سوالات پر آرگینک فہرست سے اوپر", "صرف گوگل امیجز میں", "صرف ڈیسک ٹاپ پر"],
        },
        a: 1,
        exp: { en: "Local 3-packs sit prominently above regular organic web results on local searches.", ur: "مقامی سرچز پر میپ پیک عام ویب لنکس سے اوپر آتا ہے۔" },
      },
    ],
  },

  /* ---------------- MONTH 3 — EXPERT ---------------- */
  {
    id: "w9",
    month: 3,
    level: "expert",
    title: {
      en: "AI Content Strategy & E-E-A-T Optimization",
      ur: "اے آئی مواد حکمت عملی اور E-E-A-T",
    },
    summary: {
      en: "Using AI to produce more without producing garbage — and proving Experience, Expertise, Authoritativeness and Trust on every page.",
      ur: "اے آئی سے زیادہ کام لینا مگر کچرا بنائے بغیر — اور ہر صفحے پر تجربہ، مہارت، اختیار اور اعتماد ثابت کرنا۔",
    },
    objectives: {
      en: [
        "Apply Google's stance on AI-generated content correctly",
        "Build an AI workflow where the human adds the value",
        "Demonstrate each of the four E-E-A-T elements concretely",
        "Handle YMYL topics with the required care",
      ],
      ur: [
        "اے آئی مواد پر گوگل کے مؤقف کا درست اطلاق کریں",
        "ایسا اے آئی طریقہ کار بنائیں جہاں قدر انسان ڈالے",
        "E-E-A-T کے چاروں عناصر عملی طور پر ثابت کریں",
        "YMYL موضوعات کو مطلوبہ احتیاط سے سنبھالیں",
      ],
    },
    sections: [
      {
        h: { en: "1. What Google actually says about AI content", ur: "1۔ اے آئی مواد پر گوگل اصل میں کیا کہتا ہے" },
        p: {
          en: "Google rewards helpful, reliable, people-first content however it is produced. Automation is not banned; scaled content abuse is — mass-generating pages primarily to manipulate rankings, with no added value. The test: would a person leave this page feeling their question was answered by someone who knows the subject?",
          ur: "گوگل انسان دوست اور مفید مواد کی حوصلہ افزائی کرتا ہے خواہ وہ کیسے بھی تیار کیا گیا ہو۔ آٹومیشن ممنوع نہیں مگر بغیر کسی نئی ویلیو کے رینکنگ ہیرا پھیری کے لیے سینکڑوں پیجز چھاپنا (Scaled Content Abuse) جرمانہ لاتا ہے۔",
        },
      },
      {
        h: { en: "2. A workflow where the human adds value", ur: "2۔ ایسا طریقہ کار جہاں انسان قدر ڈالے" },
        p: {
          en: "Use AI for the parts machines are good at: clustering keywords, drafting outlines, summarizing research, writing schema, generating FAQ variations. Reserve for the human: original screenshots of real work, prices you actually charge, local client stories, first-hand test results, and expert opinion. AI does 60% of drafting; human gives 100% of credibility.",
          ur: "اے آئی سے خاکہ سازی، اسکیما اور ریسرچ سمری بنوائیں۔ انسان کے پاس اصل کام کے اسکرین شاٹس، حقیقی قیمتیں، اور اپنے آزمائے ہوئے نتائج ہونے چاہئیں۔",
        },
      },
      {
        h: { en: "3. Proving E-E-A-T on the page", ur: "3۔ صفحے پر E-E-A-T ثابت کرنا" },
        p: {
          en: "Experience: 'I tested this on 14 sites; here are before/after stats.' Expertise: author byline with credentials, linked portfolio. Authoritativeness: industry citations, guest articles, brand entity clarity. Trust: HTTPS, verifiable phone/address, clear refund terms, cited primary sources. Trust is the cornerstone of E-E-A-T.",
          ur: "Experience (تجربہ)، Expertise (مہارت)، Authoritativeness (اختیار)، اور Trust (اعتماد)۔ ان میں سب سے اہم ٹرسٹ ہے جو ریئل ایڈریس، رازداری کے اصولوں اور مستند حوالوں سے پیدا ہوتا ہے۔",
        },
      },
      {
        h: { en: "4. YMYL and AI answer surfaces", ur: "4۔ YMYL اور اے آئی جوابات" },
        p: {
          en: "Your Money or Your Life topics (health, finance, legal) have zero margin for unreviewed AI hallucinations. To appear in AI Overviews: answer directly in the first two sentences, use question-shaped H2s, structured bulleted lists, and explicit schema markup.",
          ur: "YMYL (صحت اور مالیات) پر بغیر تصدیق شدہ مواد ہرگز نہ ڈالیں۔ AI Overviews میں آنے کے لیے پہلے دو جملوں میں صاف جواب دیں اور بلٹ پوائنٹس استعمال کریں۔",
        },
      },
    ],
    terms: [
      { t: { en: "E-E-A-T", ur: "ای ای اے ٹی" }, d: { en: "Experience, Expertise, Authoritativeness, Trust.", ur: "تجربہ، مہارت، اختیار، اعتماد — معیار کے پیمانے۔" } },
      { t: { en: "YMYL", ur: "وائی ایم وائی ایل" }, d: { en: "Your Money or Your Life topics with stricter accuracy rules.", ur: "پیسے یا زندگی کے موضوعات جن پر سخت اصول لگتے ہیں۔" } },
      { t: { en: "Scaled content abuse", ur: "بڑے پیمانے پر مواد کا غلط استعمال" }, d: { en: "Mass-producing thin content to manipulate rankings.", ur: "صرف رینکنگ کے لیے بے فائدہ مواد تیار کرنا۔" } },
      { t: { en: "Information gain", ur: "معلوماتی اضافہ" }, d: { en: "What your page uniquely adds beyond existing search results.", ur: "وہ نئی معلومات جو پہلے سے موجود نتائج میں نہ ہو۔" } },
    ],
    task: {
      en: "Take one AI-drafted article. Add four things only you can supply: an original screenshot, a real number from your own work, a named author bio with a link, and one opinion with a reason. Then list what a reader now gets here that the current top 3 results do not offer.",
      ur: "اے آئی سے لکھا گیا ایک مضمون لیں اور اس میں چار ذاتی چیزیں ڈالیں: اصلی اسکرین شاٹ، اپنے کام کا ڈیٹا، مصنف کا تعارف، اور ذاتی رائے۔",
    },
    links: [
      { label: "Google — AI content guidance", url: "https://developers.google.com/search/blog/2023/02/google-search-and-ai-content" },
      { label: "Google — Search Quality Rater Guidelines (PDF)", url: "https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf" },
    ],
    quiz: [
      {
        q: { en: "Is AI-generated content against Google's guidelines?", ur: "کیا اے آئی سے بنا مواد گوگل کی ہدایات کے خلاف ہے؟" },
        opts: {
          en: ["Yes, always", "No — but scaled content abuse without added value is", "Only in English", "Only for YMYL"],
          ur: ["ہاں، ہمیشہ", "نہیں — مگر بغیر اضافی قدر کے بڑے پیمانے پر مواد ممنوع ہے", "صرف انگریزی میں", "صرف YMYL کے لیے"],
        },
        a: 1,
        exp: { en: "Google judges usefulness, not the authoring tool. Unoriginal mass-generation violates spam policies.", ur: "گوگل افادیت دیکھتا ہے، اوزار نہیں؛ بے فائدہ ڈھیر لگانا خلاف ورزی ہے۔" },
      },
      {
        q: { en: "Which of these best demonstrates the first E — Experience?", ur: "ان میں سے کون سا پہلا E — تجربہ — بہترین ثابت کرتا ہے؟" },
        opts: {
          en: ["A longer word count", "Before/after screenshots of work you personally did", "More keywords in H1", "A stock photo"],
          ur: ["زیادہ الفاظ", "اپنے کیے ہوئے کام کے پہلے اور بعد کے اسکرین شاٹ", "H1 میں زیادہ کی ورڈ", "اسٹاک تصویر"],
        },
        a: 1,
        exp: { en: "First-hand proof of implementation cannot be fabricated by mass scrapers.", ur: "آپ کے اپنے اصلی اسکرین شاٹس اور نتائج ہی تجربے کا ثبوت ہیں۔" },
      },
      {
        q: { en: "Which topic is YMYL?", ur: "کون سا موضوع YMYL ہے؟" },
        opts: {
          en: ["Best cricket bats under 5000", "Diabetes medication dosage", "Cafés in Gulberg", "Wallpaper designs"],
          ur: ["پانچ ہزار سے کم کے بہترین بیٹ", "ذیابیطس کی دوا کی مقدار", "گلبرگ کے کیفے", "وال پیپر ڈیزائن"],
        },
        a: 1,
        exp: { en: "Health advice impacts human wellbeing directly and carries highest safety standards.", ur: "صحت اور ادویات سے انسانی جان جڑی ہے اس لیے یہ YMYL ہے۔" },
      },
      {
        q: { en: "Which E does Google describe as the most important?", ur: "گوگل کے نزدیک کون سا عنصر سب سے اہم ہے؟" },
        opts: { en: ["Experience", "Expertise", "Authoritativeness", "Trust"], ur: ["تجربہ", "مہارت", "اختیار", "اعتماد"] },
        a: 3,
        exp: { en: "Trust is the central pillar that all other factors support.", ur: "اعتماد (Trust) سب سے مرکزی نکتہ ہے۔" },
      },
      {
        q: { en: "To be quoted in AI overviews, your page should…", ur: "اے آئی خلاصوں میں نقل ہونے کے لیے آپ کا صفحہ…"},
        opts: {
          en: ["Bury the answer at the end", "Answer in the first two sentences with clear structure and schema", "Hide facts inside images", "Use only long paragraphs"],
          ur: ["جواب آخر میں چھپائے", "پہلے دو جملوں میں واضح ساخت اور اسکیما کے ساتھ جواب دے", "حقائق تصاویر میں چھپائے", "صرف لمبے پیراگراف رکھے"],
        },
        a: 1,
        exp: { en: "Extractive summarizers reward clear, concise answers near the opening.", ur: "خلاصہ بنانے والے ماڈلز شروع میں دیا گیا منظم جواب ترجیح دیتے ہیں۔" },
      },
    ],
  },
  {
    id: "w10",
    month: 3,
    level: "expert",
    title: {
      en: "Google Analytics 4 (GA4) & Search Console Tracking",
      ur: "گوگل اینالیٹکس 4 اور سرچ کنسول ٹریکنگ",
    },
    summary: {
      en: "Measuring what actually happened, so reporting to a client is evidence and not opinion.",
      ur: "جو واقعی ہوا اسے ناپنا، تاکہ گاہک کو دی جانے والی رپورٹ رائے نہیں ثبوت ہو۔",
    },
    objectives: {
      en: [
        "Explain the GA4 event-based model versus old sessions",
        "Set up key events (conversions) for leads and sales",
        "Use the four Search Console reports that matter",
        "Build a simple monthly client report with Looker Studio",
      ],
      ur: [
        "GA4 کے ایونٹ ماڈل اور پرانے سیشن ماڈل کا فرق بتائیں",
        "لیڈ اور فروخت کے لیے اہم ایونٹ (کنورژن) بنائیں",
        "سرچ کنسول کی چار اہم رپورٹس استعمال کریں",
        "Looker Studio سے سادہ ماہانہ رپورٹ بنائیں",
      ],
    },
    sections: [
      {
        h: { en: "1. GA4's event model", ur: "1۔ GA4 کا ایونٹ ماڈل" },
        p: {
          en: "Universal Analytics counted sessions and pageviews; GA4 records events, and everything is an event — page_view, scroll, click, form_submit, purchase. Create custom events for your business actions: whatsapp_click, quote_request, brochure_download. Mark key events to show conversions in reports.",
          ur: "پرانا اینالیٹکس سیشنز گنتا تھا جبکہ GA4 میں ہر ایکشن ایک Event ہے (scroll، click، purchase، form_submit)۔ واٹس ایپ اور کال بٹن پر custom events لگائیں تاکہ لیڈز ٹریک ہوں۔",
        },
      },
      {
        h: { en: "2. The setup that matters", ur: "2۔ اہم سیٹ اپ" },
        p: {
          en: "Install GA4 via Google Tag Manager so marketing changes need no developer. Enable enhanced measurement. Create key events for every lead path: form submit, WhatsApp click, phone tap, email click. Filter internal traffic by IP so your own visits do not pollute data.",
          ur: "Google Tag Manager کے ذریعے GA4 لگائیں تاکہ کوڈ چھیڑنا نہ پڑے۔ واٹس ایپ اور فون کالز کو key events نشان زد کریں۔ اپنی IP فلٹر کریں تاکہ ٹیم کی ٹریفک اعداد خراب نہ کرے۔",
        },
      },
      {
        h: { en: "3. Search Console — four reports", ur: "3۔ سرچ کنسول — چار رپورٹس" },
        p: {
          en: "Performance: queries, clicks, impressions, CTR and average position (compare 28-day periods). Pages: which URLs are indexed and why errors occurred. Core Web Vitals: user speed field data. Enhancements: structured data validation. Search Console measures Google search; GA4 measures on-site behaviour.",
          ur: "Performance رپورٹ میں queries، impressions، CTR اور پوزیشن دیکھیں۔ Pages رپورٹ میں انڈیکسنگ کے مسائل دیکھیں۔ Search Console سرچ کے اعداد دکھاتا ہے جبکہ GA4 سائٹ کے اندر کا رویہ۔",
        },
      },
      {
        h: { en: "4. Reporting to a client", ur: "4۔ گاہک کو رپورٹ دینا" },
        p: {
          en: "Clients do not buy rankings; they buy business outcomes. A one-page Looker Studio dashboard displays: organic clicks trend, top queries, lead conversions, technical tickets solved, and upcoming action plans. If a metric cannot be tied to money, move it to the appendix.",
          ur: "گاہک رینکنگ نہیں نتائج خریدتے ہیں۔ Looker Studio میں ایک صفحے کی رپورٹ میں آرگینک ٹریفک، ٹاپ کی ورڈز اور واٹس ایپ/فارم سے آنے والی لیڈز دکھائیں۔",
        },
      },
    ],
    terms: [
      { t: { en: "Key event", ur: "اہم ایونٹ" }, d: { en: "A GA4 event designated as a business conversion.", ur: "وہ GA4 ایونٹ جسے کنورژن نشان زد کیا جائے۔" } },
      { t: { en: "Impressions", ur: "امپریشن" }, d: { en: "How many times your listing was seen in search results.", ur: "آپ کی لسٹنگ نتائج میں کتنی بار دیکھی گئی۔" } },
      { t: { en: "Average position", ur: "اوسط پوزیشن" }, d: { en: "Mean ranking position across searches.", ur: "کسی سوال پر امپریشنز کی اوسط رینکنگ۔" } },
      { t: { en: "Looker Studio", ur: "لُکر اسٹوڈیو" }, d: { en: "Google's free dashboard tool for automated client reports.", ur: "گاہک رپورٹس کے لیے گوگل کا مفت ڈیش بورڈ ٹول۔" } },
    ],
    task: {
      en: "In Search Console, filter the last 28 days to positions 8-20 and export the top 20 queries. In GA4, create one key event for a WhatsApp click. Then build a one-page Looker Studio report combining organic clicks, top queries and that key event.",
      ur: "سرچ کنسول میں 28 دن کے دوران پوزیشن 8 تا 20 والے سوالات فلٹر کریں۔ GA4 میں واٹس ایپ کلک کا ایونٹ بنائیں اور Looker Studio میں ایک صفحے کی رپورٹ جوڑیں۔",
    },
    links: [
      { label: "Google Analytics 4", url: "https://analytics.google.com/" },
      { label: "Looker Studio", url: "https://lookerstudio.google.com/" },
    ],
    quiz: [
      {
        q: { en: "What is the core unit of measurement in GA4?", ur: "GA4 میں پیمائش کی بنیادی اکائی کیا ہے؟" },
        opts: { en: ["Session", "Event", "Pageview", "Hit type"], ur: ["سیشن", "ایونٹ", "پیج ویو", "ہٹ ٹائپ"] },
        a: 1,
        exp: { en: "Everything in GA4 is registered as an Event with accompanying parameters.", ur: "GA4 میں ہر ایکشن ایک Event کے طور پر ریکارڈ ہوتا ہے۔" },
      },
      {
        q: { en: "Which tool tells you your average position for a query?", ur: "کون سا ٹول کسی سوال پر آپ کی اوسط پوزیشن بتاتا ہے؟" },
        opts: { en: ["GA4", "Google Search Console", "Tag Manager", "PageSpeed Insights"], ur: ["GA4", "گوگل سرچ کنسول", "ٹیگ مینیجر", "PageSpeed Insights"] },
        a: 1,
        exp: { en: "Search Console records impressions, query keywords, CTR and rank position.", ur: "سرچ کنسول میں سرچ کی پوزیشنز اور امپریشنز ملتے ہیں۔" },
      },
      {
        q: { en: "Fastest traffic win in the Performance report?", ur: "Performance رپورٹ میں سب سے تیز فائدہ کہاں ہے؟" },
        opts: { en: ["Queries in positions 8-20", "Queries in position 1", "Zero-impression queries", "Branded queries"], ur: ["پوزیشن 8 تا 20 والے سوالات", "پوزیشن 1 والے سوالات", "صفر امپریشن والے", "برانڈ والے سوالات"] },
        a: 0,
        exp: { en: "Pages on page two (8-20) already have initial relevance; minor tweaks push them onto page one.", ur: "پوزیشن 8 تا 20 والے الفاظ تھوڑی سی آن پیج بہتری سے صفحہ اول پر آ جاتے ہیں۔" },
      },
      {
        q: { en: "Why filter internal traffic in GA4?", ur: "GA4 میں اپنی ٹریفک کیوں فلٹر کریں؟" },
        opts: {
          en: ["To speed up site", "So your own visits do not distort conversion data", "To improve rankings", "To reduce hosting cost"],
          ur: ["سائٹ تیز کرنے کے لیے", "تاکہ آپ کے اپنے وزٹ کنورژن ڈیٹا خراب نہ کریں", "رینکنگ بہتر کرنے کے لیے", "ہوسٹنگ سستی کرنے کے لیے"],
        },
        a: 1,
        exp: { en: "Testing actions inflate visitor counts and distort real conversion rates.", ur: "اپنی ٹیم کے وزٹس سے کنورژن ریٹ خراب ہو جاتا ہے۔" },
      },
      {
        q: { en: "What belongs at the top of a monthly client report?", ur: "ماہانہ گاہک رپورٹ کے اوپر کیا ہونا چاہیے؟" },
        opts: { en: ["Bounce rate history", "Leads and revenue from organic", "Number of keywords tracked", "Server uptime"], ur: ["باؤنس ریٹ کی تاریخ", "آرگینک سے آنے والے لیڈ اور آمدنی", "ٹریک کیے گئے کی ورڈ کی تعداد", "سرور اپ ٹائم"] },
        a: 1,
        exp: { en: "Business leads and revenue earned demonstrate the monetary return on investment.", ur: "گاہک پیسے اور لیڈز دیکھنا چاہتے ہیں۔" },
      },
    ],
  },
  {
    id: "w11",
    month: 3,
    level: "expert",
    title: {
      en: "Off-Page SEO & Ethical Link Building",
      ur: "آف پیج ایس ای او اور اخلاقی لنک بلڈنگ",
    },
    summary: {
      en: "Earning authority from other websites without buying links or risking a penalty.",
      ur: "دوسری ویب سائٹس سے اختیار کمانا، بغیر لنک خریدے اور بغیر جرمانے کے خطرے کے۔",
    },
    objectives: {
      en: [
        "Judge a link by quality, relevance and placement",
        "Run three link tactics that work with no budget",
        "Write outreach emails that get replies",
        "Recognise and avoid link schemes",
      ],
      ur: [
        "لنک کو معیار، مطابقت اور جگہ کے لحاظ سے پرکھیں",
        "بغیر بجٹ کے چلنے والی تین حکمتِ عملی چلائیں",
        "ایسی آؤٹ ریچ ای میل لکھیں جس کا جواب آئے",
        "لنک اسکیمیں پہچانیں اور ان سے بچیں",
      ],
    },
    sections: [
      {
        h: { en: "1. What makes a link valuable", ur: "1۔ لنک کی قدر کس سے بنتی ہے" },
        p: {
          en: "Relevance first — a link from a Pakistani interior design blog to a bathroom supplier is worth far more than a generic directory with a high domain score. Placement: an editorial in-content link inside the body text beats a footer or sidebar link. Anchor text: natural and varied, never the exact-match keyword repeated dozens of times.",
          ur: "مطابقت (Relevance) سب سے پہلے ہے۔ متعلقہ بلاگ کا ادارتی لنک کسی عام بڑی ڈائریکٹری سے بہتر ہے۔ اینکر ٹیکسٹ قدرتی اور مختلف ہو، ایک ہی کی ورڈ بار بار نہیں ورنہ وہ ہیرا پھیری لگے گا۔",
        },
      },
      {
        h: { en: "2. Three tactics that work with zero budget", ur: "2۔ بغیر بجٹ کے چلنے والی تین حکمتِ عملی" },
        p: {
          en: "(a) Digital PR with original data: survey 200 local customers, publish numbers, and pitch to journalists; numbers are the most cited asset. (b) Broken link building: find 404 pages on industry sites, write replacement resources, and email webmasters. (c) Supplier & manufacturer claims: ask brands you retail to add you to their 'Where to Buy' page.",
          ur: "(الف) مقامی ڈیٹا سروے پبلش کریں جسے صحافی نقل کریں، (ب) ٹوٹے لنکس ڈھونڈ کر متبادل آرٹیکل پیش کریں، (ج) جن برانڈز کا سامان بیچتے ہیں ان کے 'Where to Buy' پیج پر لنک مانگیں۔",
        },
      },
      {
        h: { en: "3. Outreach that gets replies", ur: "3۔ ایسی آؤٹ ریچ جس کا جواب آئے" },
        p: {
          en: "Write to a real person by name. Prove you read their work in sentence one. State reader value first. Keep under 120 words. Follow up once after 5 days. Never offer money for a dofollow link, and never send 500 blind templates.",
          ur: "نام سے مخاطب کریں۔ پہلی ہی سطر میں ثابت کریں کہ آپ نے ان کا آرٹیکل پڑھا ہے۔ 120 الفاظ سے کم رکھیں اور پیسے کی پیشکش کے بغیر فائدہ بتائیں۔",
        },
      },
      {
        h: { en: "4. Link schemes and how sites get burned", ur: "4۔ لنک اسکیمیں اور سائٹس کیسے جلتی ہیں" },
        p: {
          en: "Buying links that pass PageRank, PBNs (Private Blog Networks), and mass automated forum spam violate Google spam policies. Google's SpamBrain neutralises paid links or applies manual actions in Search Console.",
          ur: "بیک لنکس خریدنا یا بلاگ نیٹ ورکس بنانا گوگل اسپیم پالیسی کی خلاف ورزی ہے۔ گوگل کا SpamBrain ایسے لنکس بے اثر کر دیتا ہے یا مینوئل ایکشن کا جرمانہ لگاتا ہے۔",
        },
      },
    ],
    terms: [
      { t: { en: "Backlink", ur: "بیک لنک" }, d: { en: "A hyperlink from another website pointing to yours.", ur: "دوسری سائٹ سے آپ کی طرف آنے والا لنک۔" } },
      { t: { en: "Anchor text", ur: "اینکر ٹیکسٹ" }, d: { en: "The clickable text that houses the hyperlink.", ur: "لنک کے وہ الفاظ جن پر کلک ہوتا ہے۔" } },
      { t: { en: "Manual action", ur: "مینوئل ایکشن" }, d: { en: "A human-reviewed penalty visible in Search Console.", ur: "گوگل کی طرف سے انسانی جرمانہ، سرچ کنسول میں نظر آتا ہے۔" } },
      { t: { en: "Disavow", ur: "ڈس اوو" }, d: { en: "Asking Google to discount toxic spam links.", ur: "گوگل سے مخصوص نقصان دہ لنکس نظرانداز کرنے کی درخواست۔" } },
    ],
    task: {
      en: "Build a 25-row prospect sheet: site, contact name, why they would care, your specific angle, and the page you want linked. Send five personalised emails under 120 words each. Log replies after seven days.",
      ur: "25 ویب سائٹس کی فہرست بنائیں جن سے لنک مل سکتا ہے۔ 120 الفاظ سے کم کی 5 ذاتی نوعیت کی ای میلز بھیجیں اور نتائج نوٹ کریں۔",
    },
    links: [
      { label: "Google — Link spam policies", url: "https://developers.google.com/search/docs/essentials/spam-policies#link-spam" },
      { label: "Google Search Console Disavow Tool", url: "https://search.google.com/search-console/disavow-links" },
    ],
    quiz: [
      {
        q: { en: "Which link is most valuable?", ur: "کون سا لنک سب سے قیمتی ہے؟" },
        opts: {
          en: ["A footer link on a high-DR unrelated site", "An editorial in-content link from a relevant niche site", "A blog comment link", "A paid directory listing"],
          ur: ["غیر متعلقہ بڑی سائٹ کے فوٹر کا لنک", "متعلقہ شعبے کی سائٹ کے متن میں ادارتی لنک", "بلاگ کمنٹ کا لنک", "پیسے والی ڈائریکٹری لسٹنگ"],
        },
        a: 1,
        exp: { en: "Relevance and in-content editorial placement offer the strongest trust signal.", ur: "متعلقہ سائٹ کے پیراگراف کے اندر سے آنے والا لنک سب سے وزنی ہے۔" },
      },
      {
        q: { en: "What does rel='sponsored' indicate?", ur: "rel='sponsored' کیا ظاہر کرتا ہے؟" },
        opts: { en: ["A paid or compensated link", "A broken link", "A canonical link", "An internal link"], ur: ["پیسے یا معاوضے والا لنک", "ٹوٹا لنک", "کینونیکل لنک", "اندرونی لنک"] },
        a: 0,
        exp: { en: "Disclosing paid advertisements with rel=sponsored protects against link spam penalties.", ur: "اشتہاری یا معاوضے والے لنک پر sponsored لگانا ضروری ہے۔" },
      },
      {
        q: { en: "Repeating the same exact-match anchor across many sites looks like…", ur: "کئی سائٹس پر ایک ہی بالکل ملتا اینکر بار بار استعمال کرنا کیسا لگتا ہے؟" },
        opts: { en: ["Natural editorial linking", "Manipulation, and a spam signal", "Good branding", "Required by Google"], ur: ["قدرتی ادارتی لنکنگ", "ہیرا پھیری اور اسپام کا اشارہ", "اچھی برانڈنگ", "گوگل کی شرط"] },
        a: 1,
        exp: { en: "Artificial anchor footprints trigger algorithmic link spam filters.", ur: "ایک جیسے الفاظ کا اینکر بار بار آنا ہیرا پھیری کا ثبوت بن جاتا ہے۔" },
      },
      {
        q: { en: "Most linkable asset a small local business can create?", ur: "چھوٹا مقامی کاروبار سب سے زیادہ لنک لانے والا کیا بنا سکتا ہے؟" },
        opts: { en: ["A longer About page", "Original local data or a survey", "More stock photos", "A second logo"], ur: ["لمبا About صفحہ", "اصل مقامی ڈیٹا یا سروے", "مزید اسٹاک تصاویر", "دوسرا لوگو"] },
        a: 1,
        exp: { en: "Journalists and local publications actively cite proprietary numbers and surveys.", ur: "میڈیا اور بلاگرز اصل اعداد و شمار کا حوالہ دیتے ہیں۔" },
      },
      {
        q: { en: "Where would you see a manual action?", ur: "مینوئل ایکشن کہاں نظر آئے گا؟" },
        opts: { en: ["GA4", "Google Search Console", "Google Trends", "Tag Manager"], ur: ["GA4", "گوگل سرچ کنسول", "گوگل ٹرینڈز", "ٹیگ مینیجر"] },
        a: 1,
        exp: { en: "Search Console contains the dedicated Manual Actions report.", ur: "سرچ کنسول میں مینوئل ایکشن کی الگ رپورٹ ہوتی ہے۔" },
      },
    ],
  },
  {
    id: "w12",
    month: 3,
    level: "expert",
    title: {
      en: "Fiverr Gig Setup, Upwork Bidding & Client Proposals",
      ur: "فائیور گگ، اپ ورک بڈنگ اور کلائنٹ پروپوزل",
    },
    summary: {
      en: "Turning the skill into income from Pakistan — pricing, positioning, proposals and payment.",
      ur: "پاکستان سے اس ہنر کو آمدنی میں بدلنا — قیمت، پوزیشننگ، پروپوزل اور ادائیگی۔",
    },
    objectives: {
      en: [
        "Publish a Fiverr gig that converts",
        "Write Upwork proposals that get interviews",
        "Price SEO work without underselling",
        "Deliver, report and retain the client",
      ],
      ur: [
        "ایسا فائیور گگ شائع کریں جو آرڈر لائے",
        "ایسے اپ ورک پروپوزل لکھیں جن پر انٹرویو ملے",
        "ایس ای او کام کی قیمت کم لگائے بغیر طے کریں",
        "کام دیں، رپورٹ دیں اور گاہک برقرار رکھیں",
      ],
    },
    sections: [
      {
        h: { en: "1. Positioning beats competing on price", ur: "1۔ پوزیشننگ قیمت کی جنگ سے بہتر ہے" },
        p: {
          en: "'I will do SEO' competes with 40,000 sellers. 'I will fix Google Business Profile ranking for Lahore restaurants' competes with almost nobody, and the buyer instantly understands you. Pick a niche you have real exposure to (clinics, real estate, Shopify fashion) and one deliverable. Narrow first, broaden after 20 five-star reviews.",
          ur: "'I will do SEO' کا مقابلہ 40 ہزار لوگوں سے ہے۔ جبکہ 'لاہور کے ریستورانوں کا لوکل ایس ای او' فوری گاہک پکڑتا ہے کیونکہ وہاں مقابلہ کم ہے اور ویلیو واضح ہے۔",
        },
      },
      {
        h: { en: "2. The Fiverr gig anatomy", ur: "2۔ فائیور گگ کی ساخت" },
        p: {
          en: "Title: clear outcome. Thumbnail: clean before/after ranking screenshot with legible typography. Three packages: Basic (Audit, $25-50), Standard (Audit + On-Page, $75-100), Premium (Monthly local retainer, $200-300). Lead description with the buyer's pain point. Never guarantee #1 position.",
          ur: "تین پیکیجز بنائیں: آڈٹ، آن پیج، اور ماہانہ ریٹینر۔ پہلے اور بعد کے رینکنگ اسکرین شاٹس کی تھمب نیل بنائیں۔ پہلی پوزیشن کی جھوٹی گارنٹی کبھی نہ دیں۔",
        },
      },
      {
        h: { en: "3. Upwork proposals that get interviews", ur: "3۔ اپ ورک پروپوزل جن پر انٹرویو ملے" },
        p: {
          en: "The first two lines are all a client sees in list view: put a specific technical observation about THEIR site there. Then three bullets outlining your 14-day approach and timeline, and one insightful question. Attach a free two-page mini-audit. Eliminate generic greetings.",
          ur: "پہلی دو سطروں میں گاہک کی اپنی ویب سائٹ کی خامی بتائیں۔ پھر تین بلٹس میں 14 دن کا حل اور ایک سوال لکھیں۔ مفت دو صفحاتی منی آڈٹ اٹیچ کریں۔",
        },
      },
      {
        h: { en: "4. Pricing, delivery and payments from Pakistan", ur: "4۔ قیمت، ڈیلیوری اور پاکستان سے ادائیگی" },
        p: {
          en: "Price the business value, not hourly effort. Typical Pakistani freelancer rates: Audits $50-150, On-page $15-40/page, Monthly retainers $200-600. Take 50% upfront on direct clients. Withdraw via Payoneer or Wise to Pakistani local banks, and register with PSEB for freelancer tax exemptions.",
          ur: "گھنٹوں کے بجائے نتائج کی قیمت لگائیں۔ آڈٹ $50 تا $150، ماہانہ ریٹینر $200 تا $600۔ براہ راست کلائنٹس سے 50% ایڈوانس لیں۔ Payoneer یا Wise سے رقم لائیں اور PSEB رجسٹریشن کرائیں۔",
        },
      },
    ],
    terms: [
      { t: { en: "Gig", ur: "گگ" }, d: { en: "A packaged service offering on Fiverr.", ur: "فائیور پر پیش کی گئی طے شدہ خدمت۔" } },
      { t: { en: "Retainer", ur: "ریٹینر" }, d: { en: "A recurring monthly fee for ongoing services.", ur: "جاری کام کے لیے ماہانہ مقررہ فیس۔" } },
      { t: { en: "Milestone", ur: "مائل اسٹون" }, d: { en: "Agreed project phases with funded escrow releases on Upwork.", ur: "اپ ورک پر مرحلہ وار فنڈ ریلیز کا نظام۔" } },
      { t: { en: "PSEB", ur: "پی ایس ای بی" }, d: { en: "Pakistan Software Export Board facilitating freelancer benefits.", ur: "پاکستان سافٹ ویئر ایکسپورٹ بورڈ جو فری لانسرز کو مراعات دیتا ہے۔" } },
    ],
    task: {
      en: "Publish one Fiverr gig with three packages and a before/after thumbnail. Write three Upwork proposals using the two-line hook formula, each with a two-page mini-audit attached. Then price your service list and write your 50% upfront terms.",
      ur: "تین پیکیجز کے ساتھ فائیور گگ تیار کریں۔ دو سطری ہک فارمولے سے اپ ورک پروپوزل لکھیں جس کے ساتھ مختصر آڈٹ لگا ہو۔",
    },
    links: [
      { label: "Fiverr Seller Help Centre", url: "https://help.fiverr.com/hc/en-us" },
      { label: "Upwork Freelancer Resources", url: "https://www.upwork.com/resources/" },
      { label: "PSEB Freelancer Registration", url: "https://www.pseb.org.pk/" },
    ],
    quiz: [
      {
        q: { en: "Which Fiverr gig title is strongest for a beginner?", ur: "نئے فری لانسر کے لیے کون سا گگ عنوان بہترین ہے؟" },
        opts: {
          en: ["I will do SEO for your website", "I will do local SEO and rank Google Business Profile for your Lahore restaurant", "I will be your SEO partner", "I will make you number 1 on Google"],
          ur: ["I will do SEO for your website", "I will do local SEO and rank Google Business Profile for your Lahore restaurant", "I will be your SEO partner", "I will make you number 1 on Google"],
        },
        a: 1,
        exp: { en: "Specific positioning faces far less competition and clearly speaks to target buyers.", ur: "مخصوص اور واضح عنوان پر مقابلہ کم اور گاہک کا اعتماد زیادہ ہوتا ہے۔" },
      },
      {
        q: { en: "What must the first two lines of an Upwork proposal contain?", ur: "اپ ورک پروپوزل کی پہلی دو سطروں میں کیا ہونا چاہیے؟" },
        opts: {
          en: ["Your years of experience", "A specific observation about the client's own site", "Your hourly rate", "A list of certificates"],
          ur: ["آپ کے تجربے کے سال", "گاہک کی اپنی سائٹ کے بارے میں مخصوص مشاہدہ", "آپ کا فی گھنٹہ ریٹ", "اسناد کی فہرست"],
        },
        a: 1,
        exp: { en: "The client list snippet only reveals line 1-2; observing their actual domain earns the interview.", ur: "کلائنٹ کو صرف پہلی دو سطریں نظر آتی ہیں؛ اس کی اپنی سائٹ کی نشاندہی کلک لاتی ہے۔" },
      },
      {
        q: { en: "Safest payment structure with a direct client?", ur: "براہِ راست گاہک کے ساتھ محفوظ ادائیگی کا طریقہ؟" },
        opts: {
          en: ["Full payment after three months", "50% upfront, balance on delivery", "Payment only if rankings improve", "Free work to build trust"],
          ur: ["تین ماہ بعد پوری رقم", "50 فیصد پیشگی، باقی ڈیلیوری پر", "صرف رینکنگ بہتر ہونے پر ادائیگی", "اعتماد کے لیے مفت کام"],
        },
        a: 1,
        exp: { en: "Upfront deposits filter non-serious clients and protect working capital.", ur: "50 فیصد پیشگی غیر سنجیدہ کلائنٹس کو چھانٹ دیتی ہے۔" },
      },
      {
        q: { en: "What makes a client renew a monthly retainer?", ur: "گاہک ماہانہ ریٹینر کیوں جاری رکھتا ہے؟" },
        opts: {
          en: ["Daily WhatsApp messages", "A clear one-page monthly report tying work to leads", "A longer contract", "A cheaper price"],
          ur: ["روزانہ واٹس ایپ پیغام", "ایک صفحے کی واضح ماہانہ رپورٹ جو کام کو لیڈ سے جوڑے", "لمبا معاہدہ", "کم قیمت"],
        },
        a: 1,
        exp: { en: "Clear reporting connecting technical output directly to business revenue drives renewals.", ur: "رپورٹ جو بتائے کہ کام سے کتنے گاہک آئے، وہی تجدید کرواتی ہے۔" },
      },
      {
        q: { en: "Which body helps Pakistani freelancers with registration and benefits?", ur: "پاکستانی فری لانسرز کی رجسٹریشن اور مراعات میں کون سا ادارہ مدد کرتا ہے؟" },
        opts: { en: ["PSEB", "PEMRA", "NADRA", "PTA"], ur: ["PSEB", "PEMRA", "NADRA", "PTA"] },
        a: 0,
        exp: { en: "The Pakistan Software Export Board facilitates freelancer registration and bank remittances.", ur: "پاکستان سافٹ ویئر ایکسپورٹ بورڈ (PSEB) فری لانسرز کی سہولت کا ادارہ ہے۔" },
      },
    ],
  },
];
