import React, { useState } from "react";
import { Award, Download, Printer, CheckCircle2, User, Sparkles } from "lucide-react";
import { buildEnglishCertificatePDF, buildUrduCertificatePDF } from "../utils/certificatePdf";
import { LanguageMode } from "../types";

interface CertificateViewProps {
  studentName: string;
  onStudentNameChange: (name: string) => void;
  completedWeeksCount: number;
  totalWeeks: number;
  avgQuizScore: number;
  langMode: LanguageMode;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  studentName,
  onStudentNameChange,
  completedWeeksCount,
  totalWeeks,
  avgQuizScore,
  langMode,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const isEligible = completedWeeksCount >= 1; // Allows preview/generation for motivated students

  const todayStr = new Date().toLocaleDateString("en-PK", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleDownloadEnglish = () => {
    setIsDownloading(true);
    try {
      buildEnglishCertificatePDF(studentName || "Student", avgQuizScore, todayStr);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadUrdu = async () => {
    setIsDownloading(true);
    try {
      await buildUrduCertificatePDF(studentName || "Student", avgQuizScore, todayStr);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0F0F0F] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Official Completion Credential</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            SEO Ustaad Certificate of Completion
          </h1>
          <h2 className="text-base text-blue-400 font-urdu-title mt-0.5">
            تکمیل کا سرٹیفکیٹ — گوگل ڈیجیٹل گیراج اور ڈیجی اسکلز نصاب
          </h2>
          <p className="text-xs text-white/50 mt-2">
            Download high-resolution print-ready vector PDF certificates in English or beautiful Noto Nastaliq Urdu.
          </p>
        </div>

        {/* Student Name Input Form */}
        <div className="bg-[#0A0A0A] p-4 rounded-2xl border border-white/10 shrink-0 w-full md:w-72">
          <label className="block text-xs font-bold text-white/80 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>Student Name on Certificate:</span>
          </label>
          <input
            id="certificate-student-name-input"
            type="text"
            value={studentName}
            onChange={(e) => onStudentNameChange(e.target.value)}
            placeholder="e.g. Waseem Ahmad"
            className="w-full bg-white/5 text-sm font-semibold text-white px-3 py-2 rounded-xl outline-none border border-white/10 focus:border-blue-500"
          />
          <div className="flex items-center justify-between text-[11px] text-white/40 mt-2">
            <span>Modules: {completedWeeksCount} / {totalWeeks}</span>
            <span>Avg Quiz: {avgQuizScore}%</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          id="download-cert-en-btn"
          onClick={handleDownloadEnglish}
          disabled={isDownloading}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20"
        >
          <Download className="w-4 h-4" />
          <span>Download English PDF</span>
        </button>

        <button
          id="download-cert-ur-btn"
          onClick={handleDownloadUrdu}
          disabled={isDownloading}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20"
        >
          <Download className="w-4 h-4" />
          <span>Download Urdu PDF (اردو سرٹیفکیٹ)</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl text-xs font-semibold transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print Certificate</span>
        </button>
      </div>

      {/* Live Certificate Preview Card (Printable) */}
      <div
        id="certificate-print-area"
        className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 border-4 border-blue-600 shadow-2xl relative overflow-hidden text-center space-y-6 max-w-4xl mx-auto"
      >
        {/* Subtle decorative inner border */}
        <div className="absolute inset-3 border border-blue-500/30 rounded-2xl pointer-events-none" />

        {/* Certificate Badge & Top Label */}
        <div className="space-y-1">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 border-2 border-blue-500 text-blue-600 mx-auto shadow-sm">
            <Award className="w-8 h-8" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            CERTIFICATE OF COMPLETION
          </p>
          <p className="font-urdu-title text-sm text-blue-700">
            تکمیل کا باضابطہ سرٹیفکیٹ
          </p>
        </div>

        {/* Academy Title */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-serif">
            SEO Ustaad LMS
          </h2>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
            Merged Google Digital Garage & DigiSkills Curriculum
          </p>
        </div>

        <div className="w-24 h-0.5 bg-blue-500 mx-auto" />

        {/* Recipient */}
        <div className="space-y-2">
          <p className="text-xs text-slate-500 italic">This certifies that</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif underline decoration-blue-500/40 underline-offset-8">
            {studentName || "Waseem Ahmad"}
          </h3>
          <p className="text-xs font-urdu-title text-slate-500 pt-1">
            نے کامیابی سے بارہ ہفتوں کا مکمل نصاب مکمل کیا ہے
          </p>
        </div>

        {/* Description Body */}
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Has demonstrated comprehensive mastery of search engine mechanics, search intent mapping, keyword research & clustering, competitor gap analysis, technical & on-page SEO, JSON-LD structured data, local SEO map packs, ethical link building, GA4 & Search Console analytics, and freelance marketplace client acquisition.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto py-4 border-y border-slate-200">
          <div>
            <div className="text-xl font-bold text-blue-600">12 / 12</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Modules Done
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-600">{avgQuizScore}%</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Average Quiz Score
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-blue-600 font-urdu-title">ماہر</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Level Achieved
            </div>
          </div>
        </div>

        {/* Signatures & Date */}
        <div className="flex items-center justify-between pt-6 text-xs text-slate-500 max-w-md mx-auto">
          <div>
            <div className="border-t border-slate-400 w-32 mx-auto pt-1 font-semibold text-slate-700">
              SEO Ustaad LMS
            </div>
            <span className="text-[10px]">Academic Director</span>
          </div>

          <div>
            <div className="border-t border-slate-400 w-32 mx-auto pt-1 font-semibold text-slate-700">
              {todayStr}
            </div>
            <span className="text-[10px]">Date of Issue</span>
          </div>
        </div>
      </div>
    </div>
  );
};
