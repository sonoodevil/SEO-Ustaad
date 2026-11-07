# SEO Ustaad — Phone Setup
### فون پر پورا کورس — مکمل گائیڈ

Ab poora course **sirf phone par** chal sakta hai. Laptop ki zarurat nahi.

---

## Files — saat files, ek folder

| File | Zaroori? | Kya karta hai |
|---|---|---|
| `index.html` | ✅ | Poori app — **pre-compiled, 4x tez** |
| `manifest.json` | ✅ | App ka naam, icon, standalone mode |
| `sw.js` | ✅ | **Offline chalana** — internet band ho to bhi course chalta hai |
| `icon-192.png` | ✅ | Home screen icon |
| `icon-512.png` | ✅ | Bara icon |
| `icon-maskable-512.png` | ✅ | Android adaptive icon |
| `index-editable.html` | — | Wohi app Babel ke saath (purana single-file form) |
| `SETUP-GUIDE.md` / `DAILY-PLAN.md` | — | Parhne ke liye |

> **Saat files ek saath upload karna zaroori hai.** Sirf `index.html` upload karenge to app chalegi magar **offline nahi** chalegi.

### Speed

`index.html` ab **pre-compiled** hai — Babel (2.8 MB) browser mein load hi nahi hota.

| | Pehle | Ab |
|---|---|---|
| Download | 3.7 MB | **858 KB** |
| Khulne ka waqt | 1182 ms | **262 ms** |

Mobile data par yeh 15 second aur 2 second ka farq hai.

**Customize karna waise hi hai** — curriculum, quiz, templates, rang, sab `Ctrl+F` se milte hain. Sirf component markup compile hua hai, aap ka content nahi.

---

## STEP 1 — GitHub par upload (10 min, laptop ya phone dono se)

1. **https://github.com/signup** — free account
2. `+` → **New repository** → naam `seo-ustaad` → **Public** ✅ → Create
3. **"uploading an existing file"** → **saaton files** ek saath drag karein → **Commit changes**
4. **Settings** → **Pages** → Source: `Deploy from a branch` → Branch: `main` → `/ (root)` → **Save**
5. 1–2 minute rukein → URL milega:

```
https://<username>.github.io/seo-ustaad/
```

---

## STEP 2 — Phone par install (2 min)

### Android (Chrome)
1. Wo URL Chrome mein kholein
2. ⋮ menu → **"Add to Home screen"** / **"Install app"**
3. Home screen par icon aa jayega — address bar ke baghair khulega

### iPhone (Safari)
1. URL Safari mein kholein
2. Share button → **"Add to Home Screen"**

**Ek baar khulne ke baad poora course offline kaam karta hai** — plane mein, bus mein, internet band ho to bhi. Sirf AI Tutor aur natural voice ko internet chahiye.

### APK chahiye to
**https://www.pwabuilder.com** → URL paste → Android → **Generate service worker ✅** → Download → andar `.apk`

---

## STEP 3 — Pehli baar app mein (3 min)

1. **Dashboard** → apna naam likhein
2. **⚙️** → **Gemini key** paste ([aistudio.google.com/apikey](https://aistudio.google.com/apikey) — mufat)
3. **⚙️** → theme aur text size chunein
4. **84-Day Plan** tab → **Day 1** se shuru

---

## Phone par poora course kaise chalega

| Tab | Kya hai |
|---|---|
| 🏠 **Dashboard** | Progress %, level, 12 hafte, certificate |
| ✅ **84-Day Plan** | Aaj kaun sa din, streak, har din ka checkbox, 5-step chain |
| 📖 **Curriculum** | 12 hafte — lesson, awaaz, quiz |
| 🤖 **AI Tutor** | Type ya 🎤 mic — English/Urdu/Roman Urdu |
| 🔧 **Tools** | **7 kaam karne wale tools** (neeche) |
| 📋 **Templates** | 4 sheets, sab copy ho sakti hain |
| 🔗 **Free Resources** | 25 official links |

---

## 🔧 Tools — practice ab phone par hoti hai

Pehle practice tasks ke liye laptop chahiye tha. Ab nahi.

| Tool | Kaam |
|---|---|
| **SERP Preview & Length Checker** | Title/meta likhein → live character count + Google jaisa mobile preview |
| **Schema Generator** | LocalBusiness / Article / FAQ / Product / Breadcrumb ka JSON-LD — form bharein, code copy karein |
| **On-Page Checker** | Kisi bhi page ka HTML paste karein → 11-point report (title, meta, H1, alt, canonical, schema, word count) |
| **Keyword Mixer** | Seed + modifiers → saikron long-tail keywords → CSV copy |
| **robots.txt Builder** | Form bharein → robots.txt tayyar |
| **UTM Builder** | Campaign link banayein GA4 ke liye |
| **Quote Calculator** | Services chunein → USD + PKR + hours + client ko bhejne wala quote |

### On-Page Checker phone par kaise use karein
Chrome mein page kholein → address bar mein URL se **pehle** `view-source:` likhein → Enter → sab select → copy → tool mein paste.

---

## 💾 Progress phone par le jana

Progress browser mein hoti hai, is liye laptop se phone par khud nahi jati. Lekin:

**Laptop par:** ⚙️ → **Download backup** → JSON file milegi
**Phone par bhejein** (WhatsApp/Drive) → app kholein → ⚙️ → **Restore from backup** → file chunein

Naam, progress, quiz scores, 84-day ticks, theme, API keys — sab wapas aa jata hai.

> Mahine mein ek baar backup download kar lein. Browser data clear ho jaye to yehi bachata hai.

---

## Offline mein kya chalta hai / kya nahi

| ✅ Offline chalta hai | ❌ Internet chahiye |
|---|---|
| Saare 12 hafte ke lessons | AI Tutor ke jawab |
| 60 quiz sawal + explanations | Gemini / ElevenLabs natural voice |
| Saare 7 Tools | Video & Demo links |
| Templates aur copy | Resource links |
| 84-Day Plan tracker | PDF certificate (pehli baar) |
| Progress save hona | |
| Browser ki apni awaaz | |

---

## Masail

| Masla | Hal |
|---|---|
| Offline nahi chalta | Saat files upload hui? `sw.js` ke baghair offline nahi hota |
| "Add to Home screen" nahi dikhta | Pehle ek baar online kholein, 10 second rukein, phir menu |
| Purana version dikh raha hai | App band karein, dobara kholein — sw naya version le aata hai |
| Progress gayab | ⚙️ → Restore from backup |
| Awaaz robotic | Play ke paas badge dekhein — "Browser" likha ho to ⚙️ → Gemini select + key |

---

## Web references
- GitHub Pages — https://pages.github.com
- PWABuilder — https://www.pwabuilder.com
- Google AI Studio (mufat Gemini key) — https://aistudio.google.com/apikey
- Google Rich Results Test — https://search.google.com/test/rich-results
- Google Search Central — https://developers.google.com/search/docs
