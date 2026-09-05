import React, { useState } from "react";
import { Award, Download, Printer, CheckCircle2, User, Sparkles, FileText } from "lucide-react";
import { buildEnglishCertificatePDF, buildUrduCertificatePDF } from "../utils/certificatePdf";
import { LanguageMode } from "../types";

interface CertificateViewProps {
  studentName: string;
  onStudentNameChange: (name: string) => void;
  completedWeeksCount: number;
  totalWeeks: number;
  avgQuizScore: number;
  totalStudySeconds: number;
  langMode: LanguageMode;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  studentName,
  onStudentNameChange,
  completedWeeksCount,
  totalWeeks,
  avgQuizScore,
  totalStudySeconds,
  langMode,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const isEligible = completedWeeksCount >= 1; // Allows preview/generation for motivated students

  const todayStr = new Date().toLocaleDateString("en-PK", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formatStudyTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

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

  const handleDownloadReport = () => {
    // We'll use window.print() on a specially formatted hidden div for simplicity
    // but first we need to make sure the print styles are set
    window.print();
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

        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-emerald-500/20"
        >
          <FileText className="w-4 h-4" />
          <span>Download Journey Report</span>
        </button>
      </div>

      {/* Printable Report Summary (Hidden by default, visible in @media print) */}
      <div className="hidden print:block fixed inset-0 z-[9999] bg-white text-slate-900 p-10 space-y-8 font-sans overflow-y-auto">
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">SEO Ustaad Student Report</h1>
            <p className="text-slate-500 font-semibold tracking-wide uppercase text-xs mt-1">
              Google Digital Garage & DigiSkills Learning Journey
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">{studentName || "Student"}</div>
            <div className="text-xs text-slate-500">{todayStr}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-2xl font-black text-blue-600">{completedWeeksCount} / {totalWeeks}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Modules Finished</div>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-2xl font-black text-blue-600">{formatStudyTime(totalStudySeconds)}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Stay Time</div>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-2xl font-black text-blue-600">{avgQuizScore}%</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Average Accuracy</div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold border-l-4 border-blue-600 pl-3">Learning Path Milestones</h2>
          <div className="grid grid-cols-1 gap-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${i + 1 <= completedWeeksCount ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100 opacity-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i + 1 <= completedWeeksCount ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {i + 1}
                  </div>
                  <div className="text-sm font-semibold">Week {i + 1}: {i === 0 ? "SEO Fundamentals" : i === 11 ? "Freelance & Agency" : "Module Focus"}</div>
                </div>
                {i + 1 <= completedWeeksCount && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <h2 className="text-lg font-bold border-l-4 border-blue-600 pl-3 mb-4">Core Competencies Mastery</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                <span>Technical SEO</span>
                <span>{Math.min(100, Math.round((completedWeeksCount / 12) * 100))}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${Math.min(100, Math.round((completedWeeksCount / 12) * 100))}%` }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                <span>Content Strategy</span>
                <span>{Math.min(100, Math.round((completedWeeksCount / 12) * 100))}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${Math.min(100, Math.round((completedWeeksCount / 12) * 100))}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-10">
          <p className="text-[10px] text-slate-400 font-mono">Verified SEO Ustaad Academic Journey Report • No. {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
      </div>

      {/* Live Certificate Preview Card (Printable) */}
      <div
        id="certificate-print-area"
        className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 border-4 border-blue-600 shadow-2xl relative overflow-hidden text-center space-y-6 max-w-4xl mx-auto print:hidden"
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
