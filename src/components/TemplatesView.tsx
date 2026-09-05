import React, { useState } from "react";
import {
  FileSpreadsheet,
  CheckSquare,
  Table,
  Mail,
  Copy,
  Check,
  Download,
  Plus,
  Trash2,
} from "lucide-react";
import { TEMPLATES } from "../data/templates";
import { LanguageMode } from "../types";

interface TemplatesViewProps {
  langMode: LanguageMode;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ langMode }) => {
  const [activeTemplateId, setActiveTemplateId] = useState<string>("audit");
  const [checkedAuditItems, setCheckedAuditItems] = useState<Record<string, boolean>>({});
  const [copiedPitchIndex, setCopiedPitchIndex] = useState<number | null>(null);
  const [copiedAuditReport, setCopiedAuditReport] = useState(false);

  // Table state for Intent Mapping
  const [intentRows, setIntentRows] = useState(
    TEMPLATES.find((t) => t.id === "intent")?.seed || []
  );

  // Table state for Keyword Planner
  const [keywordRows, setKeywordRows] = useState(
    TEMPLATES.find((t) => t.id === "keywords")?.seed || []
  );

  const currentTemplate = TEMPLATES.find((t) => t.id === activeTemplateId) || TEMPLATES[0];

  // Toggle checklist item
  const handleToggleAudit = (groupIndex: number, itemIndex: number) => {
    const key = `${groupIndex}-${itemIndex}`;
    setCheckedAuditItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Generate and copy formatted audit report for clients
  const handleCopyAuditReport = () => {
    if (currentTemplate.kind !== "checklist" || !currentTemplate.groups) return;

    let report = `SEO TECHNICAL AUDIT REPORT\nPrepared with SEO Ustaad LMS\nDate: ${new Date().toLocaleDateString()}\n\n`;
    let totalItems = 0;
    let passedItems = 0;

    currentTemplate.groups.forEach((group, gIdx) => {
      report += `=== ${group.g.en.toUpperCase()} ===\n`;
      group.items.forEach((item, iIdx) => {
        totalItems += 1;
        const isChecked = !!checkedAuditItems[`${gIdx}-${iIdx}`];
        if (isChecked) passedItems += 1;
        report += `[${isChecked ? "PASS" : "ACTION NEEDED"}] ${item.en}\n`;
      });
      report += "\n";
    });

    const score = Math.round((passedItems / totalItems) * 100);
    report = `OVERALL HEALTH SCORE: ${score}% (${passedItems}/${totalItems} checkpoints passed)\n\n` + report;

    navigator.clipboard.writeText(report);
    setCopiedAuditReport(true);
    setTimeout(() => setCopiedAuditReport(false), 2500);
  };

  const handleCopyPitch = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPitchIndex(idx);
    setTimeout(() => setCopiedPitchIndex(null), 2000);
  };

  // Add row to intent table
  const handleAddIntentRow = () => {
    setIntentRows([...intentRows, ["", "", "", "", "", ""]]);
  };

  const handleUpdateIntentCell = (rowIdx: number, colIdx: number, val: string) => {
    const next = [...intentRows];
    next[rowIdx] = [...next[rowIdx]];
    next[rowIdx][colIdx] = val;
    setIntentRows(next);
  };

  // Add row to keyword table
  const handleAddKeywordRow = () => {
    setKeywordRows([...keywordRows, ["", "", "", "", "", "", ""]]);
  };

  const handleUpdateKeywordCell = (rowIdx: number, colIdx: number, val: string) => {
    const next = [...keywordRows];
    next[rowIdx] = [...next[rowIdx]];
    next[rowIdx][colIdx] = val;
    setKeywordRows(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0F0F0F] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Interactive Worksheets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Practical SEO Templates & Client Pitches
            </h1>
            <h2 className="text-base text-blue-400 font-urdu-title mt-0.5">
              عملی ٹیمپلیٹس، آڈٹ شیٹس، اور کلائنٹ پروپوزل
            </h2>
            <p className="text-xs text-[#E0E0E0] mt-2 max-w-2xl">
              Use these exact worksheets with real clients. Fill them out directly in your browser, check audit items, and copy formatted deliverables.
            </p>
          </div>
        </div>

        {/* Template Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 mt-6 pt-2 overflow-x-auto">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setActiveTemplateId(tmpl.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition ${
                activeTemplateId === tmpl.id
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              {tmpl.kind === "checklist" && <CheckSquare className="w-4 h-4" />}
              {tmpl.kind === "table" && <Table className="w-4 h-4" />}
              {tmpl.kind === "pitches" && <Mail className="w-4 h-4" />}
              <span>{tmpl.name.en}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TEMPLATE CONTENT */}

      {/* 1. Technical Audit Checklist */}
      {currentTemplate.id === "audit" && currentTemplate.groups && (
        <div className="space-y-6">
          <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-base text-white">
                38-Point Technical SEO Audit Checklist
              </h3>
              <p className="text-xs text-white/40 font-urdu-body">
                ہر آئٹم کو معائنے کے بعد ٹک کریں — بھری ہوئی رپورٹ کلائنٹ کو بھیجیں
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                {Object.values(checkedAuditItems).filter(Boolean).length} / 38 Passed
              </span>

              <button
                onClick={handleCopyAuditReport}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-blue-500/20"
              >
                {copiedAuditReport ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAuditReport ? "Report Copied!" : "Copy Client Report"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentTemplate.groups.map((group, gIdx) => (
              <div
                key={gIdx}
                className="bg-[#0F0F0F] rounded-2xl p-5 border border-white/10 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div>
                    <h4 className="font-semibold text-sm text-white">
                      {group.g.en}
                    </h4>
                    <span className="text-xs font-urdu-title text-blue-400">
                      {group.g.ur}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-white/40">
                    {group.items.length} checks
                  </span>
                </div>

                <div className="space-y-2">
                  {group.items.map((item, iIdx) => {
                    const key = `${gIdx}-${iIdx}`;
                    const isChecked = !!checkedAuditItems[key];

                    return (
                      <div
                        key={iIdx}
                        onClick={() => handleToggleAudit(gIdx, iIdx)}
                        className={`p-2.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                          isChecked
                            ? "bg-blue-500/10 border-blue-500/30 text-blue-200"
                            : "bg-[#0A0A0A] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                            isChecked
                              ? "bg-blue-600 text-white"
                              : "border border-white/20"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>

                        <div className="flex-1 text-xs">
                          {langMode !== "ur" && (
                            <p className="font-medium text-white">
                              {item.en}
                            </p>
                          )}
                          {langMode !== "en" && (
                            <p className="font-urdu-body text-[11px] text-white/50 text-right mt-0.5">
                              {item.ur}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Intent Mapping Sheet */}
      {currentTemplate.id === "intent" && currentTemplate.columns && (
        <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h3 className="font-semibold text-base text-white">
                Search Intent Mapping Sheet
              </h3>
              <p className="text-xs text-white/40 font-urdu-body">
                کی ورڈ کو سرچ انٹینٹ، مطلوبہ صفحے اور یو آر ایل کے ساتھ نقشہ بنائیں
              </p>
            </div>

            <button
              onClick={handleAddIntentRow}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition self-start sm:self-auto shadow-sm shadow-blue-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Keyword Row</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#0A0A0A] border-b border-white/10">
                  {currentTemplate.columns.map((col, idx) => (
                    <th key={idx} className="p-3 font-semibold text-white/80">
                      <div>{col.en}</div>
                      <div className="font-urdu-body text-[10px] text-white/40 font-normal">
                        {col.ur}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {intentRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/5">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleUpdateIntentCell(rIdx, cIdx, e.target.value)}
                          placeholder="..."
                          className="w-full bg-transparent px-2 py-1 rounded outline-none focus:bg-white/5 focus:ring-1 focus:ring-blue-500 font-mono text-xs text-white"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Keyword Research Planner */}
      {currentTemplate.id === "keywords" && currentTemplate.columns && (
        <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h3 className="font-semibold text-base text-white">
                Keyword Research Planner & Scoring Sheet
              </h3>
              <p className="text-xs text-white/40 font-urdu-body">
                کی ورڈ جمع کریں، کلسٹر بنائیں، اور ترجیحی نمبر مقرر کریں
              </p>
            </div>

            <button
              onClick={handleAddKeywordRow}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition self-start sm:self-auto shadow-sm shadow-blue-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Keyword</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#0A0A0A] border-b border-white/10">
                  {currentTemplate.columns.map((col, idx) => (
                    <th key={idx} className="p-3 font-semibold text-white/80">
                      <div>{col.en}</div>
                      <div className="font-urdu-body text-[10px] text-white/40 font-normal">
                        {col.ur}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {keywordRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/5">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleUpdateKeywordCell(rIdx, cIdx, e.target.value)}
                          placeholder="..."
                          className="w-full bg-transparent px-2 py-1 rounded outline-none focus:bg-white/5 focus:ring-1 focus:ring-blue-500 font-mono text-xs text-white"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Client Proposal Pitches */}
      {currentTemplate.id === "proposal" && currentTemplate.pitches && (
        <div className="space-y-6">
          {currentTemplate.pitches.map((pitch, pIdx) => (
            <div
              key={pIdx}
              className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <h3 className="font-semibold text-base text-white">
                    {pitch.title.en}
                  </h3>
                  <p className="text-xs font-urdu-title text-blue-400">
                    {pitch.title.ur}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyPitch(pitch.body.en, pIdx * 2)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-lg text-xs font-semibold transition"
                  >
                    {copiedPitchIndex === pIdx * 2 ? (
                      <Check className="w-3.5 h-3.5 text-blue-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy English</span>
                  </button>

                  <button
                    onClick={() => handleCopyPitch(pitch.body.ur, pIdx * 2 + 1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-semibold transition"
                  >
                    {copiedPitchIndex === pIdx * 2 + 1 ? (
                      <Check className="w-3.5 h-3.5 text-blue-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy Urdu (اردو)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* English Pitch Box */}
                <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10">
                  <span className="text-[10px] font-bold uppercase text-white/40 font-mono block mb-2">
                    English Proposal
                  </span>
                  <pre className="text-xs text-[#E0E0E0] font-sans whitespace-pre-wrap leading-relaxed">
                    {pitch.body.en}
                  </pre>
                </div>

                {/* Urdu Pitch Box */}
                <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/10">
                  <span className="text-[10px] font-bold uppercase text-blue-400 font-urdu-title block mb-2 text-right">
                    اردو پروپوزل
                  </span>
                  <pre className="text-xs text-white/90 font-urdu-body whitespace-pre-wrap leading-loose text-right">
                    {pitch.body.ur}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
