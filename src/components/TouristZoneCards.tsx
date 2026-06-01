/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TouristZone } from "../types";
import { Sparkles, Calendar, Navigation, MapPin, Info, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

interface TouristZoneCardsProps {
  zones: TouristZone[];
  activeZone: TouristZone | null;
  onSelectZone: (zone: TouristZone) => void;
}

export default function TouristZoneCards({ zones, activeZone, onSelectZone }: TouristZoneCardsProps) {
  const [filter, setFilter] = useState<string>("all");
  const [expandedProfessorTipId, setExpandedProfessorTipId] = useState<{ [key: string]: boolean }>({});

  const filteredZones = zones.filter((zone) => {
    if (filter === "all") return true;
    return zone.category === filter;
  });

  const handleToggleTip = (zoneId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedProfessorTipId((prev) => ({
      ...prev,
      [zoneId]: !prev[zoneId],
    }));
  };

  return (
    <div className="my-12" id="tourist-destinations-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-sans font-bold text-royal-red text-xl tracking-wide uppercase">
            Достопримечательности Каракалпакстана
          </h3>
          <p className="text-natural-charcoal/80 font-sans text-xs md:text-sm">
            Научно верифицированные локации, древние памятники архитектуры и заповедные экосистемы.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 text-xs font-mono font-medium">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              filter === "all"
                ? "bg-royal-red text-white border-royal-red"
                : "bg-white text-natural-charcoal border-sand-border hover:bg-sand-cream"
            }`}
          >
            Все
          </button>
          <button
            onClick={() => setFilter("history")}
            className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              filter === "history"
                ? "bg-royal-red text-white border-royal-red"
                : "bg-white text-natural-charcoal border-sand-border hover:bg-sand-cream"
            }`}
          >
            История
          </button>
          <button
            onClick={() => setFilter("culture")}
            className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              filter === "culture"
                ? "bg-sand-gold text-white border-sand-gold"
                : "bg-white text-natural-charcoal border-sand-border hover:bg-sand-cream"
            }`}
          >
            Культура
          </button>
          <button
            onClick={() => setFilter("nature")}
            className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              filter === "nature"
                ? "bg-[#059669] text-white border-[#059669]"
                : "bg-white text-natural-charcoal border-sand-border hover:bg-sand-cream"
            }`}
          >
            Природа
          </button>
          <button
            onClick={() => setFilter("monument")}
            className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              filter === "monument"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-natural-charcoal border-sand-border hover:bg-sand-cream"
            }`}
          >
            Мемориал
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredZones.map((zone) => {
          const isSelected = activeZone?.id === zone.id;
          const isTipExpanded = !!expandedProfessorTipId[zone.id];

          return (
            <div
              key={zone.id}
              id={`zone-info-card-${zone.id}`}
              onClick={() => {
                onSelectZone(zone);
              }}
              className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm cursor-pointer group ${
                isSelected
                  ? "border-royal-red ring-2 ring-royal-red/25 scale-[1.01]"
                  : "border-sand-border hover:border-sand-light hover:translate-y-[-2px] hover:shadow-md"
              }`}
            >
              <div>
                {/* Image Section */}
                <div className="relative h-48 md:h-52 w-full overflow-hidden bg-sand-cream">
                  <img
                    src={zone.imageUrl}
                    alt={zone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-xl text-royal-red font-mono text-[10px] uppercase font-bold tracking-wider border border-sand-border shadow-sm">
                      {zone.category === "culture" ? "культура" : zone.category === "history" ? "история" : zone.category === "nature" ? "природа" : "мемориал"}
                    </span>
                    <span className={`px-2.5 py-1 rounded-xl font-mono text-[10px] font-bold uppercase backdrop-blur-md ${
                      zone.accessibility === "easy" ? "bg-emerald-500/10 text-emerald-800" : zone.accessibility === "medium" ? "bg-sand-gold/10 text-sand-gold" : "bg-red-500/10 text-royal-red"
                    }`}>
                      {zone.accessibility === "easy" ? "простой" : zone.accessibility === "medium" ? "средний" : "тяжелый"}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <h4 className="font-sans font-bold text-royal-red text-base md:text-lg mb-1 group-hover:text-royal-red-dark transition-colors">
                    {zone.name}
                  </h4>

                  {/* Location and Distance Indicators */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-sand-gold mb-3">
                    <div className="flex items-center gap-1">
                      <Navigation className="h-3 w-3 text-royal-red" />
                      <span>{zone.distanceFromNukus} км от Нукуса</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-royal-red" />
                      <span>{zone.bestSeason.split(",")[0]}</span>
                    </div>
                  </div>

                  <p className="text-natural-charcoal/90 font-sans text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                    {zone.fullDescription}
                  </p>

                  {/* Highlights Bullet points */}
                  <div className="mb-4">
                    <div className="text-[10px] text-sand-gold font-mono tracking-wider uppercase mb-1.5 font-bold">Что вы увидите:</div>
                    <div className="flex flex-col gap-1.5">
                      {zone.highlights.map((hlt, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-natural-charcoal/80 font-sans">
                          <CheckCircle2 className="h-3.5 w-3.5 text-royal-red/75 shrink-0 mt-0.5" />
                          <span>{hlt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Professor commentary/expand */}
              <div className="px-5 pb-5 mt-auto">
                <div className="bg-[#FAF7F2] border border-sand-border rounded-2xl p-3">
                  <button
                    onClick={(e) => handleToggleTip(zone.id, e)}
                    className="w-full flex items-center justify-between text-[11px] font-mono text-royal-red uppercase font-semibold cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-royal-red" />
                      Заметки профессора
                    </span>
                    {isTipExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>
                  {isTipExpanded && (
                    <p className="text-natural-charcoal/80 font-sans text-xs italic mt-2 border-t border-sand-border pt-2 leading-relaxed">
                      {zone.historyProfessorTip}
                    </p>
                  )}
                </div>

                {/* Explicit Scroll-to-map Button/Area at bottom of card */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectZone(zone);
                    const mapSec = document.getElementById("interactive-map-section");
                    if (mapSec) {
                      mapSec.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }}
                  className="flex items-center justify-center gap-1.5 mt-4 py-2 bg-royal-red/5 hover:bg-royal-red/10 border border-royal-red/20 rounded-xl text-[11px] font-mono font-bold text-royal-red uppercase tracking-wider transition-all cursor-pointer"
                >
                  <MapPin className="h-3.5 w-3.5 animate-pulse text-royal-red" />
                  <span>Показать на карте</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
