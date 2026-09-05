import { jsPDF } from "jspdf";

const UR_FONT = '"Noto Nastaliq Urdu","Jameel Noori Nastaleeq","Noto Naskh Arabic",serif';

function wrapRTL(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function buildUrduCertificatePDF(name: string, avg: number, dateStr: string): Promise<void> {
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.load("40px " + UR_FONT);
      await document.fonts.ready;
    } catch {
      // Proceed if font already available
    }
  }

  const S = 2; // 2x supersampling for crisp print output
  const W = 1160;
  const LH = 46;
  const BODY_TOP = 470;

  const scratch = document.createElement("canvas").getContext("2d")!;
  scratch.direction = "rtl";
  scratch.font = "400 21px " + UR_FONT;
  const bodyText =
    "نے گوگل ڈیجیٹل گیراج اور ڈیجی اسکلز کے مشترکہ ایس ای او اور ڈیجیٹل مارکیٹنگ نصاب کے تمام بارہ ہفتہ وار ماڈیول کامیابی سے مکمل کر لیے ہیں، جن میں سرچ انجن کی مشینری، سرچ انٹینٹ، کی ورڈ ریسرچ، حریف کا تجزیہ، آن پیج اور ٹیکنیکل ایس ای او، اسٹرکچرڈ ڈیٹا، لوکل ایس ای او، اے آئی مواد کی حکمت عملی، اینالیٹکس اور فری لانسنگ شامل ہیں۔";
  const lines = wrapRTL(scratch, bodyText, 900);
  const statY = BODY_TOP + lines.length * LH + 54;
  const footerY = statY + 132;
  const H = footerY + 72;

  const cv = document.createElement("canvas");
  cv.width = W * S;
  cv.height = H * S;
  const ctx = cv.getContext("2d")!;
  ctx.scale(S, S);
  ctx.textBaseline = "alphabetic";
  ctx.direction = "rtl";
  ctx.textAlign = "center";

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#059669";
  ctx.lineWidth = 6;
  ctx.strokeRect(18, 18, W - 36, H - 36);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(30, 30, W - 60, H - 60);

  const mid = W / 2;
  ctx.fillStyle = "#059669";
  ctx.font = "700 26px " + UR_FONT;
  ctx.fillText("تکمیل کا سرٹیفکیٹ", mid, 108);

  ctx.fillStyle = "#0f172a";
  ctx.font = "700 60px " + UR_FONT;
  ctx.fillText("ایس ای او استاد", mid, 196);

  ctx.fillStyle = "#64748b";
  ctx.font = "400 23px " + UR_FONT;
  ctx.fillText("ڈیجیٹل مارکیٹنگ اور ایس ای او — بارہ ہفتوں کا پروگرام", mid, 244);

  ctx.strokeStyle = "#059669";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(mid - 62, 276);
  ctx.lineTo(mid + 62, 276);
  ctx.stroke();

  ctx.fillStyle = "#64748b";
  ctx.font = "400 22px " + UR_FONT;
  ctx.fillText("اس بات کی تصدیق کی جاتی ہے کہ", mid, 328);

  ctx.direction = "ltr";
  ctx.fillStyle = "#0f172a";
  ctx.font = "700 46px Inter,system-ui,sans-serif";
  ctx.fillText(name || "Student", mid, 396);
  ctx.direction = "rtl";
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(mid - 230, 418);
  ctx.lineTo(mid + 230, 418);
  ctx.stroke();

  ctx.fillStyle = "#334155";
  ctx.font = "400 21px " + UR_FONT;
  lines.forEach((ln, i) => ctx.fillText(ln, mid, BODY_TOP + i * LH));

  const stats = [
    ["12 / 12", "مکمل ماڈیول"],
    [avg + "%", "اوسط کوئز اسکور"],
    ["ماہر", "حاصل کردہ درجہ"],
  ];
  stats.forEach((x, i) => {
    const cx = mid + (1 - i) * 250;
    ctx.fillStyle = "#059669";
    ctx.direction = i === 1 || i === 0 ? "ltr" : "rtl";
    ctx.font = "700 34px " + (i === 2 ? UR_FONT : "Inter,system-ui,sans-serif");
    ctx.fillText(x[0], cx, statY);
    ctx.direction = "rtl";
    ctx.fillStyle = "#64748b";
    ctx.font = "400 17px " + UR_FONT;
    ctx.fillText(x[1], cx, statY + 42);
  });

  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(120, footerY);
  ctx.lineTo(360, footerY);
  ctx.moveTo(W - 360, footerY);
  ctx.lineTo(W - 120, footerY);
  ctx.stroke();
  ctx.fillStyle = "#64748b";
  ctx.font = "400 18px " + UR_FONT;
  ctx.fillText("ایس ای او استاد ایل ایم ایس", 240, footerY + 34);
  ctx.fillText("تاریخ: " + dateStr, W - 240, footerY + 34);

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const PW = 297;
  const PH = 210;
  const m = 6;
  let w = PW - 2 * m;
  let h = (w * H) / W;
  if (h > PH - 2 * m) {
    h = PH - 2 * m;
    w = (h * W) / H;
  }
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, PW, PH, "F");
  doc.addImage(cv.toDataURL("image/jpeg", 0.95), "JPEG", (PW - w) / 2, (PH - h) / 2, w, h);
  doc.save("SEO-Ustaad-Certificate-" + (name || "Student").replace(/[^A-Za-z0-9\u0600-\u06FF]+/g, "-") + ".pdf");
}

export function buildEnglishCertificatePDF(name: string, avg: number, dateStr: string): void {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297;
  const H = 210;
  const ink = [15, 23, 42] as const;
  const accent = [16, 185, 129] as const;
  const mid = [100, 116, 139] as const;

  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, W, H, "F");
  doc.setDrawColor(accent[0], accent[1], accent[2]);
  doc.setLineWidth(2.2);
  doc.rect(10, 10, W - 20, H - 20);
  doc.setLineWidth(0.5);
  doc.rect(14, 14, W - 28, H - 28);

  doc.setTextColor(accent[0], accent[1], accent[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  (doc as any).text("CERTIFICATE OF COMPLETION", W / 2, 38, { align: "center", charSpace: 1.6 });

  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.setFontSize(34);
  doc.text("SEO Ustaad", W / 2, 56, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(mid[0], mid[1], mid[2]);
  doc.text("Digital Marketing & SEO - 12 Week Program", W / 2, 65, { align: "center" });

  doc.setDrawColor(accent[0], accent[1], accent[2]);
  doc.setLineWidth(0.8);
  doc.line(W / 2 - 22, 73, W / 2 + 22, 73);

  doc.setFontSize(11);
  doc.setTextColor(mid[0], mid[1], mid[2]);
  doc.text("This is to certify that", W / 2, 85, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.text(name || "Student", W / 2, 98, { align: "center" });
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(W / 2 - 55, 102, W / 2 + 55, 102);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(51, 65, 85);
  const body =
    "has successfully completed all 12 weekly modules of the merged Google Digital Garage and DigiSkills SEO & Digital Marketing curriculum, covering search engine mechanics, search intent, keyword research, competitor gap analysis, on-page and technical SEO, structured data, local SEO, AI content strategy and E-E-A-T, GA4 and Search Console analytics, ethical link building, and freelance client acquisition.";
  doc.text(doc.splitTextToSize(body, 200), W / 2, 113, { align: "center" });

  const stats = [
    ["12 / 12", "Modules completed"],
    [avg + "%", "Average quiz score"],
    ["Expert", "Level achieved"],
  ];
  stats.forEach((x, i) => {
    const cx = W / 2 + (i - 1) * 62;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.setTextColor(accent[0], accent[1], accent[2]);
    doc.text(x[0], cx, 148, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(mid[0], mid[1], mid[2]);
    (doc as any).text(x[1].toUpperCase(), cx, 154, { align: "center", charSpace: 0.5 });
  });

  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.4);
  doc.line(38, 176, 98, 176);
  doc.line(W - 98, 176, W - 38, 176);
  doc.setFontSize(9);
  doc.setTextColor(mid[0], mid[1], mid[2]);
  doc.text("Date: " + dateStr, 38, 182);
  doc.text("SEO Ustaad LMS", W - 38, 182, { align: "right" });
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Self-paced program. Verify progress in the app on the device where the course was completed.", W / 2, 194, { align: "center" });

  doc.save("SEO-Ustaad-Certificate-" + (name || "Student").replace(/[^A-Za-z0-9]+/g, "-") + ".pdf");
}
