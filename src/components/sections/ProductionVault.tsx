import React, { useState } from 'react';
import { Play, Filter, Award, ChevronRight, Layers, Eye, ShieldCheck, Film } from 'lucide-react';
import { MRBEAST_DATA, VideoDossier } from '@/data/mrbeastData';

interface ProductionVaultProps {
  onSelectVideo: (video: VideoDossier) => void;
  playClick?: () => void;
  playLaser?: () => void;
}

type FilterCategory = 'ALL' | 'MEGA ARENA' | 'ENDURANCE' | 'HUMANITARIAN';

export const ProductionVault: React.FC<ProductionVaultProps> = ({
  onSelectVideo,
  playClick,
  playLaser,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');
  const [activeRecordIndex, setActiveRecordIndex] = useState(0);

  const allVideos = MRBEAST_DATA.productionVideos;
  const records = MRBEAST_DATA.beastGamesRecords;

  const filteredVideos =
    activeFilter === 'ALL'
      ? allVideos
      : allVideos.filter((v) => v.category === activeFilter);

  const activeRecord = records[activeRecordIndex];

  return (
    <section
      id="vault"
      className="relative py-24 sm:py-32 bg-obsidian border-b border-border-hairline"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header with Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border-hairline">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-beast-cyan tracking-[0.2em] uppercase mb-2">
              <span className="w-2 h-2 bg-beast-cyan" />
              <span>LVL 03 // THE PRODUCTION VAULT &amp; ARENA MATRIX</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.2rem,5vw,4.5rem)] uppercase tracking-tight text-text-primary">
              SET SCHEMATICS &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-beast-cyan via-beast-gold to-beast-magenta">
                VERIFIED BROADCASTS.
              </span>
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-text-muted font-mono text-xs hidden sm:flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>CATEGORY:</span>
            </span>
            {(['ALL', 'MEGA ARENA', 'ENDURANCE', 'HUMANITARIAN'] as FilterCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick?.();
                  setActiveFilter(cat);
                }}
                className={`px-3 py-1.5 font-mono text-xs tracking-wider transition-all cursor-pointer border ${
                  activeFilter === cat
                    ? 'bg-beast-cyan text-obsidian font-bold border-beast-cyan shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                    : 'bg-vault text-text-muted border-border-hairline hover:border-text-muted hover:text-text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric 12-Column Bento Screening Matrix */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Bento Flagship Card (7 Columns) */}
          {filteredVideos[0] && (
            <div
              className="lg:col-span-7 vault-card p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden"
              data-cursor="video"
            >
              <div>
                {/* Card Header Telemetry */}
                <div className="flex items-center justify-between pb-4 border-b border-border-hairline font-mono text-xs">
                  <span className="px-2.5 py-0.5 bg-obsidian border border-beast-cyan text-beast-cyan font-bold uppercase tracking-wider">
                    {filteredVideos[0].category}
                  </span>
                  <div className="flex items-center gap-2 text-beast-gold font-bold">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{filteredVideos[0].views}</span>
                  </div>
                </div>

                {/* Video Title & Schematics */}
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-text-primary mt-4 group-hover:text-beast-cyan transition-colors">
                  {filteredVideos[0].title}
                </h3>

                <p className="mt-3 text-text-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                  {filteredVideos[0].editorialNote}
                </p>
              </div>

              {/* YouTube Thumbnail Preview with Play Overlay */}
              <div
                onClick={() => {
                  playClick?.();
                  onSelectVideo(filteredVideos[0]);
                }}
                className="my-6 relative aspect-video w-full bg-obsidian border border-border-hairline overflow-hidden group/thumb cursor-pointer"
              >
                <img
                  src={`https://i.ytimg.com/vi/${filteredVideos[0].youtubeId}/maxresdefault.jpg`}
                  alt={filteredVideos[0].title}
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 opacity-80"
                  onError={(e) => {
                    // Fallback to HQ default if maxres is unavailable
                    (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${filteredVideos[0].youtubeId}/hqdefault.jpg`;
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />

                {/* Center Hover Trigger Disc */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-beast-gold text-obsidian flex items-center justify-center shadow-[0_0_30px_rgba(255,208,0,0.5)] group-hover/thumb:scale-110 transition-all">
                    <Play className="w-7 h-7 fill-obsidian ml-1" />
                  </div>
                </div>

                {/* Bottom Left Schematic Micro-tag */}
                <div className="absolute bottom-3 left-3 font-mono text-[10px] text-text-primary bg-obsidian/80 px-2.5 py-1 border border-border-hairline">
                  {filteredVideos[0].schematicTag}
                </div>
              </div>

              {/* Card Bottom Meta */}
              <div className="pt-4 border-t border-border-hairline flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="text-text-muted">
                  <span className="text-beast-cyan font-bold">{filteredVideos[0].budgetOrStakes}</span> //{' '}
                  <span>{filteredVideos[0].contestantsOrParticipants}</span>
                </div>

                <button
                  onClick={() => {
                    playClick?.();
                    onSelectVideo(filteredVideos[0]);
                  }}
                  className="btn-chamfer px-4 py-2 bg-beast-gold text-obsidian font-bold hover:bg-beast-cyan transition-colors flex items-center gap-1.5 uppercase cursor-pointer"
                >
                  <span>LAUNCH STREAM</span>
                  <Play className="w-3.5 h-3.5 fill-obsidian" />
                </button>
              </div>
            </div>
          )}

          {/* Bento Secondary Stacked Card (5 Columns) */}
          {filteredVideos[1] && (
            <div
              className="lg:col-span-5 vault-card p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden"
              data-cursor="video"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border-hairline font-mono text-xs">
                  <span className="px-2.5 py-0.5 bg-obsidian border border-beast-magenta text-beast-magenta font-bold uppercase tracking-wider">
                    {filteredVideos[1].category}
                  </span>
                  <div className="text-beast-gold font-bold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{filteredVideos[1].views}</span>
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-2xl uppercase tracking-tight text-text-primary mt-4 group-hover:text-beast-cyan transition-colors">
                  {filteredVideos[1].title}
                </h3>

                <p className="mt-3 text-text-muted text-sm leading-relaxed">
                  {filteredVideos[1].editorialNote}
                </p>
              </div>

              <div
                onClick={() => {
                  playClick?.();
                  onSelectVideo(filteredVideos[1]);
                }}
                className="my-5 relative aspect-video w-full bg-obsidian border border-border-hairline overflow-hidden cursor-pointer group/thumb"
              >
                <img
                  src={`https://i.ytimg.com/vi/${filteredVideos[1].youtubeId}/maxresdefault.jpg`}
                  alt={filteredVideos[1].title}
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${filteredVideos[1].youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-beast-cyan text-obsidian flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] group-hover/thumb:scale-110 transition-all">
                    <Play className="w-5 h-5 fill-obsidian ml-1" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border-hairline flex items-center justify-between font-mono text-xs">
                <span className="text-text-muted">{filteredVideos[1].budgetOrStakes}</span>
                <button
                  onClick={() => {
                    playClick?.();
                    onSelectVideo(filteredVideos[1]);
                  }}
                  className="text-beast-cyan hover:text-beast-gold font-bold flex items-center gap-1 transition-colors cursor-pointer uppercase"
                >
                  <span>WATCH [▶]</span>
                </button>
              </div>
            </div>
          )}

          {/* Bento Lower Left Card (5 Columns) */}
          {filteredVideos[2] && (
            <div
              className="lg:col-span-5 vault-card p-6 sm:p-7 flex flex-col justify-between group"
              data-cursor="video"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border-hairline font-mono text-xs">
                  <span className="px-2 py-0.5 bg-obsidian border border-beast-cyan text-beast-cyan text-[11px] font-bold uppercase">
                    {filteredVideos[2].category}
                  </span>
                  <span className="text-beast-gold font-bold text-xs">{filteredVideos[2].views}</span>
                </div>
                <h4 className="font-display font-bold text-xl uppercase tracking-tight text-text-primary mt-3 group-hover:text-beast-cyan transition-colors">
                  {filteredVideos[2].title}
                </h4>
                <p className="mt-2 text-text-muted text-xs sm:text-sm leading-relaxed">
                  {filteredVideos[2].editorialNote}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border-hairline flex items-center justify-between font-mono text-xs">
                <span className="text-text-muted text-[11px]">{filteredVideos[2].budgetOrStakes}</span>
                <button
                  onClick={() => {
                    playClick?.();
                    onSelectVideo(filteredVideos[2]);
                  }}
                  className="text-beast-gold hover:text-beast-cyan font-bold text-xs uppercase cursor-pointer"
                >
                  PLAY DOSSIER ↗
                </button>
              </div>
            </div>
          )}

          {/* Bento Lower Right Card (7 Columns) */}
          {filteredVideos[3] && (
            <div
              className="lg:col-span-7 vault-card p-6 sm:p-7 flex flex-col justify-between group"
              data-cursor="video"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border-hairline font-mono text-xs">
                  <span className="px-2 py-0.5 bg-obsidian border border-beast-emerald text-beast-emerald text-[11px] font-bold uppercase">
                    {filteredVideos[3].category}
                  </span>
                  <span className="text-beast-gold font-bold text-xs">{filteredVideos[3].views}</span>
                </div>
                <h4 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-text-primary mt-3 group-hover:text-beast-emerald transition-colors">
                  {filteredVideos[3].title}
                </h4>
                <p className="mt-2 text-text-muted text-xs sm:text-sm leading-relaxed">
                  {filteredVideos[3].editorialNote}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border-hairline flex items-center justify-between font-mono text-xs">
                <span className="text-beast-emerald font-semibold text-[11px]">
                  {filteredVideos[3].budgetOrStakes}
                </span>
                <button
                  onClick={() => {
                    playClick?.();
                    onSelectVideo(filteredVideos[3]);
                  }}
                  className="btn-chamfer px-3 py-1.5 bg-vault border border-border-hairline hover:border-beast-emerald text-text-primary text-xs uppercase cursor-pointer"
                >
                  INSPECT INTERVENTION ▶
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Amazon Prime Special Dossier: "BEAST GAMES" (44 Guinness World Records) */}
        <div className="mt-16 p-6 sm:p-10 bg-vault border-2 border-beast-gold/40 crosshair-corner relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border-hairline">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-beast-gold uppercase tracking-widest font-bold">
                <Award className="w-4 h-4 text-beast-gold" />
                <span>AMAZON PRIME BROADCAST TELEMETRY // 44 GUINNESS WORLD RECORDS</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-text-primary uppercase tracking-tight mt-1">
                BEAST GAMES: THE $100M BENCHMARK.
              </h3>
              <p className="mt-2 text-text-muted text-sm max-w-3xl leading-relaxed">
                Adjudicated in Las Vegas (&quot;Beast City&quot;) and Toronto (&quot;Beast Island&quot;). Donaldson shattered 44 official
                Guinness World Records in a single television season, proving streaming reality television can match the scale of an Olympic broadcast.
              </p>
            </div>

            <div className="p-4 bg-obsidian border border-beast-gold/50 flex-shrink-0 text-center">
              <div className="font-mono text-[10px] text-text-muted uppercase">TOTAL CASH ON SET</div>
              <div className="font-mono font-extrabold text-2xl sm:text-3xl text-beast-gold tabular-nums">
                $5,000,000
              </div>
              <div className="text-[9px] font-mono text-beast-cyan mt-0.5">PHYSICAL CASH PYRAMID</div>
            </div>
          </div>

          {/* Interactive Record Explorer Widget */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Record Navigation */}
            <div className="md:col-span-5 space-y-2">
              <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider block mb-2">
                SELECT VERIFIED RECORD:
              </span>
              {records.map((rec, i) => (
                <button
                  key={rec.id}
                  onClick={() => {
                    playLaser?.();
                    setActiveRecordIndex(i);
                  }}
                  className={`w-full p-3 font-mono text-left text-xs transition-all border flex items-center justify-between cursor-pointer ${
                    activeRecordIndex === i
                      ? 'border-beast-gold bg-beast-gold/10 text-beast-gold font-bold'
                      : 'border-border-hairline bg-obsidian/60 text-text-muted hover:text-text-primary hover:border-text-muted'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[10px] opacity-60">#{String(i + 1).padStart(2, '0')}</span>
                    <span className="truncate">{rec.title}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Right Active Record Display Card */}
            <div className="md:col-span-7 p-6 sm:p-8 bg-obsidian border border-border-hairline flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-text-muted border-b border-border-hairline pb-3">
                  <span className="text-beast-gold font-bold">{activeRecord.officialCitation}</span>
                  <span>{activeRecord.location}</span>
                </div>

                <div className="mt-4">
                  <div className="font-mono text-xs text-beast-cyan uppercase tracking-wider font-semibold">
                    {activeRecord.verifiedFigure}
                  </div>
                  <div className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary uppercase tracking-tight mt-1 text-beast-gold">
                    {activeRecord.metric}
                  </div>
                </div>

                <h4 className="mt-3 font-display font-bold text-lg text-text-primary uppercase">
                  {activeRecord.title}
                </h4>
              </div>

              <div className="mt-6 pt-4 border-t border-border-hairline flex items-center justify-between font-mono text-[11px] text-text-muted">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-beast-emerald" />
                  <span>GUINNESS WORLD RECORDS ADJUDICATED</span>
                </span>
                <span className="text-beast-cyan">[RECORD 0{activeRecordIndex + 1}/05]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
