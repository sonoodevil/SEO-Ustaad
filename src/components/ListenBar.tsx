import React from "react";
import { Play, Pause, Square, Volume2, Loader2, Gauge } from "lucide-react";
import { VoiceOption } from "../types";

interface ListenBarProps {
  currentText: string | null;
  currentTitle: string | null;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  selectedVoice: VoiceOption;
  playbackRate: number;
  onPlayPause: () => void;
  onStop: () => void;
  onVoiceChange: (voice: VoiceOption) => void;
  onRateChange: (rate: number) => void;
  onSeek: (time: number) => void;
}

const VOICES: { id: VoiceOption; label: string; desc: string }[] = [
  { id: "Puck", label: "Puck (Recommended)", desc: "Warm & natural Pakistani ustad tone" },
  { id: "Zephyr", label: "Zephyr", desc: "Clear & articulate delivery" },
  { id: "Aoede", label: "Aoede", desc: "Warm feminine educator" },
  { id: "Fenrir", label: "Fenrir", desc: "Deep & authoritative" },
  { id: "Kore", label: "Kore", desc: "Gentle & patient" },
  { id: "Charon", label: "Charon", desc: "Calm & steady pace" },
];

const RATES = [0.8, 0.9, 1.0, 1.15, 1.25];

export const ListenBar: React.FC<ListenBarProps> = ({
  currentTitle,
  isPlaying,
  isLoading,
  currentTime,
  duration,
  selectedVoice,
  playbackRate,
  onPlayPause,
  onStop,
  onVoiceChange,
  onRateChange,
  onSeek,
}) => {
  if (!currentTitle && !isLoading && !isPlaying) return null;

  const formatTime = (sec: number) => {
    if (isNaN(sec) || sec <= 0) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      id="listen-bar-container"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F0F0F]/95 text-[#E0E0E0] backdrop-blur-md border-t border-white/10 px-4 py-3 shadow-2xl transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Title and Voice Info */}
        <div className="flex items-center gap-3 w-full md:w-auto min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Volume2 className="w-5 h-5 animate-pulse" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">GEMINI</span>
              <span className="text-white/40 hidden sm:inline">|</span>
              <span className="text-white/60 font-normal hidden sm:inline">
                Natural Pakistani Ustad • English Technical Terms
              </span>
            </div>
            <div className="text-sm font-medium text-white truncate">
              {currentTitle || "Generating lesson audio..."}
            </div>
          </div>
        </div>

        {/* Playback Controls & Progress Bar */}
        <div className="flex items-center gap-3 w-full md:max-w-md flex-1">
          <button
            id="listen-bar-play-toggle"
            onClick={onPlayPause}
            disabled={isLoading}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center font-bold shrink-0 transition disabled:opacity-50 shadow-md shadow-blue-500/30 hover:scale-105"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          <button
            id="listen-bar-stop"
            onClick={onStop}
            className="p-2 rounded-lg text-white/40 hover:text-rose-400 hover:bg-white/5 transition shrink-0"
            title="Stop & Close"
          >
            <Square className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono text-white/50 shrink-0 w-9 text-right">
            {formatTime(currentTime)}
          </span>

          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => onSeek(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <span className="text-xs font-mono text-white/50 shrink-0 w-9">
            {formatTime(duration)}
          </span>
        </div>

        {/* Speed & Voice Selection */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
          <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
            <Gauge className="w-3.5 h-3.5 text-white/40" />
            <select
              id="listen-bar-speed-select"
              value={playbackRate}
              onChange={(e) => onRateChange(parseFloat(e.target.value))}
              className="bg-transparent text-xs text-white/80 outline-none cursor-pointer"
            >
              {RATES.map((r) => (
                <option key={r} value={r} className="bg-[#0F0F0F] text-[#E0E0E0]">
                  {r}x Speed
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
            <select
              id="listen-bar-voice-select"
              value={selectedVoice}
              onChange={(e) => onVoiceChange(e.target.value as VoiceOption)}
              className="bg-transparent text-xs text-white/80 outline-none cursor-pointer"
            >
              {VOICES.map((v) => (
                <option key={v.id} value={v.id} className="bg-[#0F0F0F] text-[#E0E0E0]">
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
