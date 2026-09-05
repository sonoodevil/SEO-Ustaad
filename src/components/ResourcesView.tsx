import React from "react";
import { ExternalLink, GraduationCap, FileCode, Wrench, Coins } from "lucide-react";
import { RESOURCES } from "../data/resources";
import { LanguageMode } from "../types";

interface ResourcesViewProps {
  langMode: LanguageMode;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ langMode }) => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <GraduationCap className="w-5 h-5 text-blue-400" />;
      case 1:
        return <FileCode className="w-5 h-5 text-blue-400" />;
      case 2:
        return <Wrench className="w-5 h-5 text-blue-400" />;
      default:
        return <Coins className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-[#0F0F0F] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-sm">
        <div className="max-w-3xl">
          <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
            Resource Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-2">
            Verified SEO Knowledge, Official Tools & Certifications
          </h1>
          <h2 className="text-base text-blue-400 font-urdu-title mt-0.5">
            مفت سرکاری کورسز، گوگل کی سرکاری دستاویزات، اور پاکستانی فری لانسنگ وسائل
          </h2>
          <p className="text-xs text-[#E0E0E0] mt-2 leading-relaxed">
            All links point to official, verified sources—including Google Digital Garage, Google Search Central, DigiSkills.pk, and PSEB.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESOURCES.map((cat, cIdx) => (
          <div
            key={cIdx}
            className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/10 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                {getCategoryIcon(cIdx)}
              </div>
              <div>
                <h3 className="font-semibold text-base text-white">
                  {cat.cat.en}
                </h3>
                <h4 className="text-xs font-urdu-title text-blue-400">
                  {cat.cat.ur}
                </h4>
              </div>
            </div>

            <div className="space-y-3">
              {cat.items.map((item, iIdx) => (
                <a
                  key={iIdx}
                  href={item.u}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-3.5 rounded-xl border border-white/10 bg-[#0A0A0A] hover:border-blue-500/40 transition flex items-start justify-between group"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <h5 className="text-xs font-semibold text-white group-hover:text-blue-400 transition">
                      {item.n}
                    </h5>

                    {langMode !== "ur" && (
                      <p className="text-xs text-[#E0E0E0] mt-1">
                        {item.d.en}
                      </p>
                    )}

                    {langMode !== "en" && (
                      <p className="text-xs font-urdu-body text-white/50 text-right mt-0.5 leading-relaxed">
                        {item.d.ur}
                      </p>
                    )}
                  </div>

                  <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-blue-400 transition shrink-0 mt-0.5" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
