import React, { useState } from 'react';
import { Play, Sparkles, Award, Eye, ChevronRight } from 'lucide-react';
import { MRBEAST_DATA, VideoDossier } from '@/data/mrbeastData';

interface ProductionVaultProps {
  onSelectVideo: (video: VideoDossier) => void;
  playClick?: () => void;
}

type FilterCategory = 'ALL' | 'MEGA ARENA' | 'ENDURANCE' | 'HUMANITARIAN';

export const ProductionVault: React.FC<ProductionVaultProps> = ({
  onSelectVideo,
  playClick,
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
      className="relative py-28 sm:py-36 bg-[#050608] border-b border-white/10"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20 text-xs font-bold text-[#00F5FF] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE PRODUCTION VAULT</span>
            </div>
            <h2 className="font-display font-extrabold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight uppercase text-white">
              SOUNDSTAGE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#FFD000] to-[#FF1E66]">
                SPECTACLE.
              </span>
            </h2>
          </div>

          {/* Minimal Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {(['ALL', 'MEGA ARENA', 'ENDURANCE', 'HUMANITARIAN'] as FilterCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick?.();
                  setActiveFilter(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-tight transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-white text-[#07080C] shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric 12-Column Modern Bento Screening Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Bento Flagship 7-Col Card */}
          {filteredVideos[0] && (
            <div
              className="lg:col-span-7 glass-card p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden"
              data-cursor="video"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="px-3 py-1 rounded-full bg-[#00F5FF]/10 text-[#00F5FF] text-xs font-bold uppercase tracking-wider">
                    {filteredVideos[0].category}
                  </span>
                  <div className="flex items-center gap-2 text-[#FFD000] font-bold text-sm">
                    <Eye className="w-4 h-4" />
                    <span>{filteredVideos[0].views}</span>
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-white mt-5 group-hover:text-[#00F5FF] transition-colors">
                  {filteredVideos[0].title}
                </h3>

                <p className="mt-3 text-slate-300 text-base leading-relaxed max-w-2xl">
                  {filteredVideos[0].editorialNote}
                </p>
              </div>

              {/* Video Thumbnail Vessel */}
              <div
                onClick={() => {
                  playClick?.();
                  onSelectVideo(filteredVideos[0]);
                }}
                className="my-6 relative aspect-video w-full rounded-2xl bg-black border border-white/10 overflow-hidden group/thumb cursor-pointer shadow-2xl"
              >
                <img
                  src={`https://i.ytimg.com/vi/${filteredVideos[0].youtubeId}/maxresdefault.jpg`}
                  alt={filteredVideos[0].title}
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${filteredVideos[0].youtubeId}/hqdefault.jpg`;
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Center Glowing Play Disc */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FFD000] to-[#FF9900] text-[#07080C] flex items-center justify-center shadow-[0_0_40px_rgba(255,208,0,0.6)] group-hover/thumb:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-[#07080C] ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md text-xs font-mono text-white/90">
                  {filteredVideos[0].schematicTag}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-slate-400 text-xs font-semibold">
                  {filteredVideos[0].budgetOrStakes} // {filteredVideos[0].contestantsOrParticipants}
                </span>

                <button
                  onClick={() => {
                    playClick?.();
                    onSelectVideo(filteredVideos[0]);
                  }}
                  className="btn-pill px-5 py-2.5 bg-white text-[#07080C] font-extrabold text-xs uppercase flex items-center gap-2 hover:bg-[#00F5FF] transition-all cursor-pointer shadow-md"
                >
                  <span>LAUNCH STREAM</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          )}

          {/* Bento Secondary 5-Col Card */}
          {filteredVideos[1] && (
            <div
              className="lg:col-span-5 glass-card p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden"
              data-cursor="video"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="px-3 py-1 rounded-full bg-[#FF1E66]/10 text-[#FF1E66] text-xs font-bold uppercase tracking-wider">
                    {filteredVideos[1].category}
                  </span>
                  <span className="text-[#FFD000] font-bold text-sm">{filteredVideos[1].views}</span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white mt-5 group-hover:text-[#00F5FF] transition-colors">
                  {filteredVideos[1].title}
                </h3>

                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  {filteredVideos[1].editorialNote}
                </p>
              </div>

              <div
                onClick={() => {
                  playClick?.();
                  onSelectVideo(filteredVideos[1]);
                }}
                className="my-5 relative aspect-video w-full rounded-2xl bg-black border border-white/10 overflow-hidden cursor-pointer group/thumb shadow-xl"
              >
                <img
                  src={`https://i.ytimg.com/vi/${filteredVideos[1].youtubeId}/maxresdefault.jpg`}
                  alt={filteredVideos[1].title}
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${filteredVideos[1].youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#00F5FF] text-[#07080C] flex items-center justify-center shadow-[0_0_30px_rgba(0,245,255,0.5)] group-hover/thumb:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">{filteredVideos[1].budgetOrStakes}</span>
                <button
                  onClick={() => {
                    playClick?.();
                    onSelectVideo(filteredVideos[1]);
                  }}
                  className="text-[#FFD000] hover:text-white font-bold transition-colors cursor-pointer"
                >
                  PLAY ▶
                </button>
              </div>
            </div>
          )}

          {/* Lower 5-Col Card */}
          {filteredVideos[2] && (
            <div
              className="lg:col-span-5 glass-card p-6 sm:p-7 flex flex-col justify-between group"
              data-cursor="video"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-[#00F5FF]">{filteredVideos[2].category}</span>
                  <span className="text-xs font-bold text-[#FFD000]">{filteredVideos[2].views}</span>
                </div>
                <h4 className="font-display font-extrabold text-2xl uppercase tracking-tight text-white mt-4 group-hover:text-[#00F5FF] transition-colors">
                  {filteredVideos[2].title}
                </h4>
                <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                  {filteredVideos[2].editorialNote}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">{filteredVideos[2].budgetOrStakes}</span>
                <button
                  onClick={() => {
                    playClick?.();
                    onSelectVideo(filteredVideos[2]);
                  }}
                  className="text-white hover:text-[#00F5FF] font-bold cursor-pointer"
                >
                  PLAY VIDEO ↗
                </button>
              </div>
            </div>
          )}

          {/* Lower 7-Col Card */}
          {filteredVideos[3] && (
            <div
              className="lg:col-span-7 glass-card p-6 sm:p-7 flex flex-col justify-between group"
              data-cursor="video"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-[#00F076]">{filteredVideos[3].category}</span>
                  <span className="text-xs font-bold text-[#FFD000]">{filteredVideos[3].views}</span>
                </div>
                <h4 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white mt-4 group-hover:text-[#00F076] transition-colors">
                  {filteredVideos[3].title}
                </h4>
                <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                  {filteredVideos[3].editorialNote}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#00F076] font-semibold">{filteredVideos[3].budgetOrStakes}</span>
                <button
                  onClick={() => {
                    playClick?.();
                    onSelectVideo(filteredVideos[3]);
                  }}
                  className="btn-pill px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold transition-all cursor-pointer"
                >
                  WATCH INTERVENTION ▶
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Beast Games Amazon Prime 44 Guinness Records Explorer */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent border border-white/15 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD000]/10 border border-[#FFD000]/20 text-xs font-bold text-[#FFD000] uppercase tracking-wider mb-3">
                <Award className="w-4 h-4 text-[#FFD000]" />
                <span>AMAZON PRIME VIDEO // 44 GUINNESS WORLD RECORDS</span>
              </div>
              <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
                BEAST GAMES: THE $100M BENCHMARK.
              </h3>
              <p className="mt-3 text-slate-300 text-base max-w-3xl leading-relaxed">
                Adjudicated in Las Vegas (&quot;Beast City&quot;) and Toronto (&quot;Beast Island&quot;). Donaldson proved reality television streaming can out-scale Olympic broadcasts in concurrent cameras and participant volume.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-tr from-[#FFD000]/20 to-transparent border border-[#FFD000]/30 text-center flex-shrink-0">
              <span className="text-xs text-slate-300 font-bold uppercase">Single Cash Pile</span>
              <div className="font-display font-black text-4xl text-[#FFD000] mt-1 tabular-nums">
                $5,000,000
              </div>
              <span className="text-xs text-[#00F5FF] font-semibold">Physical Cash Pyramid</span>
            </div>
          </div>

          {/* Interactive Record Selector Matrix */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* List */}
            <div className="md:col-span-5 space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-3">
                SELECT RECORD:
              </span>
              {records.map((rec, i) => (
                <button
                  key={rec.id}
                  onClick={() => {
                    playClick?.();
                    setActiveRecordIndex(i);
                  }}
                  className={`w-full p-4 rounded-xl text-left text-sm transition-all flex items-center justify-between cursor-pointer ${
                    activeRecordIndex === i
                      ? 'bg-gradient-to-r from-[#FFD000] to-[#FF9900] text-[#07080C] font-bold shadow-[0_0_20px_rgba(255,208,0,0.3)]'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-xs opacity-70">#{i + 1}</span>
                    <span className="truncate">{rec.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Selected Card */}
            <div className="md:col-span-7 p-8 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between min-h-[250px]">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-3">
                  <span className="text-[#FFD000] font-bold">{activeRecord.officialCitation}</span>
                  <span>{activeRecord.location}</span>
                </div>

                <div className="mt-6">
                  <span className="text-xs font-mono text-[#00F5FF] uppercase font-bold tracking-wider">
                    {activeRecord.verifiedFigure}
                  </span>
                  <div className="font-display font-black text-4xl sm:text-6xl text-[#FFD000] tracking-tight mt-1">
                    {activeRecord.metric}
                  </div>
                </div>

                <h4 className="mt-3 font-display font-bold text-xl text-white uppercase">
                  {activeRecord.title}
                </h4>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>OFFICIAL GUINNESS ADJUDICATION</span>
                <span className="text-[#00F5FF]">RECORD {activeRecordIndex + 1} / 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
