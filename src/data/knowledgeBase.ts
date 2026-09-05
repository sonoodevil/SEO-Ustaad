import { KnowledgeItem } from "../types";

export const INITIAL_KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: "kb-1",
    type: "code",
    title: "Organization JSON-LD Structured Data",
    titleUrdu: "آرگنائزیشن اسکیما مارک اپ (گوگل رچ رزلٹ کے لیے)",
    category: "schema",
    tags: ["JSON-LD", "Schema", "Organization", "Google SERP"],
    codeLanguage: "json",
    content: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme Digital Pakistan",
  "url": "https://www.acmedigital.pk",
  "logo": "https://www.acmedigital.pk/logo.png",
  "sameAs": [
    "https://www.facebook.com/acmedigitalpk",
    "https://twitter.com/acmedigitalpk",
    "https://www.linkedin.com/company/acmedigitalpk"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+92-300-1234567",
    "contactType": "customer service",
    "areaServed": "PK",
    "availableLanguage": ["Urdu", "English"]
  }
}
</script>`,
    isFavorite: true,
    createdAt: "2026-08-15T10:00:00.000Z",
  },
  {
    id: "kb-2",
    type: "code",
    title: "FAQPage Schema Markup Snippet",
    titleUrdu: "ایف اے کیو (FAQ) سوال و جواب اسکیما",
    category: "schema",
    tags: ["FAQ", "Rich Snippet", "SERP Accordion"],
    codeLanguage: "json",
    content: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does SEO take to show rankings in Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typically 3 to 6 months for low-to-medium competition keywords, depending on website technical health, backlink profile, and content quality."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between On-Page and Technical SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "On-Page SEO focuses on content, keywords, and HTML elements like title tags and headers. Technical SEO focuses on crawlability, indexation, site speed, and site architecture."
      }
    }
  ]
}
</script>`,
    isFavorite: true,
    createdAt: "2026-08-16T12:00:00.000Z",
  },
  {
    id: "kb-3",
    type: "code",
    title: "Battle-Tested robots.txt Configuration",
    titleUrdu: "مکمل اور محفوظ robots.txt فائل",
    category: "technical",
    tags: ["robots.txt", "Crawl Budget", "Technical SEO"],
    codeLanguage: "plaintext",
    content: `# Standard production robots.txt
User-agent: *
Disallow: /wp-admin/
Disallow: /admin/
Disallow: /checkout/
Disallow: /cart/
Disallow: /search?*
Disallow: /*?add-to-cart=*
Allow: /wp-admin/admin-ajax.php

# Sitemap declaration
Sitemap: https://www.yourdomain.com/sitemap_index.xml`,
    isFavorite: false,
    createdAt: "2026-08-18T09:30:00.000Z",
  },
  {
    id: "kb-4",
    type: "note",
    title: "E-E-A-T Quality Rater Guidelines Checklist",
    titleUrdu: "گوگل ای ای اے ٹی (E-E-A-T) کے رہنما اصول",
    category: "on-page",
    tags: ["E-E-A-T", "Google Guidelines", "Content Quality", "YMYL"],
    content: `## 4 Pillars of Google E-E-A-T

1. **Experience (تجربہ)**
   - Demonstrate first-hand or life experience.
   - Include authentic product unboxing photos, personal test metrics, or screenshots.

2. **Expertise (مہارت)**
   - Author bio with verified credentials, degrees, or industry recognition.
   - Clear citations of peer-reviewed or authoritative sources.

3. **Authoritativeness (مستند حیثیت)**
   - The site is the go-to source for this topic in its niche.
   - Mentions and citations from news outlets, universities, and industry peers.

4. **Trustworthiness (بنیادی اعتماد - Most Critical)**
   - Clear Contact Us page with physical address, phone number, and support email.
   - Transparent refund/privacy policies on e-commerce sites.
   - Secure HTTPS certificate with clean SSL chain.`,
    isFavorite: true,
    createdAt: "2026-08-20T14:15:00.000Z",
  },
  {
    id: "kb-5",
    type: "code",
    title: "Canonical and Hreflang Tags Template",
    titleUrdu: "کینونیکل اور کثیر لسانی (Hreflang) ٹیگز",
    category: "technical",
    tags: ["Canonical", "Hreflang", "Duplicate Content", "International"],
    codeLanguage: "html",
    content: `<!-- Self-referencing Canonical Tag -->
<link rel="canonical" href="https://example.com/blog/seo-guide/" />

<!-- Multi-language Hreflang implementation -->
<link rel="alternate" hreflang="en-pk" href="https://example.com/en-pk/seo-guide/" />
<link rel="alternate" hreflang="ur-pk" href="https://example.com/ur-pk/seo-guide/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/seo-guide/" />`,
    isFavorite: false,
    createdAt: "2026-08-22T11:00:00.000Z",
  },
  {
    id: "kb-6",
    type: "note",
    title: "High-Converting Upwork Proposal Hook (Pakistani Freelancers)",
    titleUrdu: "اپ ورک پروپوزل کے پہلے دو جملوں کی حکمتِ عملی",
    category: "freelancing",
    tags: ["Upwork", "Freelancing", "Pitching", "Client Acquisition"],
    content: `### The 2-Sentence Winning Hook Formula

Never start with "Hi, I am an SEO expert with 5 years experience..." Clients see 50 proposals with this exact line.

**Instead, use the Value-First Audit Hook:**
> "Hi [Client Name], I noticed your site's product pages are missing canonical tags and have an LCP load time of 4.8s on mobile, which is why your category keywords dropped to page 2. I have recorded a 2-minute quick Loom showing the exact 3 fixes."

### Key Rules:
- Mention their website name or specific niche immediately.
- Give 1 free tangible insight before asking for a call.
- Provide a clear call to action: "Are you available for a brief 10-minute chat tomorrow at 4 PM PKT?"`,
    isFavorite: true,
    createdAt: "2026-08-25T16:45:00.000Z",
  },
  {
    id: "kb-7",
    type: "link",
    title: "Google Search Central: Documentation & Guides",
    titleUrdu: "گوگل سرچ سینٹرل کی آفیشل دستاویزات",
    category: "technical",
    tags: ["Google", "Official Docs", "Crawl", "Index"],
    url: "https://developers.google.com/search/docs",
    content: "The authoritative source of Google search guidelines, covering crawling, indexing, ranking updates, and search console features.",
    isFavorite: true,
    createdAt: "2026-08-26T08:00:00.000Z",
  },
  {
    id: "kb-8",
    type: "link",
    title: "Rich Results Test (Official Google Tool)",
    titleUrdu: "گوگل رچ رزلٹ ٹیسٹ ٹول",
    category: "schema",
    tags: ["Validator", "Rich Snippets", "JSON-LD", "Google Tool"],
    url: "https://search.google.com/test/rich-results",
    content: "Test your page URL or code snippet to check whether your structured data generates rich results in Google Search.",
    isFavorite: false,
    createdAt: "2026-08-27T09:10:00.000Z",
  },
  {
    id: "kb-9",
    type: "code",
    title: "Apache .htaccess 301 Redirect Rules",
    titleUrdu: "ایچ ٹی ایکسیس (301) مستقل ری ڈائریکٹ کوڈ",
    category: "technical",
    tags: [".htaccess", "Redirect 301", "Apache", "Migrations"],
    codeLanguage: "htaccess",
    content: `# Enable Rewrite Engine
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Force non-WWW to WWW (or vice versa)
RewriteCond %{HTTP_HOST} ^example\\.com [NC]
RewriteRule ^(.*)$ https://www.example.com/$1 [L,R=301]

# Single Page 301 Redirect
Redirect 301 /old-url/ https://www.example.com/new-url/`,
    isFavorite: false,
    createdAt: "2026-08-28T13:20:00.000Z",
  },
  {
    id: "kb-10",
    type: "note",
    title: "Local SEO NAP Consistency Rulebook",
    titleUrdu: "لوکل ایس ای او: نام، پتہ اور فون نمبر (NAP) کی یکسانیت",
    category: "local-seo",
    tags: ["NAP", "Google Business Profile", "Citations", "Local Map Pack"],
    content: `### NAP (Name, Address, Phone) Guidelines

- **Exact Match:** The business name on Google Business Profile, website footer, Facebook Page, and yellow pages must match character-by-character.
- **Local Area Code:** Use a dedicated local landline or business mobile number, never a generic toll-free 0800 number if targeting a city map pack.
- **Categories:** Pick the most specific primary category (e.g., "Dental Clinic" instead of general "Health").
- **Local Citations:** Ensure listing on Rozee.pk, PakBiz, Google Maps, Apple Maps, and Bing Places.`,
    isFavorite: false,
    createdAt: "2026-08-30T10:05:00.000Z",
  }
];
