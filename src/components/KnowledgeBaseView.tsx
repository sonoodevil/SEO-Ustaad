import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  FileText,
  Code2,
  ExternalLink,
  Copy,
  Check,
  Star,
  Trash2,
  Edit3,
  Bookmark,
  Sparkles,
  Filter,
  Download,
  Upload,
  X,
  Tag,
  Hash,
  Share2,
} from "lucide-react";
import { KnowledgeItem, KnowledgeItemType, KnowledgeCategory, LanguageMode } from "../types";

interface KnowledgeBaseViewProps {
  items: KnowledgeItem[];
  onAddItem: (item: Omit<KnowledgeItem, "id" | "createdAt">) => void;
  onUpdateItem: (id: string, updates: Partial<KnowledgeItem>) => void;
  onDeleteItem: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  langMode: LanguageMode;
}

const CATEGORIES: { id: KnowledgeCategory; labelEn: string; labelUr: string }[] = [
  { id: "all", labelEn: "All Categories", labelUr: "تمام زمرہ جات" },
  { id: "schema", labelEn: "Schema & JSON-LD", labelUr: "اسکیما اور رچ ڈیٹا" },
  { id: "technical", labelEn: "Technical SEO", labelUr: "ٹیکنیکل ایس ای او" },
  { id: "on-page", labelEn: "On-Page & Content", labelUr: "آن پیج اور مواد" },
  { id: "freelancing", labelEn: "Freelancing & Pitch", labelUr: "فری لانسنگ اور پروپوزل" },
  { id: "local-seo", labelEn: "Local SEO & Maps", labelUr: "لوکل ایس ای او" },
  { id: "backlinks", labelEn: "Backlinks & PR", labelUr: "لنک بلڈنگ" },
  { id: "analytics", labelEn: "Analytics & GSC", labelUr: "اینالیٹکس اور سرچ کنسول" },
  { id: "general", labelEn: "General Notes", labelUr: "عمومی نوٹس" },
];

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onToggleFavorite,
  langMode,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<"all" | KnowledgeItemType | "favorite">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);

  // Form State
  const [formType, setFormType] = useState<KnowledgeItemType>("note");
  const [formTitle, setFormTitle] = useState("");
  const [formTitleUrdu, setFormTitleUrdu] = useState("");
  const [formCategory, setFormCategory] = useState<string>("on-page");
  const [formTags, setFormTags] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCodeLang, setFormCodeLang] = useState("json");
  const [formUrl, setFormUrl] = useState("");

  // Copy Feedback State
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchUrdu = item.titleUrdu?.toLowerCase().includes(q);
          const matchContent = item.content.toLowerCase().includes(q);
          const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
          const matchUrl = item.url?.toLowerCase().includes(q);
          if (!matchTitle && !matchUrdu && !matchContent && !matchTags && !matchUrl) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== "all" && item.category !== selectedCategory) {
          return false;
        }

        // Type filter
        if (selectedType === "favorite") {
          return item.isFavorite;
        } else if (selectedType !== "all" && item.type !== selectedType) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (sortBy === "oldest") {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        } else {
          return a.title.localeCompare(b.title);
        }
      });
  }, [items, searchQuery, selectedCategory, selectedType, sortBy]);

  // Handle Copy
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Open Add Modal
  const openAddModal = (defaultType: KnowledgeItemType = "note") => {
    setEditingItem(null);
    setFormType(defaultType);
    setFormTitle("");
    setFormTitleUrdu("");
    setFormCategory(selectedCategory !== "all" ? selectedCategory : "on-page");
    setFormTags("");
    setFormContent("");
    setFormCodeLang(defaultType === "code" ? "json" : "plaintext");
    setFormUrl("");
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (item: KnowledgeItem) => {
    setEditingItem(item);
    setFormType(item.type);
    setFormTitle(item.title);
    setFormTitleUrdu(item.titleUrdu || "");
    setFormCategory(item.category);
    setFormTags(item.tags.join(", "));
    setFormContent(item.content);
    setFormCodeLang(item.codeLanguage || "json");
    setFormUrl(item.url || "");
    setIsModalOpen(true);
  };

  // Save Item
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const tagsArray = formTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingItem) {
      onUpdateItem(editingItem.id, {
        type: formType,
        title: formTitle.trim(),
        titleUrdu: formTitleUrdu.trim() || undefined,
        category: formCategory,
        tags: tagsArray,
        content: formContent,
        codeLanguage: formType === "code" ? formCodeLang : undefined,
        url: formType === "link" ? formUrl.trim() : undefined,
        updatedAt: new Date().toISOString(),
      });
    } else {
      onAddItem({
        type: formType,
        title: formTitle.trim(),
        titleUrdu: formTitleUrdu.trim() || undefined,
        category: formCategory,
        tags: tagsArray,
        content: formContent,
        codeLanguage: formType === "code" ? formCodeLang : undefined,
        url: formType === "link" ? formUrl.trim() : undefined,
        isFavorite: false,
      });
    }

    setIsModalOpen(false);
  };

  // Export Knowledge Base to JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `seo_ustaad_knowledge_base_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Stats
  const totalNotes = items.filter((i) => i.type === "note").length;
  const totalCode = items.filter((i) => i.type === "code").length;
  const totalLinks = items.filter((i) => i.type === "link").length;
  const totalStarred = items.filter((i) => i.isFavorite).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Header */}
      <div className="bg-[#0F0F0F] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
              <Bookmark className="w-3.5 h-3.5" />
              <span>SEO Knowledge Vault</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Knowledge Base & Snippets Library
            </h1>
            <h2 className="text-base text-blue-400 font-urdu-title mt-0.5">
              ذاتی ذخیرہ معلومات: نوٹس، کوڈ اسنیپٹس، اور تصدیق شدہ لنکس
            </h2>
            <p className="text-xs text-[#E0E0E0] mt-2 leading-relaxed">
              Store custom notes, battle-tested schema markup, robots.txt directives, and client pitching formulas. Fast full-text search with instant one-click code copy.
            </p>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => openAddModal("note")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Note</span>
            </button>
            <button
              onClick={() => openAddModal("code")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl text-xs font-semibold transition"
            >
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>Add Code</span>
            </button>
            <button
              onClick={() => openAddModal("link")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl text-xs font-semibold transition"
            >
              <ExternalLink className="w-4 h-4 text-blue-400" />
              <span>Add Link</span>
            </button>
            <button
              onClick={handleExportJSON}
              title="Export backup to JSON"
              className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Counter Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/40 text-[11px]">Text Notes</p>
              <p className="text-white font-semibold text-sm">{totalNotes}</p>
            </div>
          </div>

          <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/40 text-[11px]">Code Snippets</p>
              <p className="text-white font-semibold text-sm">{totalCode}</p>
            </div>
          </div>

          <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/40 text-[11px]">Saved Links</p>
              <p className="text-white font-semibold text-sm">{totalLinks}</p>
            </div>
          </div>

          <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/40 text-[11px]">Favorites</p>
              <p className="text-white font-semibold text-sm">{totalStarred}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls & Search Bar */}
      <div className="bg-[#0F0F0F] rounded-2xl p-4 border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, schema snippets, tags, URLs..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/60 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedType === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              All ({items.length})
            </button>
            <button
              onClick={() => setSelectedType("note")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedType === "note"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Notes</span>
            </button>
            <button
              onClick={() => setSelectedType("code")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedType === "code"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
            <button
              onClick={() => setSelectedType("link")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedType === "link"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Links</span>
            </button>
            <button
              onClick={() => setSelectedType("favorite")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedType === "favorite"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>Favorites</span>
            </button>
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#0A0A0A] border border-white/10 text-white/80 text-xs rounded-xl px-3 py-2 outline-none focus:border-blue-500/60"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/5 text-xs">
          <span className="text-white/40 text-[11px] font-semibold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? "bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold"
                  : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {langMode === "ur" ? cat.labelUr : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#0F0F0F] rounded-2xl p-12 text-center border border-white/10">
          <Bookmark className="w-12 h-12 text-white/20 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No knowledge items found</h3>
          <p className="text-xs text-white/50 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No entries matched your search "${searchQuery}". Try clearing filters or creating a new item.`
              : "Start by storing your first SEO cheat sheet, code snippet, or client proposal."}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedType("all");
                }}
                className="px-3.5 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold"
              >
                Clear Filters
              </button>
            )}
            <button
              onClick={() => openAddModal("note")}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-sm shadow-blue-500/20"
            >
              Add First Item
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const isCode = item.type === "code";
            const isLink = item.type === "link";
            const isNote = item.type === "note";

            return (
              <div
                key={item.id}
                className="bg-[#0F0F0F] rounded-2xl border border-white/10 p-5 flex flex-col justify-between hover:border-white/20 transition group shadow-sm"
              >
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`p-1.5 rounded-lg text-xs ${
                          isCode
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                            : isLink
                            ? "bg-purple-500/10 border border-purple-500/20 text-purple-400"
                            : "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                        }`}
                      >
                        {isCode && <Code2 className="w-3.5 h-3.5" />}
                        {isLink && <ExternalLink className="w-3.5 h-3.5" />}
                        {isNote && <FileText className="w-3.5 h-3.5" />}
                      </span>

                      <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onToggleFavorite(item.id)}
                        className={`p-1.5 rounded-lg transition ${
                          item.isFavorite
                            ? "text-amber-400 bg-amber-500/10"
                            : "text-white/30 hover:text-amber-400 hover:bg-white/5"
                        }`}
                        title={item.isFavorite ? "Favorited" : "Add to favorites"}
                      >
                        <Star className="w-3.5 h-3.5" fill={item.isFavorite ? "currentColor" : "none"} />
                      </button>

                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition"
                        title="Edit Item"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1.5 rounded-lg text-white/30 hover:text-rose-400 hover:bg-rose-500/10 transition"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-white leading-snug">
                    {item.title}
                  </h3>

                  {item.titleUrdu && langMode !== "en" && (
                    <p className="text-xs font-urdu-title text-blue-400 mt-1 text-right">
                      {item.titleUrdu}
                    </p>
                  )}

                  {/* Body / Content based on type */}
                  <div className="mt-3">
                    {isCode ? (
                      <div className="relative rounded-xl bg-[#0A0A0A] border border-white/10 p-3 font-mono text-[11px] overflow-hidden">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-white/40 text-[10px]">
                          <span>{item.codeLanguage || "code"}</span>
                          <button
                            onClick={() => handleCopy(item.content, item.id)}
                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition"
                          >
                            {copiedId === item.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400 font-sans">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span className="font-sans">Copy Snippet</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-emerald-400/90 overflow-x-auto whitespace-pre leading-relaxed max-h-36">
                          {item.content}
                        </pre>
                      </div>
                    ) : isLink ? (
                      <div className="space-y-2">
                        <p className="text-xs text-[#E0E0E0] line-clamp-3 leading-relaxed">
                          {item.content}
                        </p>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-blue-400 hover:text-blue-300 font-medium transition truncate max-w-full"
                          >
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <span className="truncate">{item.url}</span>
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-[#E0E0E0] leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto pr-1">
                        {item.content}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer: Tags & Date */}
                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded-md border border-white/5 flex items-center gap-0.5"
                      >
                        <Hash className="w-2.5 h-2.5 text-white/30" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {!isCode && (
                    <button
                      onClick={() => handleCopy(isLink && item.url ? item.url : item.content, item.id)}
                      className="p-1.5 text-white/30 hover:text-white transition rounded-md"
                      title="Copy content"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Knowledge Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0F0F0F] rounded-2xl border border-white/15 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Bookmark className="w-4 h-4" />
                </span>
                <h2 className="text-lg font-bold text-white">
                  {editingItem ? "Edit Knowledge Item" : "Create New Knowledge Entry"}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-white/40 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">
                  Item Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType("note")}
                    className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl border transition ${
                      formType === "note"
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-[#0A0A0A] text-white/60 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Text Note</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormType("code")}
                    className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl border transition ${
                      formType === "code"
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-[#0A0A0A] text-white/60 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Code Snippet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormType("link")}
                    className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl border transition ${
                      formType === "link"
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-[#0A0A0A] text-white/60 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Resource Link</span>
                  </button>
                </div>
              </div>

              {/* Title & Urdu Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g., LocalBusiness Schema JSON-LD"
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    عنوان (اردو) - اختیاری
                  </label>
                  <input
                    type="text"
                    value={formTitleUrdu}
                    onChange={(e) => setFormTitleUrdu(e.target.value)}
                    placeholder="مثلاً: لوکل بزنس اسکیما کوڈ"
                    dir="rtl"
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 font-urdu-body"
                  />
                </div>
              </div>

              {/* Category & Language if code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white outline-none focus:border-blue-500"
                  >
                    {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.labelEn} ({cat.labelUr})
                      </option>
                    ))}
                  </select>
                </div>

                {formType === "code" ? (
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Code Syntax Language
                    </label>
                    <select
                      value={formCodeLang}
                      onChange={(e) => setFormCodeLang(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white outline-none focus:border-blue-500"
                    >
                      <option value="json">JSON / JSON-LD</option>
                      <option value="html">HTML</option>
                      <option value="plaintext">Plaintext (robots.txt / txt)</option>
                      <option value="htaccess">Apache .htaccess</option>
                      <option value="javascript">JavaScript</option>
                      <option value="xml">XML (Sitemaps)</option>
                      <option value="css">CSS</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      placeholder="e.g. On-Page, Meta, Upwork"
                      className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* URL field for link type */}
              {formType === "link" && (
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Resource URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://search.google.com/test/rich-results"
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Tags for code type */}
              {formType === "code" && (
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="e.g. JSON-LD, Schema, Google SERP"
                    className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Content / Code Area */}
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  {formType === "code"
                    ? "Code Snippet *"
                    : formType === "link"
                    ? "Description & Key Takeaways"
                    : "Notes & Body Content *"}
                </label>
                <textarea
                  rows={formType === "code" ? 7 : 5}
                  required={formType !== "link"}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder={
                    formType === "code"
                      ? "Paste code snippet here..."
                      : "Write your SEO notes, checklist items, client strategies..."
                  }
                  className={`w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 leading-relaxed ${
                    formType === "code" ? "font-mono" : "font-sans"
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-white/60 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition"
                >
                  {editingItem ? "Update Entry" : "Save to Vault"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
